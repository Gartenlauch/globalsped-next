export type FaqIntent =
  | "informational"
  | "commercial"
  | "transactional"
  | "comparison"
  | "problem-solving";

export type SearchIntentPrimary =
  | "know"
  | "do"
  | "compare"
  | "buy"
  | "solve";

export type FaqItem = {
  slug: string;
  question: string;
  answer: string;
  category: string;
  intent: FaqIntent;
  searchIntentPrimary: SearchIntentPrimary;
  relatedTopics: string[];
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export type FaqPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  overview: {
    eyebrow: string;
    title: string;
    text: string;
  };
  search: {
    label: string;
    placeholder: string;
    allCategoriesLabel: string;
    noResultsTitle: string;
    noResultsText: string;
  };
  cards: {
    readMoreLabel: string;
  };
  detail: {
    relatedTopicsTitle: string;
    relatedFaqsTitle: string;
    lastUpdatedLabel: string;
    backToFaqLabel: string;
  };
  breadcrumbs: {
    home: string;
    faq: string;
  };
};

export type FaqMetadataContent = {
  landing: {
    metaTitle: string;
    metaDescription: string;
    canonicalPath: string;
    openGraphTitle: string;
    openGraphDescription: string;
  };
};