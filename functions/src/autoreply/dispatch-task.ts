import {prepareAutoReplyMessage} from "./message-prepare";
import {
    randomUUID,
} from "node:crypto";

import * as admin
    from "firebase-admin";

import {
    FieldValue,
} from "firebase-admin/firestore";

import {
    logger,
} from "firebase-functions";

import {
    onTaskDispatched,
} from "firebase-functions/tasks";

import {
    claimAutoReplyDispatch,
    completeAutoReplyDispatch,
    failAutoReplyDispatch,
} from "./transitions";

import {
    resolveAutoReplyDeliveryMetadata,
} from "./delivery-metadata";

const REGION =
    "europe-west3";

const TEST_MODE =
    "autoreply_dry_run";

function isRecord(
    value: unknown,
): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

function requiredString(
    value: unknown,
    name: string,
): string {
    if (
        typeof value !== "string" ||
        !value.trim()
    ) {
        throw new Error(
            `${name} fehlt.`,
        );
    }

    return value.trim();
}

function isFunctionsEmulator():
    boolean {
    return (
        process.env
            .FUNCTIONS_EMULATOR ===
        "true"
    );
}

export const autoReplyDispatchTask =
    onTaskDispatched(
        {
            region: REGION,

            retryConfig: {
                maxAttempts: 3,
                minBackoffSeconds: 30,
            },

            rateLimits: {
                maxConcurrentDispatches:
                    5,
            },
        },
        async (request) => {
            if (
                !isRecord(
                    request.data,
                )
            ) {
                throw new Error(
                    "Ungültige AutoReply-Task-Daten.",
                );
            }

            const leadId =
                requiredString(
                    request.data.leadId,
                    "leadId",
                );

            const taskToken =
                requiredString(
                    request.data
                        .taskToken,
                    "taskToken",
                );

            const deliveryMode =
                requiredString(
                    request.data
                        .deliveryMode,
                    "deliveryMode",
                );

            if (
                deliveryMode !==
                "dry_run" &&
                deliveryMode !==
                "live"
            ) {
                throw new Error(
                    "Ungültiger AutoReply-Delivery-Modus.",
                );
            }

            /*
             * Dry Runs dürfen niemals
             * außerhalb des Emulators laufen.
             */
            if (
                deliveryMode ===
                "dry_run" &&
                !isFunctionsEmulator()
            ) {
                throw new Error(
                    "Dry-Run-Dispatch außerhalb des Emulators blockiert.",
                );
            }

            const db =
                admin.firestore();

            const sendMode = request.data.sendMode ?? "automatic";
            if (sendMode !== "automatic" && sendMode !== "manual") {
                throw new Error("Ungültiger AutoReply-Versandmodus.");
            }

            const leadRef =
                db
                    .collection(
                        "leads",
                    )
                    .doc(
                        leadId,
                    );

            if (
                deliveryMode ===
                "dry_run" &&
                isFunctionsEmulator()
            ) {
                const executeNotBefore =
                    request.data
                        .executeNotBefore;

                if (
                    typeof executeNotBefore ===
                    "string"
                ) {
                    const targetTime =
                        new Date(
                            executeNotBefore,
                        ).getTime();

                    const waitMs =
                        targetTime -
                        Date.now();

                    if (waitMs > 0) {
                        logger.info(
                            "AutoReply dry-run waits until planned emulator execution time.",
                            {
                                leadId,
                                taskToken,
                                waitMs,
                                executeNotBefore,
                            },
                        );

                        await new Promise<void>(
                            (resolve) => {
                                setTimeout(
                                    resolve,
                                    waitMs,
                                );
                            },
                        );
                    }
                }
            }

            const claim =
                await claimAutoReplyDispatch({
                    leadRef,
                    taskToken,
                });

            if (!claim.claimed) {
                logger.info(
                    "AutoReply task ignored.",
                    {
                        leadId,
                        taskToken,
                        reason:
                            claim.reason,
                    },
                );

                return;
            }

            try {
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

                const autoReply = isRecord(lead.autoReply) ? lead.autoReply : {};
                const sentByUid = sendMode === "manual" ? requiredString(
                    autoReply.manualSendRequestedByUid,
                    "manualSendRequestedByUid",
                ) : null;

                const delivery =
                    resolveAutoReplyDeliveryMetadata(
                        lead,
                    );

                const message = await prepareAutoReplyMessage(lead);

                /*
                 * Audit-Daten bereits vor
                 * dem eigentlichen Provider-
                 * Aufruf speichern.
                 */
                await leadRef.update({
                    "autoReply.recipientEmail":
                        delivery
                            .recipientEmail,

                    "autoReply.internalCopyEmail":
                        delivery
                            .internalCopyEmail,

                    "autoReply.messageSubject": message.subject,
                    "autoReply.messageLocale": message.locale,

                    "autoReply.templateVersion":
                        message.templateVersion,

                    updatedAt:
                        FieldValue
                            .serverTimestamp(),
                });

                if (
                    lead.testMode ===
                    TEST_MODE
                ) {
                    await leadRef.update({
                        "autoReply.emulatorDryRun.stage":
                            "dispatching",

                        "autoReply.emulatorDryRun.dispatchedAt":
                            FieldValue
                                .serverTimestamp(),
                    });
                }

                /*
                 * Noch KEIN echter Provider.
                 *
                 * Der Live-Modus wird solange
                 * bewusst blockiert, bis Graph
                 * angeschlossen ist.
                 */
                if (
                    deliveryMode ===
                    "live"
                ) {
                    throw new Error(
                        "Der echte AutoReply-Mail-Provider ist noch nicht konfiguriert.",
                    );
                }

                /*
                 * Lokaler Mail-Provider-Simulator.
                 *
                 * Keine E-Mail verlässt
                 * den Emulator.
                 */
                const providerMessageId =
                    `emulator:${randomUUID()}`;

                await completeAutoReplyDispatch({
                    leadRef,

                    taskToken,

                    mode:
                        "dry_run",

                    dryRunSendMode: sendMode,
                    sentByUid,

                    recipientEmail:
                        delivery
                            .recipientEmail,

                    internalCopyEmail:
                        delivery
                            .internalCopyEmail,

                    templateVersion:
                        message.templateVersion,

                    messageSubject: message.subject,
                    messageLocale: message.locale,
                    providerMessageId,
                });

                if (
                    lead.testMode ===
                    TEST_MODE
                ) {
                    await leadRef.update({
                        "autoReply.emulatorDryRun.stage":
                            "dry_run_completed",

                        "autoReply.emulatorDryRun.completedAt":
                            FieldValue
                                .serverTimestamp(),

                        updatedAt:
                            FieldValue
                                .serverTimestamp(),
                    });
                }

                logger.info(
                    "AutoReply dispatch completed.",
                    {
                        leadId,

                        deliveryMode,

                        sendMode,

                        recipientEmail:
                            delivery
                                .recipientEmail,

                        internalCopyEmail:
                            delivery
                                .internalCopyEmail,

                        templateVersion:
                            message.templateVersion,
                    },
                );
            } catch (error) {
                await failAutoReplyDispatch({
                    leadRef,
                    taskToken,
                    error,
                });

                logger.error(
                    "AutoReply dispatch failed.",
                    {
                        leadId,
                        taskToken,
                        error,
                    },
                );

                throw error;
            }
        },
    );
