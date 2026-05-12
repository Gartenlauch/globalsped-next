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