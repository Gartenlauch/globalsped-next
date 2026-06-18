// app/robots.ts

import type { MetadataRoute } from "next";
import { siteConfig, siteUrl } from "@/content/metadata/config";

export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.NEXT_PUBLIC_SITE_URL === siteConfig.productionUrl;

  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.productionUrl}/sitemap.xml`,
  };
}