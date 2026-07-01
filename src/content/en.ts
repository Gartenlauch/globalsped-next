import type { de } from "./de";

export const en = {
  header: {
    logoLabel: "GLOBALSPED",
    nav: [
      { label: "Home", href: "/{locale}" },
      { label: "Services", href: "/{locale}/services" },
      { label: "Destinations", href: "/{locale}/destinations" },
      { label: "About us", href: "/{locale}/about-us" },
      { label: "Careers", href: "/{locale}/careers" },
      { label: "Contact", href: "/{locale}#contact" },
      { label: "FAQ", href: "/{locale}/faq" },
    ],
    cta: {
      label: "Request quote",
      href: "/{locale}/transport-request",
    },
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
  },
  navigationActions: {
    backLabel: "Back",
    homeLabel: "Home",
    backHint: "Previous page",
    homeHint: "GLOBALSPED homepage",
  },
  hero: {
    badge: "GLOBALSPED International Freight Solutions",

    headline: {
      line1: "International freight transport",
      highlight: "to Central Asia, the Caucasus",
      line2: "and the Middle East",
    },

    subline:
      "GLOBALSPED organizes FTL full truck loads, LTL partial loads, temperature-controlled transport, dangerous goods transport, project logistics and customs clearance for companies with demanding export and import routes.",

    ctaPrimary: {
      label: "Request a transport quote",
      href: "/{locale}/transport-request",
    },

    ctaSecondary: {
      label: "View destinations",
      href: "/{locale}/destinations",
    },

    destinationsLabel: "Destinations",

    destinations: [
      "Kazakhstan",
      "Uzbekistan",
      "Kyrgyzstan",
      "Turkmenistan",
      "Tajikistan",
      "Azerbaijan",
      "Georgia",
      "Armenia",
      "Mongolia",
      "Iraq",
      "Ukraine",
    ],

    routeCard: {
      kicker: "Premium Route Network",
      title: "Europe → Central Asia",
      text: "Direct transport solutions for complex markets with personal support, customs expertise and clear communication.",

      routes: [
        "Germany → Kazakhstan",
        "Austria → Georgia",
        "Europe → Azerbaijan",
        "DACH region → Uzbekistan",
      ],

      highlights: [
        {
          icon: "truck",
          label: "FTL/LTL",
        },
        {
          icon: "shield",
          label: "Customs",
        },
        {
          icon: "globe",
          label: "DACH",
        },
      ],
    },

    trustItems: [
      {
        icon: "experience",
        value: "30+",
        label: "Years of experience",
        text: "Specialized transport handling between Europe, Central Asia and the Caucasus.",
      },
      {
        icon: "truck",
        value: "FTL/LTL",
        label: "Flexible loads",
        text: "Partial and full truck loads for industry, trade and project logistics.",
      },
      {
        icon: "customs",
        value: "Customs",
        label: "End-to-end handling",
        text: "Documents, communication and customs processes from a single source.",
      },
    ],
  },
  destinations: {
    badge: "Destinations",
    title: "Destinations for international freight transport to",
    highlight: "Central Asia, the Caucasus, Eastern Europe and the Middle East",
    intro:
      "GLOBALSPED organizes international freight transport from Europe to demanding destination markets. Our focus is on Central Asia, the Caucasus, Eastern Europe and the Middle East – including route planning, customs clearance, document checks and personal transport coordination.",

    countryRouteBase: "/{locale}/destinations",
    countrySlugPrefix: "freight-transport-",

    regions: [
      {
        title: "Central Asia",
        slug: "central-asia",
        subtitle:
          "Specialized freight transport to Kazakhstan, Uzbekistan, Kyrgyzstan, Turkmenistan, Tajikistan and other markets in Central Asia.",
        image: "/images/destinations/zentralasien.jpg",
        countries: [
          {
            name: "Kazakhstan",
            slug: "kazakhstan",
            cities: ["Astana", "Almaty", "Atyrau"],
          },
          {
            name: "Uzbekistan",
            slug: "uzbekistan",
            cities: ["Tashkent", "Samarkand", "Navoi"],
          },
          {
            name: "Kyrgyzstan",
            slug: "kyrgyzstan",
            cities: ["Bishkek", "Osh"],
          },
          {
            name: "Turkmenistan",
            slug: "turkmenistan",
            cities: ["Ashgabat", "Mary"],
          },
          {
            name: "Tajikistan",
            slug: "tajikistan",
            cities: ["Dushanbe", "Khujand"],
          },
          {
            name: "Mongolia",
            slug: "mongolia",
            cities: ["Ulaanbaatar"],
          },
        ],
      },
      {
        title: "Caucasus",
        slug: "caucasus",
        subtitle:
          "Reliable logistics solutions for freight transport to Azerbaijan, Georgia and Armenia – including customs and transit support.",
        image: "/images/destinations/kaukasus.jpg",
        countries: [
          {
            name: "Azerbaijan",
            slug: "azerbaijan",
            cities: ["Baku", "Ganja", "Sumgayit"],
          },
          {
            name: "Georgia",
            slug: "georgia",
            cities: ["Tbilisi", "Batumi", "Kutaisi"],
          },
          {
            name: "Armenia",
            slug: "armenia",
            cities: ["Yerevan", "Gyumri"],
          },
        ],
      },
      {
        title: "Middle East & Eastern Europe",
        slug: "middle-east-eastern-europe",
        subtitle:
          "Transport solutions for export, import and transit to demanding markets in the Middle East and Eastern Europe.",
        image: "/images/destinations/mittlerer-osten.jpg",
        countries: [
          {
            name: "Iraq",
            slug: "iraq",
            cities: ["Baghdad", "Erbil"],
          },
          {
            name: "Turkey",
            slug: "turkey",
            cities: ["Istanbul", "Ankara", "Izmir"],
          },
          {
            name: "Ukraine",
            slug: "ukraine",
            cities: ["Kyiv", "Lviv", "Odesa"],
          },
        ],
      },
    ],

    countryGridEyebrow: "Destinations",
    countryGridTitle: "Key destinations for international freight transport",
    countryGridIntro:
      "Our most important transport destinations for FTL, LTL, temperature-controlled transport, project logistics and customs clearance – with a focus on Central Asia, the Caucasus, Eastern Europe and the Middle East.",

    cta: {
      label: "Request a transport quote",
      href: "/{locale}/transport-request",
    },
  },
  countryPages: [
    {
      slug: "freight-transport-uzbekistan",
      country: "Uzbekistan",
      region: "Central Asia",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-usbekistan-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-usbekistan-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Uzbekistan",
      },

      title: "Freight transport from Europe",
      highlight: "to Uzbekistan",
      intro:
        "GLOBALSPED organizes reliable freight transport from across Europe to Uzbekistan – including FTL, LTL, groupage, temperature-controlled transport and project cargo.",
      seoText:
        "We support companies with international freight transport from Europe to Uzbekistan, especially to Tashkent, Samarkand, Kokand and Navoi. Our services include transport planning, route coordination, customs clearance, export and import processes as well as personal support for demanding supply chains.",
      services: [
        "FTL full truck loads to Uzbekistan",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],
      cities: ["Tashkent", "Samarkand", "Kokand", "Navoi"],
      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },
      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Southern route",
              description:
                "LTL (groupage and consolidated cargo) and FTL (full truck loads) usually run via Austria, Hungary, Romania, Bulgaria, Türkiye, Georgia, Azerbaijan, the Caspian Sea ferry, Kazakhstan and onward to Uzbekistan.",
            },
            {
              title: "Northern route",
              description:
                "FTL full truck loads usually run via Poland, Belarus, Russia and Kazakhstan to Uzbekistan.",
            },
          ],
        },

        runtime: {
          label: "Transit time",
          value: "approx. 14–16 days",
        },

        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Southern route",
              office: "BG001015 Kapitan Andreevo",
            },
            {
              route: "Northern route",
              office: "PL301040 Koroszczyn",
            },
          ],
        },

        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we will be happy to assist you with preparing the required documents.",
        },

        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number, fax number or email address",
          ],
        },
      },
      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "For freight transport to Uzbekistan, complete export documents, correct goods classification and coordinated transit planning are particularly important. As Uzbekistan is landlocked and depends on international transit corridors, careful preparation helps reduce delays.",
        operationalHints: [
          {
            title: "Prepare import documents precisely",
            text: "For Uzbekistan, the commercial invoice, packing list, CMR, export documents and goods description should be checked for consistency before dispatch. Differences between documents and cargo can delay clearance.",
          },
          {
            title: "Check transit routes early",
            text: "Because Uzbekistan is landlocked, transit time depends heavily on the selected corridor, border processes and regional traffic conditions. Reliable route planning is important for time-sensitive shipments.",
          },
          {
            title: "Provide plausible HS code and customs value",
            text: "Unclear tariff numbers, incomplete item descriptions or implausible customs values often lead to queries. A clean pre-check helps reduce waiting times.",
          },
          {
            title: "Plan sanctions and compliance checks",
            text: "Before exporting to Uzbekistan, consignee, goods type and intended use should be checked, especially for technical goods, spare parts and industrial equipment.",
          },
        ],
        authorityLinks: [
          {
            label: "Uzbekistan import requirements and documentation",
            href: "https://www.trade.gov/country-commercial-guides/uzbekistan-import-requirements-and-documentation",
            source: "International Trade Administration",
            topic: "Import documents",
            reason:
              "Official English-language public source on Uzbekistan-specific import documentation and customs requirements.",
          },
          {
            label: "EU TARIC database for customs tariff classification",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=en",
            source: "European Commission",
            topic: "Customs tariff classification",
            reason:
              "Supports correct goods classification and strengthens customs-related entity signals.",
          },
          {
            label: "IRU information on the TIR system",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / transit",
            reason:
              "Relevant for international road transport involving several customs territories.",
          },
          {
            label: "German Customs information on export procedures",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "German Customs",
            topic: "Export handling",
            reason:
              "Official English-language source for exports from Germany and export-related requirements.",
          },
        ],
        internalLinks: [
          {
            label: "FTL full truck loads to Central Asia",
            href: "/{locale}/services/ftl-full-truck-loads",
            reason:
              "Connects Uzbekistan transport with the relevant service page for direct transports.",
          },
          {
            label: "Customs clearance and export documents",
            href: "/{locale}/services/customs-clearance",
            reason:
              "Strengthens internal relevance for export documents and customs clearance.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Uzbekistan",
      },
    },

    {
      slug: "freight-transport-kazakhstan",
      country: "Kazakhstan",
      region: "Central Asia",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-kasachstan-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-kasachstan-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Kazakhstan",
      },
      title: "Freight transport from Europe",
      highlight: "to Kazakhstan",
      intro:
        "GLOBALSPED organizes reliable freight transport from across Europe to Kazakhstan – including FTL, LTL, groupage, temperature-controlled transport and project cargo.",
      seoText:
        "We support companies with international freight transport from Europe to Kazakhstan, especially to Astana, Almaty, Atyrau and other economic centers. Our services include transport planning, route coordination, customs clearance, export and import processes as well as personal support for demanding supply chains to Central Asia.",
      services: [
        "FTL full truck loads to Kazakhstan",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],
      cities: ["Astana", "Almaty", "Atyrau", "Aktau"],
      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },
      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Southern route",
              description:
                "LTL and FTL transport usually runs via Austria, Hungary, Romania, Bulgaria, Türkiye, Georgia, Azerbaijan and the Caspian Sea ferry to Kazakhstan.",
            },
            {
              title: "Northern route",
              description:
                "FTL full truck loads usually run via Poland, Belarus and Russia to Kazakhstan.",
            },
          ],
        },
        runtime: {
          label: "Transit time",
          value: "Southern route approx. 31–39 days, northern route approx. 10–16 days",
        },
        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Southern route",
              office: "BG001015 Kapitan Andreevo",
            },
            {
              route: "Northern route",
              office: "PL301040 Koroszczyn",
            },
          ],
        },
        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we will be happy to assist you with preparing the required documents.",
        },
        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number, fax number or email address",
          ],
        },
      },

      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "For freight transport to Kazakhstan, clean export documentation, correct HS codes and early checks of transit and import requirements are decisive. Complete document checks help reduce delays at borders and customs offices, especially for machinery, spare parts, industrial equipment and commercial goods.",
        operationalHints: [
          {
            title: "Prepare customs and import checks early",
            text: "For exports to Kazakhstan, commercial invoice, packing list, goods description, HS code and origin information should be checked before pickup. Unclear goods descriptions or inconsistent weights often trigger customs queries.",
          },
          {
            title: "Coordinate TIR and CMR documents carefully",
            text: "For road transport to Kazakhstan, TIR and CMR documents are key parts of transport and transit handling. Their information must match invoice, packing list and the actual cargo.",
          },
          {
            title: "Consider EAEU requirements",
            text: "Kazakhstan is part of the Eurasian Economic Union. Depending on the goods, conformity documents, technical requirements or additional import documents may be required.",
          },
          {
            title: "Plan transit corridors realistically",
            text: "For Kazakhstan transports, border crossings, seasonal transit times and possible waiting times should be considered early. Realistic lead-time planning is particularly important for production and project deliveries.",
          },
        ],
        authorityLinks: [
          {
            label: "Kazakhstan import requirements and documentation",
            href: "https://www.trade.gov/country-commercial-guides/kazakhstan-import-requirements-and-documentation",
            source: "International Trade Administration",
            topic: "Import documents",
            reason:
              "Official English-language source on Kazakhstan-specific import procedures and accompanying documents.",
          },
          {
            label: "Kazakhstan customs regulations",
            href: "https://www.trade.gov/country-commercial-guides/kazakhstan-customs-regulations",
            source: "International Trade Administration",
            topic: "Customs regulations",
            reason:
              "Provides additional context on Kazakhstan customs procedures and regulatory requirements.",
          },
          {
            label: "IRU information on the TIR system",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / transit",
            reason:
              "Official specialist source for international road transport under the TIR transit system.",
          },
          {
            label: "German Customs information on export procedures",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "German Customs",
            topic: "Export handling",
            reason:
              "Official source for export requirements and export processes from Germany to third countries.",
          },
        ],
        internalLinks: [
          {
            label: "Customs clearance for international transport",
            href: "/{locale}/services/customs-clearance",
            reason:
              "Strengthens the connection between Kazakhstan transport, customs clearance and export documents.",
          },
          {
            label: "Request transport to Kazakhstan",
            href: "/{locale}/transport-request",
            reason:
              "Guides users with a concrete transport requirement directly to the conversion page.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Kazakhstan",
      },
    },

    {
      slug: "freight-transport-kyrgyzstan",
      country: "Kyrgyzstan",
      region: "Central Asia",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-kirgisistan-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-kirgisistan-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Kyrgyzstan",
      },
      title: "Freight transport from Europe",
      highlight: "to Kyrgyzstan",
      intro:
        "GLOBALSPED organizes reliable freight transport to Kyrgyzstan – including FTL, LTL, groupage, temperature-controlled transport and project cargo for demanding supply chains to Central Asia.",
      seoText:
        "We support companies with international freight transport from Europe to Kyrgyzstan, especially to Bishkek, Osh and other economically relevant regions. Our services include transport planning, route coordination, customs clearance, export and import processes as well as individual support for transports to demanding markets in Central Asia.",
      services: [
        "FTL full truck loads to Kyrgyzstan",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],
      cities: ["Bishkek", "Osh", "Jalal-Abad"],
      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },
      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Southern route",
              description:
                "LTL and FTL transport usually runs via Austria, Hungary, Romania, Bulgaria, Türkiye, Georgia, Azerbaijan, the Caspian Sea ferry and Kazakhstan to Kyrgyzstan.",
            },
            {
              title: "Northern route",
              description:
                "FTL full truck loads usually run via Poland, Belarus, Russia and Kazakhstan to Kyrgyzstan.",
            },
          ],
        },
        runtime: {
          label: "Transit time",
          value: "approx. 18–25 days, depending on route and destination",
        },
        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Southern route",
              office: "BG001015 Kapitan Andreevo",
            },
            {
              route: "Northern route",
              office: "PL301040 Koroszczyn",
            },
          ],
        },
        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we will be happy to support you with preparing the required transport and customs documents.",
        },
        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number, fax number or email address",
          ],
        },
      },
      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "Freight transport to Kyrgyzstan requires precise coordination of transit route, customs papers and accompanying goods documents. Due to its geographic location and mountainous regions, routes and transit times should be planned realistically.",
        operationalHints: [
          {
            title: "Consider transit dependency",
            text: "Kyrgyzstan is heavily dependent on international transit corridors for road freight. Border crossings, weather conditions and regional infrastructure can affect transit time.",
          },
          {
            title: "Check documents for consistency before departure",
            text: "CMR, commercial invoice, packing list and export documents must match in goods description, weight and number of packages. Inconsistencies often lead to additional checks.",
          },
          {
            title: "Consider the EAEU context",
            text: "Kyrgyzstan is a member of the Eurasian Economic Union. Depending on the goods, technical requirements, conformity documents or additional import requirements may apply.",
          },
          {
            title: "Plan for mountain and winter conditions",
            text: "For transports to remote regions of Kyrgyzstan, seasonal road conditions, altitude and possible winter restrictions should be considered in the planning stage.",
          },
        ],
        authorityLinks: [
          {
            label: "Kyrgyz Republic import requirements and documentation",
            href: "https://www.trade.gov/country-commercial-guides/kyrgyz-republic-import-requirements-and-documentation",
            source: "International Trade Administration",
            topic: "Import documents",
            reason:
              "Official English-language source on Kyrgyz Republic import documentation and EAEU-related customs requirements.",
          },
          {
            label: "Kyrgyz Republic customs regulations",
            href: "https://www.trade.gov/country-commercial-guides/kyrgyz-republic-customs-regulations",
            source: "International Trade Administration",
            topic: "Customs regulations",
            reason:
              "Provides additional customs, duties and regulatory context for imports into Kyrgyzstan.",
          },
          {
            label: "UNECE CMR Convention",
            href: "https://unece.org/fileadmin/DAM/trans/conventn/cmr_e.pdf",
            source: "UNECE",
            topic: "CMR",
            reason:
              "Official basis for international road freight transport documentation.",
          },
          {
            label: "German Customs information on export procedures",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "German Customs",
            topic: "Export handling",
            reason:
              "Official basis for export formalities for deliveries from Germany to third countries.",
          },
        ],
        internalLinks: [
          {
            label: "LTL partial loads to Central Asia",
            href: "/{locale}/services/ltl-part-loads",
            reason:
              "Matches groupage and partial-load transports to Kyrgyzstan.",
          },
          {
            label: "Request transport to Kyrgyzstan",
            href: "/{locale}/transport-request",
            reason:
              "Guides users with a concrete requirement directly into the request process.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Kyrgyzstan",
      },
    },

    {
      slug: "freight-transport-turkmenistan",
      country: "Turkmenistan",
      region: "Central Asia",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-turkmenistan-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-turkmenistan-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Turkmenistan",
      },

      title: "Freight transport from Europe",
      highlight: "to Turkmenistan",

      intro:
        "GLOBALSPED organizes reliable freight transport to Turkmenistan – including FTL, LTL, groupage, temperature-controlled transport and project cargo for demanding supply chains to Central Asia.",

      seoText:
        "We support companies with international freight transport from Europe to Turkmenistan, especially to Ashgabat, Türkmenbaşy and other economically relevant regions. Our services include transport planning, route coordination, customs clearance, export and import processes as well as individual support for complex transports to demanding markets in Central Asia.",

      services: [
        "FTL full truck loads to Turkmenistan",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],

      cities: ["Ashgabat", "Türkmenbaşy", "Mary"],

      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Southern route",
              description:
                "LTL and FTL transport usually runs via Austria, Hungary, Romania, Bulgaria, Türkiye, Georgia, Azerbaijan and the Caspian Sea ferry to Turkmenistan.",
            },
            {
              title: "Alternative route",
              description:
                "Depending on project requirements, individual routings via neighboring Central Asian countries are possible.",
            },
          ],
        },

        runtime: {
          label: "Transit time",
          value: "approx. 20–30 days, depending on route and customs handling",
        },

        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Southern route",
              office: "BG001015 Kapitan Andreevo",
            },
          ],
        },

        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we support you with the complete preparation of all required transport and customs documents.",
        },

        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number or email address",
          ],
        },
      },

      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "Freight transport to Turkmenistan requires particularly careful preparation of documents, transit routes and consignee details. Due to country-specific requirements and transit dependencies, transport planning should start early.",
        operationalHints: [
          {
            title: "Document quality is decisive",
            text: "For Turkmenistan, commercial invoice, packing list, CMR and export documents should be complete and clear. Goods description, customs value, weight and consignee details must be consistent.",
          },
          {
            title: "Coordinate transit planning early",
            text: "Depending on the route, transit countries, border crossings and regional regulations can influence transit time. Coordinated route planning reduces operational uncertainty.",
          },
          {
            title: "Do not neglect compliance checks",
            text: "Before dispatch, goods type, consignee and end use should be checked, especially for technical goods, spare parts and industrial components.",
          },
          {
            title: "Clarify customs and import requirements in advance",
            text: "Because import and clearance requirements can differ by product group, import requirements and accompanying documents should be clarified before transport begins.",
          },
        ],
        authorityLinks: [
          {
            label: "Turkmenistan import requirements and documentation",
            href: "https://www.trade.gov/country-commercial-guides/turkmenistan-import-requirements-and-documentation",
            source: "International Trade Administration",
            topic: "Import documents",
            reason:
              "Official English-language source on Turkmenistan-specific import documentation and requirements.",
          },
          {
            label: "Turkmenistan prohibited and restricted imports",
            href: "https://www.trade.gov/country-commercial-guides/turkmenistan-prohibited-and-restricted-imports",
            source: "International Trade Administration",
            topic: "Import restrictions",
            reason:
              "Supports compliance checks and product-specific import review before transport begins.",
          },
          {
            label: "IRU information on the TIR system",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / transit",
            reason:
              "Relevant for road freight with several customs and transit stages.",
          },
          {
            label: "EU TARIC database for customs tariff classification",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=en",
            source: "European Commission",
            topic: "Customs tariff classification",
            reason:
              "Authoritative source for correct customs tariff numbers and export checks.",
          },
        ],
        internalLinks: [
          {
            label: "Customs clearance for international transport",
            href: "/{locale}/services/customs-clearance",
            reason:
              "Thematically relevant for transports with increased documentation requirements.",
          },
          {
            label: "Project logistics for complex transports",
            href: "/{locale}/services/project-logistics",
            reason:
              "Suitable for industrial deliveries and more complex transports to Turkmenistan.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Turkmenistan",
      },
    },

    {
      slug: "freight-transport-tajikistan",
      country: "Tajikistan",
      region: "Central Asia",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-tadschikistan-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-tadschikistan-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Tajikistan",
      },

      title: "Freight transport from Europe",
      highlight: "to Tajikistan",

      intro:
        "GLOBALSPED organizes reliable freight transport to Tajikistan – including FTL, LTL, groupage, temperature-controlled transport and project cargo for demanding supply chains to Central Asia.",

      seoText:
        "We support companies with international freight transport from Europe to Tajikistan, especially to Dushanbe, Khujand and other economically relevant regions. Our services include transport planning, route coordination, customs clearance, export and import processes as well as individual support for complex transports to demanding markets in Central Asia.",

      services: [
        "FTL full truck loads to Tajikistan",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],

      cities: ["Dushanbe", "Khujand", "Kulob"],

      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Southern route",
              description:
                "LTL and FTL transport usually runs via Austria, Hungary, Romania, Bulgaria, Türkiye, Georgia, Azerbaijan, the Caspian Sea ferry, Kazakhstan and Uzbekistan to Tajikistan.",
            },
            {
              title: "Northern route",
              description:
                "FTL full truck loads usually run via Poland, Belarus, Russia, Kazakhstan and Uzbekistan to Tajikistan.",
            },
          ],
        },

        runtime: {
          label: "Transit time",
          value:
            "approx. 20–30 days, depending on route, border handling and destination region",
        },

        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Southern route",
              office: "BG001015 Kapitan Andreevo",
            },
            {
              route: "Northern route",
              office: "PL301040 Koroszczyn",
            },
          ],
        },

        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we support you with the complete preparation of all required transport and customs documents.",
        },

        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number or email address",
          ],
        },
      },

      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "For freight transport to Tajikistan, careful documentation, reliable transit planning and a realistic assessment of infrastructure are particularly important. Depending on the destination region, border procedures, mountain roads and seasonal conditions can influence execution.",
        operationalHints: [
          {
            title: "Prepare accompanying documents completely",
            text: "For Tajikistan, CMR, commercial invoice, packing list and customs documents should be complete and consistent. Precise goods descriptions are particularly important for industrial and spare-parts shipments.",
          },
          {
            title: "Plan transit and border handling realistically",
            text: "Tajikistan is highly transit-dependent. Route, border crossings and local clearance should be coordinated before transport begins to avoid unnecessary waiting times.",
          },
          {
            title: "Consider infrastructure and mountain conditions",
            text: "Depending on the destination, road conditions, altitude and seasonal restrictions can be relevant. Realistic transit-time planning is essential for sensitive or time-critical goods.",
          },
          {
            title: "Check import restrictions",
            text: "Depending on the product group, additional import requirements or restrictions may apply. A pre-check reduces the risk of delays during import clearance.",
          },
        ],
        authorityLinks: [
          {
            label: "Tajikistan import requirements and documentation",
            href: "https://www.trade.gov/country-commercial-guides/tajikistan-import-requirements-and-documentation",
            source: "International Trade Administration",
            topic: "Import documents",
            reason:
              "Official English-language source on import procedures, accompanying documents and restrictions for Tajikistan.",
          },
          {
            label: "Tajikistan trade barriers and import restrictions",
            href: "https://www.trade.gov/country-commercial-guides/tajikistan-trade-barriers",
            source: "International Trade Administration",
            topic: "Import restrictions",
            reason:
              "Adds depth for product controls, restrictions and import checks.",
          },
          {
            label: "IRU information on the TIR system",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / transit",
            reason:
              "Relevant for transit planning and international road transport to Central Asia.",
          },
          {
            label: "German Customs information on export procedures",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "German Customs",
            topic: "Export handling",
            reason:
              "Official source for German export handling to third countries.",
          },
        ],
        internalLinks: [
          {
            label: "Customs clearance for Central Asia transports",
            href: "/{locale}/services/customs-clearance",
            reason:
              "Strengthens the semantic connection between Tajikistan transport and customs expertise.",
          },
          {
            label: "Request transport to Tajikistan",
            href: "/{locale}/transport-request",
            reason:
              "Leads directly to conversion for concrete transport requests.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Tajikistan",
      },
    },

    {
      slug: "freight-transport-mongolia",
      country: "Mongolia",
      region: "Central Asia",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-mongolei-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-mongolei-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Mongolia",
      },

      title: "Freight transport from Europe",
      highlight: "to Mongolia",

      intro:
        "GLOBALSPED organizes reliable freight transport to Mongolia – including FTL, LTL, groupage, temperature-controlled transport and project cargo for demanding supply chains to Central Asia.",

      seoText:
        "We support companies with international freight transport from Europe to Mongolia, especially to Ulaanbaatar and other economically relevant regions. Our services include transport planning, route coordination, customs clearance, export and import processes as well as individual support for complex transports to remote and logistically demanding markets.",

      services: [
        "FTL full truck loads to Mongolia",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],

      cities: ["Ulaanbaatar", "Darkhan", "Erdenet"],

      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Northern route",
              description:
                "FTL full truck loads usually run via Poland, Belarus and Russia to Mongolia. This route is often used for stable and plannable transports.",
            },
            {
              title: "Alternative route",
              description:
                "Depending on project requirements, alternative routings via Central Asia and China are possible, especially for complex or time-critical transports.",
            },
          ],
        },

        runtime: {
          label: "Transit time",
          value:
            "approx. 20–30 days, depending on route, infrastructure and destination",
        },

        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Northern route",
              office: "PL301040 Koroszczyn",
            },
          ],
        },

        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we support you with the complete preparation of all required transport and customs documents.",
        },

        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number or email address",
          ],
        },
      },

      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "Freight transport to Mongolia requires particularly reliable route and transit planning. Due to long distances, landlocked geography and infrastructure specifics, complete documents and realistic transit times are decisive.",
        operationalHints: [
          {
            title: "Calculate long transit routes realistically",
            text: "Mongolia is a demanding destination for European road freight. Transit countries, border crossings and regional infrastructure can significantly influence lead times.",
          },
          {
            title: "Check documents before loading",
            text: "CMR, commercial invoice, packing list and export documents must be clear and complete. Precise goods descriptions are especially important for machinery, spare parts and industrial equipment.",
          },
          {
            title: "Coordinate HS code and consignee details",
            text: "Unclear tariff numbers or inconsistent consignee details can cause queries. A clean pre-check helps prevent delays in transit and import clearance.",
          },
          {
            title: "Consider seasonal conditions",
            text: "Weather, road conditions and regional accessibility can play a greater role in Mongolia than for standard destinations. Flexible transit-time planning is recommended.",
          },
        ],
        authorityLinks: [
          {
            label: "GOV.UK guidance on exporting to Mongolia",
            href: "https://www.gov.uk/government/publications/exporting-to-mongolia/exporting-to-mongolia",
            source: "GOV.UK",
            topic: "Trade and customs guidance",
            reason:
              "Public English-language government source with customs documentation guidance for Mongolia.",
          },
          {
            label: "WTO Trade Policy Review: Mongolia",
            href: "https://www.wto.org/english/tratop_e/tpr_e/tp506_e.htm",
            source: "World Trade Organization",
            topic: "Trade policy and customs framework",
            reason:
              "Official WTO source on Mongolia’s trade policy environment and customs-related framework.",
          },
          {
            label: "UNECE CMR Convention",
            href: "https://unece.org/fileadmin/DAM/trans/conventn/cmr_e.pdf",
            source: "UNECE",
            topic: "CMR",
            reason:
              "Official legal basis for CMR documentation in international road freight transport.",
          },
          {
            label: "German Customs information on export procedures",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "German Customs",
            topic: "Export handling",
            reason:
              "Official source on export processes from Germany to third countries.",
          },
        ],
        internalLinks: [
          {
            label: "Project logistics for international special transports",
            href: "/{locale}/services/project-logistics",
            reason:
              "Mongolia transports often require increased planning around route, lead time and handling.",
          },
          {
            label: "Request transport to Mongolia",
            href: "/{locale}/transport-request",
            reason: "Guides users directly to a concrete request.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Mongolia",
      },
    },

    {
      slug: "freight-transport-azerbaijan",
      country: "Azerbaijan",
      region: "Caucasus",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-aserbaidschan-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-aserbaidschan-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Azerbaijan",
      },

      title: "Freight transport from Europe",
      highlight: "to Azerbaijan",

      intro:
        "GLOBALSPED organizes reliable freight transport to Azerbaijan – including FTL, LTL, groupage, temperature-controlled transport and project cargo for demanding supply chains in the Caucasus.",

      seoText:
        "We support companies with international freight transport from Europe to Azerbaijan, especially to Baku, Sumgayit and Ganja. As an important transit country between Europe and Central Asia, Azerbaijan plays a central role in international freight flows. Our services include transport planning, route coordination, customs clearance as well as export and import processes for efficient and secure transports to the Caucasus.",

      services: [
        "FTL full truck loads to Azerbaijan",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],

      cities: ["Baku", "Sumgayit", "Ganja"],

      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Southeast Europe / Türkiye route",
              description:
                "FTL and LTL transports usually run via Austria, Hungary, Romania, Bulgaria and Türkiye directly to Georgia and onward to Azerbaijan.",
            },
            {
              title: "Caspian connection",
              description:
                "Azerbaijan serves as an important transit hub for transports across the Caspian Sea toward Central Asia, for example Kazakhstan and Turkmenistan.",
            },
          ],
        },

        runtime: {
          label: "Transit time",
          value: "approx. 7–14 days, depending on route and border handling",
        },

        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Southern route",
              office: "BG001015 Kapitan Andreevo",
            },
          ],
        },

        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we support you with the complete preparation of all required transport and customs documents.",
        },

        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number or email address",
          ],
        },
      },

      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "Freight transport to Azerbaijan combines customs handling, Caucasus transit and precise export documentation. Clean preparation of documents is particularly important for industrial goods, machinery and commercial goods.",
        operationalHints: [
          {
            title: "Check import requirements before dispatch",
            text: "For Azerbaijan, import requirements, accompanying goods documents and possible product-specific requirements should be clarified before transport begins.",
          },
          {
            title: "Plan Caucasus transit carefully",
            text: "Depending on the route, transit countries, border crossings and regional clearance processes can influence transit time. Realistic route planning reduces delays.",
          },
          {
            title: "Provide consistent customs value and HS code",
            text: "Unclear customs values or imprecise HS codes can trigger queries. Commercial invoice, packing list and CMR should contain consistent data.",
          },
          {
            title: "Check compliance for technical goods",
            text: "For machinery, spare parts and industrial components, it should be checked in advance whether export control or additional documents are relevant.",
          },
        ],
        authorityLinks: [
          {
            label: "Azerbaijan import requirements and documentation",
            href: "https://www.trade.gov/country-commercial-guides/azerbaijan-import-requirements-and-documentation",
            source: "International Trade Administration",
            topic: "Import documents",
            reason:
              "Official English-language source on Azerbaijan import procedures, documents and requirements.",
          },
          {
            label: "Azerbaijan customs regulations",
            href: "https://www.trade.gov/country-commercial-guides/azerbaijan-customs-regulations",
            source: "International Trade Administration",
            topic: "Customs regulations",
            reason:
              "Adds regulatory customs context for transport planning to Azerbaijan.",
          },
          {
            label: "IRU information on the TIR system",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / transit",
            reason:
              "Relevant for international road transport across several customs territories toward the Caucasus.",
          },
          {
            label: "German Customs information on export procedures",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "German Customs",
            topic: "Export handling",
            reason:
              "Official basis for export processes and export control from Germany.",
          },
        ],
        internalLinks: [
          {
            label: "FTL full truck loads to the Caucasus",
            href: "/{locale}/services/ftl-full-truck-loads",
            reason:
              "Connects Azerbaijan transport with an important service page.",
          },
          {
            label: "Customs clearance for Azerbaijan transports",
            href: "/{locale}/services/customs-clearance",
            reason:
              "Strengthens internal topical authority for customs clearance and documents.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Azerbaijan",
      },
    },

    {
      slug: "freight-transport-georgia",
      country: "Georgia",
      region: "Caucasus",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-georgien-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-georgien-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Georgia",
      },

      title: "Freight transport from Europe",
      highlight: "to Georgia",

      intro:
        "GLOBALSPED organizes reliable freight transport to Georgia – including FTL, LTL, groupage, temperature-controlled transport and project cargo for demanding supply chains in the Caucasus.",

      seoText:
        "We support companies with international freight transport from Europe to Georgia, especially to Tbilisi, Batumi and Kutaisi. Georgia is a central logistics location between Europe and Asia and plays an important role as a transit country for transports to the Caucasus and Central Asia. Our services include transport planning, route coordination, customs clearance as well as export and import processes for secure and efficient transports.",

      services: [
        "FTL full truck loads to Georgia",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],

      cities: ["Tbilisi", "Batumi", "Kutaisi"],

      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Southeast Europe / Türkiye route",
              description:
                "FTL and LTL transports usually run via Austria, Hungary, Romania, Bulgaria and Türkiye directly to Georgia.",
            },
            {
              title: "Transit route toward Central Asia",
              description:
                "Georgia serves as an important transit corridor for transports to Azerbaijan and onward across the Caspian Sea to Central Asia.",
            },
          ],
        },

        runtime: {
          label: "Transit time",
          value: "approx. 7–12 days, depending on route and border handling",
        },

        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Southern route",
              office: "BG001015 Kapitan Andreevo",
            },
          ],
        },

        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we support you with the complete preparation of all required transport and customs documents.",
        },

        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number or email address",
          ],
        },
      },

      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "Georgia is an important destination and transit market for transports to the Caucasus and onward toward Central Asia. Complete transport documents, correct customs information and coordinated handling with local import processes are essential.",
        operationalHints: [
          {
            title: "Observe customs declaration and deadlines",
            text: "For Georgia, import documents should be prepared early. Delays often occur when goods description, invoice, packing list or transport data do not match.",
          },
          {
            title: "Plan the Caucasus route realistically",
            text: "Depending on origin and transit route, border clearance, regional traffic conditions and seasonal influences can affect transit time.",
          },
          {
            title: "Check preference and origin issues",
            text: "For certain goods, origin may be relevant for customs treatment and documentation. Early checks help prevent additional requests.",
          },
          {
            title: "Coordinate documents for goods with special requirements",
            text: "For some product groups, additional certificates, evidence or labeling requirements may be needed. This should be checked before pickup.",
          },
        ],
        authorityLinks: [
          {
            label: "Georgia import requirements and documentation",
            href: "https://www.trade.gov/country-commercial-guides/georgia-import-requirements-and-documentation",
            source: "International Trade Administration",
            topic: "Import documents",
            reason:
              "Official English-language source on Georgian import documents and customs clearance requirements.",
          },
          {
            label: "Georgia import tariffs",
            href: "https://www.trade.gov/country-commercial-guides/georgia-import-tariffs",
            source: "International Trade Administration",
            topic: "Import tariffs",
            reason:
              "Adds customs and duty context for import planning into Georgia.",
          },
          {
            label: "IRU information on the TIR system",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / transit",
            reason:
              "Strengthens the entity connection to international transit and road freight transport.",
          },
          {
            label: "UNECE CMR Convention",
            href: "https://unece.org/fileadmin/DAM/trans/conventn/cmr_e.pdf",
            source: "UNECE",
            topic: "CMR",
            reason:
              "Official basis for CMR-related transport documentation.",
          },
        ],
        internalLinks: [
          {
            label: "Request transport to the Caucasus",
            href: "/{locale}/transport-request",
            reason:
              "Supports conversion for concrete Georgia and Caucasus transports.",
          },
          {
            label: "Customs clearance for international transport",
            href: "/{locale}/services/customs-clearance",
            reason:
              "Strengthens the semantic connection to customs and document expertise.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Georgia",
      },
    },

    {
      slug: "freight-transport-armenia",
      country: "Armenia",
      region: "Caucasus",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-armenien-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-armenien-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Armenia",
      },

      title: "Freight transport from Europe",
      highlight: "to Armenia",

      intro:
        "GLOBALSPED organizes reliable freight transport to Armenia – including FTL, LTL, groupage, temperature-controlled transport and project cargo for demanding supply chains in the Caucasus.",

      seoText:
        "We support companies with international freight transport from Europe to Armenia, especially to Yerevan and other economically relevant regions. Due to its geographic location, Armenia places special demands on transport planning and routing. Our services include transport coordination, customs clearance as well as export and import processes for secure and efficient transports to the Caucasus.",

      services: [
        "FTL full truck loads to Armenia",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],

      cities: ["Yerevan", "Gyumri", "Vanadzor"],

      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Southeast Europe / Türkiye route",
              description:
                "FTL and LTL transports usually run via Austria, Hungary, Romania, Bulgaria and Türkiye to Georgia and onward to Armenia.",
            },
            {
              title: "Individual routing",
              description:
                "Due to the geopolitical situation, route planning is handled individually depending on project requirements and the current regional situation.",
            },
          ],
        },

        runtime: {
          label: "Transit time",
          value: "approx. 10–18 days, depending on route and border handling",
        },

        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Southern route",
              office: "BG001015 Kapitan Andreevo",
            },
          ],
        },

        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we support you with the complete preparation of all required transport and customs documents.",
        },

        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number or email address",
          ],
        },
      },

      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "For freight transport to Armenia, precise export documents, coordinated transit routes and early checks of import requirements are important. Due to the geographic location, routes and border processes must be planned particularly carefully.",
        operationalHints: [
          {
            title: "Clarify transit routing in advance",
            text: "Armenia requires careful coordination of the transit route depending on the place of departure. Border processes, regional routes and political conditions can influence transit time.",
          },
          {
            title: "Consider the EAEU context",
            text: "Armenia is a member of the Eurasian Economic Union. For certain goods, technical requirements, conformity documents or additional documents may be relevant.",
          },
          {
            title: "Keep documents consistent",
            text: "Commercial invoice, packing list, CMR and export documents should match in goods description, weight, number of packages and customs value.",
          },
          {
            title: "Check sanctions and export control",
            text: "For technical goods, machinery and spare parts, it should be checked before dispatch whether export control requirements or end-use checks are relevant.",
          },
        ],
        authorityLinks: [
          {
            label: "Armenia import requirements and documentation",
            href: "https://www.trade.gov/country-commercial-guides/armenia-import-requirements-and-documentation",
            source: "International Trade Administration",
            topic: "Import documents",
            reason:
              "Official English-language source on Armenian import documentation and customs declaration requirements.",
          },
          {
            label: "Armenia customs regulations",
            href: "https://www.trade.gov/country-commercial-guides/armenia-customs-regulations",
            source: "International Trade Administration",
            topic: "Customs regulations",
            reason:
              "Adds regulatory customs context and supports country-specific authority.",
          },
          {
            label: "EU TARIC database for customs tariff classification",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=en",
            source: "European Commission",
            topic: "Customs tariff classification",
            reason:
              "Strengthens the connection to goods classification and export documentation.",
          },
          {
            label: "German Customs information on export procedures",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "German Customs",
            topic: "Export handling",
            reason:
              "Official source on German export formalities and export processes.",
          },
        ],
        internalLinks: [
          {
            label: "Project logistics for complex transports",
            href: "/{locale}/services/project-logistics",
            reason:
              "Matches demanding deliveries with increased route and documentation planning.",
          },
          {
            label: "Customs clearance for Armenia transports",
            href: "/{locale}/services/customs-clearance",
            reason:
              "Strengthens the topical connection with export documents and customs clearance.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Armenia",
      },
    },

    {
      slug: "freight-transport-iraq",
      country: "Iraq",
      region: "Middle East",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-irak-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-irak-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Iraq",
      },

      title: "Freight transport from Europe",
      highlight: "to Iraq",

      intro:
        "GLOBALSPED organizes reliable freight transport to Iraq – including FTL, LTL, groupage, temperature-controlled transport and project cargo for demanding supply chains in the Middle East.",

      seoText:
        "We support companies with international freight transport from Europe to Iraq, especially to Baghdad, Erbil and Basra. Transport to Iraq requires specific experience in planning, security and customs clearance. Our services include individual route planning, export and import handling as well as professional support for complex and security-sensitive transports.",

      services: [
        "FTL full truck loads to Iraq",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],

      cities: ["Baghdad", "Erbil", "Basra"],

      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Türkiye route",
              description:
                "FTL and LTL transports usually run via Austria, Hungary, Bulgaria and Türkiye to Iraq. This is the most commonly used connection for stable transports.",
            },
            {
              title: "Individual project solutions",
              description:
                "Depending on requirements, individual routes are planned for project cargo and sensitive goods, aligned with security and infrastructure conditions.",
            },
          ],
        },

        runtime: {
          label: "Transit time",
          value:
            "approx. 8–18 days, depending on route, security situation and destination region",
        },

        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Türkiye route",
              office: "BG001015 Kapitan Andreevo",
            },
          ],
        },

        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we support you with the complete preparation of all required transport and customs documents for Iraq.",
        },

        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number or email address",
          ],
        },
      },

      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "Freight transport to Iraq requires particularly careful review of documents, consignee details, customs values and compliance requirements. Depending on destination region and goods type, additional coordination before dispatch may be necessary.",
        operationalHints: [
          {
            title: "Check pre-arrival requirements and customs values",
            text: "For Iraq transports, commercial invoice, customs value, payment and consignee details should be prepared with particular care. Unclear or incomplete information can delay clearance.",
          },
          {
            title: "Clarify compliance before transport begins",
            text: "For exports to Iraq, consignee, end use and goods type should be checked early. This is especially important for technical goods, spare parts and industrial equipment.",
          },
          {
            title: "Differentiate regional destinations",
            text: "Deliveries to Baghdad, Basra, Erbil or other regions may have different operational requirements. Route, border handling and local delivery should be coordinated in advance.",
          },
          {
            title: "Coordinate documents with local import handling",
            text: "Packing list, CMR, commercial invoice and any additional certificates should be aligned with the consignee’s and import clearance requirements.",
          },
        ],
        authorityLinks: [
          {
            label: "Iraq import requirements and documentation",
            href: "https://www.trade.gov/country-commercial-guides/iraq-import-requirements-and-documentation-0",
            source: "International Trade Administration",
            topic: "Import documents",
            reason:
              "Official English-language source on Iraq-specific customs documents and import requirements.",
          },
          {
            label: "Iraq customs regulations",
            href: "https://www.trade.gov/country-commercial-guides/iraq-customs-regulations",
            source: "International Trade Administration",
            topic: "Customs regulations",
            reason:
              "Provides additional customs and tariff context for Iraq transports.",
          },
          {
            label: "German Customs information on export procedures",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "German Customs",
            topic: "Export handling",
            reason:
              "Official basis for export processes, export control and third-country deliveries.",
          },
          {
            label: "EU TARIC database for customs tariff classification",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=en",
            source: "European Commission",
            topic: "Customs tariff classification",
            reason:
              "Strengthens topical relevance for correct goods classification and export documents.",
          },
        ],
        internalLinks: [
          {
            label: "Customs clearance for Iraq transports",
            href: "/{locale}/services/customs-clearance",
            reason:
              "Highly relevant due to increased requirements for documents, customs values and compliance.",
          },
          {
            label: "Request transport to Iraq",
            href: "/{locale}/transport-request",
            reason: "Guides qualified users directly to the request page.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Iraq",
      },
    },

    {
      slug: "freight-transport-turkey",
      country: "Turkey",
      region: "Middle East",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-tuerkei-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-tuerkei-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Turkey",
      },

      title: "Freight transport from Europe",
      highlight: "to Turkey",

      intro:
        "GLOBALSPED organizes reliable freight transport to Turkey – including FTL, LTL, groupage, temperature-controlled transport and project cargo for demanding supply chains toward the Middle East.",

      seoText:
        "We support companies with international road freight transport from Europe to Turkey, especially to Istanbul, Ankara, Izmir, Bursa and other important economic regions. Turkey is a major logistics hub between Europe, the Caucasus, Central Asia and the Middle East and plays a central role as a transit and trade corridor. Our services include transport planning, route coordination, customs clearance as well as export and import processes for secure, reliable and efficient transports.",

      services: [
        "FTL full truck loads to Turkey",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],

      cities: ["Istanbul", "Ankara", "Izmir", "Bursa", "Adana", "Antalya"],

      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Southeast Europe / Turkey route",
              description:
                "FTL and LTL transports usually run via Austria, Hungary, Romania and Bulgaria directly to Turkey. Depending on destination region, goods type and transport requirements, we coordinate suitable routes for reliable transports to Istanbul, Ankara, Izmir, Bursa and other Turkish economic regions.",
            },
            {
              title: "Individual project solutions",
              description:
                "Depending on requirements, individual routes are planned for project cargo and sensitive goods, aligned with security and infrastructure conditions.",
            },
          ],
        },

        runtime: {
          label: "Transit time",
          value: "approx. 6–10 days, depending on route and border handling",
        },

        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Southern route",
              office: "BG001015 Kapitan Andreevo",
            },
          ],
        },

        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we support you with the complete preparation of all required transport and customs documents for Turkey.",
        },

        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number or email address",
          ],
        },
      },

      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "Freight transport to Turkey combines EU export processes, customs clearance and complex transit and border processes between Europe and the Middle East. Precise documentation is particularly important for industrial goods, machinery, automotive goods and commercial cargo.",
        operationalHints: [
          {
            title: "Prepare export and customs documents consistently",
            text: "Differences between commercial invoice, packing list, CMR and HS codes often lead to delays or additional customs checks for Turkey transports.",
          },
          {
            title: "Plan border crossings realistically",
            text: "Border crossings such as Kapıkule can involve considerable waiting times depending on season, holidays and traffic volume. Transit times should be planned accordingly.",
          },
          {
            title: "Coordinate transit and TIR procedures early",
            text: "For transit traffic toward the Caucasus, Central Asia or the Middle East, TIR and transit procedures should be fully coordinated before transport begins.",
          },
          {
            title: "Check technical goods and dual-use products",
            text: "For certain machinery, electronics or industrial components, export control, compliance checks or additional certificates may be required.",
          },
          {
            title: "Prepare ADR and temperature-controlled transports carefully",
            text: "Dangerous goods and temperature-controlled transports require complete accompanying documents as well as coordinated border and customs processes along the route.",
          },
        ],
        authorityLinks: [
          {
            label: "Turkey import requirements and documentation",
            href: "https://www.trade.gov/country-commercial-guides/turkey-import-requirements-and-documentation",
            source: "International Trade Administration",
            topic: "Import documents",
            reason:
              "High-quality English-language public source on Turkish import documentation, customs procedures and requirements.",
          },
          {
            label: "Turkey customs regulations",
            href: "https://www.trade.gov/country-commercial-guides/turkey-customs-regulations",
            source: "International Trade Administration",
            topic: "Customs regulations",
            reason:
              "Provides official English-language context on Turkey’s customs regimes and customs legislation.",
          },
          {
            label: "IRU information on the TIR system",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / transit procedure",
            reason:
              "International authority source for TIR and transit processes in cross-border road freight.",
          },
          {
            label: "UNECE transport information",
            href: "https://unece.org/transport",
            source: "UNECE",
            topic: "International road transport",
            reason:
              "Strengthens semantic relevance for international transport regulations, transit processes and CMR topics.",
          },
          {
            label: "Republic of Türkiye Ministry of Trade",
            href: "https://ticaret.gov.tr/",
            source: "Republic of Türkiye Ministry of Trade",
            topic: "National customs information",
            reason:
              "Official government source for customs procedures, import requirements and regulatory information in Turkey.",
          },
        ],
        internalLinks: [
          {
            label: "FAQ on customs and export documents",
            href: "/{locale}/faq",
            reason:
              "Useful internal deepening for export documents, customs processes and international transport requirements.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Turkey",
      },
    },

    {
      slug: "freight-transport-ukraine",
      country: "Ukraine",
      region: "Eastern Europe",
      heroImage: {
        desktop:
          "/images/country-hero/globalsped-transport-ukraine-hero-desktop-2560x960.webp",
        mobile:
          "/images/country-hero/globalsped-transport-ukraine-hero-mobile-1200x1600.webp",
        alt: "GLOBALSPED freight transport to Ukraine",
      },

      title: "Freight transport from Europe",
      highlight: "to Ukraine",

      intro:
        "GLOBALSPED organizes reliable freight transport to Ukraine – including FTL, LTL, groupage, temperature-controlled transport and project cargo for demanding supply chains to Eastern Europe.",

      seoText:
        "We support companies with international freight transport from Europe to Ukraine, especially to Kyiv, Lviv, Odesa and other economically relevant regions. Transport to Ukraine requires careful route planning, current knowledge of border and customs processes and flexible coordination with shippers and consignees. Our services include transport coordination, export and import handling, customs support as well as personal assistance for secure and plannable supply chains.",

      services: [
        "FTL full truck loads to Ukraine",
        "LTL partial loads and groupage",
        "Temperature-controlled transport for sensitive goods",
        "Project cargo and special transports",
        "Customs clearance, export, import and transit",
      ],

      cities: ["Kyiv", "Lviv", "Odesa", "Dnipro"],

      labels: {
        backToDestinations: "Back to destinations",
        introBadge: "International logistics",
        logisticsTitlePrefix: "Logistics solutions for transport to",
        citiesTitle: "Important destinations",
        authorityBadge: "Documents & guidance",
        authorityLinksTitle: "Reliable sources & further information",
        internalLinksTitle: "Relevant GLOBALSPED content",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Eastern Europe route",
              description:
                "FTL and LTL transports usually run via Austria, Hungary, Slovakia or Poland toward Ukraine. The exact route is planned depending on pickup location, destination region and the current border situation.",
            },
            {
              title: "Individual route planning",
              description:
                "For project cargo, time-critical shipments or sensitive goods, the route is coordinated individually, including border handling and document checks.",
            },
          ],
        },

        runtime: {
          label: "Transit time",
          value:
            "approx. 3–8 days, depending on route, destination region and border handling",
        },

        customsOffice: {
          label: "Customs office of export",
          offices: [
            {
              route: "Poland route",
              office: "depending on departure location and border crossing",
            },
            {
              route: "Slovakia / Hungary route",
              office: "depending on departure location and border crossing",
            },
          ],
        },

        documents: {
          label: "Documents",
          documents: [
            "Commercial invoice",
            "Packing list / loading list",
            "Customs documents: export accompanying document (EAD/ABD) for EU exports or T1 transit document for third-country goods",
            "Additional goods-related documents, e.g. certificate of origin",
          ],
          note: "Please contact us – we support you with the complete preparation and review of all required transport and customs documents for Ukraine.",
        },

        requiredInformation: {
          label: "Required information",
          intro:
            "The following information is required for smooth transport handling:",
          items: [
            "Complete consignee address",
            "Consignee contact person",
            "Consignee telephone number or email address",
            "Goods description, weight, dimensions and number of packages",
          ],
        },
      },

      countryAuthorityContent: {
        title: "Important information & documents",
        intro:
          "Freight transport to Ukraine requires precise checks of route, consignee, goods type and export documents. Due to the current situation, compliance, safety and flexible transport planning are particularly important.",
        operationalHints: [
          {
            title: "Check route and delivery region carefully",
            text: "For Ukraine transports, destination region, security situation, available border crossings and local delivery options should be coordinated before dispatch.",
          },
          {
            title: "Prepare export and import documents completely",
            text: "Commercial invoice, packing list, CMR, export declaration and goods description should be complete and consistent. Inconsistencies often cause delays.",
          },
          {
            title: "Carry out sanctions and compliance checks",
            text: "Before transport begins, consignee, goods type, end use and possible export control requirements should be checked. This is especially important for technical goods.",
          },
          {
            title: "Plan transit times flexibly",
            text: "Border clearance, security situation and regional restrictions can have short-term effects. Realistic and flexible planning is required for urgent deliveries.",
          },
        ],
        authorityLinks: [
          {
            label: "Ukraine import requirements and documentation",
            href: "https://www.trade.gov/country-commercial-guides/ukraine-import-requirements-and-documentation",
            source: "International Trade Administration",
            topic: "Import documents",
            reason:
              "Country-specific English-language authority source on import procedures, accompanying documents, restrictions and requirements.",
          },
          {
            label: "Ukraine customs regulations",
            href: "https://www.trade.gov/country-commercial-guides/ukraine-customs-regulations",
            source: "International Trade Administration",
            topic: "Customs regulations",
            reason:
              "Provides additional customs code and customs clearance context for Ukraine transports.",
          },
          {
            label: "EU TARIC database for customs tariff classification",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=en",
            source: "European Commission",
            topic: "Customs tariff classification",
            reason:
              "Strengthens relevance for correct goods classification and export documentation.",
          },
          {
            label: "UNECE CMR Convention",
            href: "https://unece.org/fileadmin/DAM/trans/conventn/cmr_e.pdf",
            source: "UNECE",
            topic: "CMR",
            reason:
              "Official basis for CMR-related documentation in international road transport.",
          },
        ],
        internalLinks: [
          {
            label: "Customs clearance for Ukraine transports",
            href: "/{locale}/services/customs-clearance",
            reason:
              "Strengthens the internal connection to export documents, compliance and customs clearance.",
          },
          {
            label: "Request transport to Ukraine",
            href: "/{locale}/transport-request",
            reason:
              "Guides users with a concrete transport requirement directly to the request page.",
          },
        ],
      },
      cta: {
        href: "/{locale}/transport-request",
        label: "Request transport to Ukraine",
      },
    },
  ],
  services: {
    badge: "Our services",
    title: "Logistics solutions for complex markets.",
    highlight: "Reliable. Personal. International.",
    intro:
      "GLOBALSPED provides tailor-made transport and logistics solutions for demanding routes between Europe, Central Asia, the Caucasus, Eastern Europe and the Middle East. With more than 30 years of experience, personal support and a strong partner network, we ensure safe, efficient and transparent handling of your transports.",

    cta: {
      label: "Request a transport quote",
      href: "/{locale}/transport-request",
    },

    learnMoreLabel: "Learn more",
    strengthsBadge: "Our logistics solutions",

    serviceItems: [
      {
        icon: "truck",
        title: "FTL – Full truck loads",
        text: "Direct transports with exclusive use of the vehicle for maximum security, efficiency and on-time delivery.",
        href: "/{locale}/services/ftl-full-truck-loads",
      },
      {
        icon: "boxes",
        title: "LTL – Partial loads",
        text: "Cost-efficient transport solutions through consolidated loads and regular connections to our destination regions.",
        href: "/{locale}/services/ltl-part-loads",
      },
      {
        icon: "temperature",
        title: "Temperature-controlled transport",
        text: "Temperature-controlled transport for sensitive goods – with modern cooling technology and continuous monitoring.",
        href: "/{locale}/services/temperature-controlled-transport",
      },
      {
        icon: "shield",
        title: "Dangerous goods transport",
        text: "Safe and compliant transport of sensitive dangerous goods, including ADR-compliant documentation and international handling.",
        href: "/{locale}/services/dangerous-goods-transport",
      },
      {
        icon: "fileShield",
        title: "Customs clearance",
        text: "Customs clearance as well as export, import and transit support for international transports to third countries.",
        href: "/{locale}/services/customs-clearance",
      },
      {
        icon: "crane",
        title: "Project logistics",
        text: "Individual solutions for complex projects, heavy transports and oversized cargo.",
        href: "/{locale}/services/project-logistics",
      },
    ],

    imageOne: {
      src: "/images/services/globalsped-service-truck.webp",
      alt: "Truck on an international route toward Central Asia",
    },

    imageTwo: {
      src: "/images/services/globalsped-project-logistics.webp",
      alt: "Project logistics with container handling and truck",
    },

    strengthsTitle: "Flexible. Experienced. International.",
    strengths: [
      {
        title: "International networks",
        text: "Access to a strong partner network in Europe, Central Asia, the Caucasus, Eastern Europe and the Middle East.",
      },
      {
        title: "Safety & compliance",
        text: "Compliance with relevant transport, customs and safety requirements for sensitive and complex shipments.",
      },
      {
        title: "Personal support",
        text: "A dedicated contact person for your project – from planning to final delivery.",
      },
      {
        title: "Transparency & communication",
        text: "Clear coordination throughout the entire transport process – with shippers, consignees, drivers and partners.",
      },
    ],

    stats: [
      { value: "30+", label: "Years of experience" },
      { value: "20+", label: "Destination countries" },
      { value: "FTL/LTL", label: "Flexible solutions" },
      { value: "Customs", label: "End-to-end handling" },
    ],
  },
  aboutUs: {
    badge: "About GLOBALSPED",
    title: "Experience, network and personal support",
    highlight: "for demanding international freight transport",
    intro:
      "GLOBALSPED is an international freight forwarder specializing in transport between Europe, Central Asia, the Caucasus, Eastern Europe and the Middle East. For many years, we have organized groupage, LTL partial loads, FTL full truck loads, temperature-controlled transport, ADR transports, project logistics and customs goods for companies with complex requirements.",
    text: "Our strength lies in short communication channels, personal support and an experienced team with up-to-date logistics expertise and multilingual competence. On demanding routes in particular, it is not only the price that matters, but the reliable coordination of shipper, consignee, driver, customs partners and international network partners.",

    cta: {
      label: "Request a transport quote",
      href: "/{locale}/transport-request",
    },

    images: [
      {
        src: "/images/about/globalsped-backoffice-team-at-work-transport-kaukasus-1536x1024.webp",
        alt: "GLOBALSPED team planning international freight transport",
        label: "Back office & planning",
      },
      {
        src: "/images/about/globalsped-offie-team-location-1537x1023.webp",
        alt: "International logistics route with truck toward Central Asia",
        label: "Location and feel-good workspace",
      },
    ],

    values: [
      {
        icon: "experience",
        title: "Experience since the 1990s",
        text: "Early specialization in transport to Central Asia, the Caucasus and neighboring markets.",
      },
      {
        icon: "network",
        title: "Strong partner network",
        text: "Reliable contacts along international routes for FTL, LTL, groupage and project cargo.",
      },
      {
        icon: "communication",
        title: "Direct communication",
        text: "Short decision-making paths, personal contacts and fast responses to operational questions.",
      },
      {
        icon: "customs",
        title: "Customs and document expertise",
        text: "Support with export, import, transit, T1, EAD/ABD, CMR and transport-related documents.",
      },
    ],

    teamIntroBox: {
      icon: "communication",
      title: "Personal. Multilingual. Solution-oriented.",
      text: "We do not see ourselves as an anonymous platform, but as a personal logistics partner. Our team combines practical experience, market knowledge and clear communication – especially where transports are complex, time-critical or document-intensive.",
    },

    teamListTitle: "Your personal GLOBALSPED team",
    teamListIntro:
      "Our transport managers and contact persons support you personally with transport requests, customs matters and the operational handling of your shipments.",

    teamMembers: [
      {
        imgURL: "/images/team/globalsped-robert.jpg",
        name: "Robert Tiefenthaler",
        job: "Managing Director",
        contact: {
          phone: "+49 8654 5762 20",
          email: "rt@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-selina.jpg",
        name: "Selina Tatzmann",
        job: "Principal Shareholder",
        contact: {
          phone: "+49 8654 5762 27",
          email: "st@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-no-image.gif",
        name: "Adisa Metolli",
        job: "Transport Manager",
        contact: {
          phone: "+49 8654 5762 51",
          email: "am@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-jahan.jpg",
        name: "Jahan Ilgeldyyeva",
        job: "Transport Manager",
        contact: {
          phone: "+49 8654 5762 34",
          email: "ji@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-thomas.jpg",
        name: "Thomas Höllmüller",
        job: "Transport Manager",
        contact: {
          phone: "+49 8654 5762 28",
          email: "th@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-manfred.jpg",
        name: "Manfred Steidl",
        job: "Transport Manager",
        contact: {
          phone: "+49 8654 5762 23",
          email: "ms@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-herbert.jpg",
        name: "Herbert Sesko",
        job: "Authorized Signatory",
        contact: {
          phone: "+49 8654 5762 21",
          email: "hs@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-no-image.gif",
        name: "Elias Schuhböck",
        job: "Transport Manager",
        contact: {
          phone: "+49 8654 5762 25",
          email: "es@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-no-image.gif",
        name: "Ida Tosun Kaiymova",
        job: "Transport Manager",
        contact: {
          phone: "+49 8654 5762 33",
          email: "itk@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-no-image.gif",
        name: "Afrim Sabani",
        job: "Manager",
        contact: {
          phone: "+43 662 450 842",
          email: "as@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-fini.jpg",
        name: "Fini",
        job: "Collections",
        contact: {
          phone: "+49 (0)8654 5762 0",
          email: "fini@globalsped.de",
        },
      },
    ],
  },
  jobs: {
    badge: "Careers at GLOBALSPED",
    title: "Jobs in international freight forwarding",
    highlight: "for people who think ahead and want to make a difference",
    intro:
      "Are you looking for more than a monotonous office job? At GLOBALSPED, you work on transport solutions for Central Asia, the Caucasus, Eastern Europe and the Middle East – with direct customer contact, responsibility and development opportunities.",

    image: {
      src: "/images/jobs/globalsped-jobs.jpg",
      alt: "Careers and jobs at GLOBALSPED",
    },

    imageOverlayCards: [
      {
        title: "Careers at GLOBALSPED",
        text: "International tasks. Direct customer contact. Real responsibility.",
        icon: "users",
      },
      {
        title: "Development & perspective",
        text: "Varied responsibilities with opportunities for personal development.",
        icon: "star",
      },
    ],

    openPositionsTitle: "Open positions",
    applyLabel: "Apply now",
    detailsLabel: "View tasks",
    email: "jobs@globalsped.de",

    positions: [
      {
        title: "Export Clerk / Export Coordinator (m/f/d)",
        subtitle:
          "Export handling, customs documents and international customer support",
        description:
          "In this position, you support our export handling for international transports to demanding destination markets. You work in a structured way, communicate confidently with customers and partners and keep track of complex document processes.",
        tasks: [
          "Receiving, processing and following up customer orders",
          "Recording and maintaining transport-related data in the ERP system",
          "Preparing shipping documents, delivery notes, invoices and country-specific accompanying documents",
          "Customs handling for transports to third countries",
          "Providing telephone and written support to international customers in English",
          "Checking incoming and outgoing freight charges",
          "Issuing supplier declarations",
          "Preparing the monthly Intrastat declaration",
        ],
      },
      {
        title: "Freight Forwarding & Logistics Specialist (m/f/d)",
        subtitle:
          "Dispatch, international shipments, import, export, sea freight and air freight",
        description:
          "You organize international shipments, coordinate customers, partners and carriers, and ensure that documents, deadlines and information come together reliably.",
        tasks: [
          "Acting as contact person for customers in the areas of import, export, sea freight, air freight and container trucking",
          "Purchasing freight capacity and coordinating with transport partners",
          "Dispatching, organizing and handling international shipments",
          "Preparing required documents, including via ATLAS and DBH",
          "Documenting orders and quotations",
          "Managing and monitoring the flow of documents and information",
          "Monitoring delivery dates to ensure contract fulfillment on time",
        ],
      },
    ],

    initiative: {
      title: "Career changers & speculative applications",
      text: "You do not meet every professional requirement, but you bring organizational talent, language skills, willingness to learn and basic computer skills? Then we would also be pleased to receive your speculative application.",
    },

    companyTitle: "Our company",
    companyText:
      "GLOBALSPED is an international freight forwarder specializing in exports to Central Asia, the Caucasus, Eastern Europe and the Middle East. Instead of mass-market logistics, we develop individual transport solutions for complex requirements – from aid shipments and pharmaceutical deliveries to machinery and project cargo.",

    values: [
      "International transports instead of standard routine",
      "Short decision-making paths and personal collaboration",
      "Tasks with responsibility and development opportunities",
      "Teamwork, language diversity and close operational contact with customers",
    ],

    closing:
      "If you think creatively, are willing to learn and want to solve unusual tasks professionally, we would like to get to know you.",
  },
  contact: {
    badge: "Contact",
    title: "Have questions?",
    highlight: "Get in touch with us",
    intro:
      "Do you have questions about international transport, customs clearance, FTL, LTL or project logistics? Send us a message – our team will get back to you as soon as possible.",

    form: {
      nameLabel: "Name *",
      companyLabel: "Company *",
      emailLabel: "Email *",
      phoneLabel: "Phone *",
      messageLabel: "Message *",

      namePlaceholder: "Your name",
      companyPlaceholder: "Your company",
      emailPlaceholder: "Your email address",
      phonePlaceholder: "Your phone number",
      messagePlaceholder: "Your message",

      privacyLabel:
        "I agree that my details may be processed in order to handle my contact request.",

      submitLabel: "Send message",
      sendingLabel: "Sending message ...",
      submittedLabel: "Message sent",

      validationRequired: "Please fill in your name, email address and message.",
      validationEmail: "Please enter a valid email address.",
      privacyRequired: "Please confirm the privacy notice.",
      submitError:
        "Your message could not be sent. Please try again or contact us directly by email.",
      successMessage:
        "Thank you. Your message has been sent.",
    },

    locationsTitle: "Our locations",
    routeLabel: "Plan route",

    locations: [
      {
        title: "Germany (HQ)",
        address: "Pendelhagen 1, D-83416 Saaldorf-Surheim",
        phone: "+49 (0)8654 5762-0",
        email: "info@globalsped.de",
        mapsUrl:
          "https://www.google.com/maps/dir/?api=1&destination=Pendelhagen%201%2C%2083416%20Saaldorf-Surheim%2C%20Germany",
      },
      {
        title: "Austria",
        address: "Metzgerstraße 54, A-5020 Salzburg",
        phone: "+43 (0)662 45084-21",
        email: "afrim.sabani@globalsped.de",
        mapsUrl:
          "https://www.google.com/maps/dir/?api=1&destination=Metzgerstra%C3%9Fe%2054%2C%205020%20Salzburg%2C%20Austria",
      },
    ],

    mapTitle: "Locations on Google Maps",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Pendelhagen%201%2C%2083416%20Saaldorf-Surheim%20Germany%20OR%20Metzgerstra%C3%9Fe%2054%2C%205020%20Salzburg%20Austria&output=embed",
  },
  footer: {
    companyName: "Globalsped Internationale Spedition GmbH",
    shortName: "GLOBALSPED",
    claim: "International Transport Solutions",
    text: "Specialized transport and logistics solutions between Europe, Central Asia, the Caucasus, Eastern Europe, and the Middle East – including customs clearance, FTL, LTL, temperature-controlled transport, and project logistics.",

    contactTitle: "Contact",
    contact: {
      email: "info@globalsped.de",
      phone: "+49 (0) 8654 5762 0",
      address: "Pendel­hagen 1, D-83416 Saaldorf-Surheim",
      openingHoursLabel: "Opening hours",
      openingDays: "Monday - Friday",
      openingHours: "08:00 am – 5:00 pm",
    },

    pageLinksTitle: "Pages",
    pageLinks: [
      { label: "Start", href: "/en" },
      { label: "Impress", href: "/en/imprint" },
      { label: "Privacy Policy", href: "/en/privacy-policy" },
      { label: "FAQ", href: "/en/faq" },
    ],

    transportsTitle: "Main transports countries",
    transports: [
      { label: "Transport to Uzbekistan", href: "/en/destinations/freight-transport-uzbekistan" },
      { label: "Transport to Kazakhstan", href: "/en/destinations/freight-transport-kazakhstan" },
      { label: "Transport to Kyrgyzstan", href: "/en/destinations/freight-transport-kyrgyzstan" },
      { label: "Transport to Turkmenistan", href: "/en/destinations/freight-transport-turkmenistan" },
      { label: "Transport to Tajikistan", href: "/en/destinations/freight-transport-tajikistan" },
      { label: "Transport to Mongolia", href: "/en/destinations/freight-transport-mongolia" },
      { label: "Transport to Azerbaijan", href: "/en/destinations/freight-transport-azerbaijan" },
      { label: "Transport to Georgia", href: "/en/destinations/freight-transport-georgia" },
      { label: "Transport to Armenia", href: "/en/destinations/freight-transport-armenia" },
      { label: "Transport to Iraq", href: "/en/destinations/freight-transport-iraq" },
      { label: "Transport to Ukraine", href: "/en/destinations/freight-transport-ukraine" },
    ],

    membershipsTitle: "Memberships & Standards",
    memberships: [
      {
        label: "GDP",
        text: "Good Distribution Practice",
        href: "https://www.dekra-certification.de/en/certification-according-to-good-distribution-practice-gdp/",
        icon: "shield",
      },
      {
        label: "FIATA",
        text: "International Federation of Freight Forwarders Associations",
        href: "https://fiata.org/",
        icon: "globe",
      },
    ],

    copyright:
      "© GLOBALSPED International Spedition GmbH. All rights reserved",
  },

} satisfies typeof de;

