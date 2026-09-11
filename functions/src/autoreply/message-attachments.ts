import * as admin from "firebase-admin";
import {logger} from "firebase-functions";

export type AutoReplyInlineAttachment = {
    contentId: string;
    fileName: string;
    contentType: string;
    contentBase64: string;
};

export const EMPLOYEE_PHOTO_CONTENT_ID = "employee-photo";
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const IMAGE_EXTENSIONS: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function imageType(value: unknown): string | null {
    if (typeof value !== "string") return null;
    const normalized = value.trim().toLowerCase();
    return Object.prototype.hasOwnProperty.call(IMAGE_EXTENSIONS, normalized) ? normalized : null;
}

function matchesImageType(buffer: Buffer, contentType: string): boolean {
    if (contentType === "image/jpeg") {
        return buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8 &&
            buffer[buffer.length - 2] === 0xff && buffer[buffer.length - 1] === 0xd9;
    }
    if (contentType === "image/png") {
        return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    }
    return buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" &&
        buffer.toString("ascii", 8, 12) === "WEBP";
}

// Only the saved snapshot supplies identity and path; never reload adminUsers.
export async function prepareAutoReplyInlineAttachments(
    lead: Record<string, unknown>,
): Promise<AutoReplyInlineAttachment[]> {
    const assignment = isRecord(lead.assignment) ? lead.assignment : {};
    const assignee = isRecord(assignment.assignee) ? assignment.assignee : {};
    if (assignee.photo == null) return [];

    try {
        if (!isRecord(assignee.photo)) throw new Error("Invalid photo snapshot.");
        const photo = assignee.photo;
        const storagePath = typeof photo.storagePath === "string" ? photo.storagePath : "";
        const uid = typeof assignee.uid === "string" ? assignee.uid : "";
        // Restrict reads to the employee's existing profile-photo namespace.
        const prefix = `admin-users/${uid}/profile/`;
        if (!uid || /[/\\]/.test(uid) || uid === "." || uid === ".." ||
            !storagePath.startsWith(prefix) || !storagePath.slice(prefix.length) ||
            /[\\]/.test(storagePath) || Array.from(storagePath).some((char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127) ||
            storagePath.split("/").some((part) => !part || part === "." || part === "..")) {
            throw new Error("Invalid employee photo storage path.");
        }
        if (typeof photo.size === "number" && photo.size > MAX_PHOTO_BYTES) {
            throw new Error("Employee photo exceeds 2 MB.");
        }
        // An emulator dry run must never fall through to the production bucket.
        if (process.env.FUNCTIONS_EMULATOR === "true" && !process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
            throw new Error("Storage emulator is not configured.");
        }
        const file = admin.storage().bucket().file(storagePath);
        const [metadata] = await file.getMetadata();
        const snapshotType = imageType(photo.contentType);
        const storageType = imageType(metadata.contentType);
        if ((photo.contentType != null && !snapshotType) ||
            (metadata.contentType != null && !storageType) ||
            (snapshotType && storageType && snapshotType !== storageType)) {
            throw new Error("Invalid or inconsistent employee photo content type.");
        }
        const contentType = storageType ?? snapshotType;
        if (!contentType) throw new Error("Employee photo content type is missing.");
        const size = Number(metadata.size);
        if (!Number.isFinite(size) || size <= 0 || size > MAX_PHOTO_BYTES) {
            throw new Error("Employee photo is empty or exceeds 2 MB.");
        }
        // Bound the read as well, even if the object changes after metadata lookup.
        const [buffer] = await file.download({start: 0, end: MAX_PHOTO_BYTES});
        if (!buffer.length || buffer.length > MAX_PHOTO_BYTES) {
            throw new Error("Employee photo is empty or exceeds 2 MB.");
        }
        if (!matchesImageType(buffer, contentType)) {
            throw new Error("Employee photo bytes do not match the content type.");
        }
        const baseName = storagePath.split("/").pop() ?? "";
        const fileName = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,119}$/.test(baseName)
            ? baseName : `employee-photo.${IMAGE_EXTENSIONS[contentType]}`;
        return [{
            contentId: EMPLOYEE_PHOTO_CONTENT_ID,
            fileName,
            contentType,
            contentBase64: buffer.toString("base64"),
        }];
    } catch (error) {
        logger.warn("AutoReply employee photo omitted.", {
            reason: error instanceof Error ? error.message : "Photo preparation failed.",
        });
        return [];
    }
}
