import { en as siteContent } from "@/content/en";
import type { PremiumHomeContent } from "./types";

export const premiumHomeEn: PremiumHomeContent = {
  hero: {
    eyebrow: siteContent.hero.badge,
    headline: siteContent.hero.headline,
    intro: siteContent.hero.subline,
    primaryCta: {
      label: "Request a transport quote",
      href: "/{locale}/transport-request",
    },
    secondaryCta: {
      label: "View services",
      href: "/{locale}/services",
    },
    image: {
      src: "/images/home-premium/globalsped-premium-hero-mercedes-lkw-zentralasien-kaukasus-desktop-1665x928.webp",
      width: 1665,
      height: 928,
      mobileSrc:
        "/images/home-premium/globalsped-premium-hero-mercedes-lkw-zentralasien-kaukasus-mobile-1200x1600.webp",
      mobileWidth: 1024,
      mobileHeight: 1536,
      alt: "GLOBALSPED Mercedes truck on an international route to Central Asia and the Caucasus",
    },
    stats: [
      {
        eyebrow: "Industry expertise",
        title: "Industry & mechanical engineering",
        text: "Transport solutions for machinery, equipment, spare parts and technical components – coordinated for international destination markets, customs processes and demanding routes.",
      },
      {
        eyebrow: "Sensitive goods",
        title: "Pharma, medical & temperature",
        text: "Logistics for sensitive goods with increased requirements for planning, documentation, transit time and temperature-controlled transport processes.",
      },
      {
        eyebrow: "Trade & FMCG",
        title: "Food & consumer goods",
        text: "International transport for FMCG, food and commercial goods – with reliable coordination between shipper, consignee, customs and transport partners.",
      },
      {
        eyebrow: "Special goods",
        title: "Chemicals, ADR & special goods",
        text: "Experience with regulated goods, dangerous goods, documentation obligations and special requirements for transports to third countries and destination regions.",
      },
    ],
  },

  services: {
    id: "services",
    eyebrow: "Our services",
    title: "End-to-end logistics solutions for demanding destination markets",
    titleHighlight: "demanding destination markets",
    intro:
      "GLOBALSPED organizes FTL full truck loads, LTL partial loads, temperature-controlled transport, dangerous goods transport, project logistics and customs clearance.",
    overviewCta: {
      label: "View all services",
      href: "/{locale}/services",
    },
    backgroundImage: {
      src: "/images/home-premium/globalsped-premium-services-ftl-ltl-zollabwicklung-thermo-gefahrgut-projektlogistik-2880x1200.webp",
      width: 2880,
      height: 1200,
      mobileSrc:
        "/images/home-premium/globalsped-premium-services-zollabwicklung-logistikterminal-mobile-862x1824.webp",
      mobileWidth: 862,
      mobileHeight: 1824,
      alt: "GLOBALSPED logistics solutions for FTL, LTL, customs clearance, temperature-controlled transport, dangerous goods and project logistics",
    },
    cards: [
      {
        icon: "truck",
        title: "FTL full truck loads",
        text: "Direct transports with exclusive vehicle use for secure and plannable supply chains.",
        href: "/{locale}/services/ftl-full-truck-loads",
        ctaLabel: "View FTL",
      },
      {
        icon: "boxes",
        title: "LTL partial loads",
        text: "Cost-efficient partial loads and groupage solutions for international destination regions.",
        href: "/{locale}/services/ltl-part-loads",
        ctaLabel: "View LTL",
      },
      {
        icon: "customs",
        title: "Customs clearance",
        text: "Export, import and transit support for third countries and complex routes.",
        href: "/{locale}/services/customs-clearance",
        ctaLabel: "View customs clearance",
      },
      {
        icon: "temperature",
        title: "Temperature-controlled transport",
        text: "Temperature-controlled transport for sensitive goods with coordinated planning.",
        href: "/{locale}/services/temperature-controlled-transport",
        ctaLabel: "View temperature transport",
      },
      {
        icon: "shield",
        title: "Dangerous goods / ADR",
        text: "ADR-compliant transport solutions for sensitive dangerous goods and documentation.",
        href: "/{locale}/services/dangerous-goods-transport",
        ctaLabel: "View dangerous goods",
      },
      {
        icon: "crane",
        title: "Project logistics",
        text: "Individual planning for complex projects, special cargo and machinery.",
        href: "/{locale}/services/project-logistics",
        ctaLabel: "View project logistics",
      },
    ],
  },

  destinations: {
    id: "destinations",
    eyebrow: "On the move worldwide",
    title: "International freight transport to demanding destination markets",
    titleHighlight: "demanding destination markets",
    intro:
      "GLOBALSPED connects companies with important destination markets in Central Asia, the Caucasus, Eastern Europe and the Middle East – with experience, a partner network, customs coordination and personal support.",
    routeSignal: {
      targetLabel: "Key destinations",
      ariaLabel: "From Europe to the key destinations",
    },
    cta: {
      label: "View all destinations",
      href: "/{locale}/destinations",
    },
    mapImage: {
      src: "/images/home-premium/globalsped-premium-services-ftl-ltl-zollabwicklung-thermo-gefahrgut-projektlogistik-1586x992.webp",
      alt: "Route map for international GLOBALSPED freight transport from Europe to Central Asia and the Caucasus",
    },
    countries: [
      {
        name: "Kazakhstan",
        slug: "kazakhstan",
        flagCode: "kz",
        href: "/{locale}/destinations/freight-transport-kazakhstan",
      },
      {
        name: "Uzbekistan",
        slug: "uzbekistan",
        flagCode: "uz",
        href: "/{locale}/destinations/freight-transport-uzbekistan",
      },
      {
        name: "Kyrgyzstan",
        slug: "kyrgyzstan",
        flagCode: "kg",
        href: "/{locale}/destinations/freight-transport-kyrgyzstan",
      },
      {
        name: "Turkmenistan",
        slug: "turkmenistan",
        flagCode: "tm",
        href: "/{locale}/destinations/freight-transport-turkmenistan",
      },
      {
        name: "Tajikistan",
        slug: "tajikistan",
        flagCode: "tj",
        href: "/{locale}/destinations/freight-transport-tajikistan",
      },
      {
        name: "Azerbaijan",
        slug: "azerbaijan",
        flagCode: "az",
        href: "/{locale}/destinations/freight-transport-azerbaijan",
      },
      {
        name: "Georgia",
        slug: "georgia",
        flagCode: "ge",
        href: "/{locale}/destinations/freight-transport-georgia",
      },
      {
        name: "Armenia",
        slug: "armenia",
        flagCode: "am",
        href: "/{locale}/destinations/freight-transport-armenia",
      },
      {
        name: "Mongolia",
        slug: "mongolia",
        flagCode: "mn",
        href: "/{locale}/destinations/freight-transport-mongolia",
      },
      {
        name: "Iraq",
        slug: "iraq",
        flagCode: "iq",
        href: "/{locale}/destinations/freight-transport-iraq",
      },
      {
        name: "Ukraine",
        slug: "ukraine",
        flagCode: "ua",
        href: "/{locale}/destinations/freight-transport-ukraine",
      },
    ],
  },

  about: {
    id: "about-us",
    eyebrow: "About GLOBALSPED",
    title: "Your partner for international logistics",
    titleHighlight: "international logistics",

    intro:
      "GLOBALSPED is an international freight forwarder focused on transport between Europe, Central Asia, the Caucasus, Eastern Europe and the Middle East.",
    text:
      "Our strength lies in personal support, short communication channels and an experienced team for demanding international transport solutions.",
    cta: {
      label: "More about us",
      href: "/{locale}/about-us",
    },
    image: {
      src: "/images/home-premium/globalsped-premium-unternehmen-internationale-spedition-1586x992.webp",
      alt: "GLOBALSPED as an international freight forwarder with personal support and an experienced logistics team",
    },
    values: [
      {
        icon: "globe",
        title: "Specialized destination markets",
        text: "International freight transport focused on Central Asia, the Caucasus, Eastern Europe and the Middle East.",
      },
      {
        icon: "communication",
        title: "Direct contact persons",
        text: "Personal support, fast feedback and clear coordination throughout the entire transport process.",
      },
      {
        icon: "route",
        title: "Reliable coordination",
        text: "Structured planning of routes, documents, communication and operational processes.",
      },
    ],
    proofCards: [
      {
        icon: "communication",
        title: "Multilingual team",
        text: "Multilingual communication makes international coordination easier with customers, partners and interfaces along the route.",
        languages: [
          {
            name: "German",
            flagCode: "de",
          },
          {
            name: "English",
            flagCode: "gb",
          },
          {
            name: "Turkish",
            flagCode: "tr",
          },
          {
            name: "Russian",
            flagCode: "ru",
          },
          {
            name: "Turkmen",
            flagCode: "tm",
          },
          {
            name: "Polish",
            flagCode: "pl",
          },
          {
            name: "Albanian",
            flagCode: "al",
          },
          {
            name: "Spanish",
            flagCode: "es",
          },
        ],
      },
      {
        icon: "experience",
        title: "Already in the 2nd generation",
        text: "Specialized in international transport markets for more than 30 years – with grown experience in demanding destination regions.",
      },
      {
        icon: "network",
        title: "Established network",
        text: "Reliable contacts, regional experience and well-established communication for complex international transport routes.",
      },
    ],
  },

  jobs: {
    id: "careers",
    eyebrow: "Careers",
    title: "Together, we move more",
    titleHighlight: "more",
    intro:
      "At GLOBALSPED, you work on real international transport solutions with customer contact, organizational talent and teamwork.",
    cta: {
      label: "View our careers",
      href: "/{locale}/careers",
    },
    image: {
      src: "/images/home-premium/globalsped-premium-jobs-spedition-logistik-team-620x560.webp",
      alt: "GLOBALSPED team planning international transport in freight forwarding and logistics",
    },
    values: [
      {
        icon: "security",
        title: "Secure future",
        text: "Work in a specialized international logistics team.",
      },
      {
        icon: "growth",
        title: "Development",
        text: "Tasks involving customer contact, customs topics and transport coordination.",
      },
      {
        icon: "users",
        title: "Team spirit",
        text: "Personal collaboration instead of anonymous platform processes.",
      },
    ],
  },

  faq: {
    enabled: true,
    id: "faq",
    eyebrow: "FAQ & expert knowledge",
    title: "Fast answers for international freight transport",
    titleHighlight: "international freight transport",
    intro:
      "Short introductions to frequently asked questions about transit times, customs, Central Asia and the Caucasus.",
    overviewCta: {
      label: "View all FAQ",
      href: "/{locale}/faq",
    },
    backgroundImage: {
      src: "/images/home-premium/globalsped-premium-faq-transport-zollabwicklung-zentralasien-kaukasus-background-1942x809.webp",
      width: 1942,
      height: 809,
      mobileSrc:
        "/images/home-premium/globalsped-premium-faq-transport-zollabwicklung-zentralasien-kaukasus-mobile-1440x2400.webp",
      mobileWidth: 1440,
      mobileHeight: 2400,
      alt: "GLOBALSPED FAQ background for transport, customs clearance, Central Asia and the Caucasus",
    },
    items: [
      {
        category: "Transit times",
        title: "How long does truck transport from Germany to Kazakhstan take?",
        text: "Transit times depend on route, customs clearance, transit countries and type of goods.",
        href: "/{locale}/faq/truck-transport-germany-kazakhstan-transit-time",
        ctaLabel: "Read answer",
      },
      {
        category: "Customs",
        title: "Which documents are required for export to Uzbekistan?",
        text: "Relevant documents include the commercial invoice, packing list, CMR and, depending on the goods, additional certificates.",
        href: "/{locale}/faq/customs-clearance-export-uzbekistan-documents",
        ctaLabel: "Read answer",
      },
      {
        category: "Central Asia",
        title: "Which freight forwarder specializes in transport to Central Asia?",
        text: "Customs expertise, regional experience and reliable transport coordination are decisive.",
        href: "/{locale}/faq/freight-forwarder-central-asia-transport-customs",
        ctaLabel: "Read answer",
      },
      {
        category: "Caucasus",
        title: "What should companies look for when choosing a freight forwarder for the Caucasus?",
        text: "Partner networks, customs expertise and clear communication are important.",
        href: "/{locale}/faq/caucasus-transport-freight-forwarder-selection",
        ctaLabel: "Read answer",
      },
    ],
  },
};