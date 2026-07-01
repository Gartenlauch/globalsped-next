import { applicationFormDe } from "./de";
import { applicationFormEn } from "./en";

export function getApplicationFormContent(locale: string) {
  switch (locale) {
    case "en":
      return applicationFormEn;
    case "de":
    default:
      return applicationFormDe;
  }
}

export type { ApplicationFormContent } from "./types";