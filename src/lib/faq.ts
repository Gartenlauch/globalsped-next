import {
  deFaqItems,
  deFaqMetadata,
  deFaqPageContent,
  enFaqItems,
  enFaqMetadata,
  enFaqPageContent,
} from "@/content/faq";

const localeFaqMap = {
  de: {
    items: deFaqItems,
    page: deFaqPageContent,
    metadata: deFaqMetadata,
  },
  en: {
    items: enFaqItems,
    page: enFaqPageContent,
    metadata: enFaqMetadata,
  },
} as const;

export type SupportedFaqLocale = keyof typeof localeFaqMap;

export function isSupportedFaqLocale(
  locale: string
): locale is SupportedFaqLocale {
  return locale in localeFaqMap;
}

export function getFaqContent(locale: SupportedFaqLocale = "de") {
  return localeFaqMap[locale];
}

export function getAllFaqs(locale: SupportedFaqLocale = "de") {
  return getFaqContent(locale).items;
}

export function getFaqPageContent(locale: SupportedFaqLocale = "de") {
  return getFaqContent(locale).page;
}

export function getFaqMetadata(locale: SupportedFaqLocale = "de") {
  return getFaqContent(locale).metadata;
}

export function getFaqBySlug(
  slug: string,
  locale: SupportedFaqLocale = "de"
) {
  return getAllFaqs(locale).find((faq) => faq.slug === slug);
}

export function getFaqCategories(locale: SupportedFaqLocale = "de") {
  return Array.from(new Set(getAllFaqs(locale).map((faq) => faq.category)));
}

export function getFeaturedFaqs(locale: SupportedFaqLocale = "de", limit = 6) {
  return getAllFaqs(locale).slice(0, limit);
}

export function getRelatedFaqs(
  currentSlug: string,
  locale: SupportedFaqLocale = "de",
  limit = 4
) {
  const currentFaq = getFaqBySlug(currentSlug, locale);

  if (!currentFaq) {
    return [];
  }

  return getAllFaqs(locale)
    .filter((faq) => faq.slug !== currentSlug)
    .filter(
      (faq) =>
        faq.category === currentFaq.category ||
        faq.relatedTopics.some((topic) =>
          currentFaq.relatedTopics.includes(topic)
        )
    )
    .slice(0, limit);
}