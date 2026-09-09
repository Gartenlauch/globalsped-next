import {
    randomUUID,
} from "node:crypto";

import {
    getFunctions,
} from "firebase-admin/functions";

import {
    FieldValue,
    Timestamp,
} from "firebase-admin/firestore";

import {
    logger,
} from "firebase-functions";

import {
    HttpsError,
    onCall,
    type CallableRequest,
} from "firebase-functions/v2/https";

import {
    onTaskDispatched,
} from "firebase-functions/tasks";

import * as admin from "firebase-admin";

import {
    requireAdmin,
} from "../admin/auth";

import {
    prepareInitialLeadAutomation,
} from "./state";

const REGION =
    "europe-west3";

const TASK_FUNCTION_NAME =
    "autoReplyLeadDryRunTask";

const TEST_EXECUTION_DELAY_SECONDS =
    20;

const TEST_MODE =
    "autoreply_dry_run";

type DryRunTaskPayload = {
    leadId: string;
    testId: string;
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

function isEmulatorRuntime():
    boolean {
    return (
        process.env
            .FUNCTIONS_EMULATOR ===
        "true" &&
        Boolean(
            process.env
                .FIRESTORE_EMULATOR_HOST,
        ) &&
        Boolean(
            process.env
                .CLOUD_TASKS_EMULATOR_HOST,
        )
    );
}

function requireEmulator():
    void {
    if (!isEmulatorRuntime()) {
        throw new HttpsError(
            "failed-precondition",
            "Diese Funktion ist ausschließlich im Firebase Emulator verfügbar.",
        );
    }
}

function requiredString(
    value: unknown,
    fieldName: string,
): string {
    if (
        typeof value !== "string" ||
        !value.trim()
    ) {
        throw new Error(
            `${fieldName} fehlt.`,
        );
    }

    return value.trim();
}

/*
 * Erzeugt einen rein lokalen,
 * synthetischen Testlead und reiht
 * eine lokale Task ein.
 *
 * KEINE Mail.
 * KEIN GA4.
 * KEIN Production Write.
 */
export const createAutoReplyLeadDryRun =
    onCall(
        {
            region: REGION,
            maxInstances: 10,
            cors: true,
            invoker: "public",
        },
        async (
            request:
                CallableRequest<unknown>,
        ) => {
            requireEmulator();

            const actor =
                requireAdmin(
                    request,
                );

            const receivedAt =
                new Date();

            const automation =
                await prepareInitialLeadAutomation(
                    receivedAt,
                );

            /*
             * Für diesen Integrations-Test
             * muss die lokale AutoReply-
             * Konfiguration aktiv und ein
             * Bearbeiter vorhanden sein.
             */
            if (
                automation.autoReply
                    .status !==
                "planned"
            ) {
                throw new HttpsError(
                    "failed-precondition",
                    automation.autoReply
                        .status ===
                        "disabled"
                        ? "Die lokale Autoantwort ist deaktiviert."
                        : "Es ist kein gültiger lokaler Bearbeiter konfiguriert.",
                );
            }

            const db =
                admin.firestore();

            const leadRef =
                db
                    .collection(
                        "leads",
                    )
                    .doc();

            const testId =
                randomUUID();

            /*
             * Die echte Business-Planung
             * bleibt im autoReply-State
             * erhalten.
             *
             * Nur die Dry-Run-Task wird
             * für den Test bereits nach
             * 20 Sekunden ausgeführt.
             */
            const executionScheduledFor =
                new Date(
                    Date.now() +
                    TEST_EXECUTION_DELAY_SECONDS *
                    1000,
                );

            const now =
                FieldValue
                    .serverTimestamp();

            await leadRef.set({
                leadId:
                    leadRef.id,

                source:
                    "emulator",

                leadTag:
                    "emulator",

                type:
                    "transport_request",

                status:
                    "new",

                priority:
                    "normal",

                isTest:
                    true,

                testMode:
                    TEST_MODE,

                testId,

                contact: {
                    company:
                        "GLOBALSPED Emulator Test",

                    contactPerson:
                        "AutoReply Dry Run",

                    email:
                        "autoreply-test@globalsped.invalid",

                    phone:
                        "Emulator",
                },

                assignment:
                    automation.assignment,

                autoReply: {
                    ...automation.autoReply,

                    status:
                        "planned",

                    emulatorDryRun: {
                        testId,

                        stage:
                            "planned",

                        createdByUid:
                            actor.uid,

                        executionScheduledFor:
                            Timestamp.fromDate(
                                executionScheduledFor,
                            ),

                        dispatchedAt:
                            null,

                        completedAt:
                            null,
                    },
                },

                createdAt:
                    now,

                updatedAt:
                    now,
            });

            try {
                const queue =
                    getFunctions()
                        .taskQueue<DryRunTaskPayload>(
                            `locations/${REGION}/functions/${TASK_FUNCTION_NAME}`,
                        );

                await queue.enqueue(
                    {
                        leadId:
                            leadRef.id,

                        testId,
                    },
                    {
                        scheduleTime:
                            executionScheduledFor,

                        dispatchDeadlineSeconds:
                            60,
                    },
                );

                await leadRef.update({
                    "autoReply.status":
                        "scheduled",

                    "autoReply.taskName":
                        `emulator:${testId}`,

                    "autoReply.emulatorDryRun.stage":
                        "scheduled",

                    updatedAt:
                        FieldValue
                            .serverTimestamp(),
                });

                logger.info(
                    "AutoReply emulator dry-run scheduled.",
                    {
                        leadId:
                            leadRef.id,

                        testId,

                        executionScheduledFor:
                            executionScheduledFor
                                .toISOString(),
                    },
                );

                return {
                    success: true,

                    leadId:
                        leadRef.id,

                    testId,

                    businessScheduledFor:
                        automation
                            .autoReply
                            .scheduledFor
                            ?.toDate()
                            .toISOString() ??
                        null,

                    executionScheduledFor:
                        executionScheduledFor
                            .toISOString(),

                    assignee:
                        automation.assignment
                            ?.assignee
                            .displayName ??
                        null,
                };
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Unbekannter Fehler.";

                await leadRef.update({
                    "autoReply.status":
                        "failed",

                    "autoReply.lastError":
                        message.slice(
                            0,
                            1000,
                        ),

                    "autoReply.emulatorDryRun.stage":
                        "enqueue_failed",

                    updatedAt:
                        FieldValue
                            .serverTimestamp(),
                });

                throw new HttpsError(
                    "internal",
                    "Die lokale Dry-Run-Task konnte nicht geplant werden.",
                );
            }
        },
    );

/*
 * Lokale Task-Ausführung.
 *
 * Der Handler verschickt ausdrücklich
 * KEINE Mail.
 */
export const autoReplyLeadDryRunTask =
    onTaskDispatched(
        {
            region: REGION,

            retryConfig: {
                maxAttempts: 2,
                minBackoffSeconds: 10,
            },

            rateLimits: {
                maxConcurrentDispatches: 5,
            },
        },
        async (request) => {
            /*
             * Zusätzlicher Schutz:
             * Sollte die Function jemals
             * versehentlich deployed sein,
             * beendet sie sich ohne Aktion.
             */
            if (!isEmulatorRuntime()) {
                logger.error(
                    "AutoReply dry-run task blocked outside emulator.",
                );

                return;
            }

            if (
                !isRecord(
                    request.data,
                )
            ) {
                throw new Error(
                    "Ungültige Dry-Run-Task-Daten.",
                );
            }

            const leadId =
                requiredString(
                    request.data.leadId,
                    "leadId",
                );

            const testId =
                requiredString(
                    request.data.testId,
                    "testId",
                );

            const db =
                admin.firestore();

            const leadRef =
                db
                    .collection(
                        "leads",
                    )
                    .doc(
                        leadId,
                    );

            let shouldProcess =
                false;

            await db.runTransaction(
                async (
                    transaction,
                ) => {
                    const snapshot =
                        await transaction.get(
                            leadRef,
                        );

                    if (
                        !snapshot.exists
                    ) {
                        throw new Error(
                            "Dry-Run-Lead existiert nicht.",
                        );
                    }

                    const data =
                        snapshot.data() ??
                        {};

                    if (
                        data.testMode !==
                        TEST_MODE
                    ) {
                        throw new Error(
                            "Der Lead ist kein AutoReply-Dry-Run.",
                        );
                    }

                    if (
                        data.testId !==
                        testId
                    ) {
                        throw new Error(
                            "Die Dry-Run-Test-ID stimmt nicht überein.",
                        );
                    }

                    const autoReply =
                        isRecord(
                            data.autoReply,
                        )
                            ? data.autoReply
                            : {};

                    /*
                     * Idempotenz:
                     * Eine erneut zugestellte
                     * Task darf den Test nicht
                     * doppelt ausführen.
                     */
                    if (
                        autoReply.status ===
                        "dry_run_completed"
                    ) {
                        return;
                    }

                    if (
                        autoReply.status !==
                        "scheduled"
                    ) {
                        throw new Error(
                            `Unerwarteter AutoReply-Status: ${String(
                                autoReply.status,
                            )}`,
                        );
                    }

                    transaction.update(
                        leadRef,
                        {
                            "autoReply.status":
                                "dispatching",

                            "autoReply.attemptCount":
                                FieldValue
                                    .increment(
                                        1,
                                    ),

                            "autoReply.emulatorDryRun.stage":
                                "dispatching",

                            "autoReply.emulatorDryRun.dispatchedAt":
                                FieldValue
                                    .serverTimestamp(),

                            updatedAt:
                                FieldValue
                                    .serverTimestamp(),
                        },
                    );

                    shouldProcess =
                        true;
                },
            );

            if (!shouldProcess) {
                return;
            }

            /*
             * Genau hier würde später
             * der echte Mailversand
             * stattfinden.
             *
             * Im Dry Run passiert bewusst
             * NICHTS.
             */

            await leadRef.update({
                "autoReply.status":
                    "dry_run_completed",

                "autoReply.emulatorDryRun.stage":
                    "dry_run_completed",

                "autoReply.emulatorDryRun.completedAt":
                    FieldValue
                        .serverTimestamp(),

                updatedAt:
                    FieldValue
                        .serverTimestamp(),
            });

            logger.info(
                "AutoReply emulator dry-run completed.",
                {
                    leadId,
                    testId,
                },
            );
        },
    );

/*
 * Status eines einzelnen Dry-Run-Leads
 * für die Admin-Oberfläche.
 */
export const getAutoReplyLeadDryRunStatus =
    onCall(
        {
            region: REGION,
            maxInstances: 10,
            cors: true,
            invoker: "public",
        },
        async (
            request:
                CallableRequest<unknown>,
        ) => {
            requireEmulator();
            requireAdmin(request);

            if (
                !isRecord(
                    request.data,
                )
            ) {
                throw new HttpsError(
                    "invalid-argument",
                    "leadId fehlt.",
                );
            }

            const leadIdValue =
                request.data.leadId;

            if (
                typeof leadIdValue !==
                "string" ||
                !leadIdValue.trim()
            ) {
                throw new HttpsError(
                    "invalid-argument",
                    "leadId fehlt.",
                );
            }

            const leadId =
                leadIdValue.trim();

            const snapshot =
                await admin
                    .firestore()
                    .collection(
                        "leads",
                    )
                    .doc(
                        leadId,
                    )
                    .get();

            if (!snapshot.exists) {
                throw new HttpsError(
                    "not-found",
                    "Der Dry-Run-Lead wurde nicht gefunden.",
                );
            }

            const data =
                snapshot.data() ??
                {};

            if (
                data.testMode !==
                TEST_MODE
            ) {
                throw new HttpsError(
                    "failed-precondition",
                    "Der Datensatz ist kein AutoReply-Dry-Run.",
                );
            }

            const autoReply =
                isRecord(
                    data.autoReply,
                )
                    ? data.autoReply
                    : {};

            const dryRun =
                isRecord(
                    autoReply
                        .emulatorDryRun,
                )
                    ? autoReply
                        .emulatorDryRun
                    : {};

            function timestampIso(
                value: unknown,
            ): string | null {
                return value instanceof
                    Timestamp
                    ? value
                        .toDate()
                        .toISOString()
                    : null;
            }

            return {
                success: true,

                leadId,

                status:
                    typeof autoReply
                        .status ===
                        "string"
                        ? autoReply
                            .status
                        : null,

                attemptCount:
                    typeof autoReply
                        .attemptCount ===
                        "number"
                        ? autoReply
                            .attemptCount
                        : 0,

                taskName:
                    typeof autoReply
                        .taskName ===
                        "string"
                        ? autoReply
                            .taskName
                        : null,

                stage:
                    typeof dryRun.stage ===
                        "string"
                        ? dryRun.stage
                        : null,

                executionScheduledFor:
                    timestampIso(
                        dryRun
                            .executionScheduledFor,
                    ),

                dispatchedAt:
                    timestampIso(
                        dryRun
                            .dispatchedAt,
                    ),

                completedAt:
                    timestampIso(
                        dryRun
                            .completedAt,
                    ),

                lastError:
                    typeof autoReply
                        .lastError ===
                        "string"
                        ? autoReply
                            .lastError
                        : null,
            };
        },
    );