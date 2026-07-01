import { de } from "./de";
import { en } from "./en";

export const supportedLocales = ["de", "en"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "de";

export const content = {
  de,
  en,
} satisfies Record<Locale, typeof de>;

export function isSupportedLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

export function getContent(locale: string) {
  return isSupportedLocale(locale) ? content[locale] : content.de;
}