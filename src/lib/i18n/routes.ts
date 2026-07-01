export const localizedRoutes = {
  de: {
    home: "/de",
    services: "/de/leistungen",
    destinations: "/de/ziellaender",
    transportRequest: "/de/transport-anfrage",
    privacy: "/de/datenschutz",
    legalNotice: "/de/impressum",
  },
  en: {
    home: "/en",
    services: "/en/services",
    destinations: "/en/destinations",
    transportRequest: "/en/transport-request",
    privacy: "/en/privacy-policy",
    legalNotice: "/en/legal-notice",
  },
} as const;

type LocalizedRouteKey = keyof typeof localizedRoutes.de;
type SupportedRouteLocale = keyof typeof localizedRoutes;

function normalizeLocale(locale: string): SupportedRouteLocale {
  return locale === "en" ? "en" : "de";
}

export function getLocalizedRoute(
  locale: string,
  key: LocalizedRouteKey
): string {
  return localizedRoutes[normalizeLocale(locale)][key];
}

export function getServicePath(locale: string, slug: string): string {
  return `${getLocalizedRoute(locale, "services")}/${slug}`;
}

export function getDestinationPath(locale: string, slug: string): string {
  return `${getLocalizedRoute(locale, "destinations")}/${slug}`;
}