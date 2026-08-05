export type LeadAttribution = {
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

type StoredAttribution = LeadAttribution & {
  expiresAt: string;
};

const STORAGE_KEY = "globalsped_lead_attribution";
const ATTRIBUTION_LIFETIME_DAYS = 90;
const MAX_VALUE_LENGTH = 500;

function sanitizeValue(
  value: unknown,
  maxLength = MAX_VALUE_LENGTH,
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

function hasCampaignInformation(
  attribution: Omit<LeadAttribution, "landingPage" | "referrer" | "capturedAt">,
): boolean {
  return Boolean(
    attribution.gclid ||
    attribution.gbraid ||
    attribution.wbraid ||
    attribution.utmSource ||
    attribution.utmMedium ||
    attribution.utmCampaign ||
    attribution.utmContent ||
    attribution.utmTerm,
  );
}

function removeStoredAttribution(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Local storage may be unavailable due to browser privacy settings.
  }
}

export function captureAttributionFromCurrentUrl(): LeadAttribution | null {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);

  const campaignData = {
    gclid: sanitizeValue(params.get("gclid")),
    gbraid: sanitizeValue(params.get("gbraid")),
    wbraid: sanitizeValue(params.get("wbraid")),
    utmSource: sanitizeValue(params.get("utm_source")),
    utmMedium: sanitizeValue(params.get("utm_medium")),
    utmCampaign: sanitizeValue(params.get("utm_campaign")),
    utmContent: sanitizeValue(params.get("utm_content")),
    utmTerm: sanitizeValue(params.get("utm_term")),
  };

  if (!hasCampaignInformation(campaignData)) {
    return getStoredAttribution();
  }

  const capturedAt = new Date();
  const expiresAt = new Date(capturedAt);

  expiresAt.setDate(expiresAt.getDate() + ATTRIBUTION_LIFETIME_DAYS);

  const attribution: LeadAttribution = {
    ...campaignData,
    landingPage: window.location.href.slice(0, 2_000),
    referrer: sanitizeValue(document.referrer),
    capturedAt: capturedAt.toISOString(),
  };

  const storedAttribution: StoredAttribution = {
    ...attribution,
    expiresAt: expiresAt.toISOString(),
  };

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(storedAttribution),
    );
  } catch {
    return attribution;
  }

  return attribution;
}

export function getStoredAttribution(): LeadAttribution | null {
  if (typeof window === "undefined") {
    return null;
  }

  let rawValue: string | null = null;

  try {
    rawValue = window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn(
      "[lead-attribution] Local Storage konnte nicht gelesen werden.",
      error,
    );
    return null;
  }

  if (!rawValue) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(rawValue);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      console.warn(
        "[lead-attribution] Gespeicherter Wert ist kein gültiges Objekt.",
        parsed,
      );
      removeStoredAttribution();
      return null;
    }

    const stored = parsed as Record<string, unknown>;

    const expiresAtValue = sanitizeValue(stored.expiresAt, 100);
    const landingPage = sanitizeValue(stored.landingPage, 2_000);
    const capturedAtValue = sanitizeValue(stored.capturedAt, 100);

    if (!expiresAtValue) {
      console.warn(
        "[lead-attribution] expiresAt fehlt oder ist ungültig.",
        stored.expiresAt,
      );
      removeStoredAttribution();
      return null;
    }

    const expiresAt = new Date(expiresAtValue);

    if (Number.isNaN(expiresAt.getTime())) {
      console.warn(
        "[lead-attribution] expiresAt ist kein gültiges Datum.",
        expiresAtValue,
      );
      removeStoredAttribution();
      return null;
    }

    if (expiresAt.getTime() <= Date.now()) {
      console.warn(
        "[lead-attribution] Attribution ist abgelaufen.",
        {
          expiresAt: expiresAt.toISOString(),
          now: new Date().toISOString(),
        },
      );
      removeStoredAttribution();
      return null;
    }

    if (!landingPage || !capturedAtValue) {
      console.warn(
        "[lead-attribution] landingPage oder capturedAt fehlt.",
        {
          landingPage: stored.landingPage,
          capturedAt: stored.capturedAt,
        },
      );
      removeStoredAttribution();
      return null;
    }

    const capturedAt = new Date(capturedAtValue);

    if (Number.isNaN(capturedAt.getTime())) {
      console.warn(
        "[lead-attribution] capturedAt ist kein gültiges Datum.",
        capturedAtValue,
      );
      removeStoredAttribution();
      return null;
    }

    const attribution: LeadAttribution = {
      gclid: sanitizeValue(stored.gclid),
      gbraid: sanitizeValue(stored.gbraid),
      wbraid: sanitizeValue(stored.wbraid),
      utmSource: sanitizeValue(stored.utmSource),
      utmMedium: sanitizeValue(stored.utmMedium),
      utmCampaign: sanitizeValue(stored.utmCampaign),
      utmContent: sanitizeValue(stored.utmContent),
      utmTerm: sanitizeValue(stored.utmTerm),
      landingPage,
      referrer: sanitizeValue(stored.referrer, 2_000),
      capturedAt: capturedAt.toISOString(),
    };

    if (!hasCampaignInformation(attribution)) {
      console.warn(
        "[lead-attribution] Keine Kampagneninformationen vorhanden.",
        attribution,
      );
      removeStoredAttribution();
      return null;
    }

    return attribution;
  } catch (error) {
    console.warn(
      "[lead-attribution] Gespeicherte Attribution konnte nicht verarbeitet werden.",
      {
        error,
        rawValue,
      },
    );

    removeStoredAttribution();
    return null;
  }
}