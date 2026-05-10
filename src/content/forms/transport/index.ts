import { transportRequestDe } from "./de";

export function getTransportRequestContent(locale: string) {
  switch (locale) {
    case "de":
    default:
      return transportRequestDe;
  }
}

export type { TransportRequestContent } from "./types";