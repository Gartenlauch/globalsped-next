import { randomUUID } from "node:crypto";

import { GoogleAuth } from "google-auth-library";
import { getFunctions } from "firebase-admin/functions";
import { logger } from "firebase-functions";
import {
    HttpsError,
    onCall,
    type CallableRequest,
} from "firebase-functions/v2/https";
import {
    onTaskDispatched,
} from "firebase-functions/tasks";
import * as admin from "firebase-admin";

import { requireAdmin } from "../admin/auth";

const REGION = "europe-west3";
import { Timestamp, FieldValue } from "firebase-admin/firestore";


const TASK_FUNCTION_NAME =
    "autoReplyTaskDiagnostic";

const SETTINGS_COLLECTION =
    "settings";

const DIAGNOSTIC_DOCUMENT_ID =
    "autoReplyTaskDiagnostic";

const TEST_DELAY_SECONDS = 60;


type DiagnosticTaskPayload = {
    testId: string;
    requestedByUid: string;
    requestedAt: string;
    scheduledFor: string;
};

let googleAuth:
    GoogleAuth | null = null;

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
    fieldName: string,
): string {
    if (
        typeof value !== "string" ||
        !value.trim()
    ) {
        throw new HttpsError(
            "invalid-argument",
            `${fieldName} fehlt.`,
        );
    }

    return value.trim();
}

async function getFunctionUrl(
    name: string,
    location: string,
): Promise<string> {
    if (!googleAuth) {
        googleAuth =
            new GoogleAuth({
                scopes:
                    "https://www.googleapis.com/auth/cloud-platform",
            });
    }

    const projectId =
        await googleAuth
            .getProjectId();

    const url =
        "https://cloudfunctions.googleapis.com/v2beta/" +
        `projects/${projectId}/locations/${location}/functions/${name}`;

    const client =
        await googleAuth
            .getClient();

    const response =
        await client.request<{
            serviceConfig?: {
                uri?: string;
            };
        }>({
            url,
        });

    const uri =
        response.data
            ?.serviceConfig
            ?.uri;

    if (!uri) {
        throw new Error(
            `Keine URI für Function ${name} gefunden.`,
        );
    }

    return uri;
}

function timestampToIso(
    value: unknown,
): string | null {
    if (
        value instanceof Timestamp
    ) {
        return value
            .toDate()
            .toISOString();
    }

    return null;
}

/*
 * Cloud Task selbst.
 *
 * Noch KEIN Mailversand.
 * Noch KEINE Lead-Verarbeitung.
 *
 * Diese Function bestätigt ausschließlich,
 * dass eine geplante Cloud Task tatsächlich
 * ausgeführt wurde.
 */
export const autoReplyTaskDiagnostic =
    onTaskDispatched(
        {
            region: REGION,

            retryConfig: {
                maxAttempts: 3,
                minBackoffSeconds: 30,
            },

            rateLimits: {
                maxConcurrentDispatches: 5,
            },
        },
        async (request) => {
            if (
                !isRecord(
                    request.data,
                )
            ) {
                throw new HttpsError(
                    "invalid-argument",
                    "Ungültige Task-Daten.",
                );
            }

            const testId =
                requiredString(
                    request.data.testId,
                    "testId",
                );

            const requestedByUid =
                requiredString(
                    request.data
                        .requestedByUid,
                    "requestedByUid",
                );

            const requestedAt =
                requiredString(
                    request.data
                        .requestedAt,
                    "requestedAt",
                );

            const scheduledFor =
                requiredString(
                    request.data
                        .scheduledFor,
                    "scheduledFor",
                );

            const now = FieldValue.serverTimestamp();

            await admin
                .firestore()
                .collection(
                    SETTINGS_COLLECTION,
                )
                .doc(
                    DIAGNOSTIC_DOCUMENT_ID,
                )
                .set(
                    {
                        testId,

                        status: "dispatched",

                        requestedByUid,
                        requestedAt,
                        scheduledFor,

                        dispatchedAt:
                            now,

                        lastError:
                            null,

                        updatedAt:
                            now,
                    },
                    {
                        merge: true,
                    },
                );

            logger.info(
                "AutoReply Cloud Task diagnostic dispatched.",
                {
                    testId,
                    scheduledFor,
                },
            );
        },
    );

/*
 * Admin-only:
 * Plant eine echte Cloud Task,
 * aber ausschließlich für den
 * Diagnose-Endpunkt.
 */
export const scheduleAutoReplyTaskDiagnostic =
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
            const actor =
                requireAdmin(
                    request,
                );

            const testId =
                randomUUID();

            const requestedAt =
                new Date();

            const scheduledFor =
                new Date(
                    requestedAt
                        .getTime() +
                    TEST_DELAY_SECONDS *
                    1000,
                );

            const db =
                admin.firestore();

            const diagnosticRef =
                db
                    .collection(
                        SETTINGS_COLLECTION,
                    )
                    .doc(
                        DIAGNOSTIC_DOCUMENT_ID,
                    );

            const now = FieldValue.serverTimestamp();

            await diagnosticRef.set(
                {
                    testId,

                    status: "scheduled",

                    requestedByUid:
                        actor.uid,

                    requestedAt:
                        requestedAt
                            .toISOString(),

                    scheduledFor:
                        scheduledFor
                            .toISOString(),

                    dispatchedAt:
                        null,

                    lastError:
                        null,

                    createdAt:
                        now,

                    updatedAt:
                        now,
                },
                {
                    merge: true,
                },
            );

            try {
                const targetUri =
                    await getFunctionUrl(
                        TASK_FUNCTION_NAME,
                        REGION,
                    );

                /*
                 * Region explizit angeben.
                 * Ohne Region würde der Admin
                 * SDK standardmäßig
                 * us-central1 annehmen.
                 */
                const queue =
                    getFunctions()
                        .taskQueue<
                            DiagnosticTaskPayload
                        >(
                            `locations/${REGION}/functions/${TASK_FUNCTION_NAME}`,
                        );

                await queue.enqueue(
                    {
                        testId,

                        requestedByUid:
                            actor.uid,

                        requestedAt:
                            requestedAt
                                .toISOString(),

                        scheduledFor:
                            scheduledFor
                                .toISOString(),
                    },
                    {
                        scheduleTime:
                            scheduledFor,

                        dispatchDeadlineSeconds:
                            60,

                        uri:
                            targetUri,
                    },
                );

                logger.info(
                    "AutoReply diagnostic task scheduled.",
                    {
                        testId,
                        scheduledFor:
                            scheduledFor
                                .toISOString(),
                    },
                );

                return {
                    success: true,
                    testId,

                    scheduledFor:
                        scheduledFor
                            .toISOString(),

                    delaySeconds:
                        TEST_DELAY_SECONDS,
                };
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Unbekannter Fehler.";

                await diagnosticRef.set(
                    {
                        status: "enqueue_failed",

                        lastError:
                            message.slice(
                                0,
                                1000,
                            ),

                        updatedAt: FieldValue.serverTimestamp(),
                    },
                    {
                        merge: true,
                    },
                );

                logger.error(
                    "AutoReply diagnostic task could not be scheduled.",
                    {
                        testId,
                        error,
                    },
                );

                throw new HttpsError(
                    "internal",
                    "Die Cloud Task konnte nicht geplant werden.",
                );
            }
        },
    );

/*
 * Admin-only:
 * Status des letzten Diagnose-Tests.
 */
export const getAutoReplyTaskDiagnostic =
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
            requireAdmin(
                request,
            );

            const snapshot =
                await admin
                    .firestore()
                    .collection(
                        SETTINGS_COLLECTION,
                    )
                    .doc(
                        DIAGNOSTIC_DOCUMENT_ID,
                    )
                    .get();

            if (!snapshot.exists) {
                return {
                    success: true,
                    diagnostic: null,
                };
            }

            const data =
                snapshot.data() ?? {};

            return {
                success: true,

                diagnostic: {
                    testId:
                        typeof data.testId ===
                            "string"
                            ? data.testId
                            : null,

                    status:
                        typeof data.status ===
                            "string"
                            ? data.status
                            : null,

                    requestedAt:
                        typeof data
                            .requestedAt ===
                            "string"
                            ? data.requestedAt
                            : null,

                    scheduledFor:
                        typeof data
                            .scheduledFor ===
                            "string"
                            ? data.scheduledFor
                            : null,

                    dispatchedAt:
                        timestampToIso(
                            data.dispatchedAt,
                        ),

                    lastError:
                        typeof data
                            .lastError ===
                            "string"
                            ? data.lastError
                            : null,
                },
            };
        },
    );