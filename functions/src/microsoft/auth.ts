import {ConfidentialClientApplication} from "@azure/msal-node";
import {
    MICROSOFT_TENANT_ID, MICROSOFT_CLIENT_ID, MICROSOFT_CERT_THUMBPRINT_SHA256,
    MICROSOFT_PRIVATE_KEY, requiredMicrosoftValue,
} from "./config";
import {MicrosoftMailError} from "./errors";

let client: ConfidentialClientApplication | undefined;

export async function getMicrosoftGraphAccessToken(): Promise<string> {
    if (!client) {
        // Resolve only at invocation time, after the callable's admin check.
        const tenantId = requiredMicrosoftValue(MICROSOFT_TENANT_ID);
        const clientId = requiredMicrosoftValue(MICROSOFT_CLIENT_ID);
        const thumbprintSha256 = requiredMicrosoftValue(MICROSOFT_CERT_THUMBPRINT_SHA256);
        const privateKey = requiredMicrosoftValue(MICROSOFT_PRIVATE_KEY);
        if (!/^[a-zA-Z0-9.-]+$/.test(tenantId) || !/^[a-fA-F0-9]{64}$/.test(thumbprintSha256)) {
            throw new MicrosoftMailError("configuration", "Microsoft Tenant-ID oder SHA-256-Zertifikatfingerabdruck ist ungültig.");
        }
        try {
            client = new ConfidentialClientApplication({
                auth: {
                    clientId,
                    authority: `https://login.microsoftonline.com/${tenantId}`,
                    clientCertificate: {thumbprintSha256, privateKey},
                },
                system: {
                    loggerOptions: {piiLoggingEnabled: false, loggerCallback: () => undefined},
                },
            });
        } catch {
            throw new MicrosoftMailError("configuration", "Microsoft-Zertifikatsauthentifizierung konnte nicht konfiguriert werden.");
        }
    }
    try {
        // Reuse MSAL's in-memory application token cache across warm invocations.
        const result = await client.acquireTokenByClientCredential({
            scopes: ["https://graph.microsoft.com/.default"],
        });
        if (!result?.accessToken) throw new Error("Missing access token.");
        return result.accessToken;
    } catch {
        throw new MicrosoftMailError("token", "Microsoft Graph Access Token konnte nicht bezogen werden.");
    }
}
