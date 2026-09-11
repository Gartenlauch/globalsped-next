import {
    HttpsError,
    onCall,
    type CallableRequest,
} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import {
    requireAdmin,
    requireStaff,
} from "./auth";

const REGION = "europe-west3";

const SETTINGS_COLLECTION =
    "settings";

const AUTO_REPLY_SETTINGS_ID =
    "autoReply";

const LEAD_MANAGEMENT_SETTINGS_ID =
    "leadManagement";

type AutoReplySettings = {
    enabled: boolean;
    delayMinutes: number;
    timezone: string;
    businessDays: number[];
    businessStart: string;
    businessEnd: string;
    deferredSendTime: string;
    sendInternalCopy: boolean;
    internalCopyEmail: string;
};

const DEFAULT_SETTINGS:
    AutoReplySettings = {
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

    internalCopyEmail:
        "as@fair-it.net",
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

function parseBusinessDays(
    value: unknown,
): number[] {
    if (!Array.isArray(value)) {
        throw new HttpsError(
            "invalid-argument",
            "Die Geschäftstage sind ungültig.",
        );
    }

    const days =
        [
            ...new Set(
                value.filter(
                    (day): day is number =>
                        typeof day === "number" &&
                        Number.isInteger(day) &&
                        day >= 1 &&
                        day <= 7,
                ),
            ),
        ].sort(
            (a, b) => a - b,
        );

    if (!days.length) {
        throw new HttpsError(
            "invalid-argument",
            "Mindestens ein Geschäftstag muss aktiviert sein.",
        );
    }

    return days;
}

function normalizeSettings(
    value: unknown,
): AutoReplySettings {
    if (!isRecord(value)) {
        return {
            ...DEFAULT_SETTINGS,
        };
    }

    const days =
        Array.isArray(
            value.businessDays,
        ) ?
            value.businessDays.filter(
                (day): day is number =>
                    typeof day ===
                    "number" &&
                    Number.isInteger(day) &&
                    day >= 1 &&
                    day <= 7,
            ) :
            [];

    return {
        enabled:
            typeof value.enabled ===
                "boolean" ?
                value.enabled :
                DEFAULT_SETTINGS.enabled,

        delayMinutes:
            typeof value.delayMinutes ===
                "number" &&
                Number.isInteger(
                    value.delayMinutes,
                ) &&
                value.delayMinutes >= 0 &&
                value.delayMinutes <= 1440 ?
                value.delayMinutes :
                DEFAULT_SETTINGS
                    .delayMinutes,

        timezone:
            typeof value.timezone ===
                "string" &&
                value.timezone.trim() ?
                value.timezone.trim() :
                DEFAULT_SETTINGS.timezone,

        businessDays:
            days.length ?
                [...new Set(days)].sort(
                    (a, b) => a - b,
                ) :
                [
                    ...DEFAULT_SETTINGS
                        .businessDays,
                ],

        businessStart:
            validTime(
                value.businessStart,
            ) ?
                value.businessStart :
                DEFAULT_SETTINGS
                    .businessStart,

        businessEnd:
            validTime(
                value.businessEnd,
            ) ?
                value.businessEnd :
                DEFAULT_SETTINGS
                    .businessEnd,

        deferredSendTime:
            validTime(
                value.deferredSendTime,
            ) ?
                value.deferredSendTime :
                DEFAULT_SETTINGS
                    .deferredSendTime,
        sendInternalCopy:
            typeof value.sendInternalCopy ===
                "boolean"
                ? value.sendInternalCopy
                : DEFAULT_SETTINGS
                    .sendInternalCopy,

        internalCopyEmail:
            validEmail(
                value.internalCopyEmail,
            )
                ? value.internalCopyEmail
                    .trim()
                    .toLowerCase()
                : DEFAULT_SETTINGS
                    .internalCopyEmail,
    };
}

export const getAutoReplySettings =
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
            requireStaff(request);

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

            if (
                currentSnapshot.exists
            ) {
                return {
                    success: true,
                    settings:
                        normalizeSettings(
                            currentSnapshot.data(),
                        ),
                };
            }

            /*
             * Übergang:
             * Falls die neue Struktur noch
             * nicht existiert, lesen wir die
             * bisherige Konfiguration aus
             * settings/leadManagement.
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

            return {
                success: true,
                settings:
                    normalizeSettings(
                        legacySnapshot.data()
                            ?.autoReply,
                    ),
            };
        },
    );

export const updateAutoReplySettings =
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
                requireAdmin(request);

            const data =
                isRecord(request.data) ?
                    request.data :
                    {};

            const enabled =
                data.enabled;

            const delayMinutes =
                data.delayMinutes;

            const businessStart =
                data.businessStart;

            const businessEnd =
                data.businessEnd;

            const deferredSendTime =
                data.deferredSendTime;

            const sendInternalCopy =
                data.sendInternalCopy;

            const internalCopyEmail =
                data.internalCopyEmail;

            if (
                typeof enabled !==
                "boolean"
            ) {
                throw new HttpsError(
                    "invalid-argument",
                    "Der AutoReply-Status ist ungültig.",
                );
            }

            if (
                typeof delayMinutes !==
                "number" ||
                !Number.isInteger(
                    delayMinutes,
                ) ||
                delayMinutes < 0 ||
                delayMinutes > 1440
            ) {
                throw new HttpsError(
                    "invalid-argument",
                    "Die Verzögerung muss zwischen 0 und 1440 Minuten liegen.",
                );
            }

            if (
                !validTime(
                    businessStart,
                ) ||
                !validTime(
                    businessEnd,
                ) ||
                !validTime(
                    deferredSendTime,
                )
            ) {
                throw new HttpsError(
                    "invalid-argument",
                    "Eine der Uhrzeiten ist ungültig.",
                );
            }

            if (
                businessStart >=
                businessEnd
            ) {
                throw new HttpsError(
                    "invalid-argument",
                    "Das Ende der Geschäftszeit muss nach dem Beginn liegen.",
                );
            }
            if (
                typeof sendInternalCopy !==
                "boolean"
            ) {
                throw new HttpsError(
                    "invalid-argument",
                    "Die Einstellung für die interne Kopie ist ungültig.",
                );
            }

            if (
                !validEmail(
                    internalCopyEmail,
                )
            ) {
                throw new HttpsError(
                    "invalid-argument",
                    "Die E-Mail-Adresse für die interne Kopie ist ungültig.",
                );
            }

            const settings:
                AutoReplySettings = {
                enabled,
                delayMinutes,
                timezone: "Europe/Berlin",
                businessDays: parseBusinessDays(data.businessDays),
                businessStart,
                businessEnd,
                deferredSendTime,
                sendInternalCopy,
                internalCopyEmail: internalCopyEmail.trim().toLowerCase(),
            };

            const now =
                FieldValue
                    .serverTimestamp();

            await admin
                .firestore()
                .collection(
                    SETTINGS_COLLECTION,
                )
                .doc(
                    AUTO_REPLY_SETTINGS_ID,
                )
                .set(
                    {
                        ...settings,

                        updatedAt:
                            now,

                        updatedByUid:
                            actor.uid,
                    },
                    {
                        merge: true,
                    },
                );

            return {
                success: true,
                settings,
            };
        },
    );