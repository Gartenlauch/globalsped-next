import { de as siteContent } from "@/content/de";
import type { PremiumHomeContent } from "./types";

export const premiumHomeDe: PremiumHomeContent = {
  hero: {
    eyebrow: siteContent.hero.badge,
    headline: siteContent.hero.headline,
    intro: siteContent.hero.subline,
    primaryCta: {
      label: "Transport unverbindlich anfragen",
      href: "/{locale}/transport-anfrage",
    },
    secondaryCta: {
      label: "Leistungen ansehen",
      href: "/{locale}/leistungen",
    },
    image: {
      src: "/images/home-premium/globalsped-premium-hero-internationale-transporte-zentralasien-kaukasus-2400x1350.webp",
      alt: "GLOBALSPED LKW auf internationaler Transportroute nach Zentralasien und in den Kaukasus",
    },
    stats: [
      {
        eyebrow: "Spezialisiert",
        title: "Zentralasien & Kaukasus",
        text: "Internationale Transporte in anspruchsvolle Zielmärkte mit Erfahrung, Routenkenntnis und persönlicher Koordination.",
        href: "/{locale}/ziellaender",
        ctaLabel: "Zielländer ansehen",
      },
      {
        eyebrow: "Unser Service",
        title: "FTL, LTL & Spezialtransporte",
        text: "Komplettladungen, Teilladungen, Thermotransporte, Gefahrgut und Projektlogistik aus einer Hand.",
        href: "/{locale}/leistungen",
        ctaLabel: "Leistungen ansehen",
      },
      {
        eyebrow: "Kontakt",
        title: "Persönliche Beratung",
        text: "Direkte Ansprechpartner, kurze Kommunikationswege und individuelle Abstimmung für Ihre Transportanfrage.",
        href: "/{locale}/transport-anfrage",
        ctaLabel: "Anfrage starten",
      },
    ],
    routeCard: {
      eyebrow: "Zielländer",
      title: "Zentralasien & Kaukasus",
      text: "Routen und Zielmärkte für internationale Transporte im Überblick.",
      href: "/{locale}/ziellaender",
      ctaLabel: "Zielländer ansehen",
    },
  },

  services: {
    id: "leistungen",
    eyebrow: "Unsere Leistungen",
    title: "End-to-End Logistiklösungen für anspruchsvolle Zielmärkte",
    intro:
      "GLOBALSPED organisiert FTL-Komplettladungen, LTL-Teilladungen, Thermotransporte, Gefahrguttransporte, Projektlogistik und Zollabwicklung.",
    overviewCta: {
      label: "Alle Leistungen ansehen",
      href: "/{locale}/leistungen",
    },
    backgroundImage: {
      src: "/images/home-premium/globalsped-premium-services-ftl-ltl-zoll-thermo-gefahrgut-1800x1000.webp",
      alt: "GLOBALSPED Logistiklösungen für FTL, LTL, Zollabwicklung, Thermotransporte und Gefahrgut",
    },
    cards: [
      {
        icon: "truck",
        title: "FTL-Komplettladungen",
        text: "Direkttransporte mit exklusiver Fahrzeugnutzung für sichere und planbare Lieferketten.",
        href: "/{locale}/leistungen/ftl-komplettladungen",
        ctaLabel: "FTL ansehen",
      },
      {
        icon: "boxes",
        title: "LTL-Teilladungen",
        text: "Wirtschaftliche Teilladungen und Sammelgutlösungen für internationale Zielregionen.",
        href: "/{locale}/leistungen/ltl-teilladungen",
        ctaLabel: "LTL ansehen",
      },
      {
        icon: "customs",
        title: "Zollabwicklung",
        text: "Export-, Import- und Transitunterstützung für Drittstaaten und komplexe Routen.",
        href: "/{locale}/leistungen/zollabwicklung",
        ctaLabel: "Zollabwicklung ansehen",
      },
      {
        icon: "temperature",
        title: "Thermotransporte",
        text: "Temperaturgeführte Transporte für sensible Waren mit abgestimmter Planung.",
        href: "/{locale}/leistungen/thermotransporte",
        ctaLabel: "Thermo ansehen",
      },
      {
        icon: "shield",
        title: "Gefahrgut / ADR",
        text: "ADR-konforme Transportlösungen für sensible Gefahrgüter und Dokumentation.",
        href: "/{locale}/leistungen/gefahrguttransporte",
        ctaLabel: "Gefahrgut ansehen",
      },
      {
        icon: "crane",
        title: "Projektlogistik",
        text: "Individuelle Planung für komplexe Projekte, Sonderladungen und Maschinen.",
        href: "/{locale}/leistungen/projektlogistik",
        ctaLabel: "Projektlogistik ansehen",
      },
    ],
  },

  destinations: {
    id: "ziellaender",
    eyebrow: "Weltweit unterwegs",
    title: "Internationale Transporte in anspruchsvolle Zielmärkte",
    intro:
      "GLOBALSPED verbindet Unternehmen mit wichtigen Zielmärkten in Zentralasien, im Kaukasus, in Osteuropa und im Mittleren Osten – mit Erfahrung, Partnernetzwerk, Zollkoordination und persönlicher Betreuung.",
    cta: {
      label: "Alle Zielländer ansehen",
      href: "/{locale}/ziellaender",
    },
    mapImage: {
      src: "/images/home-premium/globalsped-premium-routenkarte-europa-zentralasien-kaukasus-2200x1100.webp",
      alt: "Routenkarte für internationale GLOBALSPED Transporte von Europa nach Zentralasien und in den Kaukasus",
    },
    statValue: "11",
    statLabel: "Zielländer im Fokus",
    countries: [
      {
        name: "Kasachstan",
        slug: "kasachstan",
        flagCode: "kz",
        href: "/{locale}/ziellaender/transport-kasachstan",
      },
      {
        name: "Usbekistan",
        slug: "usbekistan",
        flagCode: "uz",
        href: "/{locale}/ziellaender/transport-usbekistan",
      },
      {
        name: "Kirgisistan",
        slug: "kirgisistan",
        flagCode: "kg",
        href: "/{locale}/ziellaender/transport-kirgisistan",
      },
      {
        name: "Turkmenistan",
        slug: "turkmenistan",
        flagCode: "tm",
        href: "/{locale}/ziellaender/transport-turkmenistan",
      },
      {
        name: "Tadschikistan",
        slug: "tadschikistan",
        flagCode: "tj",
        href: "/{locale}/ziellaender/transport-tadschikistan",
      },
      {
        name: "Aserbaidschan",
        slug: "aserbaidschan",
        flagCode: "az",
        href: "/{locale}/ziellaender/transport-aserbaidschan",
      },
      {
        name: "Georgien",
        slug: "georgien",
        flagCode: "ge",
        href: "/{locale}/ziellaender/transport-georgien",
      },
      {
        name: "Armenien",
        slug: "armenien",
        flagCode: "am",
        href: "/{locale}/ziellaender/transport-armenien",
      },
      {
        name: "Mongolei",
        slug: "mongolei",
        flagCode: "mn",
        href: "/{locale}/ziellaender/transport-mongolei",
      },
      {
        name: "Irak",
        slug: "irak",
        flagCode: "iq",
        href: "/{locale}/ziellaender/transport-irak",
      },
      {
        name: "Ukraine",
        slug: "ukraine",
        flagCode: "ua",
        href: "/{locale}/ziellaender/transport-ukraine",
      },
    ],
  },

  about: {
    id: "ueber-uns",
    eyebrow: "Über GLOBALSPED",
    title: "Ihr Partner für internationale Logistik",
    intro:
      "GLOBALSPED ist eine internationale Spedition mit Fokus auf Transporte zwischen Europa, Zentralasien, Kaukasus, Osteuropa und dem Mittleren Osten.",
    text:
      "Unsere Stärke liegt in persönlicher Betreuung, kurzen Kommunikationswegen und einem erfahrenen Team für anspruchsvolle internationale Transportlösungen.",
    cta: {
      label: "Mehr über uns",
      href: "/{locale}/ueber-uns",
    },
    image: {
      src: "/images/home-premium/globalsped-premium-unternehmen-internationale-spedition-1600x1000.webp",
      alt: "GLOBALSPED als internationale Spedition mit persönlicher Betreuung und erfahrenem Logistikteam",
    },
    values: [
      {
        icon: "globe",
        title: "Spezialisierte Zielmärkte",
        text: "Internationale Transporte mit Fokus auf Zentralasien, Kaukasus, Osteuropa und den Mittleren Osten.",
      },
      {
        icon: "communication",
        title: "Direkte Ansprechpartner",
        text: "Persönliche Betreuung, schnelle Rückmeldungen und klare Abstimmung während der gesamten Transportabwicklung.",
      },
      {
        icon: "route",
        title: "Verlässliche Koordination",
        text: "Strukturierte Planung von Routen, Dokumenten, Kommunikation und operativen Abläufen.",
      },
    ],
    proofCards: [
      {
        icon: "communication",
        title: "Multilingual",
        text: "Mehrsprachige Kommunikation erleichtert internationale Abstimmungen mit Kunden, Partnern und Schnittstellen entlang der Route.",
        languages: [
          {
            name: "Deutsch",
            flagCode: "de",
          },
          {
            name: "Englisch",
            flagCode: "gb",
          },
          {
            name: "Türkisch",
            flagCode: "tr",
          },
          {
            name: "Russisch",
            flagCode: "ru",
          },
          {
            name: "Turkmenisch",
            flagCode: "tm",
          },
          {
            name: "Aserbaidschanisch",
            flagCode: "az",
          },
        ],
      },
      {
        icon: "experience",
        title: "Bereits 2. Generation",
        text: "Seit über 30 Jahren auf internationale Transportmärkte spezialisiert – mit gewachsener Erfahrung in anspruchsvollen Zielregionen.",
      },
      {
        icon: "network",
        title: "Gewachsenes Netzwerk",
        text: "Verlässliche Kontakte, regionale Erfahrung und eingespielte Kommunikation für komplexe internationale Transportwege.",
      },
    ],
  },

  jobs: {
    id: "jobs",
    eyebrow: "Karriere",
    title: "Gemeinsam bewegen wir mehr",
    intro:
      "Bei GLOBALSPED arbeiten Sie an echten internationalen Transportlösungen mit Kundenkontakt, Organisationstalent und Teamarbeit.",
    cta: {
      label: "Zu unseren Jobs",
      href: "/{locale}/jobs",
    },
    image: {
      src: "/images/home-premium/globalsped-premium-jobs-spedition-logistik-team-1600x1000.webp",
      alt: "GLOBALSPED Team bei der Planung internationaler Transporte in Spedition und Logistik",
    },
    values: [
      {
        icon: "security",
        title: "Sichere Zukunft",
        text: "Mitarbeit in einem spezialisierten internationalen Logistikunternehmen.",
      },
      {
        icon: "growth",
        title: "Entwicklung",
        text: "Aufgaben mit Kundenkontakt, Zollthemen und Transportkoordination.",
      },
      {
        icon: "users",
        title: "Teamspirit",
        text: "Persönliche Zusammenarbeit statt anonymer Plattformprozesse.",
      },
    ],
  },

  faq: {
    enabled: true,
    id: "faq",
    eyebrow: "FAQ & Expertenwissen",
    title: "Schnelle Antworten für internationale Transporte",
    intro:
      "Kurze Einstiege in häufige Fragen zu Laufzeiten, Zoll, Zentralasien und Kaukasus.",
    overviewCta: {
      label: "Alle FAQ ansehen",
      href: "/{locale}/faq",
    },
    items: [
      {
        category: "Lieferzeiten",
        title: "Wie lange dauert ein LKW-Transport von Deutschland nach Kasachstan?",
        text: "Laufzeiten hängen von Route, Zollabwicklung, Transitländern und Warenart ab.",
        href: "/{locale}/faq/lkw-transport-deutschland-kasachstan-lieferzeit",
        ctaLabel: "Antwort lesen",
      },
      {
        category: "Zoll",
        title: "Welche Dokumente werden für einen Export nach Usbekistan benötigt?",
        text: "Relevant sind unter anderem Handelsrechnung, Packliste, CMR und je nach Ware weitere Nachweise.",
        href: "/{locale}/faq/zollabwicklung-export-usbekistan-dokumente",
        ctaLabel: "Antwort lesen",
      },
      {
        category: "Zentralasien",
        title: "Welche Spedition ist auf Transporte nach Zentralasien spezialisiert?",
        text: "Entscheidend sind Zollkompetenz, regionale Erfahrung und verlässliche Transportkoordination.",
        href: "/{locale}/faq/spedition-zentralasien-transport-zoll",
        ctaLabel: "Antwort lesen",
      },
      {
        category: "Kaukasus",
        title: "Worauf sollten Unternehmen bei einer Spedition für den Kaukasus achten?",
        text: "Wichtig sind Partnernetzwerke, Zollkompetenz und klare Kommunikation.",
        href: "/{locale}/faq/transporte-kaukasus-spedition-auswahl",
        ctaLabel: "Antwort lesen",
      },
    ],
  },
};