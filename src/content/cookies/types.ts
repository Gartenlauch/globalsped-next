export type CookieConsentContent = {
  modal: {
    title: string;
    description: string;
    acceptAll: string;
    acceptNecessary: string;
    manage: string;
  };
  preferences: {
    title: string;
    acceptAll: string;
    acceptNecessary: string;
    save: string;
    close: string;
    sections: {
      intro: {
        title: string;
        description: string;
      };
      necessary: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
      marketing: {
        title: string;
        description: string;
      };
      more: {
        title: string;
        description: string;
      };
    };
  };
};