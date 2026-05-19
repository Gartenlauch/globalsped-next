import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

type TransportLeadPayload = {
  locale: string;
  pagePath: string;
  contact: {
    company: string;
    contactPerson: string;
    email: string;
    phone: string;
    country?: string;
    message?: string;
  };
  transport: Record<string, unknown>;
  cargo: Record<string, unknown>;
};

export const submitTransportLead = onCall(
  {
    region: "europe-west3",
    maxInstances: 10,
  },
  async (request) => {
    const data = request.data as TransportLeadPayload;

    if (!data?.contact?.email || !data?.contact?.company || !data?.contact?.contactPerson) {
      throw new HttpsError("invalid-argument", "Pflichtfelder fehlen.");
    }

    const now = admin.firestore.FieldValue.serverTimestamp();

    const leadRef = db.collection("leads").doc();

    const leadData = {
      source: "homepage",
      leadTag: "homepage",
      type: "transport_request",
      status: "new",
      priority: "normal",

      createdAt: now,
      updatedAt: now,

      locale: data.locale || "de",
      pagePath: data.pagePath || "/de/transport-anfrage",

      contact: data.contact,
      transport: data.transport,
      cargo: data.cargo,

      meta: {
        channel: "website",
        formName: "transport_request",
        sourceSystem: "globalsped-next",
      },

      emailStatus: {
        internalQueued: true,
        customerQueued: true,
      },
    };

    await leadRef.set(leadData);

    const internalHtml = buildInternalMailHtml(leadRef.id, leadData);
    const customerHtml = buildCustomerMailHtml(leadData);

    await db.collection("mail").add({
      to: ["logistik@globalsped.de"],
      message: {
        subject: `Neue Transportanfrage von ${data.contact.company}`,
        html: internalHtml,
      },
      leadId: leadRef.id,
      type: "internal_transport_request",
      createdAt: now,
    });

    await db.collection("mail").add({
      to: [data.contact.email],
      message: {
        subject: "Ihre Transportanfrage bei GLOBALSPED",
        html: customerHtml,
      },
      leadId: leadRef.id,
      type: "customer_confirmation",
      createdAt: now,
    });

    return {
      success: true,
      leadId: leadRef.id,
    };
  }
);

function buildInternalMailHtml(leadId: string, lead: any) {
  return `
    <h2>Neue Transportanfrage</h2>
    <p><strong>Lead-ID:</strong> ${leadId}</p>
    <p><strong>Firma:</strong> ${escapeHtml(lead.contact.company)}</p>
    <p><strong>Ansprechpartner:</strong> ${escapeHtml(lead.contact.contactPerson)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(lead.contact.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(lead.contact.phone)}</p>

    <h3>Transportdaten</h3>
    <pre>${escapeHtml(JSON.stringify(lead.transport, null, 2))}</pre>

    <h3>Ladungsdaten</h3>
    <pre>${escapeHtml(JSON.stringify(lead.cargo, null, 2))}</pre>
  `;
}

function buildCustomerMailHtml(lead: any) {
  return `
    <h2>Vielen Dank für Ihre Transportanfrage</h2>
    <p>Sehr geehrte/r ${escapeHtml(lead.contact.contactPerson)},</p>
    <p>wir haben Ihre Anfrage erhalten. Das GLOBALSPED Team prüft die Angaben und meldet sich schnellstmöglich bei Ihnen.</p>
    <p><strong>Firma:</strong> ${escapeHtml(lead.contact.company)}</p>
    <p>Mit freundlichen Grüßen<br/>GLOBALSPED Internationale Logistik</p>
  `;
}

function escapeHtml(value: unknown) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
