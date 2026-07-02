import type { MetadataRoute } from "next";
import { getAllFaqs } from "@/lib/faq";
import { metadataDe } from "./de";
import { metadataEn } from "./en";
import { countrySlugPairs, serviceSlugPairs } from "@/lib/i18n/slug-pairs";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

export type SeoLocale = "de" | "en";

export type AlternatePathGroup = {
  paths: Record<SeoLocale, string>;
  changeFrequency: ChangeFrequency;
  priority: number;
};

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

const staticAlternatePathGroups: AlternatePathGroup[] = [
  {
    paths: {
      de: metadataDe.pages.home.path,
      en: metadataEn.pages.home.path,
    },
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    paths: {
      de: metadataDe.pages.services.path,
      en: metadataEn.pages.services.path,
    },
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    paths: {
      de: metadataDe.pages.destinations.path,
      en: metadataEn.pages.destinations.path,
    },
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    paths: {
      de: metadataDe.pages.about.path,
      en: metadataEn.pages.about.path,
    },
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    paths: {
      de: metadataDe.pages.jobs.path,
      en: metadataEn.pages.jobs.path,
    },
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    paths: {
      de: metadataDe.pages.application.path,
      en: metadataEn.pages.application.path,
    },
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    paths: {
      de: metadataDe.pages.transportRequest.path,
      en: metadataEn.pages.transportRequest.path,
    },
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    paths: {
      de: metadataDe.pages.faq.path,
      en: metadataEn.pages.faq.path,
    },
    changeFrequency: "monthly",
    priority: 0.75,
  },
];



const serviceAlternatePathGroups: AlternatePathGroup[] = serviceSlugPairs.map(
  (pair) => ({
    paths: {
      de: `/de/leistungen/${pair.de}`,
      en: `/en/services/${pair.en}`,
    },
    changeFrequency: "monthly",
    priority: pair.de === "zollabwicklung" ? 0.85 : 0.8,
  })
);

const countryAlternatePathGroups: AlternatePathGroup[] = countrySlugPairs.map(
  (pair) => ({
    paths: {
      de: `/de/ziellaender/${pair.de}`,
      en: `/en/destinations/${pair.en}`,
    },
    changeFrequency: "monthly",
    priority: 0.8,
  })
);

function getFaqAlternatePathGroups(): AlternatePathGroup[] {
  const deFaqs = getAllFaqs("de");
  const enFaqs = getAllFaqs("en");

  return deFaqs.flatMap((deFaq, index): AlternatePathGroup[] => {
    const enFaq = enFaqs[index];

    if (!enFaq) {
      return [];
    }

    return [
      {
        paths: {
          de: `/de/faq/${deFaq.slug}`,
          en: `/en/faq/${enFaq.slug}`,
        },
        changeFrequency: "monthly",
        priority: 0.65,
      },
    ];
  });
}

export function getAllAlternatePathGroups(): AlternatePathGroup[] {
  return [
    ...staticAlternatePathGroups,
    ...serviceAlternatePathGroups,
    ...countryAlternatePathGroups,
    ...getFaqAlternatePathGroups(),
  ];
}

export function getAlternatePathsForPath(
  path: string
): Record<SeoLocale, string> | undefined {
  const normalizedPath = normalizePath(path);

  return getAllAlternatePathGroups().find((group) =>
    Object.values(group.paths).includes(normalizedPath)
  )?.paths;
}