import { notFoundDe } from "./de";
import { notFoundEn } from "./en";

export function getNotFoundContent(locale: string) {
  switch (locale) {
    case "en":
      return notFoundEn;
    case "de":
    default:
      return notFoundDe;
  }
}