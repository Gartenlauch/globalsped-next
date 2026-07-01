import { datenschutzDe } from "./de";
import { datenschutzEn } from "./en";

export function getDatenschutzContent(locale: string) {
  switch (locale) {
    case "en":
      return datenschutzEn;
    case "de":
    default:
      return datenschutzDe;
  }
}

export type { DatenschutzContent } from "./types";