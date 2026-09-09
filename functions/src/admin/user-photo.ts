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
} from "./auth";

const REGION = "europe-west3";

const ADMIN_USERS_COLLECTION =
    "adminUsers";

const MAX_FILE_SIZE_BYTES =
    2 * 1024 * 1024;

type SupportedContentType =
    | "image/jpeg"
    | "image/png";


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

function requiredString(
    value: unknown,
    fieldName: string,
    maxLength: number,
): string {
    if (typeof value !== "string") {
        throw new HttpsError(
            "invalid-argument",
            `${fieldName} fehlt.`,
        );
    }

    const normalized =
        value.trim();

    if (!normalized) {
        throw new HttpsError(
            "invalid-argument",
            `${fieldName} fehlt.`,
        );
    }

    return normalized.slice(
        0,
        maxLength,
    );
}

function parseContentType(
    value: unknown,
): SupportedContentType {
    if (
        value === "image/jpeg" ||
        value === "image/png"
    ) {
        return value;
    }

    throw new HttpsError(
        "invalid-argument",
        "Es sind nur JPEG- und PNG-Bilder erlaubt.",
    );
}

function fileExtension(
    contentType: SupportedContentType,
): "jpg" | "png" {
    return contentType === "image/jpeg"
        ? "jpg"
        : "png";
}

function isValidJpeg(
    buffer: Buffer,
): boolean {
    return (
        buffer.length >= 4 &&
        buffer[0] === 0xff &&
        buffer[1] === 0xd8 &&
        buffer[
        buffer.length - 2
        ] === 0xff &&
        buffer[
        buffer.length - 1
        ] === 0xd9
    );
}

function isValidPng(
    buffer: Buffer,
): boolean {
    const pngSignature = [
        0x89,
        0x50,
        0x4e,
        0x47,
        0x0d,
        0x0a,
        0x1a,
        0x0a,
    ];

    return (
        buffer.length >=
        pngSignature.length &&
        pngSignature.every(
            (byte, index) =>
                buffer[index] === byte,
        )
    );
}

function validateImageBuffer(
    buffer: Buffer,
    contentType: SupportedContentType,
): void {
    if (!buffer.length) {
        throw new HttpsError(
            "invalid-argument",
            "Die Bilddatei ist leer.",
        );
    }

    if (
        buffer.length >
        MAX_FILE_SIZE_BYTES
    ) {
        throw new HttpsError(
            "invalid-argument",
            "Das Mitarbeiterbild darf maximal 2 MB groß sein.",
        );
    }

    const valid =
        contentType === "image/jpeg"
            ? isValidJpeg(buffer)
            : isValidPng(buffer);

    if (!valid) {
        throw new HttpsError(
            "invalid-argument",
            "Der tatsächliche Dateityp stimmt nicht mit dem angegebenen Bildformat überein.",
        );
    }
}

async function ensureManagedUserExists(
    uid: string,
): Promise<void> {
    try {
        await admin
            .auth()
            .getUser(uid);
    } catch {
        throw new HttpsError(
            "not-found",
            "Der Benutzer wurde nicht gefunden.",
        );
    }
}

async function deleteExistingPhotoFiles(
    uid: string,
): Promise<void> {
    const bucket =
        admin.storage().bucket();

    const possiblePaths = [
        `admin-users/${uid}/profile/photo.jpg`,
        `admin-users/${uid}/profile/photo.png`,
    ];

    await Promise.all(
        possiblePaths.map(
            async (storagePath) => {
                try {
                    await bucket
                        .file(storagePath)
                        .delete({
                            ignoreNotFound: true,
                        });
                } catch (error) {
                    logger.warn(
                        "Existing admin user photo could not be removed.",
                        {
                            uid,
                            storagePath,
                            error,
                        },
                    );
                }
            },
        ),
    );
}

export const uploadAdminUserPhoto =
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

            const contentType =
                parseContentType(
                    data.contentType,
                );

            const base64 =
                requiredString(
                    data.base64,
                    "Die Bilddatei",
                    4 * 1024 * 1024,
                );

            await ensureManagedUserExists(
                uid,
            );

            let buffer: Buffer;

            try {
                buffer = Buffer.from(
                    base64,
                    "base64",
                );
            } catch {
                throw new HttpsError(
                    "invalid-argument",
                    "Die Bilddaten sind ungültig.",
                );
            }

            validateImageBuffer(
                buffer,
                contentType,
            );

            await deleteExistingPhotoFiles(
                uid,
            );

            const extension =
                fileExtension(
                    contentType,
                );

            const storagePath =
                `admin-users/${uid}/profile/photo.${extension}`;

            const bucket =
                admin.storage().bucket();

            await bucket
                .file(storagePath)
                .save(
                    buffer,
                    {
                        resumable: false,

                        metadata: {
                            contentType,

                            cacheControl:
                                "private, max-age=3600",

                            metadata: {
                                ownerUid: uid,
                                purpose:
                                    "admin-user-profile-photo",
                            },
                        },
                    },
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
                        photo: {
                            storagePath,
                            contentType,
                            size:
                                buffer.length,

                            updatedAt:
                                now,
                        },

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
                "Admin user photo uploaded.",
                {
                    uid,
                    storagePath,
                    size:
                        buffer.length,
                    updatedByUid:
                        actor.uid,
                },
            );

            return {
                success: true,

                photo: {
                    storagePath,
                    contentType,
                    size:
                        buffer.length,
                },
            };
        },
    );

export const getAdminUserPhoto =
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

            const data =
                requestData(request);

            const uid =
                requiredString(
                    data.uid,
                    "Die Benutzer-ID",
                    200,
                );

            const profileSnapshot =
                await admin
                    .firestore()
                    .collection(
                        ADMIN_USERS_COLLECTION,
                    )
                    .doc(uid)
                    .get();

            if (
                !profileSnapshot.exists
            ) {
                throw new HttpsError(
                    "not-found",
                    "Das Benutzerprofil wurde nicht gefunden.",
                );
            }

            const profile =
                profileSnapshot.data() ??
                {};

            if (
                !isRecord(
                    profile.photo,
                )
            ) {
                return {
                    success: true,
                    photo: null,
                };
            }

            const storagePath =
                typeof profile.photo
                    .storagePath ===
                    "string"
                    ? profile.photo
                        .storagePath
                    : null;

            const contentType =
                typeof profile.photo
                    .contentType ===
                    "string"
                    ? profile.photo
                        .contentType
                    : null;

            if (
                !storagePath ||
                !contentType
            ) {
                return {
                    success: true,
                    photo: null,
                };
            }

            const bucket =
                admin.storage().bucket();

            const file =
                bucket.file(
                    storagePath,
                );

            const [
                exists,
            ] =
                await file.exists();

            if (!exists) {
                return {
                    success: true,
                    photo: null,
                };
            }

            const [
                buffer,
            ] =
                await file.download();

            return {
                success: true,

                photo: {
                    contentType,
                    base64:
                        buffer.toString(
                            "base64",
                        ),
                },
            };
        },
    );

export const deleteAdminUserPhoto =
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

            await deleteExistingPhotoFiles(
                uid,
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
                        photo:
                            admin.firestore
                                .FieldValue
                                .delete(),

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
                "Admin user photo deleted.",
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