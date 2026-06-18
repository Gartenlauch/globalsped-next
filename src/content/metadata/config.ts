// src/content/metadata/config.ts
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://globalsped-next--globalsped-next.europe-west4.hosted.app";


export const siteConfig = {
  siteName: "GLOBALSPED",
  companyName: "GLOBALSPED Internationale Spedition GmbH",
  stagingUrl: "https://globalsped-next--globalsped-next.europe-west4.hosted.app",
  productionUrl: "https://www.globalsped.de",
  locales: ["de", "en", "az"],
  activeLocales: ["de"] as const,
  defaultLocale: "de",
  defaultOgImage: "/images/globalsped-og.png",
  twitterCard: "summary_large_image" as const,
};

