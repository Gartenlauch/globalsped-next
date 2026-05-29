import { impressumDe } from "./de";

export function getImpressumContent(locale: string) {
  switch (locale) {
    case "de":
    default:
      return impressumDe;
  }
}

export type { ImpressumContent } from "./types";