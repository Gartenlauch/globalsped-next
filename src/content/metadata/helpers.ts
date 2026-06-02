// src/content/metadata/helpers.ts

import type { Metadata } from "next";
import { siteConfig } from "./config";
import type { Locale, PageMeta } from "./types";

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

function replaceLocaleInPath(path: string, targetLocale: Locale) {
  const normalized = normalizePath(path);

  if (normalized.startsWith("/de/") || normalized === "/de") {
    return normalized.replace(/^\/de/, `/${targetLocale}`);
  }

  if (normalized.startsWith("/en/") || normalized === "/en") {
    return normalized.replace(/^\/en/, `/${targetLocale}`);
  }

  if (normalized.startsWith("/az/") || normalized === "/az") {
    return normalized.replace(/^\/az/, `/${targetLocale}`);
  }

  return `/${targetLocale}${normalized}`;
}

export function buildPageMetadata({
  locale,
  meta,
  useProductionUrl = false,
}: BuildMetaOptions): Metadata {
  const baseUrl = getBaseUrl(useProductionUrl);
  const path = normalizePath(meta.path);
  const canonicalUrl = `${baseUrl}${path}`;

  const languages = Object.fromEntries(
    siteConfig.locales.map((targetLocale) => [
      targetLocale,
      `${baseUrl}${replaceLocaleInPath(path, targetLocale)}`,
    ])
  );

  return {
    title: meta.title,
    description: meta.description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languages,
        "x-default": `${baseUrl}${replaceLocaleInPath(path, siteConfig.defaultLocale as Locale)}`,
      },
    },

    openGraph: {
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.description,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      locale,
      type: "website",
      images: [
        {
          url: `${baseUrl}${meta.ogImage ?? siteConfig.defaultOgImage}`,
          width: 1200,
          height: 630,
          alt: meta.ogTitle ?? meta.title,
        },
      ],
    },

    twitter: {
      card: siteConfig.twitterCard,
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.description,
      images: [`${baseUrl}${meta.ogImage ?? siteConfig.defaultOgImage}`],
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