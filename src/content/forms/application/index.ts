import { applicationFormDe } from "./de";

export function getApplicationFormContent(locale: string) {
  switch (locale) {
    case "de":
    default:
      return applicationFormDe;
  }
}

export type { ApplicationFormContent } from "./types";