export type RenderedAutoReplyMessage = {
    locale: "de" | "en";
    templateVersion: string;
    subject: string;
    html: string;
    text: string;
};

export type AutoReplyRenderOptions = {
    employeeImageCid?: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string {
    return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function escapeHtml(value: string): string {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Pure rendering: use only the lead and its saved assignment snapshot.
export function renderAutoReplyMessage(
    lead: Record<string, unknown>,
    options: AutoReplyRenderOptions = {},
): RenderedAutoReplyMessage {
    const type = stringValue(lead.type);
    if (type !== "transport_request" && type !== "contact_inquiry") {
        throw new Error("AutoReply unterstützt nur Transport- und Kontaktanfragen.");
    }
    const locale = stringValue(lead.locale) === "en" ? "en" : "de";
    const en = locale === "en";
    const transportRequest = type === "transport_request";
    const assignment = isRecord(lead.assignment) ? lead.assignment : {};
    const assignee = isRecord(assignment.assignee) ? assignment.assignee : {};
    const displayName = stringValue(assignee.displayName);
    if (!displayName) {
        throw new Error("Der Lead benötigt einen gespeicherten Bearbeiter mit gültigem Anzeigenamen (displayName).");
    }
    const salutation = stringValue(en ? assignee.salutationEn : assignee.salutationDe);
    const validSalutation = (en ? ["Mr", "Ms"] : ["Herr", "Frau"]).includes(salutation) ? salutation : "";
    const employeeName = [validSalutation, displayName].filter(Boolean).join(" ");
    const contact = isRecord(lead.contact) ? lead.contact : {};
    const name = stringValue(transportRequest ? contact.contactPerson : contact.name);
    const subject = transportRequest
        ? (en ? "Your transport enquiry at GLOBALSPED" : "Ihre Transportanfrage bei GLOBALSPED")
        : (en ? "Your enquiry at GLOBALSPED" : "Ihre Kontaktanfrage bei GLOBALSPED");
    const greeting = en ? (name ? `${transportRequest ? "Dear" : "Hello"} ${name},` : "Hello,")
        : (name ? `Guten Tag ${name},` : "Guten Tag,");
    const thanks = transportRequest
        ? (en ? "Thank you for your transport enquiry to GLOBALSPED." : "vielen Dank für Ihre Transportanfrage an GLOBALSPED.")
        : (en ? "Thank you for contacting GLOBALSPED." : "vielen Dank für Ihre Nachricht an GLOBALSPED.");
    const assigned = en
        ? `Your ${transportRequest ? "request" : "enquiry"} has been assigned to a dedicated contact person from our team.`
        : "Ihre Anfrage wurde einem persönlichen Ansprechpartner aus unserem Team zugeordnet.";
    const handling = transportRequest
        ? (en
            ? `${employeeName} will review the available transport options for your request and will get back to you shortly.`
            : `${employeeName} prüft die Transportmöglichkeiten für Ihre Anfrage und wird sich in Kürze bei Ihnen melden.`)
        : (en
            ? `${employeeName} will take care of your enquiry and will get back to you shortly.`
            : `${employeeName} kümmert sich um Ihr Anliegen und wird sich in Kürze bei Ihnen melden.`);
    const contactIntro = en
        ? "If you have any questions, you can contact your dedicated contact person directly using the details below."
        : "Bei Rückfragen erreichen Sie Ihren Ansprechpartner direkt über die folgenden Kontaktdaten.";
    const phone = stringValue(assignee.phone);
    const email = stringValue(assignee.email);
    const jobTitle = stringValue(assignee.jobTitle);
    const employeeLines = [employeeName, jobTitle,
        phone ? `${en ? "Phone" : "Telefon"}: ${phone}` : "",
        email ? `${en ? "Email" : "E-Mail"}: ${email}` : ""].filter(Boolean);
    const closing = en ? "Kind regards" : "Mit freundlichen Grüßen";
    const team = en ? "Your GLOBALSPED Team" : "Ihr GLOBALSPED Team";
    const text = [greeting, thanks, assigned, handling, contactIntro,
        employeeLines.join("\n"), closing, team].join("\n\n");
    const paragraph = (value: string) => `<p style="margin:0 0 20px;line-height:1.65">${escapeHtml(value)}</p>`;
    const imageCell = options.employeeImageCid
        ? `<td width="100" valign="top" style="width:100px;padding:0 20px 0 0;vertical-align:top"><img src="cid:${escapeHtml(options.employeeImageCid)}" alt="${en ? "Contact person" : "Ansprechpartner"}" width="100" style="display:block;width:100px;max-width:100px;height:auto;border-radius:10px;border:1px solid #dfe7e1"></td>`
        : "";
    const phoneTarget = phone.replace(/[^+0-9]/g, "");
    const phoneHtml = phone
        ? `<div style="margin:0;line-height:1.7">${en ? "Phone" : "Telefon"}: ${/\d/.test(phoneTarget) ? `<a href="tel:${escapeHtml(phoneTarget)}" style="color:#003b2f;text-decoration:none">${escapeHtml(phone)}</a>` : escapeHtml(phone)}</div>`
        : "";
    const emailHtml = email
        ? `<div style="margin:0;line-height:1.7">${en ? "Email" : "E-Mail"}: <a href="mailto:${escapeHtml(encodeURIComponent(email))}" style="color:#003b2f;text-decoration:none;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(email)}</a></div>`
        : "";
    const contactHtml = phoneHtml || emailHtml
        ? `<div style="margin:14px 0 0;font-size:13px;color:#003b2f">${phoneHtml}${emailHtml}</div>`
        : "";
    const employeeCard = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;margin:0 0 24px;background:#f7f7f2;border:1px solid #dfe7e1;border-top:3px solid #6b9f12;border-radius:12px"><tr><td style="padding:24px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed"><tr>${imageCell}<td valign="top" style="padding:0;vertical-align:top;overflow-wrap:anywhere;word-break:break-word">
<p style="margin:0 0 8px;font-size:10px;line-height:1.5;letter-spacing:1.2px;color:#6b9f12;font-weight:700">${en ? "YOUR CONTACT PERSON" : "IHR ANSPRECHPARTNER"}</p>
<p style="margin:0;font-size:18px;line-height:1.4;font-weight:700;color:#00281f">${escapeHtml(employeeName)}</p>
${jobTitle ? `<p style="margin:5px 0 0;font-size:14px;line-height:1.5;color:#003b2f">${escapeHtml(jobTitle)}</p>` : ""}${contactHtml}
</td></tr></table></td></tr></table>`;
    const html = `<!doctype html>
<html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:20px 8px;background:#f7f7f2;color:#00281f;font-family:Arial,Helvetica,sans-serif;font-size:16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;text-align:left">
<tr><td style="padding:22px 24px;background:#003b2f;border-bottom:3px solid #6b9f12;color:#ffffff;font-size:22px;font-weight:bold;letter-spacing:2px">GLOBALSPED</td></tr>
<tr><td style="padding:28px 24px;overflow-wrap:anywhere">
${paragraph(greeting)}${paragraph(thanks)}${paragraph(assigned)}${paragraph(handling)}${paragraph(contactIntro)}${employeeCard}${paragraph(closing)}
<p style="margin:0;line-height:1.65">${escapeHtml(team)}</p>
</td></tr></table></td></tr></table></body></html>`;
    return {locale, templateVersion: `${transportRequest ? "transport" : "contact"}-${locale}-v1`, subject, html, text};
}
