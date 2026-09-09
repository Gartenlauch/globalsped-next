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
    type AutoReplyScheduleSettings,
} from "./schedule";

import {
    readCurrentAutoReplySettings,
} from "./settings";

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

    manualSendRequestedAt: null;
    manualSendRequestedByUid: null;

    sentAt: null;

    cancelledAt: null;
    cancelledReason: null;

    attemptCount: number;
    lastError: string | null;
};

export type InitialLeadAutomation = {
    assignment:
    LeadAssignmentSnapshot | null;

    autoReply:
    LeadAutoReplyState;
};

function createSettingsSnapshot(
    settings:
        AutoReplyScheduleSettings,
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
    };
}

function createBaseState(
    receivedAt: Date,
    settings:
        AutoReplyScheduleSettings,
): Pick<
    LeadAutoReplyState,
    | "receivedAt"
    | "plannedAt"
    | "settingsSnapshot"
    | "taskName"
    | "manualSendRequestedAt"
    | "manualSendRequestedByUid"
    | "sentAt"
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

        manualSendRequestedAt:
            null,

        manualSendRequestedByUid:
            null,

        sentAt: null,

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