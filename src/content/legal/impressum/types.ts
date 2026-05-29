export type ImpressumLine = {
    label?: string;
    value: string;
    href?: string;
  };
  
  export type ImpressumSection = {
    title: string;
    lines: ImpressumLine[];
  };
  
  export type ImpressumNote = {
    title: string;
    text: string;
  };
  
  export type ImpressumContent = {
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
    sections: ImpressumSection[];
    notes: ImpressumNote[];
  };