import { transportRequestDe } from "./de";
import { transportRequestEn } from "./en";

export function getTransportRequestContent(locale: string) {
  switch (locale) {
    case "en":
      return transportRequestEn;
    case "de":
    default:
      return transportRequestDe;
  }
}

export type { TransportRequestContent } from "./types";