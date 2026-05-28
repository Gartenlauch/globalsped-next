import type { CookieConsentContent } from "./types";

export const cookieConsentDe: CookieConsentContent = {
  modal: {
    title: "Cookie-Einstellungen",
    description:
      "Wir verwenden notwendige Cookies für den Betrieb der Webseite. Statistik- und Marketing-Cookies setzen wir nur ein, wenn Sie zustimmen. Sie können Ihre Auswahl jederzeit ändern.",
    acceptAll: "Alle akzeptieren",
    acceptNecessary: "Nur notwendige",
    manage: "Einstellungen",
  },

  preferences: {
    title: "Cookie-Einstellungen verwalten",
    acceptAll: "Alle akzeptieren",
    acceptNecessary: "Nur notwendige",
    save: "Auswahl speichern",
    close: "Schließen",

    sections: {
      intro: {
        title: "Datenschutz & Transparenz",
        description:
          "Hier können Sie festlegen, welche Kategorien von Cookies und externen Diensten Sie erlauben möchten.",
      },
      necessary: {
        title: "Notwendige Cookies",
        description:
          "Diese Cookies sind für den technischen Betrieb der Webseite erforderlich und können nicht deaktiviert werden.",
      },
      analytics: {
        title: "Statistik",
        description:
          "Hilft uns zu verstehen, wie Besucher unsere Webseite nutzen, damit wir Inhalte und Nutzerführung verbessern können.",
      },
      marketing: {
        title: "Marketing",
        description:
          "Ermöglicht die Auswertung von Kampagnen und die Nutzung externer Marketing- oder Conversion-Dienste.",
      },
      more: {
        title: "Weitere Informationen",
        description:
          'Mehr Informationen finden Sie in unserer <a href="/de/datenschutz">Datenschutzerklärung</a> und im <a href="/de/impressum">Impressum</a>.',
      },
    },
  },
};