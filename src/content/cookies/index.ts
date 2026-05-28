import { cookieConsentDe } from "./de";

export function getCookieConsentContent(locale: string) {
  switch (locale) {
    case "de":
    default:
      return cookieConsentDe;
  }
}

export type { CookieConsentContent } from "./types";