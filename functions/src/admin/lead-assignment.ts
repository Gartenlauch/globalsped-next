import { logger } from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
const ADMIN_USERS_COLLECTION = "adminUsers";

const SETTINGS_COLLECTION = "settings";

const LEAD_MANAGEMENT_SETTINGS_ID = "leadManagement";


type LeadAssigneePhotoSnapshot = {
    storagePath: string;
    contentType: string;
    size: number | null;
};

export type LeadAssigneeSnapshot = {
    uid: string;

    firstName: string | null;
    lastName: string | null;
    displayName: string;

    email: string | null;
    phone: string | null;
    jobTitle: string | null;

    salutationDe:
    | "Herr"
    | "Frau"
    | null;

    salutationEn:
    | "Mr"
    | "Ms"
    | null;

    photo:
    | LeadAssigneePhotoSnapshot
    | null;
};

export type LeadAssignmentSnapshot = {
    source:
    "bearbeiter_of_the_day";

    assignedAt:
    FieldValue;

    assignee:
    LeadAssigneeSnapshot;
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

function stringOrNull(
    value: unknown,
    maxLength = 500,
): string | null {
    if (typeof value !== "string") {
        return null;
    }

    const normalized =
        value.trim();

    if (!normalized) {
        return null;
    }

    return normalized.slice(
        0,
        maxLength,
    );
}

function parsePhoto(
    value: unknown,
): LeadAssigneePhotoSnapshot | null {
    if (!isRecord(value)) {
        return null;
    }

    const storagePath =
        stringOrNull(
            value.storagePath,
            1_000,
        );

    const contentType =
        stringOrNull(
            value.contentType,
            200,
        );

    if (
        !storagePath ||
        !contentType
    ) {
        return null;
    }

    return {
        storagePath,
        contentType,

        size:
            typeof value.size ===
                "number" &&
                Number.isFinite(
                    value.size,
                )
                ? value.size
                : null,
    };
}

export async function getCurrentLeadAssignmentSnapshot():
    Promise<LeadAssignmentSnapshot | null> {
    const db =
        admin.firestore();

    try {
        const settingsSnapshot =
            await db
                .collection(
                    SETTINGS_COLLECTION,
                )
                .doc(
                    LEAD_MANAGEMENT_SETTINGS_ID,
                )
                .get();

        /*
         * Bearbeiter of the Day wird nur
         * verwendet, wenn die automatische
         * Kundenantwort aktiviert ist.
         *
         * Falls das neue settings/autoReply
         * Dokument noch nicht existiert,
         * prüfen wir übergangsweise die alte
         * Konfiguration.
         */

        const currentAssigneeUid =
            stringOrNull(
                settingsSnapshot.data()
                    ?.currentAssigneeUid,
                200,
            );

        /*
         * Kein Bearbeiter konfiguriert:
         * Lead darf trotzdem angelegt
         * werden.
         */
        if (!currentAssigneeUid) {
            return null;
        }

        const profileSnapshot =
            await db
                .collection(
                    ADMIN_USERS_COLLECTION,
                )
                .doc(
                    currentAssigneeUid,
                )
                .get();

        if (!profileSnapshot.exists) {
            logger.warn(
                "Current lead assignee profile does not exist.",
                {
                    uid:
                        currentAssigneeUid,
                },
            );

            return null;
        }

        const profile =
            profileSnapshot.data();

        if (!profile) {
            return null;
        }

        /*
         * Sicherheitsnetz:
         * Ein deaktivierter oder nicht
         * mehr als Bearbeiter zugelassener
         * Benutzer wird nicht automatisch
         * neuen Leads zugeordnet.
         */
        if (
            profile.active === false ||
            profile.canBeAssignee === false
        ) {
            logger.warn(
                "Current lead assignee is not eligible for assignment.",
                {
                    uid:
                        currentAssigneeUid,

                    active:
                        profile.active,

                    canBeAssignee:
                        profile.canBeAssignee,
                },
            );

            return null;
        }

        const firstName =
            stringOrNull(
                profile.firstName,
                100,
            );

        const lastName =
            stringOrNull(
                profile.lastName,
                100,
            );

        const email =
            stringOrNull(
                profile.email,
                320,
            );

        const fullName =
            [
                firstName,
                lastName,
            ]
                .filter(
                    (
                        value,
                    ): value is string =>
                        Boolean(value),
                )
                .join(" ");

        const displayName =
            stringOrNull(
                profile.displayName,
                200,
            ) ??
            (
                fullName ||
                email ||
                currentAssigneeUid
            );

        const salutationDe =
            profile.salutationDe ===
                "Herr" ||
                profile.salutationDe ===
                "Frau"
                ? profile.salutationDe
                : null;

        const salutationEn =
            profile.salutationEn ===
                "Mr" ||
                profile.salutationEn ===
                "Ms"
                ? profile.salutationEn
                : null;

        return {
            source:
                "bearbeiter_of_the_day",

            assignedAt: FieldValue.serverTimestamp(),

            assignee: {
                uid:
                    currentAssigneeUid,

                firstName,
                lastName,
                displayName,
                email,

                phone:
                    stringOrNull(
                        profile.phone,
                        100,
                    ),

                jobTitle:
                    stringOrNull(
                        profile.jobTitle,
                        200,
                    ),

                salutationDe,
                salutationEn,

                photo:
                    parsePhoto(
                        profile.photo,
                    ),
            },
        };
    } catch (error) {
        /*
         * Die Bearbeiter-Zuweisung ist
         * hilfreich, darf aber niemals
         * verhindern, dass ein Kundenlead
         * gespeichert wird.
         */
        logger.error(
            "Could not resolve current lead assignment.",
            {
                error,
            },
        );

        return null;
    }
}