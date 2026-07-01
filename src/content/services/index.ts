import * as serviceContentDe from "./de";
import * as serviceContentEn from "./en";

export type { ServicePageContent } from "./de/types";

const servicesByLocale = {
  de: serviceContentDe,
  en: serviceContentEn,
} as const;

export type SupportedServiceLocale = keyof typeof servicesByLocale;

export function isSupportedServiceLocale(
  locale: string
): locale is SupportedServiceLocale {
  return locale in servicesByLocale;
}

export function getServiceContent(locale: string) {
  if (isSupportedServiceLocale(locale)) {
    return servicesByLocale[locale];
  }

  return servicesByLocale.de;
}

export function getServiceBySlug(slug: string, locale: string = "de") {
  return getServiceContent(locale).getServiceBySlug(slug);
}

export function getServiceSlugs(locale: string = "de") {
  return getServiceContent(locale).getServiceSlugs();
}

export function getServiceStaticParams() {
  const locales = ["de", "en"] as const;

  return locales.flatMap((locale) =>
    getServiceSlugs(locale).map((slug) => ({
      locale,
      slug,
    }))
  );
}