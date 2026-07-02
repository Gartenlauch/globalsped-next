import type { Metadata } from "next";

import { siteConfig } from "./config";
import type { Locale, PageMeta } from "./types";
import { getAlternatePathsForPath } from "./alternates";

type BuildMetaOptions = {
  locale: string;
  meta: PageMeta;
  useProductionUrl?: boolean;
};

function getBaseUrl(useProductionUrl = false) {
  return useProductionUrl ? siteConfig.productionUrl : siteConfig.stagingUrl;
}

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function normalizeLocale(locale: string): Locale {
  return locale === "en" ? "en" : "de";
}

function buildAbsoluteUrl(baseUrl: string, path: string) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const normalizedPath = normalizePath(path);

  return `${normalizedBaseUrl}${normalizedPath}`;
}

function buildLanguages(baseUrl: string, path: string, noIndex?: boolean) {
  if (noIndex) {
    return undefined;
  }

  const alternatePaths = getAlternatePathsForPath(path);

  if (!alternatePaths) {
    return undefined;
  }

  return {
    de: buildAbsoluteUrl(baseUrl, alternatePaths.de),
    en: buildAbsoluteUrl(baseUrl, alternatePaths.en),
    "x-default": buildAbsoluteUrl(baseUrl, alternatePaths.de),
  };
}

export function buildPageMetadata({
  locale,
  meta,
  useProductionUrl = true,
}: BuildMetaOptions): Metadata {
  const normalizedLocale = normalizeLocale(locale);
  const baseUrl = getBaseUrl(useProductionUrl);
  const path = normalizePath(meta.path);
  const canonicalUrl = buildAbsoluteUrl(baseUrl, path);
  const languages = buildLanguages(baseUrl, path, meta.noIndex);

  const ogImage = meta.ogImage ?? siteConfig.defaultOgImage;
  const ogImageUrl = buildAbsoluteUrl(baseUrl, ogImage);
  const ogImageAlt = meta.ogImageAlt ?? meta.ogTitle ?? meta.title;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.description,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      locale: normalizedLocale === "en" ? "en_US" : "de_DE",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: siteConfig.twitterCard,
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.description,
      images: [ogImageUrl],
    },
    robots: meta.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}