import type {PreparedAutoReplyMessage} from "../autoreply/message-prepare";
import {getMicrosoftGraphAccessToken} from "./auth";
import {MICROSOFT_SENDER_UPN, microsoftMailbox} from "./config";
import {MicrosoftMailError} from "./errors";

export type GraphMailInput = {
    recipientEmail: string;
    internalCopyEmail: string | null;
    message: PreparedAutoReplyMessage;
};

// Bound the response read and retain only the machine error code, never raw text
// which might echo mail content or credentials. Do not log the provider body.
async function readGraphErrorCode(response: Response): Promise<string | null> {
    const reader = response.body?.getReader();
    if (!reader) return null;
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
        while (size <= 4096) {
            const {done, value} = await reader.read();
            if (done) {
                const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
                const code: unknown = body?.error?.code;
                return typeof code === "string" && /^[A-Za-z][A-Za-z0-9_.-]{0,99}$/.test(code) ? code : null;
            }
            size += value.byteLength;
            if (size > 4096) return null;
            chunks.push(value);
        }
    } catch {
        return null;
    } finally {
        await reader.cancel().catch(() => undefined);
    }
    return null;
}

export async function sendAutoReplyViaGraph(input: GraphMailInput): Promise<{
    accepted: true;
    requestId: string | null;
}> {
    const {message, recipientEmail, internalCopyEmail} = input;
    const ids = message.inlineAttachments.map((attachment) => attachment.contentId);
    const htmlIds = Array.from(message.html.matchAll(/cid:([^"'\s<>]+)/g), (match) => match[1]);
    if (!message.subject.trim() || !message.html.trim() ||
        new Set(ids).size !== ids.length || htmlIds.some((id) => !ids.includes(id)) ||
        message.inlineAttachments.some((attachment) => !attachment.fileName || !attachment.contentType ||
            !attachment.contentBase64 || !attachment.contentId || !htmlIds.includes(attachment.contentId))) {
        throw new MicrosoftMailError("invalid-message", "Ungültiger Prepared-Message-Zustand oder inkonsistente CID-Anhänge.");
    }
    const sender = microsoftMailbox(MICROSOFT_SENDER_UPN);
    const token = await getMicrosoftGraphAccessToken();
    let response: Response;
    try {
        // One attempt only: retrying an ambiguous sendMail result can duplicate mail.
        response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
            method: "POST",
            redirect: "error",
            signal: AbortSignal.timeout(30_000),
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                message: {
                    subject: message.subject,
                    body: {contentType: "HTML", content: message.html},
                    toRecipients: [{emailAddress: {address: recipientEmail}}],
                    bccRecipients: internalCopyEmail ? [{emailAddress: {address: internalCopyEmail}}] : [],
                    attachments: message.inlineAttachments.map((attachment) => ({
                        "@odata.type": "#microsoft.graph.fileAttachment",
                        name: attachment.fileName,
                        contentType: attachment.contentType,
                        contentBytes: attachment.contentBase64,
                        contentId: attachment.contentId,
                        isInline: true,
                    })),
                },
                saveToSentItems: true,
            }),
        });
    } catch {
        throw new MicrosoftMailError("graph-request", "Graph Request fehlgeschlagen oder Zeitlimit erreicht. Versandstatus unklar; vor erneutem Aufruf Gesendete Elemente prüfen.");
    }
    const headerId = response.headers.get("request-id") ?? response.headers.get("client-request-id");
    const requestId = headerId && /^[a-zA-Z0-9-]{1,128}$/.test(headerId) ? headerId : null;
    if (response.status !== 202) {
        const code = await readGraphErrorCode(response);
        const kind = response.status === 401 ? "graph-auth" : response.status === 403 ? "graph-authorization" : "graph-request";
        const description = response.status === 401 ? "Graph Auth fehlgeschlagen (401)."
            : response.status === 403 ? "Graph Authorization verweigert (403)."
                : `Graph Request nicht akzeptiert (HTTP ${response.status}).`;
        throw new MicrosoftMailError(kind, description, response.status, requestId, code);
    }
    return {accepted: true, requestId};
}
