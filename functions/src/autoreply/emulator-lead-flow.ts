import {
    randomUUID,
} from "node:crypto";

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

import * as admin from "firebase-admin";

import {
    requireAdmin,
} from "../admin/auth";

import {
    prepareInitialLeadAutomation,
} from "./state";

import {
    scheduleAutoReplyTaskForLead,
} from "./task-scheduler";

const REGION =
    "europe-west3";

const TEST_EXECUTION_DELAY_SECONDS =
    20;

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

/*
 * Erzeugt einen rein lokalen,
 * synthetischen Testlead und reiht
 * ihn über den produktionsnahen
 * AutoReply-Scheduler ein.
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
             * gültiger Bearbeiter vorhanden
             * sein.
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
             * bleibt im AutoReply-State
             * erhalten.
             *
             * Nur die tatsächliche
             * Dry-Run-Task wird lokal
             * bereits nach 20 Sekunden
             * ausgeführt.
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

                locale:
                    "de",

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
                /*
                 * Ab hier wird derselbe
                 * Scheduler verwendet, der
                 * später auch echte Leads
                 * planen wird.
                 */
                const scheduled =
                    await scheduleAutoReplyTaskForLead({
                        leadRef,

                        deliveryMode:
                            "dry_run",

                        scheduleTimeOverride:
                            executionScheduledFor,
                    });

                await leadRef.update({
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
                            scheduled
                                .executionScheduledFor
                                .toISOString(),

                        taskToken:
                            scheduled
                                .taskToken,
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
                        scheduled
                            .executionScheduledFor
                            .toISOString(),

                    assignee:
                        automation.assignment
                            ?.assignee
                            .displayName ??
                        null,
                };
            } catch (error) {
                /*
                 * Der Scheduler selbst setzt
                 * bei einem Enqueue-Fehler
                 * bereits den AutoReply-State
                 * auf "failed".
                 *
                 * Hier ergänzen wir nur noch
                 * die Dry-Run-spezifischen
                 * Diagnoseinformationen.
                 */
                const message =
                    error instanceof Error
                        ? error.message
                        : "Unbekannter Fehler.";

                await leadRef.update({
                    "autoReply.emulatorDryRun.stage":
                        "enqueue_failed",

                    "autoReply.lastError":
                        message.slice(
                            0,
                            1000,
                        ),

                    updatedAt:
                        FieldValue
                            .serverTimestamp(),
                });

                logger.error(
                    "AutoReply emulator dry-run could not be scheduled.",
                    {
                        leadId:
                            leadRef.id,

                        testId,

                        error,
                    },
                );

                throw new HttpsError(
                    "internal",
                    "Die lokale Dry-Run-Task konnte nicht geplant werden.",
                );
            }
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

            requireAdmin(
                request,
            );

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