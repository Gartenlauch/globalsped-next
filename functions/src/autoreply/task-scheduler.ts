import {
    randomUUID,
} from "node:crypto";

import {
    getFunctions,
} from "firebase-admin/functions";

import {
    Timestamp,
    type DocumentReference,
} from "firebase-admin/firestore";

import {
    failAutoReplyDispatch,
    markAutoReplyTaskScheduled,
    requestManualAutoReplyDispatch,
} from "./transitions";
import { HttpsError } from "firebase-functions/v2/https";

import {
    getFunctionUrl,
} from "./task-target";

const REGION =
    "europe-west3";

const TASK_FUNCTION_NAME =
    "autoReplyDispatchTask";

export type AutoReplyDeliveryMode =
    | "dry_run"
    | "live";

type AutoReplyTaskPayload = {
    leadId: string;

    taskToken: string;

    deliveryMode:
    AutoReplyDeliveryMode;

    sendMode:
    "automatic" | "manual";

    requestedByUid?:
    string | null;

    executeNotBefore?:
    string;
};

function isRecord(
    value: unknown,
): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

function isFunctionsEmulator():
    boolean {
    return (
        process.env
            .FUNCTIONS_EMULATOR ===
        "true"
    );
}

export async function scheduleAutoReplyTaskForLead(
    params: {
        leadRef:
        DocumentReference;

        deliveryMode:
        AutoReplyDeliveryMode;

        /*
         * Nur für lokale Tests.
         * Der echte Business-Zeitpunkt
         * im Lead bleibt unverändert.
         */
        scheduleTimeOverride?:
        Date;
    },
): Promise<{
    taskToken: string;

    executionScheduledFor:
    Date;
}> {
    const {
        leadRef,
        deliveryMode,
        scheduleTimeOverride,
    } = params;

    const snapshot =
        await leadRef.get();

    if (!snapshot.exists) {
        throw new Error(
            "Lead existiert nicht.",
        );
    }

    const lead =
        snapshot.data() ??
        {};

    const autoReply =
        isRecord(
            lead.autoReply,
        )
            ? lead.autoReply
            : {};

    const scheduledFor =
        autoReply.scheduledFor;

    if (
        !(scheduledFor instanceof
            Timestamp)
    ) {
        throw new Error(
            "Der Lead besitzt keinen gültigen AutoReply-Versandzeitpunkt.",
        );
    }

    if (
        scheduleTimeOverride &&
        (
            !isFunctionsEmulator() ||
            deliveryMode !==
            "dry_run"
        )
    ) {
        throw new Error(
            "Ein abweichender Ausführungszeitpunkt ist ausschließlich für lokale Dry Runs erlaubt.",
        );
    }

    const executionScheduledFor =
        scheduleTimeOverride ??
        scheduledFor.toDate();

    const taskToken =
        randomUUID();

    const taskName =
        `autoreply:${taskToken}`;

    /*
     * Zuerst den Token im Lead reservieren.
     * Nur genau diese Task darf später
     * den Dispatch claimen.
     */
    await markAutoReplyTaskScheduled({
        leadRef,

        taskToken,

        taskName,
    });

    try {
        const queue =
            getFunctions()
                .taskQueue<
                    AutoReplyTaskPayload
                >(
                    `locations/${REGION}/functions/${TASK_FUNCTION_NAME}`,
                );

        const payload:
            AutoReplyTaskPayload = {
            leadId:
                leadRef.id,

            taskToken,

            deliveryMode,

            sendMode:
                "automatic",

            executeNotBefore:
                isFunctionsEmulator() &&
                    deliveryMode === "dry_run"
                    ? executionScheduledFor
                        .toISOString()
                    : undefined,
        };

        if (isFunctionsEmulator()) {
            await queue.enqueue(
                payload,
                {
                    scheduleTime:
                        executionScheduledFor,

                    dispatchDeadlineSeconds:
                        60,
                },
            );
        } else {
            const targetUri =
                await getFunctionUrl(
                    TASK_FUNCTION_NAME,
                    REGION,
                );

            await queue.enqueue(
                payload,
                {
                    scheduleTime:
                        executionScheduledFor,

                    dispatchDeadlineSeconds:
                        60,

                    uri:
                        targetUri,
                },
            );
        }

        return {
            taskToken,

            executionScheduledFor,
        };
    } catch (error) {
        await failAutoReplyDispatch({
            leadRef,
            taskToken,
            error,
        });

        throw error;
    }
}

export function requireManualAutoReplyEmulator(): void {
    if (!isFunctionsEmulator() ||
        !process.env.FIRESTORE_EMULATOR_HOST ||
        !process.env.CLOUD_TASKS_EMULATOR_HOST) {
        throw new HttpsError("failed-precondition", "Der echte AutoReply-Mail-Provider ist noch nicht aktiviert. Manueller Versand ist nur im lokalen Emulator als Dry Run verfügbar.");
    }
}

export async function scheduleManualAutoReplyTaskForLead(params: {
    leadRef: DocumentReference;
    requestedByUid: string;
    deliveryMode: AutoReplyDeliveryMode;
}): Promise<{ taskToken: string }> {
    requireManualAutoReplyEmulator();
    const { leadRef, requestedByUid, deliveryMode } = params;
    if (deliveryMode !== "dry_run") {
        throw new HttpsError("failed-precondition", "Echter AutoReply-Mailversand ist noch nicht aktiviert.");
    }
    const taskToken = randomUUID();
    await requestManualAutoReplyDispatch({
        leadRef,
        requestedByUid,
        taskToken,
        taskName: `manual:${taskToken}`,
    });
    try {
        const queue = getFunctions().taskQueue<AutoReplyTaskPayload>(
            `locations/${REGION}/functions/${TASK_FUNCTION_NAME}`,
        );
        await queue.enqueue({
            leadId: leadRef.id,
            taskToken,
            deliveryMode,
            sendMode: "manual",
        }, { scheduleTime: new Date(), dispatchDeadlineSeconds: 60 });
        return { taskToken };
    } catch (error) {
        await failAutoReplyDispatch({ leadRef, taskToken, error });
        throw error;
    }
}
