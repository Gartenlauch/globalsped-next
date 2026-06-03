// src/content/metadata/config.ts
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://globalsped-next--globalsped-next.europe-west4.hosted.app";


export const siteConfig = {
  siteName: "GLOBALSPED",
  companyName: "GLOBALSPED Internationale Spedition GmbH",
  stagingUrl: "https://globalsped-next--globalsped-next.europe-west4.hosted.app",
  productionUrl: "https://www.globalsped.de",
  defaultLocale: "de",
  locales: ["de", "en", "az"] as const,
  defaultOgImage: "/images/og/globalsped-og.jpg",
  twitterCard: "summary_large_image" as const,
};

