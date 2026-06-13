import { premiumHomeDe } from "./de";

export function getPremiumHomeContent(locale: string) {
  switch (locale) {
    case "de":
    default:
      return premiumHomeDe;
  }
}