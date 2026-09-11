import * as admin from "firebase-admin";
import type { AutoReplyScheduleSettings } from "./schedule";
export type AutoReplyRuntimeSettings =
    AutoReplyScheduleSettings & {
        sendInternalCopy: boolean;
        internalCopyEmail: string;
    };

const SETTINGS_COLLECTION = "settings";
const AUTO_REPLY_SETTINGS_ID = "autoReply";
const LEAD_MANAGEMENT_SETTINGS_ID = "leadManagement";

const FALLBACK_AUTO_REPLY_SETTINGS:
    AutoReplyRuntimeSettings = {
    enabled: false,
    delayMinutes: 10,
    timezone: "Europe/Berlin",
    businessDays: [
        1,
        2,
        3,
        4,
        5,
    ],
    businessStart: "08:00",
    businessEnd: "17:00",
    deferredSendTime: "08:30",
    sendInternalCopy: true,
    internalCopyEmail: "as@fair-it.de",
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

function validTime(
    value: unknown,
): value is string {
    return (
        typeof value === "string" &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(
            value,
        )
    );
}

export function normalizeAutoReplySettings(
    value: unknown,
): AutoReplyRuntimeSettings {
    if (!isRecord(value)) {
        return {
            ...FALLBACK_AUTO_REPLY_SETTINGS,
            businessDays: [
                ...FALLBACK_AUTO_REPLY_SETTINGS
                    .businessDays,
            ],
        };
    }

    function validEmail(
        value: unknown,
    ): value is string {
        return (
            typeof value === "string" &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                value.trim(),
            )
        );
    }

    const businessDays =
        Array.isArray(
            value.businessDays,
        )
            ? [
                ...new Set(
                    value.businessDays.filter(
                        (
                            day,
                        ): day is number =>
                            typeof day ===
                            "number" &&
                            Number.isInteger(
                                day,
                            ) &&
                            day >= 1 &&
                            day <= 7,
                    ),
                ),
            ].sort(
                (a, b) => a - b,
            )
            : [];

    return {
        enabled:
            typeof value.enabled ===
                "boolean"
                ? value.enabled
                : FALLBACK_AUTO_REPLY_SETTINGS
                    .enabled,

        delayMinutes:
            typeof value.delayMinutes ===
                "number" &&
                Number.isInteger(
                    value.delayMinutes,
                ) &&
                value.delayMinutes >= 0 &&
                value.delayMinutes <= 1440
                ? value.delayMinutes
                : FALLBACK_AUTO_REPLY_SETTINGS
                    .delayMinutes,

        timezone:
            typeof value.timezone ===
                "string" &&
                value.timezone.trim()
                ? value.timezone.trim()
                : FALLBACK_AUTO_REPLY_SETTINGS
                    .timezone,

        businessDays:
            businessDays.length > 0
                ? businessDays
                : [
                    ...FALLBACK_AUTO_REPLY_SETTINGS
                        .businessDays,
                ],

        businessStart:
            validTime(
                value.businessStart,
            )
                ? value.businessStart
                : FALLBACK_AUTO_REPLY_SETTINGS
                    .businessStart,

        businessEnd:
            validTime(
                value.businessEnd,
            )
                ? value.businessEnd
                : FALLBACK_AUTO_REPLY_SETTINGS
                    .businessEnd,

        deferredSendTime:
            validTime(
                value.deferredSendTime,
            )
                ? value.deferredSendTime
                : FALLBACK_AUTO_REPLY_SETTINGS
                    .deferredSendTime,
        sendInternalCopy:
            typeof value.sendInternalCopy ===
                "boolean"
                ? value.sendInternalCopy
                : FALLBACK_AUTO_REPLY_SETTINGS
                    .sendInternalCopy,

        internalCopyEmail:
            validEmail(
                value.internalCopyEmail,
            )
                ? value.internalCopyEmail
                    .trim()
                    .toLowerCase()
                : FALLBACK_AUTO_REPLY_SETTINGS
                    .internalCopyEmail,
    };
}

export async function readCurrentAutoReplySettings():
    Promise<AutoReplyRuntimeSettings> {
    const db =
        admin.firestore();

    const currentSnapshot =
        await db
            .collection(
                SETTINGS_COLLECTION,
            )
            .doc(
                AUTO_REPLY_SETTINGS_ID,
            )
            .get();

    if (currentSnapshot.exists) {
        return normalizeAutoReplySettings(
            currentSnapshot.data(),
        );
    }

    /*
     * Übergang für alte Installationen.
     */
    const legacySnapshot =
        await db
            .collection(
                SETTINGS_COLLECTION,
            )
            .doc(
                LEAD_MANAGEMENT_SETTINGS_ID,
            )
            .get();

    return normalizeAutoReplySettings(
        legacySnapshot.data()
            ?.autoReply,
    );
}