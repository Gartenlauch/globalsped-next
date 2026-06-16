export type PremiumIcon =
  | "truck"
  | "boxes"
  | "customs"
  | "temperature"
  | "shield"
  | "crane"
  | "globe"
  | "route"
  | "experience"
  | "network"
  | "communication"
  | "users"
  | "career"
  | "growth"
  | "security";

export type PremiumImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  mobileSrc?: string;
  mobileWidth?: number;
  mobileHeight?: number;
};

export type PremiumCta = {
  label: string;
  href: string;
};

export type PremiumStat = {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  ctaLabel: string;
};

export type PremiumServiceCard = {
  icon: PremiumIcon;
  title: string;
  text: string;
  href: string;
  ctaLabel: string;
};

export type PremiumDestinationSignal = {
  originLabel: string;
  originFlagCode: string;
  targetLabel: string;
  ariaLabel: string;
};

export type PremiumCountry = {
  name: string;
  slug: string;
  flagCode: string;
  href: string;
};

export type PremiumValueItem = {
  icon: PremiumIcon;
  title: string;
  text: string;
};

export type PremiumLanguage = {
  name: string;
  flagCode: string;
};

export type PremiumProofCard = {
  icon: PremiumIcon;
  title: string;
  text: string;
  languages?: PremiumLanguage[];
};

export type PremiumFaqItem = {
  category: string;
  title: string;
  text: string;
  href: string;
  ctaLabel: string;
};

export type PremiumHomeContent = {
  hero: {
    eyebrow: string;
    headline: {
      line1: string;
      highlight: string;
      line2: string;
    };
    intro: string;
    primaryCta: PremiumCta;
    secondaryCta: PremiumCta;
    image: PremiumImage;
    stats: PremiumStat[];
    routeCard: {
      eyebrow: string;
      title: string;
      text: string;
      href: string;
      ctaLabel: string;
    };
  };

  services: {
    id: string;
    eyebrow: string;
    title: string;
    titleHighlight?: string;
    intro: string;
    overviewCta: PremiumCta;
    backgroundImage: PremiumImage;
    cards: PremiumServiceCard[];
  };

  destinations: {
    id: string;
    eyebrow: string;
    title: string;
    titleHighlight?: string;
    intro: string;
    cta: PremiumCta;
    mapImage: PremiumImage;
    routeSignal: PremiumDestinationSignal;
    countries: PremiumCountry[];
  };

  about: {
    id: string;
    eyebrow: string;
    title: string;
    titleHighlight?: string;
    intro: string;
    text: string;
    cta: PremiumCta;
    image: PremiumImage;
    values: PremiumValueItem[];
    proofCards: PremiumProofCard[];
  };

  jobs: {
    id: string;
    eyebrow: string;
    title: string;
    titleHighlight?: string;
    intro: string;
    cta: PremiumCta;
    image: PremiumImage;
    imageOverlay: {
      title: string;
      text: string;
    };
    values: PremiumValueItem[];
  };

  faq: {
    enabled: boolean;
    id: string;
    eyebrow: string;
    title: string;
    titleHighlight?: string;
    intro: string;
    overviewCta: PremiumCta;
    items: PremiumFaqItem[];
  };
};