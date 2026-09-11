export type AutoReplyDeliveryMetadata = {
    recipientEmail: string;

    internalCopyEmail:
    string | null;

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

function stringValue(
    value: unknown,
): string | null {
    return (
        typeof value === "string" &&
        value.trim()
    )
        ? value.trim()
        : null;
}

export function resolveAutoReplyDeliveryMetadata(
    lead:
        Record<string, unknown>,
): AutoReplyDeliveryMetadata {
    const contact =
        isRecord(
            lead.contact,
        )
            ? lead.contact
            : {};

    const autoReply =
        isRecord(
            lead.autoReply,
        )
            ? lead.autoReply
            : {};

    const recipientEmail =
        stringValue(
            contact.email,
        );

    if (!recipientEmail) {
        throw new Error(
            "Der Lead enthält keine Empfänger-E-Mail-Adresse.",
        );
    }

    return {
        recipientEmail:
            recipientEmail
                .toLowerCase(),

        internalCopyEmail:
            stringValue(
                autoReply
                    .internalCopyEmail,
            )
                ?.toLowerCase() ??
            null,

    };
}