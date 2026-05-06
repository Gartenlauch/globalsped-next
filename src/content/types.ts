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

export type CountryTransportRouteInfo = {
  label: string;
  routes: {
    title: string;
    description: string;
  }[];
};

export type CountryTransportRuntimeInfo = {
  label: string;
  value: string;
};

export type CountryTransportCustomsInfo = {
  label: string;
  offices: {
    route: string;
    office: string;
  }[];
};

export type CountryTransportDocumentsInfo = {
  label: string;
  documents: string[];
  note: string;
};

export type CountryTransportRequiredInfo = {
  label: string;
  intro: string;
  items: string[];
};

export type CountryTransportPage = {
  slug: string;
  country: string;
  region: string;
  heroImage: string;
  title: string;
  highlight: string;
  intro: string;
  seoText: string;
  services: string[];
  cities: string[];
  transportDetails: {
    route: CountryTransportRouteInfo;
    runtime: CountryTransportRuntimeInfo;
    customsOffice: CountryTransportCustomsInfo;
    documents: CountryTransportDocumentsInfo;
    requiredInformation: CountryTransportRequiredInfo;
  };
  labels: {
    backToDestinations: string;
    introBadge: string;
    logisticsTitlePrefix: string;
    citiesTitle: string;
    faqTitlePrefix: string;
    faqTitle: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  ctaLabel: string;
};

export type ContentSchema = {
  hero: HeroContent;
  destinations: DestinationsContent;
  countryPages: CountryTransportPage[];
};