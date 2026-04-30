export type HeroContent = {
  badge: string;
  headline: {
    line1: string;
    highlight: string;
    line2: string;
  };
  subline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  destinations: string[];
};

export type ContentSchema = {
  hero: HeroContent;
};