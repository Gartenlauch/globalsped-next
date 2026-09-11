import * as admin from "firebase-admin";
import {HttpsError, onCall} from "firebase-functions/v2/https";
import {requireAdmin} from "../admin/auth";
import {resolveAutoReplyDeliveryMetadata} from "./delivery-metadata";
import {prepareAutoReplyMessage} from "./message-prepare";

// Read-only in every environment: no tasks, writes or provider calls.
export const previewAutoReplyMessage = onCall<unknown>(
    {region: "europe-west3", maxInstances: 10},
    async (request) => {
        requireAdmin(request);
        const data = request.data;
        if (typeof data !== "object" || data === null || Array.isArray(data) ||
            !("leadId" in data) || typeof data.leadId !== "string" ||
            !data.leadId.trim() || data.leadId.includes("/") ||
            [".", ".."].includes(data.leadId.trim()) || Buffer.byteLength(data.leadId.trim(), "utf8") > 1500) {
            throw new HttpsError("invalid-argument", "Eine gültige Lead-ID ist erforderlich.");
        }
        const leadId = data.leadId.trim();
        const snapshot = await admin.firestore().collection("leads").doc(leadId).get();
        if (!snapshot.exists) {
            throw new HttpsError("not-found", "Lead existiert nicht.");
        }
        const lead = snapshot.data() ?? {};
        try {
            const delivery = resolveAutoReplyDeliveryMetadata(lead);
            const {inlineAttachments, ...message} = await prepareAutoReplyMessage(lead);
            // Rewrite only this browser copy; the prepared message retains its CID.
            let html = message.html;
            for (const attachment of inlineAttachments) {
                html = html.split('src="cid:' + attachment.contentId + '"').join(
                    'src="data:' + attachment.contentType + ';base64,' + attachment.contentBase64 + '"',
                );
            }
            return {leadId, ...delivery, ...message, html};
        } catch (error) {
            throw new HttpsError("failed-precondition", error instanceof Error
                ? error.message : "Die E-Mail-Vorschau konnte nicht erstellt werden.");
        }
    },
);
