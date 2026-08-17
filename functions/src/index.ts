import { createHash } from "node:crypto";

import { v1 as dataManager } from "@google-ads/datamanager";
import { logger } from "firebase-functions";
import { defineString } from "firebase-functions/params";
import { onCall, HttpsError, type CallableRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { buildInternalTransportMailHtml, TransportUploadedDocument } from "./mail/transport-mail-template";
admin.initializeApp();

const db = admin.firestore();

const GOOGLE_ADS_CUSTOMER_ID = defineString(
  "GOOGLE_ADS_CUSTOMER_ID",
);

const GOOGLE_ADS_QUALIFIED_LEAD_CONVERSION_ID = defineString(
  "GOOGLE_ADS_QUALIFIED_LEAD_CONVERSION_ID",
);

const GOOGLE_ADS_WON_LEAD_CONVERSION_ID = defineString(
  "GOOGLE_ADS_WON_LEAD_CONVERSION_ID",
);

function sha256Hex(value: string): string {
  return createHash("sha256")
    .update(value.trim().toLowerCase(), "utf8")
    .digest("hex");
}

function normalizeGoogleAdsCustomerId(
  value: string,
): string {
  return value.replace(/\D/g, "");
}

type GoogleAdsConversionKind =
  | "qualifiedLead"
  | "wonLead";

type GoogleAdsConversionConfig = {
  kind: GoogleAdsConversionKind;
  conversionActionId: string;
};

type GoogleAdsValidationResult = {
  kind: GoogleAdsConversionKind;
  conversionActionId: string;
  valid: boolean;
};

function getGoogleAdsCustomerId(): string {
  const customerId = normalizeGoogleAdsCustomerId(
    GOOGLE_ADS_CUSTOMER_ID.value(),
  );

  if (!customerId) {
    throw new Error(
      "GOOGLE_ADS_CUSTOMER_ID ist nicht konfiguriert.",
    );
  }

  return customerId;
}

function getGoogleAdsConversionConfig(
  kind: GoogleAdsConversionKind,
): GoogleAdsConversionConfig {
  const conversionActionId =
    kind === "qualifiedLead"
      ? GOOGLE_ADS_QUALIFIED_LEAD_CONVERSION_ID.value().trim()
      : GOOGLE_ADS_WON_LEAD_CONVERSION_ID.value().trim();

  if (!conversionActionId) {
    throw new Error(
      `Google-Ads-Conversion-ID für ${kind} ist nicht konfiguriert.`,
    );
  }

  return {
    kind,
    conversionActionId,
  };
}

function createGoogleAdsDestination(
  conversionActionId: string,
) {
  const customerId = getGoogleAdsCustomerId();

  return {
    operatingAccount: {
      accountType: "GOOGLE_ADS" as const,
      accountId: customerId,
    },

    loginAccount: {
      accountType: "GOOGLE_ADS" as const,
      accountId: customerId,
    },

    productDestinationId: conversionActionId,
  };
}

async function validateGoogleAdsConversionAction(
  client: InstanceType<
    typeof dataManager.IngestionServiceClient
  >,
  config: GoogleAdsConversionConfig,
): Promise<GoogleAdsValidationResult> {
  /*
   * Ausschließlich synthetische Daten.
   * validateOnly=true sorgt dafür, dass keine Conversion
   * tatsächlich angelegt wird.
   */
  const validationEmailHash = sha256Hex(
    "validation@globalsped.invalid",
  );

  const eventTimestamp = {
    seconds: Math.floor(Date.now() / 1000),
    nanos: 0,
  };

  await client.ingestEvents({
    destinations: [
      createGoogleAdsDestination(
        config.conversionActionId,
      ),
    ],

    events: [
      {
        eventTimestamp,
        eventSource: "WEB",

        userData: {
          userIdentifiers: [
            {
              emailAddress: validationEmailHash,
            },
          ],
        },
      },
    ],

    encoding: "HEX",
    validateOnly: true,
  });

  return {
    kind: config.kind,
    conversionActionId: config.conversionActionId,
    valid: true,
  };
}

type GoogleAdsLeadConversionInput = {
  kind: GoogleAdsConversionKind;
  leadId: string;
  conversionDate: Date;

  attribution?: {
    gclid?: string | null;
    gbraid?: string | null;
    wbraid?: string | null;
  } | null;

  email?: string | null;
};

type GoogleAdsLeadConversionResult = {
  requestId: string;
  conversionActionId: string;
};

function normalizeEmailForGoogleAds(
  value: string,
): string | null {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  const atIndex = normalized.lastIndexOf("@");

  if (atIndex <= 0) {
    return null;
  }

  let localPart = normalized.slice(0, atIndex);
  const domain = normalized.slice(atIndex + 1);

  if (!domain) {
    return null;
  }

  if (
    domain === "gmail.com" ||
    domain === "googlemail.com"
  ) {
    const plusIndex = localPart.indexOf("+");

    if (plusIndex >= 0) {
      localPart = localPart.slice(0, plusIndex);
    }

    localPart = localPart.replace(/\./g, "");
  }

  if (!localPart) {
    return null;
  }

  return `${localPart}@${domain}`;
}

function isRealGoogleClickId(
  value: string | null | undefined,
): value is string {
  if (!value) {
    return false;
  }

  const normalized = value.trim();

  if (!normalized) {
    return false;
  }

  /*
   * Schutz gegen unsere bisherigen Testwerte.
   */
  if (/^TEST-/i.test(normalized)) {
    return false;
  }

  return true;
}

async function uploadGoogleAdsLeadConversion(
  client: InstanceType<
    typeof dataManager.IngestionServiceClient
  >,
  input: GoogleAdsLeadConversionInput,
): Promise<GoogleAdsLeadConversionResult> {
  const config =
    getGoogleAdsConversionConfig(input.kind);

  const adIdentifiers: {
    gclid?: string;
    gbraid?: string;
    wbraid?: string;
  } = {};

  const gclid = input.attribution?.gclid;
  const gbraid = input.attribution?.gbraid;
  const wbraid = input.attribution?.wbraid;

  if (isRealGoogleClickId(gclid)) {
    adIdentifiers.gclid = gclid.trim();
  }

  if (isRealGoogleClickId(gbraid)) {
    adIdentifiers.gbraid = gbraid.trim();
  }

  if (isRealGoogleClickId(wbraid)) {
    adIdentifiers.wbraid = wbraid.trim();
  }

  const userIdentifiers: Array<{
    emailAddress: string;
  }> = [];

  if (input.email) {
    const normalizedEmail =
      normalizeEmailForGoogleAds(
        input.email,
      );

    if (normalizedEmail) {
      userIdentifiers.push({
        emailAddress:
          sha256Hex(normalizedEmail),
      });
    }
  }

  const hasAdIdentifier =
    Boolean(
      adIdentifiers.gclid ||
      adIdentifiers.gbraid ||
      adIdentifiers.wbraid,
    );

  const hasUserIdentifier =
    userIdentifiers.length > 0;

  if (
    !hasAdIdentifier &&
    !hasUserIdentifier
  ) {
    throw new Error(
      "Der Lead besitzt weder einen gültigen Google-Klick-Identifier noch verwertbare Nutzerdaten.",
    );
  }

  const eventTimestamp = {
    seconds: Math.floor(
      input.conversionDate.getTime() / 1000,
    ),
    nanos:
      (input.conversionDate.getTime() % 1000) *
      1_000_000,
  };

  const event: Record<string, unknown> = {
    eventTimestamp,
    eventSource: "WEB",

    /*
     * Stabile ID zur späteren Deduplizierung.
     */
    transactionId:
      `globalsped-${input.leadId}-${input.kind}`,
  };

  if (hasAdIdentifier) {
    event.adIdentifiers =
      adIdentifiers;
  }

  if (hasUserIdentifier) {
    event.userData = {
      userIdentifiers,
    };
  }

  const [response] =
    await client.ingestEvents({
      destinations: [
        createGoogleAdsDestination(
          config.conversionActionId,
        ),
      ],

      events: [event],

      encoding: "HEX",

      /*
       * Ab hier wäre es ein echter Upload.
       * Diese Funktion wird heute aber noch nirgendwo aufgerufen.
       */
      validateOnly: false,
    });

  const requestId =
    response.requestId?.trim();

  if (!requestId) {
    throw new Error(
      "Die Data Manager API hat keine Request-ID zurückgegeben.",
    );
  }

  logger.info(
    "Google Ads lead conversion accepted by Data Manager API.",
    {
      leadId: input.leadId,
      conversionType: input.kind,
      conversionActionId:
        config.conversionActionId,
      requestId,
      hasGclid: Boolean(
        adIdentifiers.gclid,
      ),
      hasGbraid: Boolean(
        adIdentifiers.gbraid,
      ),
      hasWbraid: Boolean(
        adIdentifiers.wbraid,
      ),
      hasUserData:
        userIdentifiers.length > 0,
    },
  );

  return {
    requestId,
    conversionActionId:
      config.conversionActionId,
  };
}

function getFirestoreDate(
  value: unknown,
): Date | null {
  if (value instanceof admin.firestore.Timestamp) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  return null;
}

function getLeadGoogleAdsAttribution(
  leadData: Record<string, unknown>,
): {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
} | null {
  const value = leadData.attribution;

  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return null;
  }

  const attribution = value as Record<string, unknown>;

  return {
    gclid:
      typeof attribution.gclid === "string"
        ? attribution.gclid
        : null,

    gbraid:
      typeof attribution.gbraid === "string"
        ? attribution.gbraid
        : null,

    wbraid:
      typeof attribution.wbraid === "string"
        ? attribution.wbraid
        : null,
  };
}

function getLeadEmail(
  leadData: Record<string, unknown>,
): string | null {
  const contact = leadData.contact;

  if (
    !contact ||
    typeof contact !== "object" ||
    Array.isArray(contact)
  ) {
    return null;
  }

  const email = (
    contact as Record<string, unknown>
  ).email;

  return typeof email === "string" && email.trim()
    ? email.trim()
    : null;
}

function hasRealGoogleAdsIdentifier(
  attribution: {
    gclid?: string | null;
    gbraid?: string | null;
    wbraid?: string | null;
  } | null,
): boolean {
  return Boolean(
    isRealGoogleClickId(attribution?.gclid) ||
    isRealGoogleClickId(attribution?.gbraid) ||
    isRealGoogleClickId(attribution?.wbraid),
  );
}

function getGoogleAdsUploadErrorMessage(
  error: unknown,
): string {
  if (error instanceof Error) {
    return error.message.slice(0, 1_000);
  }

  if (typeof error === "string") {
    return error.slice(0, 1_000);
  }

  return "Unbekannter Fehler beim Google-Ads-Upload.";
}

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

type AdminLeadStatus =
  | "new"
  | "in_progress"
  | "qualified"
  | "won"
  | "lost"
  | "done";

const ADMIN_LEAD_STATUSES = new Set<AdminLeadStatus>([
  "new",
  "in_progress",
  "qualified",
  "won",
  "lost",
  "done",
]);

function isAdminLeadStatus(value: unknown): value is AdminLeadStatus {
  return (
    typeof value === "string" &&
    ADMIN_LEAD_STATUSES.has(value as AdminLeadStatus)
  );
}

function getStoredConversionUploadState(
  leadData: Record<string, unknown>,
  conversionType: OfflineConversionType,
): ConversionUploadState | null {
  const status = leadData.conversionUploadStatus;

  if (!status || typeof status !== "object" || Array.isArray(status)) {
    return null;
  }

  const value = (status as Record<string, unknown>)[conversionType];

  if (
    value === "not_ready" ||
    value === "pending" ||
    value === "uploaded" ||
    value === "failed"
  ) {
    return value;
  }

  return null;
}
/* -------------------------------------------------------------------------- */
/* Gemeinsame Typen                                                            */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Hilfsfunktionen für Lead-Status und Lead-Löschung                         */
/* -------------------------------------------------------------------------- */
function isAllowedTransportDocumentPath(
  value: string,
): boolean {
  const parts = value.split("/");

  if (parts.length < 4) {
    return false;
  }

  const [root, requestId, kind, ...fileParts] = parts;

  if (root !== "transportRequest") {
    return false;
  }

  if (
    kind !== "standardDocs" &&
    kind !== "adrDocs"
  ) {
    return false;
  }

  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidPattern.test(requestId)) {
    return false;
  }

  if (
    fileParts.length === 0 ||
    fileParts.some(
      (part) =>
        !part ||
        part === "." ||
        part === "..",
    )
  ) {
    return false;
  }

  return true;
}

function getLeadDocumentPaths(
  leadData: Record<string, unknown>,
): string[] {
  const documents = leadData.documents;

  if (
    !documents ||
    typeof documents !== "object" ||
    Array.isArray(documents)
  ) {
    return [];
  }

  const documentMap = documents as Record<
    string,
    unknown
  >;

  const paths = new Set<string>();

  for (const key of ["standardDocs", "adrDocs"]) {
    const files = documentMap[key];

    if (!Array.isArray(files)) {
      continue;
    }

    for (const file of files) {
      if (
        !file ||
        typeof file !== "object" ||
        Array.isArray(file)
      ) {
        continue;
      }

      const path = normalizeOptionalString(
        (file as Record<string, unknown>).path,
        2_000,
      );

      if (!path) {
        continue;
      }

      if (!isAllowedTransportDocumentPath(path)) {
        throw new HttpsError(
          "failed-precondition",
          `Ungültiger Storage-Pfad im Lead: ${path}`,
        );
      }

      paths.add(path);
    }
  }

  return [...paths];
}

/* -------------------------------------------------------------------------- */
/* Transportanfrage                                                            */
/* -------------------------------------------------------------------------- */
const FUNCTION_VERSION = "transport-mail-2026-08-17-v4";

export const updateLeadStatus = onCall(
  {
    region: "europe-west3",
    maxInstances: 10,
    cors: true,
    invoker: "public",
    serviceAccount:
      "globalsped-google-ads@globalsped-next.iam.gserviceaccount.com",
  },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "Für diese Aktion ist eine Anmeldung erforderlich.",
      );
    }

    if (request.auth.token.admin !== true) {
      throw new HttpsError(
        "permission-denied",
        "Für diese Aktion sind Administratorrechte erforderlich.",
      );
    }

    const leadId = normalizeOptionalString(
      request.data?.leadId,
      200,
    );

    const status = request.data?.status;

    if (!leadId) {
      throw new HttpsError(
        "invalid-argument",
        "Die Lead-ID fehlt oder ist ungültig.",
      );
    }

    if (!isAdminLeadStatus(status)) {
      throw new HttpsError(
        "invalid-argument",
        "Der angegebene Lead-Status ist ungültig.",
      );
    }

    const leadRef = db.collection("leads").doc(leadId);
    const leadSnapshot = await leadRef.get();

    if (!leadSnapshot.exists) {
      throw new HttpsError(
        "not-found",
        "Der Lead wurde nicht gefunden.",
      );
    }

    const leadData = (leadSnapshot.data() ?? {}) as Record<
      string,
      unknown
    >;

    const now = admin.firestore.FieldValue.serverTimestamp();

    const updates: Record<string, unknown> = {
      status,
      updatedAt: now,
    };
    const currentStatus =
      typeof leadData.status === "string"
        ? leadData.status
        : null;

    const currentCloseConvertStatus =
      getStoredConversionUploadState(
        leadData,
        "closeConvertLead",
      );

    /*
     * Wird ein bereits als "won" markierter Lead korrigiert,
     * darf eine noch nicht hochgeladene close_convert_lead Conversion
     * nicht später versehentlich an Google Ads übertragen werden.
     */
    if (
      status !== "won" &&
      (currentStatus === "won" || leadData.convertedAt)
    ) {
      if (currentCloseConvertStatus === "uploaded") {
        throw new HttpsError(
          "failed-precondition",
          "Der Lead wurde bereits als gewonnener Auftrag an Google Ads übertragen. Der Status kann nicht automatisch zurückgesetzt werden.",
        );
      }

      updates.convertedAt = null;

      if (
        currentCloseConvertStatus === "pending" ||
        currentCloseConvertStatus === "failed"
      ) {
        updates["conversionUploadStatus.closeConvertLead"] =
          "not_ready";

        updates["conversionUploadError.closeConvertLead"] = null;
      }
    }

    if (status === "qualified") {
      if (!leadData.qualifiedAt) {
        updates.qualifiedAt = now;
      }

      const currentUploadStatus =
        getStoredConversionUploadState(
          leadData,
          "qualifyLead",
        );

      if (
        currentUploadStatus === null ||
        currentUploadStatus === "not_ready" ||
        currentUploadStatus === "failed"
      ) {
        updates["conversionUploadStatus.qualifyLead"] = "pending";
        updates["conversionUploadError.qualifyLead"] = null;
      }
    }

    if (status === "won") {
      if (!leadData.convertedAt) {
        updates.convertedAt = now;
      }

      const currentUploadStatus =
        getStoredConversionUploadState(
          leadData,
          "closeConvertLead",
        );

      if (
        currentUploadStatus === null ||
        currentUploadStatus === "not_ready" ||
        currentUploadStatus === "failed"
      ) {
        updates["conversionUploadStatus.closeConvertLead"] =
          "pending";

        updates["conversionUploadError.closeConvertLead"] = null;
      }
    }

    await leadRef.update(updates);

    logger.info("Lead status updated by admin.", {
      leadId,
      status,
      uid: request.auth.uid,
    });

    /*
     * Falls der neue Status eine Google-Ads-Offline-Conversion
     * auslöst, versuchen wir den Upload unmittelbar.
     *
     * Ein Fehler beim Google-Ads-Upload macht die eigentliche
     * Statusänderung NICHT rückgängig.
     */
    let conversionKind: GoogleAdsConversionKind | null = null;
    let conversionStateKey:
      | OfflineConversionType
      | null = null;
    let conversionDateField:
      | "qualifiedAt"
      | "convertedAt"
      | null = null;

    if (status === "qualified") {
      const uploadStatus =
        getStoredConversionUploadState(
          leadData,
          "qualifyLead",
        );

      if (uploadStatus !== "uploaded") {
        conversionKind = "qualifiedLead";
        conversionStateKey = "qualifyLead";
        conversionDateField = "qualifiedAt";
      }
    }

    if (status === "won") {
      const uploadStatus =
        getStoredConversionUploadState(
          leadData,
          "closeConvertLead",
        );

      if (uploadStatus !== "uploaded") {
        conversionKind = "wonLead";
        conversionStateKey = "closeConvertLead";
        conversionDateField = "convertedAt";
      }
    }

    let conversionUpload:
      | {
        attempted: false;
      }
      | {
        attempted: true;
        status: "uploaded";
        requestId: string;
      }
      | {
        attempted: true;
        status: "failed";
        error: string;
      } = {
      attempted: false,
    };

    if (
      conversionKind &&
      conversionStateKey &&
      conversionDateField
    ) {
      /*
       * Nach dem Status-Update erneut lesen.
       *
       * Dadurch erhalten wir auch den inzwischen aufgelösten
       * Firestore-Timestamp von qualifiedAt/convertedAt.
       */
      const updatedLeadSnapshot =
        await leadRef.get();

      const updatedLeadData =
        (updatedLeadSnapshot.data() ?? {}) as Record<
          string,
          unknown
        >;

      const conversionDate =
        getFirestoreDate(
          updatedLeadData[conversionDateField],
        );

      const attribution =
        getLeadGoogleAdsAttribution(
          updatedLeadData,
        );

      const email =
        getLeadEmail(updatedLeadData);

      /*
       * Merkt sich, ob der Versuchszähler bereits erhöht wurde.
       * Dadurch wird ein API-Fehler nicht doppelt gezählt.
       */
      let attemptIncremented = false;

      try {
        if (!conversionDate) {
          throw new Error(
            `Conversion-Zeitpunkt ${conversionDateField} fehlt.`,
          );
        }

        /*
         * Keine Testwerte und keine Leads ohne echte
         * Google-Ads-Zuordnung hochladen.
         */
        if (
          !hasRealGoogleAdsIdentifier(
            attribution,
          )
        ) {
          throw new Error(
            "Kein gültiger Google-Ads-Klick-Identifier für diesen Lead vorhanden.",
          );
        }

        /*
         * Genau einen Upload-Versuch zählen.
         */
        await leadRef.update({
          [`conversionUploadAttempts.${conversionStateKey}`]:
            admin.firestore.FieldValue.increment(1),

          [`conversionUploadError.${conversionStateKey}`]:
            null,
        });

        attemptIncremented = true;

        const client =
          new dataManager.IngestionServiceClient();

        const result =
          await uploadGoogleAdsLeadConversion(
            client,
            {
              kind: conversionKind,
              leadId,
              conversionDate,
              attribution,
              email,
            },
          );

        await leadRef.update({
          [`conversionUploadStatus.${conversionStateKey}`]:
            "uploaded",

          [`conversionUploadError.${conversionStateKey}`]:
            null,

          [`conversionUploadRequestId.${conversionStateKey}`]:
            result.requestId,

          [`conversionUploadAcceptedAt.${conversionStateKey}`]:
            admin.firestore.FieldValue.serverTimestamp(),

          updatedAt:
            admin.firestore.FieldValue.serverTimestamp(),
        });

        conversionUpload = {
          attempted: true,
          status: "uploaded",
          requestId: result.requestId,
        };

        logger.info(
          "Google Ads offline conversion uploaded.",
          {
            leadId,
            conversionType: conversionKind,
            conversionActionId:
              result.conversionActionId,
            requestId: result.requestId,
          },
        );
      } catch (error) {
        const uploadError =
          getGoogleAdsUploadErrorMessage(error);

        const failureUpdates: Record<
          string,
          unknown
        > = {
          [`conversionUploadStatus.${conversionStateKey}`]:
            "failed",

          [`conversionUploadError.${conversionStateKey}`]:
            uploadError,

          updatedAt:
            admin.firestore.FieldValue.serverTimestamp(),
        };

        /*
         * Falls der Fehler bereits vor dem eigentlichen
         * API-Versuch auftrat, z. B. wegen fehlender GCLID,
         * wird der Versuch hier genau einmal gezählt.
         */
        if (!attemptIncremented) {
          failureUpdates[
            `conversionUploadAttempts.${conversionStateKey}`
          ] = admin.firestore.FieldValue.increment(1);
        }

        await leadRef.update(failureUpdates);

        conversionUpload = {
          attempted: true,
          status: "failed",
          error: uploadError,
        };

        logger.error(
          "Google Ads offline conversion failed.",
          {
            leadId,
            conversionType: conversionKind,
            error: uploadError,
          },
        );
      }
    }

    return {
      success: true,
      leadId,
      status,
      conversionUpload,
    };
  },
);

export const validateGoogleAdsDataManager = onCall(
  {
    region: "europe-west3",
    maxInstances: 2,
    cors: true,
    invoker: "public",
    serviceAccount:
      "globalsped-google-ads@globalsped-next.iam.gserviceaccount.com",
  },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "Für diese Aktion ist eine Anmeldung erforderlich.",
      );
    }

    if (request.auth.token.admin !== true) {
      throw new HttpsError(
        "permission-denied",
        "Für diese Aktion sind Administratorrechte erforderlich.",
      );
    }

    const client =
      new dataManager.IngestionServiceClient();

    const conversionConfigs: GoogleAdsConversionConfig[] = [
      getGoogleAdsConversionConfig(
        "qualifiedLead",
      ),
      getGoogleAdsConversionConfig(
        "wonLead",
      ),
    ];

    const results: GoogleAdsValidationResult[] = [];

    for (const config of conversionConfigs) {
      try {
        const result =
          await validateGoogleAdsConversionAction(
            client,
            config,
          );

        logger.info(
          "Google Ads Data Manager validation succeeded.",
          {
            conversionType: config.kind,
            conversionActionId:
              config.conversionActionId,
          },
        );

        results.push(result);
      } catch (error) {
        logger.error(
          "Google Ads Data Manager validation failed.",
          {
            conversionType: config.kind,
            conversionActionId:
              config.conversionActionId,
            error,
          },
        );

        throw new HttpsError(
          "internal",
          `Data-Manager-Validierung für ${config.kind} fehlgeschlagen.`,
        );
      }
    }

    return {
      success: true,
      validateOnly: true,
      customerId: getGoogleAdsCustomerId(),
      results: results.map((result) => ({
        /*
         * "name" behalten wir absichtlich bei,
         * damit die bestehende Admin-Testseite
         * nicht geändert werden muss.
         */
        name: result.kind,
        conversionActionId:
          result.conversionActionId,
        valid: result.valid,
      })),
    };
  },
);

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

    const internalHtml = buildInternalTransportMailHtml({
      leadId: leadRef.id,
      functionVersion: FUNCTION_VERSION,
      lead: leadData,
    });

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

export const deleteLead = onCall(
  {
    region: "europe-west3",
    maxInstances: 10,
    cors: true,
    invoker: "public",
  },
  async (request) => {
    /*
     * Nur angemeldete Benutzer dürfen diese Function aufrufen.
     */
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "Für diese Aktion ist eine Anmeldung erforderlich.",
      );
    }

    /*
     * Zusätzlich ist der Firebase Custom Claim admin=true erforderlich.
     */
    if (request.auth.token.admin !== true) {
      throw new HttpsError(
        "permission-denied",
        "Für diese Aktion sind Administratorrechte erforderlich.",
      );
    }

    /*
     * Lead-ID validieren.
     */
    const leadId = normalizeOptionalString(
      request.data?.leadId,
      200,
    );

    if (!leadId) {
      throw new HttpsError(
        "invalid-argument",
        "Die Lead-ID fehlt oder ist ungültig.",
      );
    }

    /*
     * Lead laden.
     */
    const leadRef = db.collection("leads").doc(leadId);
    const leadSnapshot = await leadRef.get();

    if (!leadSnapshot.exists) {
      throw new HttpsError(
        "not-found",
        "Der Lead wurde nicht gefunden.",
      );
    }

    const leadData = (leadSnapshot.data() ?? {}) as Record<
      string,
      unknown
    >;

    /*
     * Alle erlaubten Storage-Pfade aus dem Lead lesen.
     *
     * Beispiel:
     * transportRequest/<requestId>/standardDocs/datei.pdf
     */
    const documentPaths =
      getLeadDocumentPaths(leadData);

    /*
     * Wichtig:
     * Nicht den impliziten Default-Bucket verwenden.
     *
     * Das Frontend lädt ausdrücklich in:
     * globalsped-next.firebasestorage.app
     */
    const bucket = admin
      .storage()
      .bucket("globalsped-next.firebasestorage.app");

    logger.info("Deleting lead documents.", {
      leadId,
      documentPaths,
      documentCount: documentPaths.length,
      bucketName: bucket.name,
    });

    /*
     * Zuerst alle Dateien löschen.
     *
     * Firestore wird erst gelöscht, wenn die Storage-Bereinigung
     * vollständig erfolgreich war.
     */
    for (const path of documentPaths) {
      const file = bucket.file(path);

      try {
        logger.info("Deleting lead document.", {
          leadId,
          path,
          bucketName: bucket.name,
        });

        await file.delete();

        logger.info("Lead document deleted.", {
          leadId,
          path,
          bucketName: bucket.name,
        });
      } catch (error) {
        const errorCode =
          error &&
            typeof error === "object" &&
            "code" in error
            ? Number(
              (error as { code?: unknown }).code,
            )
            : null;

        /*
         * 404 nicht mehr ignorieren.
         *
         * Sonst könnte der Lead gelöscht werden, obwohl wir
         * möglicherweise den falschen Bucket/Pfad verwenden.
         */
        if (errorCode === 404) {
          logger.error(
            "Lead document was not found in configured bucket.",
            {
              leadId,
              path,
              bucketName: bucket.name,
              error,
            },
          );

          throw new HttpsError(
            "failed-precondition",
            "Ein zum Lead gehörendes Dokument wurde im konfigurierten Storage-Bucket nicht gefunden. Der Lead wurde deshalb nicht gelöscht.",
          );
        }

        logger.error(
          "Could not delete lead document.",
          {
            leadId,
            path,
            bucketName: bucket.name,
            errorCode,
            error,
          },
        );

        throw new HttpsError(
          "internal",
          "Mindestens ein zugehöriges Dokument konnte nicht gelöscht werden. Der Lead wurde deshalb nicht gelöscht.",
        );
      }
    }

    /*
     * Erst wenn alle Storage-Dateien erfolgreich gelöscht wurden,
     * darf der Firestore-Datensatz entfernt werden.
     */
    await leadRef.delete();

    logger.info("Lead deleted by admin.", {
      leadId,
      documentCount: documentPaths.length,
      uid: request.auth.uid,
    });

    return {
      success: true,
      leadId,
      deletedDocuments: documentPaths.length,
    };
  },
);

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

type ApplicationUploadedFile = {
  name?: string;
  fileName?: string;
  downloadUrl?: string;
};

type ApplicationMailData = {
  applicant: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  application: {
    desiredPosition?: string;
    experience?: string;
    earliestStart?: string;
    salaryExpectation?: string | number;
    languages?: string | string[];
    hasDrivingLicense?: string | boolean;
    message?: string;
  };
  files?: ApplicationUploadedFile[];
};

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
  data: ApplicationMailData,
): string {
  const files = Array.isArray(data.files)
    ? data.files
    : [];

  const fileLinks = files.length
    ? files
      .map((file: ApplicationUploadedFile, index: number) => {
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

function buildApplicantConfirmationMailHtml(
  data: ApplicationMailData,
): string {
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
  attribution?: LeadAttribution | null;

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

type ContactMailData = {
  locale?: string;
  pagePath?: string;
  contact: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    message?: string;
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
      attribution: normalizeAttribution(data.attribution),

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
  data: ContactMailData,
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

function buildContactConfirmationMailHtml(
  data: ContactMailData,
): string {
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
/* NEUE FUNKTIONEN Applications / Bewerbungen */

type ApplicationStatus =
  | "new"
  | "reviewed"
  | "invited"
  | "rejected"
  | "hired";

const APPLICATION_STATUS_VALUES: readonly ApplicationStatus[] = [
  "new",
  "reviewed",
  "invited",
  "rejected",
  "hired",
];

function isApplicationStatus(value: unknown): value is ApplicationStatus {
  return (
    typeof value === "string" &&
    APPLICATION_STATUS_VALUES.includes(value as ApplicationStatus)
  );
}

function requireApplicationAdmin(request: CallableRequest<unknown>): string {
  const token = request.auth?.token as { admin?: boolean } | undefined;

  if (!request.auth?.uid || token?.admin !== true) {
    throw new HttpsError(
      "permission-denied",
      "Nur Administratoren dürfen Bewerbungen bearbeiten.",
    );
  }

  return request.auth.uid;
}

export const updateApplicationStatus = onCall(
  {
    region: "europe-west3",
    maxInstances: 10,
  },
  async (request) => {
    const adminUid = requireApplicationAdmin(request);
    const data = request.data as {
      applicationId?: unknown;
      status?: unknown;
    };

    if (typeof data.applicationId !== "string" || !data.applicationId.trim()) {
      throw new HttpsError("invalid-argument", "applicationId fehlt.");
    }

    if (!isApplicationStatus(data.status)) {
      throw new HttpsError("invalid-argument", "Ungültiger Bewerbungsstatus.");
    }

    const applicationId = data.applicationId.trim();
    const status = data.status;
    const applicationRef = db.collection("applications").doc(applicationId);

    const snapshot = await applicationRef.get();

    if (!snapshot.exists) {
      throw new HttpsError("not-found", "Bewerbung wurde nicht gefunden.");
    }

    const now = admin.firestore.FieldValue.serverTimestamp();

    const updateData: Record<string, unknown> = {
      status,
      updatedAt: now,
      "admin.updatedAt": now,
      "admin.updatedBy": adminUid,
    };

    if (status === "reviewed") {
      updateData["admin.reviewedAt"] = now;
      updateData["admin.reviewedBy"] = adminUid;
    }

    if (status === "invited") {
      updateData["admin.invitedAt"] = now;
      updateData["admin.invitedBy"] = adminUid;
    }

    if (status === "rejected") {
      updateData["admin.rejectedAt"] = now;
      updateData["admin.rejectedBy"] = adminUid;
    }

    if (status === "hired") {
      updateData["admin.hiredAt"] = now;
      updateData["admin.hiredBy"] = adminUid;
    }

    await applicationRef.update(updateData);

    return {
      success: true,
      applicationId,
      status,
    };
  },
);

export const updateApplicationNotes = onCall(
  {
    region: "europe-west3",
    maxInstances: 10,
  },
  async (request) => {
    const adminUid = requireApplicationAdmin(request);
    const data = request.data as {
      applicationId?: unknown;
      notes?: unknown;
    };

    if (typeof data.applicationId !== "string" || !data.applicationId.trim()) {
      throw new HttpsError("invalid-argument", "applicationId fehlt.");
    }

    if (typeof data.notes !== "string") {
      throw new HttpsError("invalid-argument", "Notiz fehlt.");
    }

    if (data.notes.length > 5000) {
      throw new HttpsError(
        "invalid-argument",
        "Die Notiz darf maximal 5000 Zeichen enthalten.",
      );
    }

    const applicationId = data.applicationId.trim();
    const notes = data.notes.trim();
    const applicationRef = db.collection("applications").doc(applicationId);

    const snapshot = await applicationRef.get();

    if (!snapshot.exists) {
      throw new HttpsError("not-found", "Bewerbung wurde nicht gefunden.");
    }

    const now = admin.firestore.FieldValue.serverTimestamp();

    await applicationRef.update({
      "admin.notes": notes,
      "admin.notesUpdatedAt": now,
      "admin.notesUpdatedBy": adminUid,
      "admin.updatedAt": now,
      "admin.updatedBy": adminUid,
      updatedAt: now,
    });

    return {
      success: true,
      applicationId,
    };
  },
);