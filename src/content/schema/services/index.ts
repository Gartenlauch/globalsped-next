import { servicesCatalogSchemaDe } from "./de";

export function getServicesCatalogSchema(locale: string) {
  switch (locale) {
    case "de":
    default:
      return servicesCatalogSchemaDe;
  }
}