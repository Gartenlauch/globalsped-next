export type MicrosoftMailErrorKind =
    | "configuration" | "token" | "graph-auth" | "graph-authorization"
    | "graph-request" | "invalid-message";

// Only controlled diagnostics cross the provider boundary; never retain raw SDK errors.
export class MicrosoftMailError extends Error {
    constructor(
        public readonly kind: MicrosoftMailErrorKind,
        message: string,
        public readonly httpStatus: number | null = null,
        public readonly requestId: string | null = null,
        public readonly graphErrorCode: string | null = null,
    ) {
        super(message);
        this.name = "MicrosoftMailError";
    }
}
