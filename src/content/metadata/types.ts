// src/content/metadata/types.ts

export type Locale = "de" | "en" | "az";

export type MetaRouteKey =
  | "home"
  | "faq"
  | "transportRequest"
  | "contact"
  | "about"
  | "jobs"
  | "application"
  | "destinations"
  | "services"
  | "customs"
  | "privacy"
  | "imprint"
  | "notFound";

  export type PageMeta = {
    title: string;
    description: string;
    path: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogImageAlt?: string;
    noIndex?: boolean;
  };

  export type CountryMeta = {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogImageAlt?: string;
  };
  
  export type ServiceMeta = {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogImageAlt?: string;
  };

export type LocaleMetadata = {
  pages: Record<MetaRouteKey, PageMeta>;
  countries: Record<string, CountryMeta>;
  services: Record<string, ServiceMeta>;
};