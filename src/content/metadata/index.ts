// src/content/metadata/index.ts

import { metadataDe } from "./de";
import type { Locale, LocaleMetadata } from "./types";

const metadataByLocale: Record<Locale, LocaleMetadata> = {
  de: metadataDe,
  // Vorläufig Fallbacks, bis echte Übersetzungen vorliegen:
  en: metadataDe,
  az: metadataDe,
};

export function getMetadataContent(locale: string): LocaleMetadata {
  if (locale === "en" || locale === "az" || locale === "de") {
    return metadataByLocale[locale];
  }

  return metadataByLocale.de;
}