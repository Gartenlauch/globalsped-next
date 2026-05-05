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

export type DestinationCountry = {
  name: string;
  slug: string;
  cities?: string[];
};

export type DestinationRegion = {
  title: string;
  slug: string;
  subtitle: string;
  image: string;
  countries: DestinationCountry[];
};

export type DestinationsContent = {
  badge: string;
  title: string;
  highlight: string;
  intro: string;
  regions: DestinationRegion[];
  countryGridTitle: string;
  countryGridIntro: string;
  ctaLabel: string;
};

export type ContentSchema = {
  hero: HeroContent;
  destinations: DestinationsContent;
};