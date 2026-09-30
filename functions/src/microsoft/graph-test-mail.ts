import * as admin from "firebase-admin";
import {logger} from "firebase-functions";
import {HttpsError, onCall} from "firebase-functions/v2/https";
import {requireAdmin} from "../admin/auth";
import {resolveAutoReplyDeliveryMetadata} from "../autoreply/delivery-metadata";
import {prepareAutoReplyMessage} from "../autoreply/message-prepare";
import {MICROSOFT_GRAPH_TEST_RECIPIENT, MICROSOFT_PRIVATE_KEY, microsoftMailbox} from "./config";
import {MicrosoftMailError} from "./errors";
import {sendAutoReplyViaGraph} from "./graph-mail-provider";

// Explicit manual provider test only. No Firestore writes or task dispatch.
export const sendMicrosoftGraphTestMail = onCall<unknown>(
    {region: "europe-west3", secrets: [MICROSOFT_PRIVATE_KEY], maxInstances: 1, concurrency: 1, timeoutSeconds: 120},
    async (request) => {
        requireAdmin(request);
        const data = request.data;
        if (typeof data !== "object" || data === null || Array.isArray(data) ||
            Object.keys(data).some((key) => key !== "leadId") ||
            !("leadId" in data) || typeof data.leadId !== "string" ||
            !data.leadId.trim() || data.leadId.includes("/") ||
            [".", ".."].includes(data.leadId.trim()) || Buffer.byteLength(data.leadId.trim(), "utf8") > 1500) {
            throw new HttpsError("invalid-argument", "Ausschließlich eine gültige Lead-ID ist erforderlich.");
        }
        const leadId = data.leadId.trim();
        try {
            const recipientEmail = microsoftMailbox(MICROSOFT_GRAPH_TEST_RECIPIENT);
            const snapshot = await admin.firestore().collection("leads").doc(leadId).get();
            if (!snapshot.exists) throw new HttpsError("not-found", "Lead existiert nicht.");
            const lead = snapshot.data() ?? {};
            let message;
            try {
                // Validate existing metadata, but never forward customer or internal recipients.
                resolveAutoReplyDeliveryMetadata(lead);
                message = await prepareAutoReplyMessage(lead);
            } catch {
                throw new MicrosoftMailError("invalid-message", "Lead oder Prepared Message ungültig. Empfänger, Lead-Typ und gespeicherten Bearbeiter prüfen.");
            }
            const result = await sendAutoReplyViaGraph({
                recipientEmail,
                internalCopyEmail: null,
                message: {...message, subject: `[GLOBALSPED TEST] ${message.subject}`},
            });
            logger.info("Microsoft Graph test mail accepted.", {
                leadId, recipientEmail, requestId: result.requestId,
                attachmentCount: message.inlineAttachments.length, templateVersion: message.templateVersion,
            });
            return {success: true, leadId, recipientEmail, requestId: result.requestId};
        } catch (error) {
            if (error instanceof HttpsError) throw error;
            if (error instanceof MicrosoftMailError) {
                logger.error("Microsoft Graph test mail failed.", {
                    leadId, kind: error.kind, httpStatus: error.httpStatus,
                    requestId: error.requestId, graphErrorCode: error.graphErrorCode,
                    ...(error.httpStatus === 403 ? {hint: "Möglicherweise Exchange Application RBAC / Propagation prüfen."} : {}),
                });
                throw new HttpsError(
                    error.kind === "configuration" || error.kind === "invalid-message" ? "failed-precondition" : "internal",
                    error.message,
                    {kind: error.kind, httpStatus: error.httpStatus, requestId: error.requestId},
                );
            }
            logger.error("Microsoft Graph test mail preparation failed.", {leadId});
            throw new HttpsError("internal", "Graph-Test fehlgeschlagen. Vor erneutem Aufruf Gesendete Elemente prüfen.");
        }
    },
);
