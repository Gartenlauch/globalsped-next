import { de } from "./de";
//import { en } from "./en";
//import { az } from "./az";


export const supportedLocales = ["de", "en", "az"];
export const defaultLocale = "de"

export const content = {
  de,

};

export function getContent(locale: string) {
  return content[locale as keyof typeof content] || content.de;
}