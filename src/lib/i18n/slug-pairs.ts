export type SupportedLocale = "de" | "en";
export function normalizeLocale(locale: string): SupportedLocale {
  return locale === "en" ? "en" : "de";
}

export const serviceSlugPairs = [
  {
    de: "ftl-komplettladungen",
    en: "ftl-full-truck-loads",
  },
  {
    de: "ltl-teilladungen",
    en: "ltl-part-loads",
  },
  {
    de: "thermotransporte",
    en: "temperature-controlled-transport",
  },
  {
    de: "gefahrguttransporte",
    en: "dangerous-goods-transport",
  },
  {
    de: "zollabwicklung",
    en: "customs-clearance",
  },
  {
    de: "projektlogistik",
    en: "project-logistics",
  },
] as const;

export const countrySlugPairs = [
  {
    de: "transport-kasachstan",
    en: "freight-transport-kazakhstan",
  },
  {
    de: "transport-usbekistan",
    en: "freight-transport-uzbekistan",
  },
  {
    de: "transport-kirgisistan",
    en: "freight-transport-kyrgyzstan",
  },
  {
    de: "transport-turkmenistan",
    en: "freight-transport-turkmenistan",
  },
  {
    de: "transport-tadschikistan",
    en: "freight-transport-tajikistan",
  },
  {
    de: "transport-aserbaidschan",
    en: "freight-transport-azerbaijan",
  },
  {
    de: "transport-georgien",
    en: "freight-transport-georgia",
  },
  {
    de: "transport-armenien",
    en: "freight-transport-armenia",
  },
  {
    de: "transport-mongolei",
    en: "freight-transport-mongolia",
  },
  {
    de: "transport-irak",
    en: "freight-transport-iraq",
  },
  {
    de: "transport-tuerkei",
    en: "freight-transport-turkey",
  },
  {
    de: "transport-ukraine",
    en: "freight-transport-ukraine",
  },
] as const;

export function getLocalizedServiceSlug(
  slug: string,
  targetLocale: SupportedLocale
): string {
  const match = serviceSlugPairs.find(
    (pair) => pair.de === slug || pair.en === slug
  );

  return match ? match[targetLocale] : slug;
}

export function getLocalizedCountrySlug(
  slug: string,
  targetLocale: SupportedLocale
): string {
  const match = countrySlugPairs.find(
    (pair) => pair.de === slug || pair.en === slug
  );

  return match ? match[targetLocale] : slug;
}