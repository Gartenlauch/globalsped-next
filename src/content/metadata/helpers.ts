// src/content/metadata/helpers.ts

import type { Metadata } from "next";
import { siteConfig } from "./config";
import type { Locale, PageMeta } from "./types";

const { activeLocales } = siteConfig

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
  useProductionUrl = true,
}: BuildMetaOptions): Metadata {
  const baseUrl = getBaseUrl(useProductionUrl);
  const path = normalizePath(meta.path);
  const canonicalUrl = `${baseUrl}${path}`;

  const languages = Object.fromEntries(
    activeLocales.map((targetLocale) => {
      const locale = targetLocale as Locale;
  
      return [
        locale,
        `${baseUrl}${replaceLocaleInPath(path, locale)}`,
      ];
    })
  );
  const ogImage = meta.ogImage ?? siteConfig.defaultOgImage;
  const ogImageUrl = `${baseUrl}${ogImage}`;
  const ogImageAlt = meta.ogImageAlt ?? meta.ogTitle ?? meta.title;
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