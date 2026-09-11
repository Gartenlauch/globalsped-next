import {
    GoogleAuth,
} from "google-auth-library";

let googleAuth:
    GoogleAuth | null = null;

const uriCache =
    new Map<string, string>();

export async function getFunctionUrl(
    name: string,
    location: string,
): Promise<string> {
    const cacheKey =
        `${location}:${name}`;

    const cached =
        uriCache.get(
            cacheKey,
        );

    if (cached) {
        return cached;
    }

    if (!googleAuth) {
        googleAuth =
            new GoogleAuth({
                scopes:
                    "https://www.googleapis.com/auth/cloud-platform",
            });
    }

    const projectId =
        await googleAuth
            .getProjectId();

    const url =
        "https://cloudfunctions.googleapis.com/v2beta/" +
        `projects/${projectId}/locations/${location}/functions/${name}`;

    const client =
        await googleAuth
            .getClient();

    const response =
        await client.request<{
            serviceConfig?: {
                uri?: string;
            };
        }>({
            url,
        });

    const uri =
        response.data
            ?.serviceConfig
            ?.uri;

    if (!uri) {
        throw new Error(
            `Keine URI für Function ${name} gefunden.`,
        );
    }

    uriCache.set(
        cacheKey,
        uri,
    );

    return uri;
}