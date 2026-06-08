

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


export type ServiceHighlightCard = {
  title: string;
  text: string;
};

export type ServiceFact = {
  value: string;
  label: string;
};

export type ServiceDetailSection = {
  title: string;
  text: string;
  items?: string[];
};

export type ServiceTemperatureSection = {
  eyebrow: string;
  title: string;
  text: string;
  facts: ServiceFact[];
};

export type ServiceUseCasesSection = {
  title: string;
  text: string;
  items: ServiceHighlightCard[];
};

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
  trust: {
    title: string;
    text: string;
    items: string[];
  };
  services: {
    title: string;
    text: string;
    items: string[];
  };
  regions: {
    title: string;
    text: string;
    items: string[];
  };
  challenges: {
    title: string;
    text: string;
    items: string[];
  };
  solutions: {
    title: string;
    text: string;
    items: string[];
  };
  sidebar: {
    title: string;
    items: string[];
  };
  cta: {
    primary: string;
    secondary: string;
  };

  temperature?: ServiceTemperatureSection;
  useCases?: ServiceUseCasesSection;
  gdp?: ServiceDetailSection;
};
