import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/metadata/config";
import { getAllAlternatePathGroups } from "@/content/metadata/alternates";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

type SitemapEntryInput = {
  path: string;
  alternatePaths: {
    de: string;
    en: string;
  };
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
  alternatePaths,
  changeFrequency = "monthly",
  priority = 0.7,
}: SitemapEntryInput): MetadataRoute.Sitemap[number] {
  return {
    url: buildUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        de: buildUrl(alternatePaths.de),
        en: buildUrl(alternatePaths.en),
        "x-default": buildUrl(alternatePaths.de),
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const groups = getAllAlternatePathGroups();

  return groups.flatMap((group) => [
    entry({
      path: group.paths.de,
      alternatePaths: group.paths,
      changeFrequency: group.changeFrequency,
      priority: group.priority,
    }),
    entry({
      path: group.paths.en,
      alternatePaths: group.paths,
      changeFrequency: group.changeFrequency,
      priority: group.priority,
    }),
  ]);
}