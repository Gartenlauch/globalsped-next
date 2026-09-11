import * as admin from "firebase-admin";
import {logger} from "firebase-functions";
import {HttpsError, onCall} from "firebase-functions/v2/https";
import {requireAdmin} from "../admin/auth";
import {
    requireManualAutoReplyEmulator,
    scheduleManualAutoReplyTaskForLead,
} from "./task-scheduler";

export const sendAutoReplyNow = onCall<unknown>(
    {region: "europe-west3", maxInstances: 10},
    async (request) => {
        const actor = requireAdmin(request);
        const data = request.data;
        if (typeof data !== "object" || data === null ||
            !("leadId" in data) || typeof data.leadId !== "string" ||
            !data.leadId.trim() || data.leadId.includes("/") ||
            [".", ".."].includes(data.leadId.trim())) {
            throw new HttpsError("invalid-argument", "Eine gültige Lead-ID ist erforderlich.");
        }
        // Block production before reading or changing any lead state.
        requireManualAutoReplyEmulator();
        const leadId = data.leadId.trim();
        const leadRef = admin.firestore().collection("leads").doc(leadId);
        try {
            // Existence, recipient and status are checked inside the transaction.
            const {taskToken} = await scheduleManualAutoReplyTaskForLead({
                leadRef,
                requestedByUid: actor.uid,
                deliveryMode: "dry_run",
            });
            return {success: true, leadId, status: "scheduled", taskToken};
        } catch (error) {
            if (error instanceof HttpsError) throw error;
            logger.error("Manual AutoReply scheduling failed.", {leadId, error});
            throw new HttpsError("internal", "Die Autoantwort konnte nicht eingeplant werden. Bitte den aktuellen Status prüfen und erneut versuchen.");
        }
    },
);
