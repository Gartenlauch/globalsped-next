import {
    EMPLOYEE_PHOTO_CONTENT_ID,
    prepareAutoReplyInlineAttachments,
    type AutoReplyInlineAttachment,
} from "./message-attachments";
import {renderAutoReplyMessage, type RenderedAutoReplyMessage} from "./message-renderer";

export type PreparedAutoReplyMessage = RenderedAutoReplyMessage & {
    inlineAttachments: AutoReplyInlineAttachment[];
};

export async function prepareAutoReplyMessage(
    lead: Record<string, unknown>,
): Promise<PreparedAutoReplyMessage> {
    const inlineAttachments = await prepareAutoReplyInlineAttachments(lead);
    const message = renderAutoReplyMessage(lead, {
        employeeImageCid: inlineAttachments.length ? EMPLOYEE_PHOTO_CONTENT_ID : null,
    });
    return {...message, inlineAttachments};
}
