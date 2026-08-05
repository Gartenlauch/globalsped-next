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

function sanitizeValue(value: string | null): string | null {
  const normalized = value?.trim();

  if (!normalized) {
    return null;
  }

  return normalized.slice(0, MAX_VALUE_LENGTH);
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

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const stored = JSON.parse(rawValue) as Partial<StoredAttribution>;

    if (!stored.expiresAt) {
      removeStoredAttribution();
      return null;
    }

    const expiresAt = new Date(stored.expiresAt);

    if (
      Number.isNaN(expiresAt.getTime()) ||
      expiresAt.getTime() <= Date.now()
    ) {
      removeStoredAttribution();
      return null;
    }

    if (!stored.landingPage || !stored.capturedAt) {
      removeStoredAttribution();
      return null;
    }

    return {
      gclid: sanitizeValue(stored.gclid ?? null),
      gbraid: sanitizeValue(stored.gbraid ?? null),
      wbraid: sanitizeValue(stored.wbraid ?? null),
      utmSource: sanitizeValue(stored.utmSource ?? null),
      utmMedium: sanitizeValue(stored.utmMedium ?? null),
      utmCampaign: sanitizeValue(stored.utmCampaign ?? null),
      utmContent: sanitizeValue(stored.utmContent ?? null),
      utmTerm: sanitizeValue(stored.utmTerm ?? null),
      landingPage: String(stored.landingPage).slice(0, 2_000),
      referrer: sanitizeValue(stored.referrer ?? null),
      capturedAt: String(stored.capturedAt),
    };
  } catch {
    removeStoredAttribution();
    return null;
  }
}