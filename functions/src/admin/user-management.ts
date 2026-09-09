import type {
    UserRecord,
} from "firebase-admin/auth";
import { logger } from "firebase-functions";
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
    resolveStaffRole,
    type StaffRole,
} from "./auth";

const REGION = "europe-west3";

const ADMIN_USERS_COLLECTION =
    "adminUsers";

const SETTINGS_COLLECTION =
    "settings";

const LEAD_MANAGEMENT_SETTINGS_ID =
    "leadManagement";

type SupportedLanguage =
    | "de"
    | "en";

type UserInput = {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    phone: string;
    jobTitle: string;
    salutationDe: "Herr" | "Frau" | null;
    salutationEn: "Mr" | "Ms" | null;
    role: StaffRole;
    active: boolean;
    canBeAssignee: boolean;
    languages: SupportedLanguage[];
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

function requestData(
    request: CallableRequest<unknown>,
): Record<string, unknown> {
    return isRecord(request.data)
        ? request.data
        : {};
}

function optionalString(
    value: unknown,
    maxLength: number,
): string | null {
    if (typeof value !== "string") {
        return null;
    }

    const result = value.trim();

    return result
        ? result.slice(0, maxLength)
        : null;
}

function requiredString(
    value: unknown,
    label: string,
    maxLength: number,
): string {
    const result =
        optionalString(
            value,
            maxLength,
        );

    if (!result) {
        throw new HttpsError(
            "invalid-argument",
            `${label} fehlt oder ist ungültig.`,
        );
    }

    return result;
}

function validEmail(
    email: string,
): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email,
    );
}

function parseRole(
    value: unknown,
): StaffRole {
    if (
        value === "admin" ||
        value === "viewer"
    ) {
        return value;
    }

    throw new HttpsError(
        "invalid-argument",
        "Die Benutzerrolle ist ungültig.",
    );
}

function parseLanguages(
    value: unknown,
): SupportedLanguage[] {
    if (!Array.isArray(value)) {
        return ["de", "en"];
    }

    const languages =
        value.filter(
            (
                language,
            ): language is SupportedLanguage =>
                language === "de" ||
                language === "en",
        );

    return languages.length
        ? [...new Set(languages)]
        : ["de"];
}

function parseSalutationDe(
    value: unknown,
): "Herr" | "Frau" | null {
    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return null;
    }

    if (
        value === "Herr" ||
        value === "Frau"
    ) {
        return value;
    }

    throw new HttpsError(
        "invalid-argument",
        "Die deutsche Anrede ist ungültig.",
    );
}

function salutationEnFromDe(
    value: "Herr" | "Frau" | null,
): "Mr" | "Ms" | null {
    if (value === "Herr") {
        return "Mr";
    }

    if (value === "Frau") {
        return "Ms";
    }

    return null;
}


function parseUserInput(
    data: Record<string, unknown>,
): UserInput {
    const firstName =
        requiredString(
            data.firstName,
            "Der Vorname",
            100,
        );

    const lastName =
        requiredString(
            data.lastName,
            "Der Nachname",
            100,
        );

    const email =
        requiredString(
            data.email,
            "Die E-Mail-Adresse",
            320,
        ).toLowerCase();

    if (!validEmail(email)) {
        throw new HttpsError(
            "invalid-argument",
            "Die E-Mail-Adresse ist ungültig.",
        );
    }

    const salutationDe =
        parseSalutationDe(
            data.salutationDe,
        );

    return {
        firstName,
        lastName,

        displayName:
            optionalString(
                data.displayName,
                200,
            ) ??
            `${firstName} ${lastName}`,

        email,

        phone:
            requiredString(
                data.phone,
                "Die Telefonnummer",
                100,
            ),

        jobTitle:
            optionalString(
                data.jobTitle,
                150,
            ) ?? "",

        salutationDe,

        salutationEn:
            salutationEnFromDe(
                salutationDe,
            ),

        role:
            parseRole(
                data.role,
            ),

        active:
            data.active !== false,

        canBeAssignee:
            data.canBeAssignee !== false,

        languages:
            parseLanguages(
                data.languages,
            ),
    };
}

async function listAllAuthUsers():
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
            ...result.users,
        );

        pageToken =
            result.pageToken;
    } while (pageToken);

    return users;
}

function authUserRole(
    user: UserRecord,
): StaffRole | null {
    return resolveStaffRole(
        user.customClaims ?? {},
    );
}

async function setRoleClaims(
    uid: string,
    role: StaffRole,
): Promise<void> {
    const authUser =
        await admin
            .auth()
            .getUser(uid);

    const existingClaims = {
        ...(authUser.customClaims ?? {}),
    };

    delete existingClaims.admin;
    delete existingClaims.role;

    const newClaims:
        Record<string, unknown> = {
        ...existingClaims,
        role,
    };

    /*
     * Legacy-Kompatibilität:
     * Bestehende GLOBALSPED Functions prüfen
     * aktuell noch teilweise admin === true.
     */
    if (role === "admin") {
        newClaims.admin = true;
    }

    await admin
        .auth()
        .setCustomUserClaims(
            uid,
            newClaims,
        );
}

async function isCurrentAssignee(
    uid: string,
): Promise<boolean> {
    const snapshot =
        await admin
            .firestore()
            .collection(
                SETTINGS_COLLECTION,
            )
            .doc(
                LEAD_MANAGEMENT_SETTINGS_ID,
            )
            .get();

    return (
        snapshot.data()
            ?.currentAssigneeUid === uid
    );
}

async function ensureAnotherAdminExists(
    excludedUid: string,
): Promise<void> {
    const users =
        await listAllAuthUsers();

    const anotherAdmin =
        users.some((user) => {
            if (
                user.uid === excludedUid ||
                user.disabled
            ) {
                return false;
            }

            return (
                authUserRole(user) ===
                "admin"
            );
        });

    if (!anotherAdmin) {
        throw new HttpsError(
            "failed-precondition",
            "Der letzte aktive Administrator kann nicht entfernt oder zum Betrachter geändert werden.",
        );
    }
}

/*
 * Liefert alle verwalteten GLOBALSPED
 * Admin-/Viewer-Benutzer.
 *
 * Auch Viewer dürfen diese Liste lesen.
 */
export const listAdminUsers =
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

            const authUsers =
                (
                    await listAllAuthUsers()
                ).filter(
                    (user) =>
                        authUserRole(user) !==
                        null,
                );

            const db =
                admin.firestore();

            const users =
                await Promise.all(
                    authUsers.map(
                        async (user) => {
                            const profileSnapshot =
                                await db
                                    .collection(
                                        ADMIN_USERS_COLLECTION,
                                    )
                                    .doc(user.uid)
                                    .get();

                            const profile =
                                profileSnapshot.data() ??
                                {};

                            const role =
                                authUserRole(user);

                            return {
                                uid: user.uid,

                                email:
                                    user.email ??
                                    optionalString(
                                        profile.email,
                                        320,
                                    ),

                                displayName:
                                    user.displayName ??
                                    optionalString(
                                        profile.displayName,
                                        200,
                                    ),

                                disabled:
                                    user.disabled,

                                emailVerified:
                                    user.emailVerified,

                                role,

                                metadata: {
                                    creationTime:
                                        user.metadata
                                            .creationTime ??
                                        null,

                                    lastSignInTime:
                                        user.metadata
                                            .lastSignInTime ??
                                        null,
                                },

                                profile: {
                                    firstName:
                                        optionalString(
                                            profile.firstName,
                                            100,
                                        ) ?? "",

                                    lastName:
                                        optionalString(
                                            profile.lastName,
                                            100,
                                        ) ?? "",

                                    displayName:
                                        optionalString(
                                            profile.displayName,
                                            200,
                                        ) ??
                                        user.displayName ??
                                        "",

                                    email:
                                        optionalString(
                                            profile.email,
                                            320,
                                        ) ??
                                        user.email ??
                                        "",

                                    phone:
                                        optionalString(
                                            profile.phone,
                                            100,
                                        ) ?? "",

                                    jobTitle:
                                        optionalString(
                                            profile.jobTitle,
                                            150,
                                        ) ?? "",

                                    salutationDe:
                                        profile.salutationDe ===
                                            "Herr" ||
                                            profile.salutationDe ===
                                            "Frau" ?
                                            profile.salutationDe :
                                            null,

                                    salutationEn:
                                        profile.salutationEn ===
                                            "Mr" ||
                                            profile.salutationEn ===
                                            "Ms" ?
                                            profile.salutationEn :
                                            null,

                                    role,

                                    active:
                                        profile.active !==
                                        false &&
                                        !user.disabled,

                                    canBeAssignee:
                                        profile
                                            .canBeAssignee !==
                                        false,

                                    languages:
                                        parseLanguages(
                                            profile.languages,
                                        ),

                                    photo:
                                        isRecord(
                                            profile.photo,
                                        ) ?
                                            profile.photo :
                                            null,
                                },
                            };
                        },
                    ),
                );

            users.sort(
                (a, b) =>
                    (
                        a.profile
                            .displayName ||
                        a.email ||
                        ""
                    ).localeCompare(
                        b.profile
                            .displayName ||
                        b.email ||
                        "",
                        "de",
                    ),
            );

            return {
                success: true,
                users,
            };
        },
    );

/*
 * Erstellt:
 * 1. Firebase Auth User
 * 2. Custom Claims
 * 3. Firestore Mitarbeiterprofil
 *
 * Es wird absichtlich KEIN initiales
 * Passwort gesetzt.
 */
export const createAdminUser =
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

            const input =
                parseUserInput(
                    requestData(request),
                );

            let createdUid:
                string | null = null;

            try {
                const authUser =
                    await admin
                        .auth()
                        .createUser({
                            email:
                                input.email,

                            displayName:
                                input.displayName,

                            disabled:
                                !input.active,

                            emailVerified:
                                false,
                        });

                createdUid =
                    authUser.uid;

                await setRoleClaims(
                    authUser.uid,
                    input.role,
                );

                const now = FieldValue.serverTimestamp()

                await admin
                    .firestore()
                    .collection(
                        ADMIN_USERS_COLLECTION,
                    )
                    .doc(authUser.uid)
                    .set({
                        uid:
                            authUser.uid,

                        firstName:
                            input.firstName,

                        lastName:
                            input.lastName,

                        displayName:
                            input.displayName,

                        email:
                            input.email,

                        phone:
                            input.phone,

                        jobTitle:
                            input.jobTitle,

                        salutationDe:
                            input.salutationDe,

                        salutationEn:
                            input.salutationEn,

                        role:
                            input.role,

                        active:
                            input.active,

                        canBeAssignee:
                            input.canBeAssignee,

                        languages:
                            input.languages,

                        photo: null,

                        createdAt:
                            now,

                        createdByUid:
                            actor.uid,

                        updatedAt:
                            now,

                        updatedByUid:
                            actor.uid,
                    });

                logger.info(
                    "GLOBALSPED admin user created.",
                    {
                        uid:
                            authUser.uid,
                        role:
                            input.role,
                        createdByUid:
                            actor.uid,
                    },
                );

                return {
                    success: true,
                    uid:
                        authUser.uid,
                };
            } catch (error) {
                /*
                 * Firestore-/Claim-Fehler nach
                 * erfolgreicher Auth-Erstellung:
                 * unvollständigen Auth-User
                 * wieder entfernen.
                 */
                if (createdUid) {
                    try {
                        await admin
                            .auth()
                            .deleteUser(
                                createdUid,
                            );
                    } catch (
                    rollbackError
                    ) {
                        logger.error(
                            "Could not rollback admin user creation.",
                            {
                                uid:
                                    createdUid,
                                rollbackError,
                            },
                        );
                    }
                }

                throw error;
            }
        },
    );

/*
 * Aktualisiert Auth + Profil + Rolle.
 */
export const updateAdminUser =
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
                requestData(request);

            const uid =
                requiredString(
                    data.uid,
                    "Die Benutzer-ID",
                    200,
                );

            const input =
                parseUserInput(
                    data,
                );

            const existingUser =
                await admin
                    .auth()
                    .getUser(uid);

            const existingRole =
                authUserRole(
                    existingUser,
                );

            /*
             * Eigenen Admin-Zugriff nicht
             * versehentlich entfernen.
             */
            if (
                uid === actor.uid &&
                (
                    input.role !==
                    "admin" ||
                    !input.active
                )
            ) {
                throw new HttpsError(
                    "failed-precondition",
                    "Du kannst deinen eigenen Administratorzugang nicht deaktivieren oder zum Betrachter ändern.",
                );
            }

            if (
                existingRole ===
                "admin" &&
                (
                    input.role !==
                    "admin" ||
                    !input.active
                )
            ) {
                await ensureAnotherAdminExists(
                    uid,
                );
            }

            if (
                (
                    !input.active ||
                    !input.canBeAssignee
                ) &&
                await isCurrentAssignee(
                    uid,
                )
            ) {
                throw new HttpsError(
                    "failed-precondition",
                    "Der aktuelle Bearbeiter kann nicht deaktiviert oder von der Bearbeiter-Auswahl ausgeschlossen werden. Wähle zuerst einen anderen Bearbeiter.",
                );
            }

            await admin
                .auth()
                .updateUser(
                    uid,
                    {
                        email:
                            input.email,

                        displayName:
                            input.displayName,

                        disabled:
                            !input.active,
                    },
                );

            await setRoleClaims(
                uid,
                input.role,
            );

            const now = FieldValue.serverTimestamp()

            await admin
                .firestore()
                .collection(
                    ADMIN_USERS_COLLECTION,
                )
                .doc(uid)
                .set(
                    {
                        uid,

                        firstName:
                            input.firstName,

                        lastName:
                            input.lastName,

                        displayName:
                            input.displayName,

                        email:
                            input.email,

                        phone:
                            input.phone,

                        jobTitle:
                            input.jobTitle,

                        salutationDe:
                            input.salutationDe,

                        salutationEn:
                            input.salutationEn,

                        role:
                            input.role,

                        active:
                            input.active,

                        canBeAssignee:
                            input.canBeAssignee,

                        languages:
                            input.languages,

                        updatedAt:
                            now,

                        updatedByUid:
                            actor.uid,
                    },
                    {
                        merge: true,
                    },
                );

            logger.info(
                "GLOBALSPED admin user updated.",
                {
                    uid,
                    role:
                        input.role,
                    updatedByUid:
                        actor.uid,
                },
            );

            return {
                success: true,
                uid,
            };
        },
    );

/*
 * Löscht den Firebase-Auth-Login.
 *
 * Das Firestore-Profil bleibt als
 * archivierter Audit-Datensatz bestehen.
 */
export const deleteAdminUser =
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
                requestData(request);

            const uid =
                requiredString(
                    data.uid,
                    "Die Benutzer-ID",
                    200,
                );

            if (uid === actor.uid) {
                throw new HttpsError(
                    "failed-precondition",
                    "Du kannst deinen eigenen Benutzer nicht löschen.",
                );
            }

            if (
                await isCurrentAssignee(
                    uid,
                )
            ) {
                throw new HttpsError(
                    "failed-precondition",
                    "Der aktuelle Bearbeiter kann nicht gelöscht werden. Wähle zuerst einen anderen Bearbeiter.",
                );
            }

            const authUser =
                await admin
                    .auth()
                    .getUser(uid);

            if (
                authUserRole(
                    authUser,
                ) === "admin"
            ) {
                await ensureAnotherAdminExists(
                    uid,
                );
            }

            await admin
                .auth()
                .deleteUser(uid);

            const now = FieldValue.serverTimestamp()

            await admin
                .firestore()
                .collection(
                    ADMIN_USERS_COLLECTION,
                )
                .doc(uid)
                .set(
                    {
                        active: false,
                        archived: true,

                        deletedAt:
                            now,

                        deletedByUid:
                            actor.uid,

                        updatedAt:
                            now,

                        updatedByUid:
                            actor.uid,
                    },
                    {
                        merge: true,
                    },
                );

            logger.info(
                "GLOBALSPED admin user deleted.",
                {
                    uid,
                    deletedByUid:
                        actor.uid,
                },
            );

            return {
                success: true,
                uid,
            };
        },
    );