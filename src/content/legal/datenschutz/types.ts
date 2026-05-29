export type PrivacyList = {
    title?: string;
    items: string[];
  };
  
  export type PrivacySection = {
    id: string;
    title: string;
    paragraphs?: string[];
    lists?: PrivacyList[];
  };
  
  export type DatenschutzContent = {
    meta: {
      title: string;
      description: string;
    };
    badge: string;
    title: string;
    intro: string;
    backLink: {
      label: string;
      href: string;
    };
    lastUpdated: string;
    sections: PrivacySection[];
  };