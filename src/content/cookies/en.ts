import type { CookieConsentContent } from "./types";

export const cookieConsentEn: CookieConsentContent = {
  modal: {
    title: "Cookie settings",
    description:
      "We use necessary cookies to operate the website. Statistics and marketing cookies are only used if you give your consent. You can change your selection at any time.",
    acceptAll: "Accept all",
    acceptNecessary: "Necessary only",
    manage: "Settings",
  },

  preferences: {
    title: "Manage cookie settings",
    acceptAll: "Accept all",
    acceptNecessary: "Necessary only",
    save: "Save selection",
    close: "Close",

    sections: {
      intro: {
        title: "Privacy & transparency",
        description:
          "Here you can choose which categories of cookies and external services you would like to allow.",
      },
      necessary: {
        title: "Necessary cookies",
        description:
          "These cookies are required for the technical operation of the website and cannot be disabled.",
      },
      analytics: {
        title: "Statistics",
        description:
          "Helps us understand how visitors use our website so that we can improve our content and user experience.",
      },
      marketing: {
        title: "Marketing",
        description:
          "Enables campaign analysis and the use of external marketing or conversion services.",
      },
      more: {
        title: "More information",
        description:
          'You can find more information in our <a href="/en/privacy-policy">privacy policy</a> and <a href="/en/legal-notice">legal notice</a>.',
      },
    },
  },
};