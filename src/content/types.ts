export type HeroFeatureBox = {
  title: string;
  icon: "globe" | "route" | "shield";
  text: string;
};

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
  featureBoxes: HeroFeatureBox[];
};

export type ContentSchema = {
  hero: HeroContent;
};