import { datenschutzDe } from "./de";

export function getDatenschutzContent(locale: string) {
  switch (locale) {
    case "de":
    default:
      return datenschutzDe;
  }
}

export type { DatenschutzContent } from "./types";