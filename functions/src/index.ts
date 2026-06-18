import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

type TransportUploadedDocument = {
  name: string;
  path: string;
  downloadUrl: string;
  contentType: string;
  size: number;
};

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
  documents?: {
    standardDocs?: TransportUploadedDocument[];
    adrDocs?: TransportUploadedDocument[];
  };
};

export const submitTransportLead = onCall(
  {
    region: "europe-west3",
    maxInstances: 10,
  },
  async (request) => {
    const data = request.data as TransportLeadPayload;

    if (
      !data?.contact?.email ||
      !data?.contact?.company ||
      !data?.contact?.contactPerson
    ) {
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
      documents: {
        standardDocs: data.documents?.standardDocs ?? [],
        adrDocs: data.documents?.adrDocs ?? [],
      },
    };

    await leadRef.set(leadData);

    const internalHtml = buildInternalMailHtml(leadRef.id, leadData);
    const customerHtml = buildCustomerMailHtml(leadData);

    await db.collection("mail").add({
      to: ["transport@globalsped.de"],
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
  },
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

// Bewerbungs Formluar Application

export const submitApplication = onCall(
  {
    region: "europe-west3",
    maxInstances: 10,
  },
  async (request) => {
    const data = request.data;

    if (
      !data?.applicant?.firstName ||
      !data?.applicant?.lastName ||
      !data?.applicant?.email ||
      !data?.applicant?.phone ||
      !data?.application?.desiredPosition ||
      !data?.application?.message
    ) {
      throw new HttpsError("invalid-argument", "Pflichtfelder fehlen.");
    }

    const applicationRef = db
      .collection("applications")
      .doc(data.applicationId);

    const now = admin.firestore.FieldValue.serverTimestamp();

    const applicationData = {
      source: "homepage",
      leadTag: "homepage",
      type: "job_application",
      status: "new",
      priority: "normal",

      createdAt: now,
      updatedAt: now,

      locale: data.locale || "de",
      pagePath: data.pagePath || "/de/jobs/bewerbung",

      applicant: data.applicant,
      application: data.application,
      files: data.files || [],

      meta: {
        channel: "website",
        formName: "application_form",
        sourceSystem: "globalsped-next",
      },

      emailStatus: {
        internalQueued: true,
        applicantQueued: true,
      },
    };

    await applicationRef.set(applicationData);

    await db.collection("mail").add({
      to: ["transport@globalsped.de"],
      message: {
        subject: `Neue Bewerbung von ${data.applicant.firstName} ${data.applicant.lastName}`,
        html: buildInternalApplicationMailHtml(
          applicationRef.id,
          applicationData,
        ),
      },
      applicationId: applicationRef.id,
      type: "internal_job_application",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await db.collection("mail").add({
      to: [data.applicant.email],
      message: {
        subject: "Ihre Bewerbung bei GLOBALSPED",
        html: buildApplicantConfirmationMailHtml(applicationData),
      },
      applicationId: applicationRef.id,
      type: "applicant_confirmation",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      applicationId: applicationRef.id,
    };
  },
);

function buildInternalApplicationMailHtml(applicationId: string, data: any) {
  const fileLinks = Array.isArray(data.files)
    ? data.files
        .map(
          (file: any) =>
            `<li><a href="${escapeHtml(file.downloadUrl)}">${escapeHtml(
              file.name,
            )}</a></li>`,
        )
        .join("")
    : "";

  return `
    <h2>Neue Bewerbung über die Webseite</h2>
    <p><strong>Bewerbungs-ID:</strong> ${escapeHtml(applicationId)}</p>

    <h3>Bewerber</h3>
    <p><strong>Name:</strong> ${escapeHtml(data.applicant.firstName)} ${escapeHtml(
      data.applicant.lastName,
    )}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(data.applicant.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(data.applicant.phone)}</p>
    <p><strong>Wohnort:</strong> ${escapeHtml(data.applicant.location)}</p>

    <h3>Bewerbung</h3>
    <p><strong>Gewünschte Position:</strong> ${escapeHtml(
      data.application.desiredPosition,
    )}</p>
    <p><strong>Berufserfahrung:</strong> ${escapeHtml(
      data.application.experience,
    )}</p>
    <p><strong>Eintrittstermin:</strong> ${escapeHtml(
      data.application.earliestStart,
    )}</p>
    <p><strong>Gehaltsvorstellung:</strong> ${escapeHtml(
      data.application.salaryExpectation,
    )}</p>
    <p><strong>Sprachen:</strong> ${escapeHtml(data.application.languages)}</p>
    <p><strong>Führerschein:</strong> ${escapeHtml(
      data.application.hasDrivingLicense,
    )}</p>

    <h3>Nachricht</h3>
    <p>${escapeHtml(data.application.message)}</p>

    <h3>Dateien</h3>
    <ul>${fileLinks}</ul>
  `;
}

function buildApplicantConfirmationMailHtml(data: any) {
  return `
    <h2>Vielen Dank für Ihre Bewerbung</h2>
    <p>Sehr geehrte/r ${escapeHtml(data.applicant.firstName)} ${escapeHtml(
      data.applicant.lastName,
    )},</p>
    <p>wir haben Ihre Bewerbung erhalten. Das GLOBALSPED Team prüft Ihre Unterlagen und meldet sich schnellstmöglich bei Ihnen.</p>
    <p>Mit freundlichen Grüßen<br/>GLOBALSPED Internationale Logistik</p>
  `;
}

// Contact Form ------------------------------------------------


type ContactInquiryPayload = {
  locale?: string;
  pagePath?: string;
  contact?: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
  meta?: {
    honeypot?: string;
    userAgent?: string;
  };
};

export const submitContactInquiry = onCall(
  {
    region: "europe-west3",
    maxInstances: 10,
  },
  async (request) => {
    const data = request.data as ContactInquiryPayload;
    const contact = data.contact ?? {};

    // Einfacher Honeypot gegen primitive Bots.
    // Wenn das versteckte Feld gefüllt ist, tun wir nach außen so,
    // als wäre alles erfolgreich, speichern aber nichts.
    if (data.meta?.honeypot) {
      return {
        success: true,
        ignored: true,
      };
    }

    if (!contact.name || !contact.email || !contact.message) {
      throw new HttpsError("invalid-argument", "Pflichtfelder fehlen.");
    }

    if (!isValidEmail(contact.email)) {
      throw new HttpsError("invalid-argument", "Ungültige E-Mail-Adresse.");
    }

    const now = admin.firestore.FieldValue.serverTimestamp();
    const contactRef = db.collection("leads").doc();

    const contactData = {
      source: "homepage",
      leadTag: "homepage",
      type: "contact_inquiry",
      status: "new",
      priority: "normal",
      createdAt: now,
      updatedAt: now,
      locale: data.locale || "de",
      pagePath: data.pagePath || "/de#kontakt",
      contact: {
        name: contact.name,
        company: contact.company || "",
        email: contact.email,
        phone: contact.phone || "",
        message: contact.message,
      },
      meta: {
        channel: "website",
        formName: "contact_form",
        sourceSystem: "globalsped-next",
        userAgent: data.meta?.userAgent || "",
      },
      emailStatus: {
        internalQueued: true,
        customerQueued: true,
      },
    };

    await contactRef.set(contactData);

    await db.collection("mail").add({
      to: ["transport@globalsped.de"],
      message: {
        subject: `Neue Kontaktanfrage von ${contact.name}`,
        html: buildInternalContactMailHtml(contactRef.id, contactData),
      },
      leadId: contactRef.id,
      type: "internal_contact_inquiry",
      createdAt: now,
    });

    await db.collection("mail").add({
      to: [contact.email],
      message: {
        subject: "Ihre Kontaktanfrage bei GLOBALSPED",
        html: buildContactConfirmationMailHtml(contactData),
      },
      leadId: contactRef.id,
      type: "customer_contact_confirmation",
      createdAt: now,
    });

    return {
      success: true,
      leadId: contactRef.id,
    };
  }
);

function buildInternalContactMailHtml(leadId: string, data: any) {
  return `
    <h2>Neue Kontaktanfrage über die Webseite</h2>

    <p><strong>Lead-ID:</strong> ${escapeHtml(leadId)}</p>

    <h3>Kontaktdaten</h3>
    <p><strong>Name:</strong> ${escapeHtml(data.contact.name)}</p>
    <p><strong>Firma:</strong> ${escapeHtml(data.contact.company)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(data.contact.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(data.contact.phone)}</p>

    <h3>Nachricht</h3>
    <p>${escapeHtml(data.contact.message).replace(/\n/g, "<br />")}</p>

    <h3>Meta</h3>
    <p><strong>Sprache:</strong> ${escapeHtml(data.locale)}</p>
    <p><strong>Seite:</strong> ${escapeHtml(data.pagePath)}</p>
  `;
}

function buildContactConfirmationMailHtml(data: any) {
  return `
    <h2>Vielen Dank für Ihre Kontaktanfrage</h2>

    <p>Sehr geehrte/r ${escapeHtml(data.contact.name)},</p>

    <p>
      wir haben Ihre Nachricht erhalten. Das GLOBALSPED Team prüft Ihre Anfrage
      und meldet sich schnellstmöglich bei Ihnen.
    </p>

    <p><strong>Ihre Nachricht:</strong></p>
    <p>${escapeHtml(data.contact.message).replace(/\n/g, "<br />")}</p>

    <p>Mit freundlichen Grüßen<br />GLOBALSPED Internationale Logistik</p>
  `;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
