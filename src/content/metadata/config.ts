// src/content/metadata/config.ts

export const siteConfig = {
    siteName: "GLOBALSPED",
    companyName: "GLOBALSPED Internationale Spedition GmbH",
  
    // Staging aktuell:
    stagingUrl: "https://globalsped-next--globalsped-next.europe-west4.hosted.app",
  
    // Vor Livegang ändern:
    productionUrl: false, //"https://www.globalsped.de",
  
    defaultLocale: "de",
    locales: ["de", "en", "az"] as const,
  
    defaultOgImage: "/images/og/globalsped-og.jpg",
  
    twitterCard: "summary_large_image" as const,
  };

  export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://globalsped-next--globalsped-next.europe-west4.hosted.app";