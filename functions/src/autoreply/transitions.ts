import {
    FieldValue,
    type DocumentData,
    type DocumentReference,
} from "firebase-admin/firestore";

import type {
    AutoReplySendMode,
} from "./state";
import {HttpsError} from "firebase-functions/v2/https";
import {resolveAutoReplyDeliveryMetadata} from "./delivery-metadata";
import {renderAutoReplyMessage} from "./message-renderer";

export async function requestManualAutoReplyDispatch(params: {
    leadRef: DocumentReference;
    taskToken: string;
    requestedByUid: string;
    taskName: string;
}): Promise<void> {
    const {leadRef, taskToken, requestedByUid, taskName} = params;
    await leadRef.firestore.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(leadRef);
        if (!snapshot.exists) {
            throw new HttpsError("not-found", "Lead existiert nicht.");
        }
        const lead = snapshot.data() ?? {};
        if (!isRecord(lead.autoReply)) {
            throw new HttpsError("failed-precondition", "Für diesen Lead liegen keine AutoReply-Daten vor.");
        }
        const autoReply = lead.autoReply;
        if (!["planned", "scheduled", "failed"].includes(String(autoReply.status))) {
            throw new HttpsError("failed-precondition", "Die Autoantwort kann im aktuellen Status nicht manuell angefordert werden.");
        }
        if (!taskToken.trim() || taskToken === autoReply.taskToken || !requestedByUid.trim() || !taskName.trim()) {
            throw new HttpsError("invalid-argument", "Neuer Task-Token und Administrator sind erforderlich.");
        }
        try {
            resolveAutoReplyDeliveryMetadata(lead);
            renderAutoReplyMessage(lead);
        } catch (error) {
            throw new HttpsError("failed-precondition", error instanceof Error ? error.message : "Empfänger-Daten fehlen.");
        }
        const now = FieldValue.serverTimestamp();
        transaction.update(leadRef, {
            "autoReply.status": "scheduled",
            "autoReply.taskToken": taskToken,
            "autoReply.taskName": taskName,
            "autoReply.manualSendRequestedAt": now,
            "autoReply.manualSendRequestedByUid": requestedByUid,
            "autoReply.scheduledAt": now,
            "autoReply.failedAt": null,
            "autoReply.lastError": null,
            updatedAt: now,
        });
    });
}

export type AutoReplyTaskClaimResult = {
    claimed: boolean;

    reason:
    | "claimed"
    | "terminal"
    | "stale_task"
    | "not_scheduled";
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

function readAutoReply(
    data: DocumentData,
): Record<string, unknown> {
    return isRecord(
        data.autoReply,
    )
        ? data.autoReply
        : {};
}

function readString(
    value: unknown,
): string | null {
    return typeof value === "string"
        ? value
        : null;
}

function isTerminalStatus(
    status: string | null,
): boolean {
    return (
        status === "sent" ||
        status === "cancelled" ||
        status ===
        "dry_run_completed"
    );
}

/*
 * planned -> scheduled
 *
 * Das Token identifiziert exakt die
 * Cloud Task, die später senden darf.
 */
export async function markAutoReplyTaskScheduled(
    params: {
        leadRef:
        DocumentReference;

        taskToken: string;

        taskName:
        string | null;
    },
): Promise<void> {
    const {
        leadRef,
        taskToken,
        taskName,
    } = params;

    await leadRef.firestore
        .runTransaction(
            async (transaction) => {
                const snapshot =
                    await transaction
                        .get(leadRef);

                if (!snapshot.exists) {
                    throw new Error(
                        "Lead existiert nicht.",
                    );
                }

                const autoReply =
                    readAutoReply(
                        snapshot.data() ??
                        {},
                    );

                const status =
                    readString(
                        autoReply.status,
                    );

                const existingToken =
                    readString(
                        autoReply
                            .taskToken,
                    );

                /*
                 * Idempotenter Retry.
                 */
                if (
                    status ===
                    "scheduled" &&
                    existingToken ===
                    taskToken
                ) {
                    return;
                }

                if (
                    status !==
                    "planned"
                ) {
                    throw new Error(
                        `AutoReply kann aus Status ${String(
                            status,
                        )} nicht geplant werden.`,
                    );
                }

                transaction.update(
                    leadRef,
                    {
                        "autoReply.status":
                            "scheduled",

                        "autoReply.taskToken":
                            taskToken,

                        "autoReply.taskName":
                            taskName,

                        "autoReply.scheduledAt":
                            FieldValue
                                .serverTimestamp(),

                        "autoReply.lastError":
                            null,

                        updatedAt:
                            FieldValue
                                .serverTimestamp(),
                    },
                );
            },
        );
}

/*
 * scheduled -> dispatching
 *
 * Das gespeicherte taskToken schützt
 * insbesondere vor alten Cloud Tasks.
 */
export async function claimAutoReplyDispatch(
    params: {
        leadRef:
        DocumentReference;

        taskToken:
        string;
    },
): Promise<AutoReplyTaskClaimResult> {
    const {
        leadRef,
        taskToken,
    } = params;

    return leadRef.firestore
        .runTransaction(
            async (transaction) => {
                const snapshot =
                    await transaction
                        .get(leadRef);

                if (!snapshot.exists) {
                    throw new Error(
                        "Lead existiert nicht.",
                    );
                }

                const autoReply =
                    readAutoReply(
                        snapshot.data() ??
                        {},
                    );

                const status =
                    readString(
                        autoReply.status,
                    );

                const storedToken =
                    readString(
                        autoReply
                            .taskToken,
                    );

                if (
                    storedToken !==
                    taskToken
                ) {
                    return {
                        claimed: false,
                        reason:
                            "stale_task",
                    };
                }

                if (isTerminalStatus(status)) {
                    return {claimed: false, reason: "terminal"};
                }

                if (
                    status !==
                    "scheduled"
                ) {
                    return {
                        claimed: false,
                        reason:
                            "not_scheduled",
                    };
                }

                transaction.update(
                    leadRef,
                    {
                        "autoReply.status":
                            "dispatching",

                        "autoReply.dispatchStartedAt":
                            FieldValue
                                .serverTimestamp(),

                        "autoReply.attemptCount":
                            FieldValue
                                .increment(1),

                        updatedAt:
                            FieldValue
                                .serverTimestamp(),
                    },
                );

                return {
                    claimed: true,
                    reason: "claimed",
                };
            },
        );
}

/*
 * dispatching -> sent
 * oder beim Emulator:
 * dispatching -> dry_run_completed
 */
export async function completeAutoReplyDispatch(
    params: {
        leadRef:
        DocumentReference;

        taskToken:
        string;

        mode:
        AutoReplySendMode |
        "dry_run";

        dryRunSendMode?: AutoReplySendMode;

        sentByUid?:
        string | null;

        recipientEmail:
        string;

        internalCopyEmail:
        string | null;

        templateVersion:
        string;

        messageSubject: string;
        messageLocale: "de" | "en";

        providerMessageId:
        string | null;
    },
): Promise<boolean> {
    const {
        leadRef,
        taskToken,
        mode,
        dryRunSendMode = "automatic",
        sentByUid = null,
        recipientEmail,
        internalCopyEmail,
        templateVersion,
        messageSubject,
        messageLocale,
        providerMessageId,
    } = params;

    return leadRef.firestore
        .runTransaction(
            async (transaction) => {
                const snapshot =
                    await transaction
                        .get(leadRef);

                if (!snapshot.exists) {
                    throw new Error(
                        "Lead existiert nicht.",
                    );
                }

                const autoReply =
                    readAutoReply(
                        snapshot.data() ??
                        {},
                    );

                const status =
                    readString(
                        autoReply.status,
                    );

                /*
                 * Retry nach bereits
                 * abgeschlossenem Versand.
                 */
                if (
                    isTerminalStatus(
                        status,
                    )
                ) {
                    return false;
                }

                const storedToken =
                    readString(
                        autoReply
                            .taskToken,
                    );

                if (
                    storedToken !==
                    taskToken
                ) {
                    return false;
                }

                if (
                    status !==
                    "dispatching"
                ) {
                    throw new Error(
                        `AutoReply kann aus Status ${String(
                            status,
                        )} nicht abgeschlossen werden.`,
                    );
                }

                if (mode === "dry_run") {
                    transaction.update(
                        leadRef,
                        {
                            "autoReply.status":
                                "dry_run_completed",

                            "autoReply.sentMode": dryRunSendMode,
                            "autoReply.sentByUid": dryRunSendMode === "manual" ? sentByUid : null,

                            "autoReply.recipientEmail":
                                recipientEmail,

                            "autoReply.internalCopyEmail":
                                internalCopyEmail,

                            "autoReply.templateVersion":
                                templateVersion,

                            "autoReply.messageSubject": messageSubject,
                            "autoReply.messageLocale": messageLocale,

                            "autoReply.providerMessageId":
                                providerMessageId,

                            "autoReply.lastError":
                                null,

                            updatedAt:
                                FieldValue
                                    .serverTimestamp(),
                        },
                    );

                    return true;
                }

                transaction.update(
                    leadRef,
                    {
                        "autoReply.status":
                            "sent",

                        "autoReply.sentAt":
                            FieldValue
                                .serverTimestamp(),

                        "autoReply.sentMode":
                            mode,

                        "autoReply.sentByUid":
                            sentByUid,

                        "autoReply.recipientEmail":
                            recipientEmail,

                        "autoReply.internalCopyEmail":
                            internalCopyEmail,

                        "autoReply.templateVersion":
                            templateVersion,

                        "autoReply.messageSubject": messageSubject,
                        "autoReply.messageLocale": messageLocale,

                        "autoReply.providerMessageId":
                            providerMessageId,

                        "autoReply.lastError":
                            null,

                        updatedAt:
                            FieldValue
                                .serverTimestamp(),
                    },
                );
                return true;
            },
        );
}

/*
 * scheduled/dispatching -> failed
 *
 * Ein alter Task darf einen neueren
 * Zustand nicht überschreiben.
 */
export async function failAutoReplyDispatch(
    params: {
        leadRef:
        DocumentReference;

        taskToken:
        string;

        error:
        unknown;
    },
): Promise<boolean> {
    const {
        leadRef,
        taskToken,
        error,
    } = params;

    const message =
        error instanceof Error
            ? error.message
            : String(error);

    return leadRef.firestore
        .runTransaction(
            async (transaction) => {
                const snapshot =
                    await transaction
                        .get(leadRef);

                if (!snapshot.exists) {
                    return false;
                }

                const autoReply =
                    readAutoReply(
                        snapshot.data() ??
                        {},
                    );

                const storedToken =
                    readString(
                        autoReply
                            .taskToken,
                    );

                if (
                    storedToken !==
                    taskToken
                ) {
                    return false;
                }

                const status =
                    readString(
                        autoReply.status,
                    );

                if (
                    status !==
                    "scheduled" &&
                    status !==
                    "dispatching"
                ) {
                    return false;
                }

                transaction.update(
                    leadRef,
                    {
                        "autoReply.status":
                            "failed",

                        "autoReply.failedAt":
                            FieldValue
                                .serverTimestamp(),

                        "autoReply.lastError":
                            message.slice(
                                0,
                                1000,
                            ),

                        updatedAt:
                            FieldValue
                                .serverTimestamp(),
                    },
                );

                return true;
            },
        );
}
