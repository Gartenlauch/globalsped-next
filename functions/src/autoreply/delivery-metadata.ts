export type AutoReplyDeliveryMetadata = {
    recipientEmail: string;

    internalCopyEmail:
    string | null;

    templateVersion: string;
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

    const type =
        stringValue(
            lead.type,
        );

    const locale =
        stringValue(
            lead.locale,
        ) === "en"
            ? "en"
            : "de";

    let templateVersion:
        string;

    switch (type) {
        case "transport_request":
            templateVersion =
                `transport-${locale}-v1`;
            break;

        case "contact_inquiry":
            templateVersion =
                `contact-${locale}-v1`;
            break;

        default:
            throw new Error(
                `AutoReply wird für Lead-Typ ${String(
                    type,
                )} noch nicht unterstützt.`,
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

        templateVersion,
    };
}