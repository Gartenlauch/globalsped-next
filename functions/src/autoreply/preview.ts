import {
    HttpsError,
    onCall,
    type CallableRequest,
} from "firebase-functions/v2/https";

import {
    requireAdmin,
} from "../admin/auth";

import {
    prepareInitialLeadAutomation,
} from "./state";

const REGION = "europe-west3";

function isRecord(
    value: unknown,
): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

function getPreviewDate(
    request: CallableRequest<unknown>,
): Date {
    if (!isRecord(request.data)) {
        return new Date();
    }

    const value =
        request.data.receivedAt;

    /*
     * Ohne receivedAt wird immer
     * der aktuelle Zeitpunkt verwendet.
     */
    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return new Date();
    }

    if (typeof value !== "string") {
        throw new HttpsError(
            "invalid-argument",
            "receivedAt muss ein ISO-Datumsstring sein.",
        );
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime(),
        )
    ) {
        throw new HttpsError(
            "invalid-argument",
            "receivedAt enthält kein gültiges Datum.",
        );
    }

    return date;
}

/*
 * Read-only Vorschau der AutoReply-Planung.
 *
 * Diese Function:
 *
 * - erzeugt KEINEN Lead
 * - schreibt NICHT in Firestore
 * - erzeugt KEINE Mail
 * - erzeugt KEINE Cloud Task
 * - löst KEIN GA4-Event aus
 *
 * Sie liest lediglich die aktuell
 * produktiv konfigurierten Settings
 * und den aktuellen Bearbeiter.
 */
export const previewAutoReplyPlan =
    onCall(
        {
            region: REGION,
            maxInstances: 10,
            cors: true,
            invoker: "public",
        },
        async (
            request: CallableRequest<unknown>,
        ) => {
            /*
             * Preview ausschließlich
             * für Administratoren.
             */
            requireAdmin(request);

            const receivedAt =
                getPreviewDate(
                    request,
                );

            const automation =
                await prepareInitialLeadAutomation(
                    receivedAt,
                );

            /*
             * Firestore Timestamp und
             * FieldValue nicht direkt
             * zurückgeben.
             *
             * Die Preview liefert ein
             * sauberes JSON-Ergebnis.
             */
            const assignment =
                automation.assignment
                    ? {
                        source:
                            automation
                                .assignment
                                .source,

                        assignee:
                            automation
                                .assignment
                                .assignee,
                    }
                    : null;

            const scheduledFor =
                automation.autoReply
                    .scheduledFor
                    ? automation
                        .autoReply
                        .scheduledFor
                        .toDate()
                        .toISOString()
                    : null;

            return {
                success: true,
                previewOnly: true,

                receivedAt:
                    receivedAt
                        .toISOString(),

                assignment,

                autoReply: {
                    enabled:
                        automation
                            .autoReply
                            .enabled,

                    status:
                        automation
                            .autoReply
                            .status,

                    scheduledFor,

                    scheduleReason:
                        automation
                            .autoReply
                            .scheduleReason,

                    settingsSnapshot:
                        automation
                            .autoReply
                            .settingsSnapshot,

                    attemptCount:
                        automation
                            .autoReply
                            .attemptCount,
                },

                sideEffects: {
                    firestoreWrite: false,
                    leadCreated: false,
                    mailCreated: false,
                    cloudTaskCreated: false,
                    ga4EventCreated: false,
                },
            };
        },
    );