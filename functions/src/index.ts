import { onCall, HttpsError } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

type LeadAttribution = {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  landingPage: string;
  referrer: string | null;
  capturedAt: string;
};

type OfflineConversionType = "qualifyLead" | "closeConvertLead";

type ConversionUploadState =
  | "not_ready"
  | "pending"
  | "uploaded"
  | "failed";

type ConversionUploadStatus = Record<
  OfflineConversionType,
  ConversionUploadState
>;

type ConversionUploadAttempts = Record<OfflineConversionType, number>;

type ConversionUploadErrors = Record<
  OfflineConversionType,
  string | null
>;

type InitialLeadConversionFields = {
  qualifiedAt: null;
  convertedAt: null;
  conversionUploadStatus: ConversionUploadStatus;
  conversionUploadAttempts: ConversionUploadAttempts;
  conversionUploadError: ConversionUploadErrors;
};

function createInitialLeadConversionFields(): InitialLeadConversionFields {
  return {
    qualifiedAt: null,
    convertedAt: null,

    conversionUploadStatus: {
      qualifyLead: "not_ready",
      closeConvertLead: "not_ready",
    },

    conversionUploadAttempts: {
      qualifyLead: 0,
      closeConvertLead: 0,
    },

    conversionUploadError: {
      qualifyLead: null,
      closeConvertLead: null,
    },
  };
}

function normalizeOptionalString(
  value: unknown,
  maxLength = 500,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();

  if (!normalized) {
    return null;
  }

  return normalized.slice(0, maxLength);
}

function normalizeAttribution(value: unknown): LeadAttribution | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const attribution = value as Record<string, unknown>;

  const landingPage = normalizeOptionalString(
    attribution.landingPage,
    2_000,
  );

  const capturedAt = normalizeOptionalString(
    attribution.capturedAt,
    100,
  );

  if (!landingPage || !capturedAt) {
    return null;
  }

  const capturedDate = new Date(capturedAt);

  if (Number.isNaN(capturedDate.getTime())) {
    return null;
  }

  const normalized: LeadAttribution = {
    gclid: normalizeOptionalString(attribution.gclid),
    gbraid: normalizeOptionalString(attribution.gbraid),
    wbraid: normalizeOptionalString(attribution.wbraid),
    utmSource: normalizeOptionalString(attribution.utmSource),
    utmMedium: normalizeOptionalString(attribution.utmMedium),
    utmCampaign: normalizeOptionalString(attribution.utmCampaign),
    utmContent: normalizeOptionalString(attribution.utmContent),
    utmTerm: normalizeOptionalString(attribution.utmTerm),
    landingPage,
    referrer: normalizeOptionalString(attribution.referrer, 2_000),
    capturedAt: capturedDate.toISOString(),
  };

  const hasCampaignInformation = Boolean(
    normalized.gclid ||
    normalized.gbraid ||
    normalized.wbraid ||
    normalized.utmSource ||
    normalized.utmMedium ||
    normalized.utmCampaign ||
    normalized.utmContent ||
    normalized.utmTerm,
  );

  return hasCampaignInformation ? normalized : null;
}
/* -------------------------------------------------------------------------- */
/* Gemeinsame Typen                                                            */
/* -------------------------------------------------------------------------- */

type TransportUploadedDocument = {
  name: string;
  path: string;
  downloadUrl: string;
  contentType: string;
  size: number;
};

type TransportLeadPayload = {
  locale?: string;
  pagePath?: string;
  attribution?: LeadAttribution | null;
  contact: {
    company: string;
    contactPerson: string;
    email: string;
    phone: string;
    country?: string;
    message?: string;
  };

  transport?: Record<string, unknown>;
  cargo?: Record<string, unknown>;

  documents?: {
    standardDocs?: TransportUploadedDocument[];
    adrDocs?: TransportUploadedDocument[];
  };

  /*
   * Fallback-Felder:
   * Falls das Frontend Nachricht oder Dokumente aktuell auf oberster Ebene
   * übermittelt, werden sie ebenfalls verarbeitet.
   */
  message?: string;
  standardDocs?: TransportUploadedDocument[];
  adrDocs?: TransportUploadedDocument[];
};

/* -------------------------------------------------------------------------- */
/* Allgemeine Hilfsfunktionen                                                  */
/* -------------------------------------------------------------------------- */

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeDocuments(
  documents: TransportUploadedDocument[] | TransportUploadedDocument | null | undefined,
): TransportUploadedDocument[] {
  if (!documents) {
    return [];
  }

  if (Array.isArray(documents)) {
    return documents.filter(
      (document): document is TransportUploadedDocument => Boolean(document),
    );
  }

  return [documents];
}

function getDocumentUrl(document: unknown): string | null {
  if (!document) {
    return null;
  }

  if (typeof document === "string") {
    return document;
  }

  if (
    typeof document === "object" &&
    "downloadUrl" in document &&
    typeof document.downloadUrl === "string"
  ) {
    return document.downloadUrl;
  }

  return null;
}

function getDocumentLabel(document: unknown, index: number): string {
  if (!document || typeof document === "string") {
    return `Dokument ${index + 1}`;
  }

  if (typeof document !== "object") {
    return `Dokument ${index + 1}`;
  }

  const record = document as Record<string, unknown>;

  const possibleNames = [
    record.name,
    record.fileName,
    record.filename,
    record.originalName,
  ];

  const label = possibleNames.find(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0,
  );

  return label ?? `Dokument ${index + 1}`;
}

function buildDocumentLinks(
  title: string,
  documents: TransportUploadedDocument[],
): string {
  if (documents.length === 0) {
    return `
      <h4>${escapeHtml(title)}</h4>
      <p>Keine Dokumente</p>
    `;
  }

  const links = documents
    .map((document, index) => {
      const url = getDocumentUrl(document);
      const label = getDocumentLabel(document, index);

      if (!url) {
        return `
          <li>
            ${escapeHtml(label)} – kein Download-Link vorhanden
          </li>
        `;
      }

      return `
        <li>
          <a
            href="${escapeHtml(url)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${escapeHtml(label)}
          </a>
        </li>
      `;
    })
    .join("");

  return `
    <h4>${escapeHtml(title)}</h4>
    <ul>
      ${links}
    </ul>
  `;
}

/* -------------------------------------------------------------------------- */
/* Transportanfrage                                                            */
/* -------------------------------------------------------------------------- */
const FUNCTION_VERSION = "transport-mail-2026-07-17-v3";
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
      throw new HttpsError(
        "invalid-argument",
        "Pflichtfelder fehlen.",
      );
    }

    if (!isValidEmail(data.contact.email)) {
      throw new HttpsError(
        "invalid-argument",
        "Ungültige E-Mail-Adresse.",
      );
    }

    /*
     * Nachricht normalisieren.
     *
     * Bevorzugter Pfad:
     * data.contact.message
     *
     * Fallback:
     * data.message
     */
    const normalizedMessage =
      data.contact.message ??
      data.message ??
      "";

    /*
     * Dokumente normalisieren.
     *
     * Bevorzugte Pfade:
     * data.documents.standardDocs
     * data.documents.adrDocs
     *
     * Fallback:
     * data.standardDocs
     * data.adrDocs
     */
    const normalizedStandardDocs = normalizeDocuments(
      data.documents?.standardDocs ??
      data.standardDocs,
    );

    const normalizedAdrDocs = normalizeDocuments(
      data.documents?.adrDocs ??
      data.adrDocs,
    );

    logger.info("Transportanfrage empfangen", {
      structuredData: true,

      locale: data.locale ?? "de",
      pagePath: data.pagePath ?? "/de/transport-anfrage",

      message: {
        exists: normalizedMessage.trim().length > 0,
        length: normalizedMessage.length,
        receivedInContact: Boolean(data.contact.message),
        receivedAtTopLevel: Boolean(data.message),
      },

      documents: {
        documentsObjectExists: Boolean(data.documents),

        standardDocsCount: normalizedStandardDocs.length,
        adrDocsCount: normalizedAdrDocs.length,

        standardDocs: normalizedStandardDocs.map((document) => ({
          name: document.name,
          path: document.path,
          hasDownloadUrl: Boolean(document.downloadUrl),
          contentType: document.contentType,
          size: document.size,
        })),

        adrDocs: normalizedAdrDocs.map((document) => ({
          name: document.name,
          path: document.path,
          hasDownloadUrl: Boolean(document.downloadUrl),
          contentType: document.contentType,
          size: document.size,
        })),
      },
    });

    const now = admin.firestore.FieldValue.serverTimestamp();
    const leadRef = db.collection("leads").doc();


    const leadData = {
      functionVersion: FUNCTION_VERSION,
      source: "homepage",
      leadTag: "homepage",
      type: "transport_request",
      status: "new",
      priority: "normal",

      ...createInitialLeadConversionFields(),

      createdAt: now,
      updatedAt: now,

      locale: data.locale || "de",
      pagePath: data.pagePath || "/de/transport-anfrage",
      attribution: normalizeAttribution(data.attribution),

      contact: {
        ...data.contact,
        message: normalizedMessage,
      },

      transport: data.transport ?? {},
      cargo: data.cargo ?? {},

      documents: {
        standardDocs: normalizedStandardDocs,
        adrDocs: normalizedAdrDocs,
      },

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

    const internalHtml = buildInternalMailHtml(
      leadRef.id,
      leadData,
    );

    const customerHtml = buildCustomerMailHtml(leadData);

    logger.info("Transport-E-Mail wird in Firestore eingestellt", {
      structuredData: true,
      leadId: leadRef.id,

      message: {
        exists: normalizedMessage.trim().length > 0,
        length: normalizedMessage.length,
      },

      documents: {
        standardDocsCount: normalizedStandardDocs.length,
        adrDocsCount: normalizedAdrDocs.length,
      },
    });

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

    logger.info("Transportanfrage erfolgreich verarbeitet", {
      structuredData: true,
      leadId: leadRef.id,
    });

    return {
      success: true,
      leadId: leadRef.id,
    };
  },
);

function buildInternalMailHtml(
  leadId: string,
  lead: {
    contact: {
      company?: string;
      contactPerson?: string;
      email?: string;
      phone?: string;
      country?: string;
      message?: string;
    };
    transport?: Record<string, unknown>;
    cargo?: Record<string, unknown>;
    documents?: {
      standardDocs?: TransportUploadedDocument[];
      adrDocs?: TransportUploadedDocument[];
    };
  },
): string {
  const message = lead.contact?.message ?? "";

  const standardDocs = normalizeDocuments(
    lead.documents?.standardDocs,
  );

  const adrDocs = normalizeDocuments(
    lead.documents?.adrDocs,
  );

  const formattedMessage = message.trim()
    ? escapeHtml(message).replace(/\r?\n/g, "<br />")
    : "Keine Nachricht angegeben";

  return `
    <h2>Neue Transportanfrage</h2>

    <p>
      <strong>Lead-ID:</strong>
      ${escapeHtml(leadId)}
    </p>
    <p>
  <strong>Function-Version:</strong>
  ${escapeHtml(FUNCTION_VERSION)}
</p>

    <h3>Kontaktdaten</h3>

    <p>
      <strong>Firma:</strong>
      ${escapeHtml(lead.contact.company)}
    </p>

    <p>
      <strong>Ansprechpartner:</strong>
      ${escapeHtml(lead.contact.contactPerson)}
    </p>

    <p>
      <strong>E-Mail:</strong>
      ${escapeHtml(lead.contact.email)}
    </p>

    <p>
      <strong>Telefon:</strong>
      ${escapeHtml(lead.contact.phone)}
    </p>

    <p>
      <strong>Land:</strong>
      ${escapeHtml(lead.contact.country)}
    </p>

    <h3>Nachricht</h3>

    <p>
      ${formattedMessage}
    </p>

    <h3>Transportdaten</h3>

    <pre style="
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 12px;
      border-radius: 4px;
    ">${escapeHtml(
    JSON.stringify(lead.transport ?? {}, null, 2),
  )}</pre>

    <h3>Ladungsdaten</h3>

    <pre style="
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 12px;
      border-radius: 4px;
    ">${escapeHtml(
    JSON.stringify(lead.cargo ?? {}, null, 2),
  )}</pre>

    <h3>Dokumente</h3>

    ${buildDocumentLinks(
    "Standard-Dokumente",
    standardDocs,
  )}

    ${buildDocumentLinks(
    "ADR-Dokumente",
    adrDocs,
  )}
  `;
}

function buildCustomerMailHtml(lead: {
  contact: {
    company?: string;
    contactPerson?: string;
    message?: string;
  };
}): string {
  const message = lead.contact.message ?? "";

  const messageHtml = message.trim()
    ? `
      <p><strong>Ihre Nachricht:</strong></p>
      <p>
        ${escapeHtml(message).replace(/\r?\n/g, "<br />")}
      </p>
    `
    : "";

  return `
    <h2>Vielen Dank für Ihre Transportanfrage</h2>

    <p>
      Sehr geehrte/r ${escapeHtml(lead.contact.contactPerson)},
    </p>

    <p>
      wir haben Ihre Anfrage erhalten. Das GLOBALSPED Team prüft
      Ihre Angaben und meldet sich schnellstmöglich bei Ihnen.
    </p>

    <p>
      <strong>Firma:</strong>
      ${escapeHtml(lead.contact.company)}
    </p>

    ${messageHtml}

    <p>
      Mit freundlichen Grüßen<br />
      GLOBALSPED Internationale Logistik
    </p>
  `;
}

/* -------------------------------------------------------------------------- */
/* Bewerbungsformular                                                          */
/* -------------------------------------------------------------------------- */

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
      throw new HttpsError(
        "invalid-argument",
        "Pflichtfelder fehlen.",
      );
    }

    if (!isValidEmail(data.applicant.email)) {
      throw new HttpsError(
        "invalid-argument",
        "Ungültige E-Mail-Adresse.",
      );
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
        subject:
          `Neue Bewerbung von ` +
          `${data.applicant.firstName} ${data.applicant.lastName}`,

        html: buildInternalApplicationMailHtml(
          applicationRef.id,
          applicationData,
        ),
      },

      applicationId: applicationRef.id,
      type: "internal_job_application",
      createdAt: now,
    });

    await db.collection("mail").add({
      to: [data.applicant.email],

      message: {
        subject: "Ihre Bewerbung bei GLOBALSPED",
        html: buildApplicantConfirmationMailHtml(applicationData),
      },

      applicationId: applicationRef.id,
      type: "applicant_confirmation",
      createdAt: now,
    });

    logger.info("Bewerbung erfolgreich verarbeitet", {
      structuredData: true,
      applicationId: applicationRef.id,
      filesCount: Array.isArray(data.files)
        ? data.files.length
        : 0,
    });

    return {
      success: true,
      applicationId: applicationRef.id,
    };
  },
);

function buildInternalApplicationMailHtml(
  applicationId: string,
  data: any,
): string {
  const files = Array.isArray(data.files)
    ? data.files
    : [];

  const fileLinks = files.length
    ? files
      .map((file: any, index: number) => {
        const label =
          file?.name ||
          file?.fileName ||
          `Datei ${index + 1}`;

        const url = file?.downloadUrl;

        if (!url) {
          return `
              <li>
                ${escapeHtml(label)} – kein Download-Link vorhanden
              </li>
            `;
        }

        return `
            <li>
              <a
                href="${escapeHtml(url)}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${escapeHtml(label)}
              </a>
            </li>
          `;
      })
      .join("")
    : "<li>Keine Dateien</li>";

  return `
    <h2>Neue Bewerbung über die Webseite</h2>

    <p>
      <strong>Bewerbungs-ID:</strong>
      ${escapeHtml(applicationId)}
    </p>

    <h3>Bewerber</h3>

    <p>
      <strong>Name:</strong>
      ${escapeHtml(data.applicant.firstName)}
      ${escapeHtml(data.applicant.lastName)}
    </p>

    <p>
      <strong>E-Mail:</strong>
      ${escapeHtml(data.applicant.email)}
    </p>

    <p>
      <strong>Telefon:</strong>
      ${escapeHtml(data.applicant.phone)}
    </p>

    <p>
      <strong>Wohnort:</strong>
      ${escapeHtml(data.applicant.location)}
    </p>

    <h3>Bewerbung</h3>

    <p>
      <strong>Gewünschte Position:</strong>
      ${escapeHtml(data.application.desiredPosition)}
    </p>

    <p>
      <strong>Berufserfahrung:</strong>
      ${escapeHtml(data.application.experience)}
    </p>

    <p>
      <strong>Eintrittstermin:</strong>
      ${escapeHtml(data.application.earliestStart)}
    </p>

    <p>
      <strong>Gehaltsvorstellung:</strong>
      ${escapeHtml(data.application.salaryExpectation)}
    </p>

    <p>
      <strong>Sprachen:</strong>
      ${escapeHtml(data.application.languages)}
    </p>

    <p>
      <strong>Führerschein:</strong>
      ${escapeHtml(data.application.hasDrivingLicense)}
    </p>

    <h3>Nachricht</h3>

    <p>
      ${escapeHtml(data.application.message).replace(
    /\r?\n/g,
    "<br />",
  )}
    </p>

    <h3>Dateien</h3>

    <ul>
      ${fileLinks}
    </ul>
  `;
}

function buildApplicantConfirmationMailHtml(data: any): string {
  return `
    <h2>Vielen Dank für Ihre Bewerbung</h2>

    <p>
      Sehr geehrte/r
      ${escapeHtml(data.applicant.firstName)}
      ${escapeHtml(data.applicant.lastName)},
    </p>

    <p>
      wir haben Ihre Bewerbung erhalten. Das GLOBALSPED Team prüft
      Ihre Unterlagen und meldet sich schnellstmöglich bei Ihnen.
    </p>

    <p>
      Mit freundlichen Grüßen<br />
      GLOBALSPED Internationale Logistik
    </p>
  `;
}

/* -------------------------------------------------------------------------- */
/* Kontaktformular                                                             */
/* -------------------------------------------------------------------------- */

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

    /*
     * Einfacher Honeypot gegen primitive Bots.
     *
     * Wenn das versteckte Feld ausgefüllt ist, wird nach außen ein
     * erfolgreicher Request zurückgegeben, aber nichts gespeichert.
     */
    if (data.meta?.honeypot) {
      logger.warn("Kontaktanfrage durch Honeypot ignoriert", {
        structuredData: true,
      });

      return {
        success: true,
        ignored: true,
      };
    }

    if (
      !contact.name ||
      !contact.email ||
      !contact.message
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Pflichtfelder fehlen.",
      );
    }

    if (!isValidEmail(contact.email)) {
      throw new HttpsError(
        "invalid-argument",
        "Ungültige E-Mail-Adresse.",
      );
    }

    const now = admin.firestore.FieldValue.serverTimestamp();
    const contactRef = db.collection("leads").doc();

    const contactData = {
      source: "homepage",
      leadTag: "homepage",
      type: "contact_inquiry",
      status: "new",
      priority: "normal",

      ...createInitialLeadConversionFields(),
      
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
        html: buildInternalContactMailHtml(
          contactRef.id,
          contactData,
        ),
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

    logger.info("Kontaktanfrage erfolgreich verarbeitet", {
      structuredData: true,
      leadId: contactRef.id,
    });

    return {
      success: true,
      leadId: contactRef.id,
    };
  },
);

function buildInternalContactMailHtml(
  leadId: string,
  data: any,
): string {
  return `
    <h2>Neue Kontaktanfrage über die Webseite</h2>

    <p>
      <strong>Lead-ID:</strong>
      ${escapeHtml(leadId)}
    </p>

    <h3>Kontaktdaten</h3>

    <p>
      <strong>Name:</strong>
      ${escapeHtml(data.contact.name)}
    </p>

    <p>
      <strong>Firma:</strong>
      ${escapeHtml(data.contact.company)}
    </p>

    <p>
      <strong>E-Mail:</strong>
      ${escapeHtml(data.contact.email)}
    </p>

    <p>
      <strong>Telefon:</strong>
      ${escapeHtml(data.contact.phone)}
    </p>

    <h3>Nachricht</h3>

    <p>
      ${escapeHtml(data.contact.message).replace(
    /\r?\n/g,
    "<br />",
  )}
    </p>

    <h3>Meta</h3>

    <p>
      <strong>Sprache:</strong>
      ${escapeHtml(data.locale)}
    </p>

    <p>
      <strong>Seite:</strong>
      ${escapeHtml(data.pagePath)}
    </p>
  `;
}

function buildContactConfirmationMailHtml(data: any): string {
  return `
    <h2>Vielen Dank für Ihre Kontaktanfrage</h2>

    <p>
      Sehr geehrte/r ${escapeHtml(data.contact.name)},
    </p>

    <p>
      wir haben Ihre Nachricht erhalten. Das GLOBALSPED Team prüft
      Ihre Anfrage und meldet sich schnellstmöglich bei Ihnen.
    </p>

    <p>
      <strong>Ihre Nachricht:</strong>
    </p>

    <p>
      ${escapeHtml(data.contact.message).replace(
    /\r?\n/g,
    "<br />",
  )}
    </p>

    <p>
      Mit freundlichen Grüßen<br />
      GLOBALSPED Internationale Logistik
    </p>
  `;
}