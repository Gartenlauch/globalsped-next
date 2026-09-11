import {
    FieldValue,
    Timestamp,
} from "firebase-admin/firestore";

import {
    getCurrentLeadAssignmentSnapshot,
    type LeadAssignmentSnapshot,
} from "../admin/lead-assignment";

import {
    calculateAutoReplySchedule,
    type AutoReplyScheduleReason,
} from "./schedule";

import {
    readCurrentAutoReplySettings,
    type AutoReplyRuntimeSettings,
} from "./settings";

export type AutoReplySendMode =
    | "automatic"
    | "manual";

type FirestoreTimeValue =
    | Timestamp
    | FieldValue
    | null;

export type AutoReplyStatus =
    | "disabled"
    | "blocked_no_assignee"
    | "planned"
    | "scheduled"
    | "dispatching"
    | "sent"
    | "cancelled"
    | "failed"
    | "dry_run_completed";

type AutoReplySettingsSnapshot = {
    delayMinutes: number;
    timezone: string;
    businessDays: number[];
    businessStart: string;
    businessEnd: string;
    deferredSendTime: string;

    sendInternalCopy: boolean;
    internalCopyEmail: string;
};

export type LeadAutoReplyState = {
    enabled: boolean;

    status: AutoReplyStatus;

    receivedAt: Timestamp;

    plannedAt: FieldValue;

    scheduledFor: Timestamp | null;

    scheduleReason:
    AutoReplyScheduleReason | null;

    settingsSnapshot:
    AutoReplySettingsSnapshot;

    taskName: string | null;
    taskToken: string | null;

    scheduledAt:
    FirestoreTimeValue;

    dispatchStartedAt:
    FirestoreTimeValue;

    manualSendRequestedAt:
    FirestoreTimeValue;

    manualSendRequestedByUid:
    string | null;

    sentAt:
    FirestoreTimeValue;

    sentMode:
    AutoReplySendMode | null;

    sentByUid:
    string | null;

    recipientEmail:
    string | null;

    internalCopyEmail:
    string | null;

    templateVersion:
    string | null;

    providerMessageId:
    string | null;

    failedAt:
    FirestoreTimeValue;

    cancelledAt:
    FirestoreTimeValue;

    cancelledReason:
    string | null;

    attemptCount: number;

    lastError:
    string | null;
};

export type InitialLeadAutomation = {
    assignment:
    LeadAssignmentSnapshot | null;

    autoReply:
    LeadAutoReplyState;
};

function createSettingsSnapshot(
    settings: AutoReplyRuntimeSettings,
): AutoReplySettingsSnapshot {
    return {
        delayMinutes:
            settings.delayMinutes,

        timezone:
            settings.timezone,

        businessDays: [
            ...settings.businessDays,
        ],

        businessStart:
            settings.businessStart,

        businessEnd:
            settings.businessEnd,

        deferredSendTime:
            settings.deferredSendTime,
        sendInternalCopy:

            settings.sendInternalCopy,

        internalCopyEmail:
            settings.internalCopyEmail,
    };
}

function createBaseState(
    receivedAt: Date,
    settings:
        AutoReplyRuntimeSettings,
): Pick<
    LeadAutoReplyState,
    | "receivedAt"
    | "plannedAt"
    | "settingsSnapshot"
    | "taskName"
    | "taskToken"
    | "scheduledAt"
    | "dispatchStartedAt"
    | "manualSendRequestedAt"
    | "manualSendRequestedByUid"
    | "sentAt"
    | "sentMode"
    | "sentByUid"
    | "recipientEmail"
    | "internalCopyEmail"
    | "templateVersion"
    | "providerMessageId"
    | "failedAt"
    | "cancelledAt"
    | "cancelledReason"
    | "attemptCount"
    | "lastError"
> {
    return {
        receivedAt: Timestamp.fromDate(receivedAt),

        plannedAt: FieldValue.serverTimestamp(),

        settingsSnapshot:
            createSettingsSnapshot(
                settings,
            ),

        taskName: null,
        taskToken: null,

        scheduledAt: null,
        dispatchStartedAt: null,

        manualSendRequestedAt:
            null,

        manualSendRequestedByUid:
            null,

        sentAt: null,
        sentMode: null,
        sentByUid: null,

        recipientEmail:
            null,

        internalCopyEmail:
            settings.sendInternalCopy
                ? settings.internalCopyEmail
                : null,

        templateVersion:
            null,

        providerMessageId:
            null,

        failedAt: null,

        cancelledAt: null,
        cancelledReason: null,

        attemptCount: 0,
        lastError: null,
    };
}

export async function prepareInitialLeadAutomation(
    receivedAt = new Date(),
): Promise<InitialLeadAutomation> {
    /*
     * Genau einmal die aktuell im
     * Admin hinterlegten Firestore-
     * Einstellungen lesen.
     */
    const settings =
        await readCurrentAutoReplySettings();

    /*
     * AutoReply deaktiviert:
     *
     * - kein Bearbeiter
     * - kein geplanter Versand
     */
    if (!settings.enabled) {
        return {
            assignment: null,

            autoReply: {
                ...createBaseState(
                    receivedAt,
                    settings,
                ),

                enabled: false,
                status: "disabled",

                scheduledFor: null,
                scheduleReason: null,
            },
        };
    }

    /*
     * AutoReply ist aktiv.
     * Jetzt aktuellen Bearbeiter
     * als unveränderlichen Snapshot
     * laden.
     */
    const assignment =
        await getCurrentLeadAssignmentSnapshot();

    /*
     * AutoReply aktiv, aber kein
     * gültiger Bearbeiter vorhanden:
     *
     * Lead wird trotzdem gespeichert,
     * es darf aber nichts automatisch
     * versendet werden.
     */
    if (!assignment) {
        return {
            assignment: null,

            autoReply: {
                ...createBaseState(
                    receivedAt,
                    settings,
                ),

                enabled: true,

                status:
                    "blocked_no_assignee",

                scheduledFor: null,
                scheduleReason: null,
            },
        };
    }

    /*
     * Bearbeiter vorhanden:
     * Versandzeitpunkt berechnen.
     */
    const decision =
        calculateAutoReplySchedule(
            receivedAt,
            settings,
        );

    /*
     * Da settings.enabled oben bereits
     * geprüft wurde, wäre eine disabled
     * Decision hier ein inkonsistenter
     * Zustand.
     */
    if (!decision.enabled) {
        throw new Error(
            "AutoReply ist aktiviert, aber die Zeitplanung wurde als deaktiviert zurückgegeben.",
        );
    }

    return {
        assignment,

        autoReply: {
            ...createBaseState(
                receivedAt,
                settings,
            ),

            enabled: true,
            status: "planned",

            scheduledFor: Timestamp
                .fromDate(
                    decision.scheduledFor,
                ),

            scheduleReason:
                decision.reason,
        },
    };
}