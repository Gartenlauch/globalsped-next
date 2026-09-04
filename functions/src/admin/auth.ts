import {
    HttpsError,
    type CallableRequest,
} from "firebase-functions/v2/https";

export type StaffRole =
    | "admin"
    | "viewer";

export type StaffIdentity = {
    uid: string;
    role: StaffRole;
};

export function resolveStaffRole(
    token: Record<string, unknown>,
): StaffRole | null {
    if (
        token.role === "admin" ||
        token.admin === true
    ) {
        return "admin";
    }

    if (token.role === "viewer") {
        return "viewer";
    }

    return null;
}

export function requireStaff(
    request: CallableRequest<unknown>,
): StaffIdentity {
    if (!request.auth) {
        throw new HttpsError(
            "unauthenticated",
            "Für diese Aktion ist eine Anmeldung erforderlich.",
        );
    }

    const role =
        resolveStaffRole(
            request.auth.token,
        );

    if (!role) {
        throw new HttpsError(
            "permission-denied",
            "Für diese Aktion fehlt die Berechtigung.",
        );
    }

    return {
        uid: request.auth.uid,
        role,
    };
}

export function requireAdmin(
    request: CallableRequest<unknown>,
): StaffIdentity {
    const identity =
        requireStaff(request);

    if (identity.role !== "admin") {
        throw new HttpsError(
            "permission-denied",
            "Diese Aktion ist nur für Administratoren erlaubt.",
        );
    }

    return identity;
}