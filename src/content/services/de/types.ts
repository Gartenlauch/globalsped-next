export type ServicePageContent = {
  slug: string;
  badge: string;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    highlight: string;
    intro: string;
  };
  expertSection?: ServiceExpertSection;
  trust: ServiceContentBlock;
  services: ServiceContentBlock;
  regions: ServiceContentBlock;
  challenges: ServiceContentBlock;
  solutions: ServiceContentBlock;
  sidebar: {
    title: string;
    items: string[];
  };
  cta: {
    primary: string;
    secondary: string;
  };
};

type ServiceContentBlock = {
  title: string;
  text: string;
  items: string[];
};

export type ServiceExpertSection = {
  badge: string;
  title: string;
  intro: string;
  authorityTitle: string;
  externalLinkLabel: string;
  cards: {
    title: string;
    text: string;
  }[];
  authorityLinks: {
    label: string;
    href: string;
    source: string;
  }[];
  note: string;
};
