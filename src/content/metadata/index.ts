import { metadataDe } from "./de";
import { metadataEn } from "./en";
import type { Locale, LocaleMetadata } from "./types";

const metadataByLocale: Record<Locale, LocaleMetadata> = {
  de: metadataDe,
  en: metadataEn,
};

export function getMetadataContent(locale: string): LocaleMetadata {
  if (locale === "de" || locale === "en") {
    return metadataByLocale[locale];
  }

  return metadataByLocale.de;
}