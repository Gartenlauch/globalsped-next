import type { MetadataRoute } from "next";

import { getAllFaqs } from "@/lib/faq";
import { siteUrl } from "@/content/metadata/config";
import { metadataDe } from "@/content/metadata/de";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

type SitemapEntryInput = {
  path: string;
  changeFrequency?: ChangeFrequency;
  priority?: number;
};

const now = new Date();

function buildUrl(path: string) {
  const normalizedBaseUrl = siteUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
}

function entry({
  path,
  changeFrequency = "monthly",
  priority = 0.7,
}: SitemapEntryInput): MetadataRoute.Sitemap[number] {
  return {
    url: buildUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const faqs = getAllFaqs("de");

  const staticRoutes: SitemapEntryInput[] = [
    {
      path: metadataDe.pages.home.path,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      path: metadataDe.pages.services.path,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      path: metadataDe.pages.destinations.path,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      path: metadataDe.pages.about.path,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      path: metadataDe.pages.jobs.path,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      path: metadataDe.pages.application.path,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      path: metadataDe.pages.transportRequest.path,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      path: metadataDe.pages.faq.path,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      path: metadataDe.pages.privacy.path,
      changeFrequency: "yearly",
      priority: 0.25,
    },
    {
      path: metadataDe.pages.imprint.path,
      changeFrequency: "yearly",
      priority: 0.25,
    },
  ];

  const serviceRoutes: SitemapEntryInput[] = Object.keys(metadataDe.services).map(
    (slug) => ({
      path:
        slug === "zoll"
          ? "/de/leistungen/zollabwicklung"
          : `/de/leistungen/${slug}`,
      changeFrequency: "monthly",
      priority: slug === "zoll" ? 0.85 : 0.8,
    }),
  );

  const countryRoutes: SitemapEntryInput[] = Object.keys(metadataDe.countries).map(
    (slug) => ({
      path: `/de/ziellaender/${slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const faqRoutes: SitemapEntryInput[] = faqs.map((faq) => ({
    path: `/de/faq/${faq.slug}`,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    ...staticRoutes.map(entry),
    ...serviceRoutes.map(entry),
    ...countryRoutes.map(entry),
    ...faqRoutes.map(entry),
  ];
}