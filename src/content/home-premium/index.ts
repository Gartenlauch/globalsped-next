import { premiumHomeDe } from "./de";
import { premiumHomeEn } from "./en";

export function getPremiumHomeContent(locale: string) {
  switch (locale) {
    case "en":
      return premiumHomeEn;
    case "de":
    default:
      return premiumHomeDe;
  }
}