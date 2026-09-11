import {
    FieldValue,
    type DocumentData,
    type DocumentReference,
} from "firebase-admin/firestore";

import type {
    AutoReplySendMode,
} from "./state";

export type AutoReplyTaskClaimResult = {
    claimed: boolean;

    reason:
    | "claimed"
    | "terminal"
    | "stale_task"
    | "not_scheduled";
};

function isRecord(
    value: unknown,
): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

function readAutoReply(
    data: DocumentData,
): Record<string, unknown> {
    return isRecord(
        data.autoReply,
    )
        ? data.autoReply
        : {};
}

function readString(
    value: unknown,
): string | null {
    return typeof value === "string"
        ? value
        : null;
}

function isTerminalStatus(
    status: string | null,
): boolean {
    return (
        status === "sent" ||
        status === "cancelled" ||
        status ===
        "dry_run_completed"
    );
}

/*
 * planned -> scheduled
 *
 * Das Token identifiziert exakt die
 * Cloud Task, die später senden darf.
 */
export async function markAutoReplyTaskScheduled(
    params: {
        leadRef:
        DocumentReference;

        taskToken: string;

        taskName:
        string | null;
    },
): Promise<void> {
    const {
        leadRef,
        taskToken,
        taskName,
    } = params;

    await leadRef.firestore
        .runTransaction(
            async (transaction) => {
                const snapshot =
                    await transaction
                        .get(leadRef);

                if (!snapshot.exists) {
                    throw new Error(
                        "Lead existiert nicht.",
                    );
                }

                const autoReply =
                    readAutoReply(
                        snapshot.data() ??
                        {},
                    );

                const status =
                    readString(
                        autoReply.status,
                    );

                const existingToken =
                    readString(
                        autoReply
                            .taskToken,
                    );

                /*
                 * Idempotenter Retry.
                 */
                if (
                    status ===
                    "scheduled" &&
                    existingToken ===
                    taskToken
                ) {
                    return;
                }

                if (
                    status !==
                    "planned"
                ) {
                    throw new Error(
                        `AutoReply kann aus Status ${String(
                            status,
                        )} nicht geplant werden.`,
                    );
                }

                transaction.update(
                    leadRef,
                    {
                        "autoReply.status":
                            "scheduled",

                        "autoReply.taskToken":
                            taskToken,

                        "autoReply.taskName":
                            taskName,

                        "autoReply.scheduledAt":
                            FieldValue
                                .serverTimestamp(),

                        "autoReply.lastError":
                            null,

                        updatedAt:
                            FieldValue
                                .serverTimestamp(),
                    },
                );
            },
        );
}

/*
 * scheduled -> dispatching
 *
 * Das gespeicherte taskToken schützt
 * insbesondere vor alten Cloud Tasks.
 */
export async function claimAutoReplyDispatch(
    params: {
        leadRef:
        DocumentReference;

        taskToken:
        string;
    },
): Promise<AutoReplyTaskClaimResult> {
    const {
        leadRef,
        taskToken,
    } = params;

    return leadRef.firestore
        .runTransaction(
            async (transaction) => {
                const snapshot =
                    await transaction
                        .get(leadRef);

                if (!snapshot.exists) {
                    throw new Error(
                        "Lead existiert nicht.",
                    );
                }

                const autoReply =
                    readAutoReply(
                        snapshot.data() ??
                        {},
                    );

                const status =
                    readString(
                        autoReply.status,
                    );

                if (
                    isTerminalStatus(
                        status,
                    )
                ) {
                    return {
                        claimed: false,
                        reason:
                            "terminal",
                    };
                }

                const storedToken =
                    readString(
                        autoReply
                            .taskToken,
                    );

                if (
                    storedToken !==
                    taskToken
                ) {
                    return {
                        claimed: false,
                        reason:
                            "stale_task",
                    };
                }

                if (
                    status !==
                    "scheduled"
                ) {
                    return {
                        claimed: false,
                        reason:
                            "not_scheduled",
                    };
                }

                transaction.update(
                    leadRef,
                    {
                        "autoReply.status":
                            "dispatching",

                        "autoReply.dispatchStartedAt":
                            FieldValue
                                .serverTimestamp(),

                        "autoReply.attemptCount":
                            FieldValue
                                .increment(1),

                        updatedAt:
                            FieldValue
                                .serverTimestamp(),
                    },
                );

                return {
                    claimed: true,
                    reason: "claimed",
                };
            },
        );
}

/*
 * dispatching -> sent
 * oder beim Emulator:
 * dispatching -> dry_run_completed
 */
export async function completeAutoReplyDispatch(
    params: {
        leadRef:
        DocumentReference;

        taskToken:
        string;

        mode:
        AutoReplySendMode |
        "dry_run";

        sentByUid?:
        string | null;

        recipientEmail:
        string;

        internalCopyEmail:
        string | null;

        templateVersion:
        string;

        providerMessageId:
        string | null;
    },
): Promise<boolean> {
    const {
        leadRef,
        taskToken,
        mode,
        sentByUid = null,
        recipientEmail,
        internalCopyEmail,
        templateVersion,
        providerMessageId,
    } = params;

    return leadRef.firestore
        .runTransaction(
            async (transaction) => {
                const snapshot =
                    await transaction
                        .get(leadRef);

                if (!snapshot.exists) {
                    throw new Error(
                        "Lead existiert nicht.",
                    );
                }

                const autoReply =
                    readAutoReply(
                        snapshot.data() ??
                        {},
                    );

                const status =
                    readString(
                        autoReply.status,
                    );

                /*
                 * Retry nach bereits
                 * abgeschlossenem Versand.
                 */
                if (
                    isTerminalStatus(
                        status,
                    )
                ) {
                    return false;
                }

                const storedToken =
                    readString(
                        autoReply
                            .taskToken,
                    );

                if (
                    storedToken !==
                    taskToken
                ) {
                    return false;
                }

                if (
                    status !==
                    "dispatching"
                ) {
                    throw new Error(
                        `AutoReply kann aus Status ${String(
                            status,
                        )} nicht abgeschlossen werden.`,
                    );
                }

                if (mode === "dry_run") {
                    transaction.update(
                        leadRef,
                        {
                            "autoReply.status":
                                "dry_run_completed",

                            "autoReply.recipientEmail":
                                recipientEmail,

                            "autoReply.internalCopyEmail":
                                internalCopyEmail,

                            "autoReply.templateVersion":
                                templateVersion,

                            "autoReply.providerMessageId":
                                providerMessageId,

                            "autoReply.lastError":
                                null,

                            updatedAt:
                                FieldValue
                                    .serverTimestamp(),
                        },
                    );

                    return true;
                }

                transaction.update(
                    leadRef,
                    {
                        "autoReply.status":
                            "sent",

                        "autoReply.sentAt":
                            FieldValue
                                .serverTimestamp(),

                        "autoReply.sentMode":
                            mode,

                        "autoReply.sentByUid":
                            sentByUid,

                        "autoReply.recipientEmail":
                            recipientEmail,

                        "autoReply.internalCopyEmail":
                            internalCopyEmail,

                        "autoReply.templateVersion":
                            templateVersion,

                        "autoReply.providerMessageId":
                            providerMessageId,

                        "autoReply.lastError":
                            null,

                        updatedAt:
                            FieldValue
                                .serverTimestamp(),
                    },
                );
                return true;
            },
        );
}

/*
 * scheduled/dispatching -> failed
 *
 * Ein alter Task darf einen neueren
 * Zustand nicht überschreiben.
 */
export async function failAutoReplyDispatch(
    params: {
        leadRef:
        DocumentReference;

        taskToken:
        string;

        error:
        unknown;
    },
): Promise<boolean> {
    const {
        leadRef,
        taskToken,
        error,
    } = params;

    const message =
        error instanceof Error
            ? error.message
            : String(error);

    return leadRef.firestore
        .runTransaction(
            async (transaction) => {
                const snapshot =
                    await transaction
                        .get(leadRef);

                if (!snapshot.exists) {
                    return false;
                }

                const autoReply =
                    readAutoReply(
                        snapshot.data() ??
                        {},
                    );

                const storedToken =
                    readString(
                        autoReply
                            .taskToken,
                    );

                if (
                    storedToken !==
                    taskToken
                ) {
                    return false;
                }

                const status =
                    readString(
                        autoReply.status,
                    );

                if (
                    status !==
                    "scheduled" &&
                    status !==
                    "dispatching"
                ) {
                    return false;
                }

                transaction.update(
                    leadRef,
                    {
                        "autoReply.status":
                            "failed",

                        "autoReply.failedAt":
                            FieldValue
                                .serverTimestamp(),

                        "autoReply.lastError":
                            message.slice(
                                0,
                                1000,
                            ),

                        updatedAt:
                            FieldValue
                                .serverTimestamp(),
                    },
                );

                return true;
            },
        );
}