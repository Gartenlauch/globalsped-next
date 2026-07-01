// src/content/metadata/index.ts

import { metadataDe } from "./de";
import type { Locale, LocaleMetadata } from "./types";
import { metadataEn } from "./en";

const metadataByLocale: Record<Locale, LocaleMetadata> = {
  de: metadataDe,
  en: metadataEn,
    // Vorläufig Fallbacks, bis echte Übersetzungen vorliegen:
  az: metadataDe,
};

export function getMetadataContent(locale: string): LocaleMetadata {
  if (locale === "en" || locale === "de") {
    return metadataByLocale[locale];
  }

  return metadataByLocale.de;
}