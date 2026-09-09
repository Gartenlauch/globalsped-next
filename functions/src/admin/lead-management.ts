import type { UserRecord } from "firebase-admin/auth";
import { logger } from "firebase-functions";
import {
    HttpsError,
    onCall,
    type CallableRequest,
} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {
    requireAdmin,
    requireStaff,
    resolveStaffRole,
} from "./auth";
const REGION = "europe-west3";
import { FieldValue } from "firebase-admin/firestore";

const ADMIN_USERS_COLLECTION = "adminUsers";
const SETTINGS_COLLECTION = "settings";
const LEAD_MANAGEMENT_SETTINGS_ID = "leadManagement";

type AutoReplySettings = {
    enabled: boolean;
    delayMinutes: number;
    timezone: string;
    businessDays: number[];
    businessStart: string;
    businessEnd: string;
    deferredSendTime: string;
};

type AdminUserProfile = {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    phone: string;

    salutationDe:
    string | null;

    salutationEn:
    string | null;

    active: boolean;
    canBeAssignee: boolean;
};
const DEFAULT_AUTO_REPLY_SETTINGS: AutoReplySettings = {
    enabled: true,
    delayMinutes: 10,
    timezone: "Europe/Berlin",

    // ISO-Wochentage:
    // 1 = Montag
    // 7 = Sonntag
    businessDays: [1, 2, 3, 4, 5],

    businessStart: "08:00",
    businessEnd: "17:00",

    // Außerhalb der Geschäftszeiten wird später
    // auf den nächsten zulässigen Werktag verschoben.
    deferredSendTime: "08:30",
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

function normalizeOptionalString(
    value: unknown,
    maxLength: number,
): string | null {
    if (typeof value !== "string") {
        return null;
    }

    const normalized = value.trim();

    if (!normalized) {
        return null;
    }

    return normalized.slice(0, maxLength);
}

function normalizeRequiredString(
    value: unknown,
    fieldName: string,
    maxLength: number,
): string {
    const normalized = normalizeOptionalString(
        value,
        maxLength,
    );

    if (!normalized) {
        throw new HttpsError(
            "invalid-argument",
            `${fieldName} fehlt oder ist ungültig.`,
        );
    }

    return normalized;
}

function isValidEmail(
    value: string,
): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeSalutationDe(
    value: unknown,
): string | null {
    const normalized =
        normalizeOptionalString(value, 20);

    if (!normalized) {
        return null;
    }

    if (
        normalized !== "Herr" &&
        normalized !== "Frau"
    ) {
        throw new HttpsError(
            "invalid-argument",
            "Die deutsche Anrede ist ungültig.",
        );
    }

    return normalized;
}

function normalizeSalutationEn(
    value: unknown,
): string | null {
    const normalized =
        normalizeOptionalString(value, 20);

    if (!normalized) {
        return null;
    }

    if (
        normalized !== "Mr" &&
        normalized !== "Ms"
    ) {
        throw new HttpsError(
            "invalid-argument",
            "Die englische Anrede ist ungültig.",
        );
    }

    return normalized;
}

function getRequestData(
    request: CallableRequest<unknown>,
): Record<string, unknown> {
    if (!isRecord(request.data)) {
        return {};
    }

    return request.data;
}

async function listStaffAuthUsers():
    Promise<UserRecord[]> {
    const users: UserRecord[] = [];

    let pageToken:
        string | undefined;

    do {
        const result =
            await admin
                .auth()
                .listUsers(
                    1000,
                    pageToken,
                );

        users.push(
            ...result.users.filter(
                (user) => {
                    if (user.disabled) {
                        return false;
                    }

                    return (
                        resolveStaffRole(
                            user.customClaims ??
                            {},
                        ) !== null
                    );
                },
            ),
        );

        pageToken =
            result.pageToken;
    } while (pageToken);

    return users;
}

async function readAdminUserProfile(
    uid: string,
): Promise<AdminUserProfile | null> {
    const snapshot = await admin
        .firestore()
        .collection(ADMIN_USERS_COLLECTION)
        .doc(uid)
        .get();

    if (!snapshot.exists) {
        return null;
    }

    const data = snapshot.data();

    if (!data) {
        return null;
    }

    return {
        firstName:
            normalizeOptionalString(
                data.firstName,
                100,
            ) ?? "",

        lastName:
            normalizeOptionalString(
                data.lastName,
                100,
            ) ?? "",

        displayName:
            normalizeOptionalString(
                data.displayName,
                200,
            ) ?? "",

        email:
            normalizeOptionalString(
                data.email,
                320,
            ) ?? "",

        phone:
            normalizeOptionalString(
                data.phone,
                100,
            ) ?? "",

        salutationDe:
            normalizeOptionalString(
                data.salutationDe,
                20,
            ),

        salutationEn:
            normalizeOptionalString(
                data.salutationEn,
                20,
            ),

        active: data.active !== false,
        canBeAssignee: data.canBeAssignee !== false,
    };
}

function readAutoReplySettings(
    value: unknown,
): AutoReplySettings {
    if (!isRecord(value)) {
        return {
            ...DEFAULT_AUTO_REPLY_SETTINGS,
        };
    }

    const parsedBusinessDays =
        Array.isArray(value.businessDays)
            ? value.businessDays.filter(
                (day): day is number =>
                    typeof day === "number" &&
                    Number.isInteger(day) &&
                    day >= 1 &&
                    day <= 7,
            )
            : [];

    return {
        enabled:
            typeof value.enabled === "boolean"
                ? value.enabled
                : DEFAULT_AUTO_REPLY_SETTINGS.enabled,

        delayMinutes:
            typeof value.delayMinutes === "number" &&
                Number.isInteger(value.delayMinutes) &&
                value.delayMinutes >= 0
                ? value.delayMinutes
                : DEFAULT_AUTO_REPLY_SETTINGS.delayMinutes,

        timezone:
            normalizeOptionalString(
                value.timezone,
                100,
            ) ??
            DEFAULT_AUTO_REPLY_SETTINGS.timezone,

        businessDays:
            parsedBusinessDays.length > 0
                ? parsedBusinessDays
                : [
                    ...DEFAULT_AUTO_REPLY_SETTINGS
                        .businessDays,
                ],

        businessStart:
            normalizeOptionalString(
                value.businessStart,
                20,
            ) ??
            DEFAULT_AUTO_REPLY_SETTINGS.businessStart,

        businessEnd:
            normalizeOptionalString(
                value.businessEnd,
                20,
            ) ??
            DEFAULT_AUTO_REPLY_SETTINGS.businessEnd,

        deferredSendTime:
            normalizeOptionalString(
                value.deferredSendTime,
                20,
            ) ??
            DEFAULT_AUTO_REPLY_SETTINGS
                .deferredSendTime,
    };
}

/*
 * Lädt:
 * - alle Firebase-Auth-Benutzer mit admin=true
 * - zugehörige Firestore-Profile
 * - aktuelle Lead-/AutoReply-Konfiguration
 */
export const getLeadManagementConfig =
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
            requireStaff(request);

            const db = admin.firestore();

            const [
                authUsers,
                settingsSnapshot,
                autoReplySnapshot,
            ] = await Promise.all([
                listStaffAuthUsers(),

                db
                    .collection(
                        SETTINGS_COLLECTION,
                    )
                    .doc(
                        LEAD_MANAGEMENT_SETTINGS_ID,
                    )
                    .get(),

                db
                    .collection(
                        SETTINGS_COLLECTION,
                    )
                    .doc("autoReply")
                    .get(),
            ]);

            const loadedUsers =
                await Promise.all(
                    authUsers.map(
                        async (user) => {
                            const profile =
                                await readAdminUserProfile(
                                    user.uid,
                                );

                            return {
                                uid: user.uid,

                                authEmail:
                                    user.email ?? null,

                                authDisplayName:
                                    user.displayName ?? null,

                                disabled:
                                    user.disabled,

                                profile,
                            };
                        },
                    ),
                );

            const users =
                loadedUsers.filter(
                    (user) =>
                        user.profile !== null &&
                        user.profile.active &&
                        user.profile
                            .canBeAssignee,
                );

            users.sort((a, b) => {
                const nameA =
                    a.profile?.displayName ||
                    a.authDisplayName ||
                    a.authEmail ||
                    "";

                const nameB =
                    b.profile?.displayName ||
                    b.authDisplayName ||
                    b.authEmail ||
                    "";

                return nameA.localeCompare(
                    nameB,
                    "de",
                );
            });

            const settingsData =
                settingsSnapshot.data() ?? {};

            return {
                success: true,

                users,

                settings: {
                    currentAssigneeUid:
                        normalizeOptionalString(
                            settingsData
                                .currentAssigneeUid,
                            200,
                        ),

                    autoReply:
                        readAutoReplySettings(
                            autoReplySnapshot.exists
                                ? autoReplySnapshot.data()
                                : settingsData.autoReply,
                        ),
                },
            };
        },
    );

/*
 * Legt das fachliche Profil eines vorhandenen
 * Firebase-Auth-Admins an oder aktualisiert es.
 */
export const saveAdminUserProfile =
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
            const actor =
                requireAdmin(request);

            const actorUid =
                actor.uid;
            const data =
                getRequestData(request);

            const uid =
                normalizeRequiredString(
                    data.uid,
                    "Die Benutzer-ID",
                    200,
                );

            const firstName =
                normalizeRequiredString(
                    data.firstName,
                    "Der Vorname",
                    100,
                );

            const lastName =
                normalizeRequiredString(
                    data.lastName,
                    "Der Nachname",
                    100,
                );

            const displayName =
                normalizeOptionalString(
                    data.displayName,
                    200,
                ) ??
                `${firstName} ${lastName}`;

            const email =
                normalizeRequiredString(
                    data.email,
                    "Die E-Mail-Adresse",
                    320,
                ).toLowerCase();

            if (!isValidEmail(email)) {
                throw new HttpsError(
                    "invalid-argument",
                    "Die E-Mail-Adresse ist ungültig.",
                );
            }

            const phone =
                normalizeRequiredString(
                    data.phone,
                    "Die Telefonnummer",
                    100,
                );

            const salutationDe =
                normalizeSalutationDe(
                    data.salutationDe,
                );

            const salutationEn =
                normalizeSalutationEn(
                    data.salutationEn,
                );

            const active =
                typeof data.active === "boolean"
                    ? data.active
                    : true;

            const authUser = await admin
                .auth()
                .getUser(uid);

            if (
                resolveStaffRole(
                    authUser.customClaims ??
                    {},
                ) === null
            ) {
                throw new HttpsError(
                    "failed-precondition",
                    "Der Benutzer besitzt keinen GLOBALSPED-Zugang.",
                );
            }

            const db = admin.firestore();

            const profileRef = db
                .collection(
                    ADMIN_USERS_COLLECTION,
                )
                .doc(uid);

            const profileSnapshot =
                await profileRef.get();

            /*
             * Der aktuelle Bearbeiter darf nicht
             * versehentlich deaktiviert werden.
             */
            if (!active) {
                const settingsSnapshot =
                    await db
                        .collection(
                            SETTINGS_COLLECTION,
                        )
                        .doc(
                            LEAD_MANAGEMENT_SETTINGS_ID,
                        )
                        .get();

                const currentAssigneeUid =
                    normalizeOptionalString(
                        settingsSnapshot
                            .data()
                            ?.currentAssigneeUid,
                        200,
                    );

                if (
                    currentAssigneeUid === uid
                ) {
                    throw new HttpsError(
                        "failed-precondition",
                        "Der aktuelle Bearbeiter kann nicht deaktiviert werden.",
                    );
                }
            }

            const now = FieldValue.serverTimestamp();

            const updates:
                Record<string, unknown> = {
                uid,
                firstName,
                lastName,
                displayName,
                email,
                phone,
                salutationDe,
                salutationEn,
                active,

                authEmail:
                    authUser.email ?? null,

                updatedAt: now,
                updatedByUid: actorUid,
            };

            if (!profileSnapshot.exists) {
                updates.createdAt = now;
                updates.createdByUid =
                    actorUid;
            }

            await profileRef.set(
                updates,
                {
                    merge: true,
                },
            );

            logger.info(
                "Admin user profile saved.",
                {
                    uid,
                    active,
                    updatedByUid: actorUid,
                },
            );

            return {
                success: true,
                uid,
            };
        },
    );

/*
 * Setzt den aktuellen Bearbeiter für
 * alle neu eingehenden Leads.
 */
export const setCurrentLeadAssignee =
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
            const actor =
                requireAdmin(request);

            const actorUid =
                actor.uid;
            const data =
                getRequestData(request);

            const uid =
                normalizeRequiredString(
                    data.uid,
                    "Die Benutzer-ID",
                    200,
                );

            const authUser =
                await admin
                    .auth()
                    .getUser(uid);

            if (
                authUser.disabled ||
                resolveStaffRole(
                    authUser.customClaims ??
                    {},
                ) === null
            ) {
                throw new HttpsError(
                    "failed-precondition",
                    "Der Benutzer besitzt keinen aktiven GLOBALSPED-Zugang.",
                );
            }

            const db = admin.firestore();
            const autoReplySnapshot =
                await db
                    .collection(
                        SETTINGS_COLLECTION,
                    )
                    .doc("autoReply")
                    .get();

            const autoReplyEnabled =
                autoReplySnapshot.exists
                    ? autoReplySnapshot.data()
                        ?.enabled !== false
                    : true;

            if (!autoReplyEnabled) {
                throw new HttpsError(
                    "failed-precondition",
                    "Der aktuelle Bearbeiter kann nur geändert werden, wenn die automatische Kundenantwort aktiviert ist.",
                );
            }

            const profileRef = db
                .collection(
                    ADMIN_USERS_COLLECTION,
                )
                .doc(uid);

            const settingsRef = db
                .collection(
                    SETTINGS_COLLECTION,
                )
                .doc(
                    LEAD_MANAGEMENT_SETTINGS_ID,
                );

            await db.runTransaction(
                async (transaction) => {
                    const [
                        profileSnapshot,
                        settingsSnapshot,
                    ] = await Promise.all([
                        transaction.get(profileRef),
                        transaction.get(
                            settingsRef,
                        ),
                    ]);

                    if (
                        !profileSnapshot.exists
                    ) {
                        throw new HttpsError(
                            "failed-precondition",
                            "Für den Benutzer ist noch kein Profil hinterlegt.",
                        );
                    }

                    const profileData =
                        profileSnapshot.data() ?? {};

                    if (
                        profileData.active !== true
                    ) {
                        throw new HttpsError(
                            "failed-precondition",
                            "Der ausgewählte Bearbeiter ist nicht aktiv.",
                        );
                    }

                    if (
                        profileData.canBeAssignee ===
                        false
                    ) {
                        throw new HttpsError(
                            "failed-precondition",
                            "Der Benutzer ist nicht als Bearbeiter freigegeben.",
                        );
                    }

                    const now = FieldValue.serverTimestamp();

                    const updates:
                        Record<string, unknown> = {
                        currentAssigneeUid: uid,
                        updatedAt: now,
                        updatedByUid:
                            actorUid,
                    };

                    if (
                        !settingsSnapshot.exists
                    ) {
                        updates.createdAt = now;
                        updates.createdByUid =
                            actorUid;
                    }

                    transaction.set(
                        settingsRef,
                        updates,
                        {
                            merge: true,
                        },
                    );
                },
            );

            logger.info(
                "Current lead assignee changed.",
                {
                    assigneeUid: uid,
                    updatedByUid: actorUid,
                },
            );

            return {
                success: true,
                currentAssigneeUid: uid,
            };
        },
    );