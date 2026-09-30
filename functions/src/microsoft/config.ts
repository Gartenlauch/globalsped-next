import {defineSecret, defineString} from "firebase-functions/params";
import {MicrosoftMailError} from "./errors";

export const MICROSOFT_TENANT_ID = defineString("MICROSOFT_TENANT_ID");
export const MICROSOFT_CLIENT_ID = defineString("MICROSOFT_CLIENT_ID");
export const MICROSOFT_CERT_THUMBPRINT_SHA256 = defineString("MICROSOFT_CERT_THUMBPRINT_SHA256");
export const MICROSOFT_SENDER_UPN = defineString("MICROSOFT_SENDER_UPN");
export const MICROSOFT_GRAPH_TEST_RECIPIENT = defineString("MICROSOFT_GRAPH_TEST_RECIPIENT");
export const MICROSOFT_PRIVATE_KEY = defineSecret("MICROSOFT_PRIVATE_KEY");

export function requiredMicrosoftValue(param: {name: string; value(): string}): string {
    const value = param.value().trim();
    if (!value) {
        throw new MicrosoftMailError("configuration", `Microsoft-Konfiguration fehlt: ${param.name}.`);
    }
    return value;
}

export function microsoftMailbox(param: {name: string; value(): string}): string {
    const value = requiredMicrosoftValue(param);
    // A single plain mailbox only: no display names, lists or header delimiters.
    if (!/^[^\s@<>,;"\\]+@[^\s@<>,;"\\]+\.[^\s@<>,;"\\]+$/.test(value)) {
        throw new MicrosoftMailError("configuration", `Microsoft-Konfiguration ungültig: ${param.name}.`);
    }
    return value;
}
