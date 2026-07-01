import { servicesCatalogSchemaDe } from "./de";
import { servicesCatalogSchemaEn } from "./en";

export function getServicesCatalogSchema(locale: string) {
  switch (locale) {
    case "en":
      return servicesCatalogSchemaEn;
    case "de":
    default:
      return servicesCatalogSchemaDe;
  }
}