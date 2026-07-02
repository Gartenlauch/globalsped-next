// src/content/metadata/config.ts
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.globalsped.de"


export const siteConfig = {
  siteName: "GLOBALSPED",
  companyName: "GLOBALSPED Internationale Spedition GmbH",
  stagingUrl: "https://globalsped-next--globalsped-next.europe-west4.hosted.app",
  productionUrl: "https://www.globalsped.de",
  locales: ["de", "en"],
  activeLocales: ["de", "en"] as const,
  defaultLocale: "de",
  defaultOgImage: "/images/globalsped-og.jpg",
  twitterCard: "summary_large_image" as const,
};

