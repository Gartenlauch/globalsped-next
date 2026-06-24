const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GOOGLE_ADS_TRANSPORT_CONVERSION_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_TRANSPORT_CONVERSION_SEND_TO;

type GoogleConsentState = {
  analytics: boolean;
  marketing: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __globalspedGoogleTagLoaded?: boolean;
    __globalspedGoogleConfigured?: {
      ga4?: boolean;
      ads?: boolean;
    };
    __globalspedConsent?: GoogleConsentState;
    __globalspedLastPageView?: string;
  }
}

function getPrimaryGoogleTagId() {
  return GA_MEASUREMENT_ID || GOOGLE_ADS_ID;
}

function ensureDataLayer() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer?.push(arguments);
    };
}

function ensureGoogleTagLoaded() {
  if (typeof window === "undefined") return;

  const primaryTagId = getPrimaryGoogleTagId();

  if (!primaryTagId || window.__globalspedGoogleTagLoaded) {
    return;
  }

  ensureDataLayer();

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${primaryTagId}`;
  document.head.appendChild(script);

  window.gtag?.("js", new Date());

  window.__globalspedGoogleTagLoaded = true;
  window.__globalspedGoogleConfigured =
    window.__globalspedGoogleConfigured || {};
}

function configureGoogleTags(consent: GoogleConsentState) {
  if (typeof window === "undefined") return;

  ensureGoogleTagLoaded();

  window.__globalspedGoogleConfigured =
    window.__globalspedGoogleConfigured || {};

  if (
    GA_MEASUREMENT_ID &&
    consent.analytics &&
    !window.__globalspedGoogleConfigured.ga4
  ) {
    window.gtag?.("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
    });

    window.__globalspedGoogleConfigured.ga4 = true;
  }

  if (
    GOOGLE_ADS_ID &&
    consent.marketing &&
    !window.__globalspedGoogleConfigured.ads
  ) {
    window.gtag?.("config", GOOGLE_ADS_ID);

    window.__globalspedGoogleConfigured.ads = true;
  }
}

export function updateGoogleConsent(consent: GoogleConsentState) {
  if (typeof window === "undefined") return;

  ensureDataLayer();

  window.__globalspedConsent = consent;

  window.gtag?.("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });

  if (consent.analytics || consent.marketing) {
    configureGoogleTags(consent);
  }

  if (consent.analytics) {
    trackPageView();
  }
}

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;

  return Boolean(window.__globalspedConsent?.analytics);
}

export function hasMarketingConsent() {
  if (typeof window === "undefined") return false;

  return Boolean(window.__globalspedConsent?.marketing);
}

export function trackPageView(path?: string) {
  if (typeof window === "undefined") return;

  if (!GA_MEASUREMENT_ID || !hasAnalyticsConsent()) {
    return;
  }

  configureGoogleTags({
    analytics: true,
    marketing: hasMarketingConsent(),
  });

  const pagePath =
    path || `${window.location.pathname}${window.location.search}`;

  if (window.__globalspedLastPageView === pagePath) {
    return;
  }

  window.__globalspedLastPageView = pagePath;

  window.gtag?.("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackTransportRequestConversion() {
  if (
    typeof window === "undefined" ||
    !GOOGLE_ADS_TRANSPORT_CONVERSION_SEND_TO ||
    !hasMarketingConsent()
  ) {
    return;
  }

  configureGoogleTags({
    analytics: hasAnalyticsConsent(),
    marketing: true,
  });

  window.gtag?.("event", "conversion", {
    send_to: GOOGLE_ADS_TRANSPORT_CONVERSION_SEND_TO,
  });
}

type LeadFormName =
  | "transport_request"
  | "contact_form"
  | "application_form";

type TrackLeadSubmitParams = {
  formName: LeadFormName;
  leadType: string;
  pagePath?: string;
};

export function trackLeadSubmit({
  formName,
  leadType,
  pagePath,
}: TrackLeadSubmitParams) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) {
    return;
  }

  if (!hasAnalyticsConsent()) {
    return;
  }

  configureGoogleTags({
    analytics: true,
    marketing: hasMarketingConsent(),
  });

  const currentPagePath =
    pagePath || `${window.location.pathname}${window.location.search}`;

  window.gtag?.("event", "generate_lead", {
    send_to: GA_MEASUREMENT_ID,
    form_name: formName,
    lead_type: leadType,
    page_path: currentPagePath,
  });
}

export function trackTransportRequestSubmit(pagePath?: string) {
  trackLeadSubmit({
    formName: "transport_request",
    leadType: "transport_request",
    pagePath,
  });

  trackTransportRequestConversion();
}

export function trackContactFormSubmit(pagePath?: string) {
  trackLeadSubmit({
    formName: "contact_form",
    leadType: "contact_inquiry",
    pagePath,
  });
}

export function trackApplicationSubmit(pagePath?: string) {
  trackLeadSubmit({
    formName: "application_form",
    leadType: "job_application",
    pagePath,
  });
}