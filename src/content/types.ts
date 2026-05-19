export type Header = {
  header: {
    logoLabel: string;
    nav: {
      label: string;
      href: string;
    }[];
    cta: {
      label: string;
      href: string;
    };
    menuOpenLabel: string;
    menuCloseLabel: string;
  };
}



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
    faqTitlePrefix?: string;
    faqTitle: string;
  };
  countryAuthorityContent: {
    title: string;
    intro: string;
    operationalHints: {
      title: string;
      text: string;
    }[];
    authorityLinks: {
      label: string;
      href: string;
      source: string;
      topic: string;
      reason: string;
    }[];
    internalLinks: {
      label: string;
      href: string;
      reason: string;
    }[];
  };
  cta: {
    label: string;
    href: string;
  },
};

export type AboutUsPage = {
  aboutUs: {
    badge: string;
    title: string;
    highlight: string;
    intro: string;
    text: string;
    ctaLabel: string;
    images: {
      src: string;
      alt: string;
      label: string;
    }[];
    teamIntroBox: {
      icon: "communication" | "network" | "experience" | "customs";
      title: string;
      text: string;
    };
    teamBadge: string;
    teamTitle: string;
    teamText: string;
    facts: {
      value: string;
      label: string;
    }[];
    teamListTitle: string;
    teamListIntro: string;
    teamMembers: {
      imgURL: string;
      name: string;
      job: string;
      contact: {
        phone: string;
        email: string;
      };
    }[];
  };
}
export type Footer = {
  footer: {
    companyName: string;
    claim: string;
    text: string;
    contactTitle: string;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
    pageLinksTitle: string;
    pageLinks: {
      label: string;
      href: string;
    }[];
    transportsTitle: string;
    transports: {
      label: string;
      href: string;
    }[];
    membershipsTitle: string;
    memberships: {
      label: string;
      text: string;
      href: string;
      icon: "shield" | "globe";
    }[];
    copyright: string;
  };
}


export type ContactContent = {
  contact: {
    badge: string;
    title: string;
    highlight: string;
    intro: string;
    form: {
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submitLabel: string;
      validationRequired: string;
      successMessage: string;
    };
    locationsTitle: string;
    routeLabel: string;
    locations: {
      title: string;
      address: string;
      phone: string;
      email: string;
      mapsUrl: string;
    }[];
    mapTitle: string;
    mapEmbedUrl: string;
  };
}

export type JobsPage = {
  jobs: {
    badge: string;
    title: string;
    highlight: string;
    intro: string;
    image: {
      src: string;
      alt: string;
    };
    imageOverlayCards: {
      title: string;
      text: string;
      icon: "users" | "star";
    }[];
    openPositionsTitle: string;
    applyLabel: string;
    detailsLabel: string;
    email: string;
    positions: {
      title: string;
      subtitle: string;
      description: string;
      tasks: string[];
    }[];
    initiative: {
      title: string;
      text: string;
    };
    companyTitle: string;
    companyText: string;
    values: string[];
    closing: string;
  };

}
export type ContentSchema = {
  header: Header;
  hero: HeroContent;
  destinations: DestinationsContent;
  countryPages: CountryTransportPage[];
  about: AboutUsPage;
  jobs: JobsPage;
  contact: ContactContent
  footer: Footer
};