import { cookieConsentDe } from "./de";
import { cookieConsentEn } from "./en";
export function getCookieConsentContent(locale: string) {
  switch (locale) {
    case "en":
      return cookieConsentEn;
    case "de":
    default:
      return cookieConsentDe;
  }
}

export type { CookieConsentContent } from "./types";