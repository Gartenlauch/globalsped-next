import { notFoundDe } from "./de";

export function getNotFoundContent(locale: string) {
  switch (locale) {
    case "de":
    default:
      return notFoundDe;
  }
}