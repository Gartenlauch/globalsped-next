import { impressumDe } from "./de";
import { impressumEn } from "./en";

export function getImpressumContent(locale: string) {
  switch (locale) {
    case "en":
      return impressumEn;
    case "de":
    default:
      return impressumDe;
  }
}

export type { ImpressumContent } from "./types";