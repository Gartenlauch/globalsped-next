export const de = {
  header: {
    logoLabel: "GLOBALSPED",
    nav: [
      { label: "Start", href: "/{locale}" },
      { label: "Leistungen", href: "/{locale}#leistungen" },
      { label: "Destinationen", href: "/{locale}#destinationen" },
      { label: "Zollabwicklung", href: "/{locale}#zollabwicklung" },
      { label: "Über uns", href: "/{locale}#ueber-uns" },
      { label: "Jobs", href: "/{locale}#jobs" },
      { label: "Kontakt", href: "/{locale}#kontakt" },
    ],
    cta: {
      label: "Anfrage",
      href: "/de/transport-anfrage",
    },
    menuOpenLabel: "Menü öffnen",
    menuCloseLabel: "Menü schließen",
  },
  hero: {
    badge: "Globalsped International Logistics Solutions",

    headline: {
      line1: "Internationale Transporte",
      highlight: "für anspruchsvolle Märkte",
      line2: "in Zentralasien & Kaukasus",
    },

    subline:
      "GLOBALSPED organisiert seit über 30 Jahren FTL-, LTL-, Thermo- und Projekttransporte inklusive Zollabwicklung – spezialisiert auf komplexe Routen zwischen Europa, Zentralasien, Kaukasus und dem Mittleren Osten.",

    ctaPrimary: {
      label: "Transport anfragen",
      href: "/de/transport-anfrage",
    },

    ctaSecondary: {
      label: "Destinationen ansehen",
      href: "/de/destinationen",
    },

    destinationsLabel: "Destinationen",

    destinations: [
      "Kasachstan",
      "Usbekistan",
      "Kirgisistan",
      "Turkmenistan",
      "Tadschikistan",
      "Aserbaidschan",
      "Georgien",
      "Armenien",
      "Mongolei",
      "Irak",
      "Ukraine"
    ],

    routeCard: {
      kicker: "Premium Route Network",
      title: "Europa → Zentralasien",
      text: "Direkte Transportlösungen für komplexe Märkte mit persönlicher Betreuung, Zollkompetenz und klarer Kommunikation.",

      routes: [
        "Deutschland → Kasachstan",
        "Österreich → Georgien",
        "Europa → Aserbaidschan",
        "DACH → Usbekistan",
      ],

      highlights: [
        {
          icon: "truck",
          label: "FTL/LTL",
        },
        {
          icon: "shield",
          label: "Zoll",
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
        label: "Jahre Erfahrung",
        text: "Spezialisierte Transportabwicklung zwischen Europa, Zentralasien und Kaukasus.",
      },
      {
        icon: "truck",
        value: "FTL/LTL",
        label: "Flexible Ladungen",
        text: "Teil- und Komplettladungen für Industrie, Handel und Projektlogistik.",
      },
      {
        icon: "customs",
        value: "Zoll",
        label: "Komplette Abwicklung",
        text: "Dokumente, Kommunikation und Zollprozesse aus einer Hand.",
      },
    ],
  },
  destinations: {
    badge: "Destinationen",
    title: "Transporte nach Zentralasien,",
    highlight: "Kaukasus und Mittleren Osten",
    intro:
      "Globalsped organisiert internationale Transporte von Europa in anspruchsvolle Zielmärkte. Wir verbinden Erfahrung, zuverlässige Partnernetzwerke und professionelle Zollabwicklung für FTL, LTL, Thermotransporte und Projekttransporte.",

    regions: [
      {
        title: "Zentralasien",
        slug: "zentralasien",
        subtitle:
          "Spezialisierte Transporte nach Kasachstan, Usbekistan, Kirgisistan, Turkmenistan, Tadschikistan und in weitere Märkte Zentralasiens.",
        image: "/images/destinations/zentralasien.jpg",
        countries: [
          { name: "Kasachstan", slug: "kasachstan", cities: ["Astana", "Almaty", "Atyrau"] },
          { name: "Usbekistan", slug: "usbekistan", cities: ["Taschkent", "Samarkand", "Navoi"] },
          { name: "Kirgisistan", slug: "kirgisistan", cities: ["Bischkek", "Osch"] },
          { name: "Turkmenistan", slug: "turkmenistan", cities: ["Aschgabat", "Mary"] },
          { name: "Tadschikistan", slug: "tadschikistan", cities: ["Duschanbe", "Chudschand"] },
          { name: "Mongolei", slug: "mongolei", cities: ["Ulaanbaatar"] },
        ],
      },
      {
        title: "Kaukasus",
        slug: "kaukasus",
        subtitle:
          "Zuverlässige Logistiklösungen für Transporte nach Aserbaidschan, Georgien und Armenien – inklusive Zoll- und Transitunterstützung.",
        image: "/images/destinations/kaukasus.jpg",
        countries: [
          { name: "Aserbaidschan", slug: "aserbaidschan", cities: ["Baku", "Ganja", "Sumqayit"] },
          { name: "Georgien", slug: "georgien", cities: ["Tiflis", "Batumi", "Kutaissi"] },
          { name: "Armenien", slug: "armenien", cities: ["Jerewan", "Gyumri"] },
        ],
      },
      {
        title: "Mittlerer Osten",
        slug: "mittlerer-osten",
        subtitle:
          "Transportlösungen für Export, Import und Transit in anspruchsvolle Märkte des Mittleren Ostens.",
        image: "/images/destinations/mittlerer-osten.jpg",
        countries: [
          { name: "Irak", slug: "irak", cities: ["Bagdad", "Erbil"] },
          { name: "Türkei", slug: "tuerkei", cities: ["Istanbul", "Ankara"] },
          { name: "Ukraine", slug: "ukraine", cities: ["Kiew", "Lwiw", "Odessa"] },
        ],
      },
    ],

    countryGridTitle: "Ausgewählte Zielländer",
    countryGridIntro: "Unsere wichtigsten Zielmärkte für internationale Transporte, FTL, LTL, Thermotransporte, Projektlogistik und Zollabwicklung.",

    cta: {
      label: "Transport anfragen",
      href: "/de/transport-anfrage"
  },
  countryPages: [
    {
      slug: "transport-usbekistan",
      country: "Usbekistan",
      region: "Zentralasien",
      heroImage: "/images/country-hero/usbekistan.jpg",
      title: "Transport von Europa nach",
      highlight: "Usbekistan",
      intro:
        "Globalsped organisiert zuverlässige Transporte von ganz Europa nach Usbekistan – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte.",
      seoText:
        "Wir unterstützen Unternehmen bei internationalen Transporten von Europa nach Usbekistan, insbesondere nach Taschkent, Samarkand, Kokand und Navoi. Unsere Leistungen umfassen Transportplanung, Routenkoordination, Zollabwicklung, Export- und Importprozesse sowie persönliche Betreuung für anspruchsvolle Lieferketten.",
      services: [
        "FTL Komplettladungen nach Usbekistan",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],
      cities: ["Taschkent", "Samarkand", "Kokand", "Navoi"],
      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte nach",
        citiesTitle: "Wichtige Zielorte",
        faqTitlePrefix: "Häufige Fragen zu Transporten nach",
        faqTitle: "Häufige Fragen zu Transporten nach {country}",
      },
      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Südroute",
              description:
                "LTL (Stückgutverkehr, Sammelgutladungen) und FTL (Komplettladungen) im Regelfall über Österreich, Ungarn, Rumänien, Bulgarien, Türkei, Georgien, Aserbaidschan, Fähre über das Kaspische Meer, Kasachstan bis nach Usbekistan.",
            },
            {
              title: "Nordroute",
              description:
                "FTL (Komplettladungen) über Polen, Belarus, Russland, Kasachstan bis nach Usbekistan.",
            },
          ],
        },

        runtime: {
          label: "Laufzeit",
          value: "ca. 14–16 Tage",
        },

        customsOffice: {
          label: "Ausgangszollamt",
          offices: [
            {
              route: "Südroute",
              office: "BG001015 Kapitan Andreevo",
            },
            {
              route: "Nordroute",
              office: "PL301040 Koroszczyn",
            },
          ],
        },

        documents: {
          label: "Unterlagen",
          documents: [
            "Zolldokument",
            "Ausfuhrbegleitdokument",
            "EX-A",
            "EX-C",
            "T1",
          ],
          note:
            "Sprechen Sie uns an – gerne sind wir Ihnen bei der Erstellung der notwendigen Unterlagen behilflich.",
        },

        requiredInformation: {
          label: "Benötigte Informationen",
          intro:
            "Für eine reibungslose Transportabwicklung werden folgende Informationen benötigt:",
          items: [
            "Vollständige Empfängeradresse",
            "Kontaktperson des Empfängers",
            "Telefonnummer, Faxnummer oder E-Mail-Adresse des Empfängers",
          ],
        },
      },
      faq: [
        {
          question: "Bietet Globalsped Transporte nach Usbekistan an?",
          answer:
            "Ja. Globalsped organisiert regelmäßige Transporte nach Usbekistan, unter anderem nach Taschkent, Samarkand, Kokand und Navoi.",
        },
        {
          question: "Welche Transportarten sind nach Usbekistan möglich?",
          answer:
            "Möglich sind unter anderem FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte.",
        },
        {
          question: "Unterstützt Globalsped bei der Zollabwicklung?",
          answer:
            "Ja. Globalsped unterstützt bei Export, Import, Transit und den notwendigen Transportdokumenten.",
        },
      ],
      ctaLabel: "Transport nach Usbekistan anfragen",
    },
    {
      slug: "transport-kasachstan",
      country: "Kasachstan",
      region: "Zentralasien",
      heroImage: "/images/country-hero/kasachstan.jpg",
      title: "Transport nach",
      highlight: "Kasachstan",
      intro:
        "Globalsped organisiert zuverlässige Transporte von ganz Europa nach Kasachstan – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte.",
      seoText:
        "Wir unterstützen Unternehmen bei internationalen Transporten von Europa nach Kasachstan, insbesondere nach Astana, Almaty, Atyrau und weiteren Wirtschaftszentren. Unsere Leistungen umfassen Transportplanung, Routenkoordination, Zollabwicklung, Export- und Importprozesse sowie persönliche Betreuung für anspruchsvolle Lieferketten nach Zentralasien.",
      services: [
        "FTL Komplettladungen nach Kasachstan",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],
      cities: ["Astana", "Almaty", "Atyrau", "Aktau"],
      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte nach",
        citiesTitle: "Wichtige Zielorte",
        faqTitle: "Häufige Fragen zu Transporten nach {country}",
      },
      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Südroute",
              description:
                "LTL (Stückgutverkehr, Sammelgutladungen) und FTL (Komplettladungen) im Regelfall über Österreich, Ungarn, Rumänien, Bulgarien, Türkei, Georgien, Aserbaidschan, Fähre über das Kaspische Meer bis nach Kasachstan.",
            },
            {
              title: "Nordroute",
              description:
                "FTL (Komplettladungen) im Regelfall über Polen, Belarus, Russland bis nach Kasachstan.",
            },
          ],
        },
        runtime: {
          label: "Laufzeit",
          value: "Südroute ca. 31–39 Tage, Nordroute ca. 10–16 Tage",
        },
        customsOffice: {
          label: "Ausgangszollamt",
          offices: [
            {
              route: "Südroute",
              office: "BG001015 Kapitan Andreevo",
            },
            {
              route: "Nordroute",
              office: "PL301040 Koroszczyn",
            },
          ],
        },
        documents: {
          label: "Unterlagen",
          documents: [
            "Zolldokument",
            "Ausfuhrbegleitdokument",
            "EX-A",
            "EX-C",
            "T1",
          ],
          note:
            "Sprechen Sie uns an – gerne sind wir Ihnen bei der Erstellung der notwendigen Unterlagen behilflich.",
        },
        requiredInformation: {
          label: "Benötigte Informationen",
          intro:
            "Für eine reibungslose Transportabwicklung werden folgende Informationen benötigt:",
          items: [
            "Vollständige Empfängeradresse",
            "Kontaktperson des Empfängers",
            "Telefonnummer, Faxnummer oder E-Mail-Adresse des Empfängers",
          ],
        },
      },

      faq: [
        {
          question: "Bietet Globalsped Transporte nach Kasachstan an?",
          answer: "Ja. Globalsped organisiert regelmäßige Transporte nach Kasachstan, unter anderem nach Astana, Almaty, Atyrau und Aktau.",
        },
        {
          question: "Welche Transportarten sind nach Kasachstan möglich?",
          answer: "Möglich sind unter anderem FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte.",
        },
        {
          question: "Wie lange dauert ein Transport nach Kasachstan?",
          answer: "Je nach Route und Zielort beträgt die Laufzeit über die Südroute ca. 31–39 Tage und über die Nordroute ca. 10–16 Tage.",
        },
        {
          question: "Unterstützt Globalsped bei der Zollabwicklung für Kasachstan?",
          answer: "Ja. Globalsped unterstützt bei Export, Import, Transit und den notwendigen Transportdokumenten.",
        },
      ],
      ctaLabel: "Transport nach Kasachstan anfragen",
    },
    {
      slug: "transport-kirgisistan",
      country: "Kirgisistan",
      region: "Zentralasien",
      heroImage: "/images/country-hero/kirgisistan.jpg",
      title: "Transport nach",
      highlight: "Kirgisistan",
      intro:
        "Globalsped organisiert zuverlässige Transporte nach Kirgisistan – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte für anspruchsvolle Lieferketten nach Zentralasien.",
      seoText:
        "Wir unterstützen Unternehmen bei internationalen Transporten von Europa nach Kirgisistan, insbesondere nach Bischkek, Osch und weiteren wirtschaftlich relevanten Regionen. Unsere Leistungen umfassen Transportplanung, Routenkoordination, Zollabwicklung, Export- und Importprozesse sowie individuelle Betreuung für Transporte in anspruchsvolle Märkte Zentralasiens.",
      services: [
        "FTL Komplettladungen nach Kirgisistan",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],
      cities: ["Bischkek", "Osch", "Dschalalabat"],
      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte nach",
        citiesTitle: "Wichtige Zielorte",
        faqTitle: "Häufige Fragen zu Transporten nach {country}",
      },
      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Südroute",
              description:
                "LTL (Stückgutverkehr, Sammelgutladungen) und FTL (Komplettladungen) im Regelfall über Österreich, Ungarn, Rumänien, Bulgarien, Türkei, Georgien, Aserbaidschan, Fähre über das Kaspische Meer, Kasachstan bis nach Kirgisistan.",
            },
            {
              title: "Nordroute",
              description:
                "FTL (Komplettladungen) über Polen, Belarus, Russland, Kasachstan bis nach Kirgisistan.",
            },
          ],
        },
        runtime: {
          label: "Laufzeit",
          value: "ca. 18–25 Tage (abhängig von Route und Zielort)",
        },
        customsOffice: {
          label: "Ausgangszollamt",
          offices: [
            {
              route: "Südroute",
              office: "BG001015 Kapitan Andreevo",
            },
            {
              route: "Nordroute",
              office: "PL301040 Koroszczyn",
            },
          ],
        },
        documents: {
          label: "Unterlagen",
          documents: [
            "Zolldokument",
            "Ausfuhrbegleitdokument",
            "EX-A",
            "EX-C",
            "T1",
          ],
          note:
            "Sprechen Sie uns an – gerne unterstützen wir Sie bei der Erstellung der erforderlichen Transport- und Zolldokumente.",
        },
        requiredInformation: {
          label: "Benötigte Informationen",
          intro:
            "Für eine reibungslose Transportabwicklung werden folgende Informationen benötigt:",
          items: [
            "Vollständige Empfängeradresse",
            "Kontaktperson des Empfängers",
            "Telefonnummer, Faxnummer oder E-Mail-Adresse des Empfängers",
          ],
        },
      },
      faq: [
        {
          question: "Wie lange dauert ein Transport nach Kirgisistan?",
          answer: "Die Laufzeit für Transporte nach Kirgisistan beträgt in der Regel zwischen 18 und 25 Tagen, abhängig von Route, Transportart (FTL oder LTL) und Zielort.",
        },
        {
          question: "Welche Routen werden für Transporte nach Kirgisistan genutzt?",
          answer: "Transporte erfolgen in der Regel über die Südroute (Türkei, Georgien, Aserbaidschan, Kaspisches Meer, Kasachstan) oder die Nordroute (Polen, Belarus, Russland, Kasachstan).",
        },
        {
          question: "Welche Transportarten sind nach Kirgisistan möglich?",
          answer: "Möglich sind FTL Komplettladungen, LTL Teilladungen, Sammelguttransporte, Thermotransporte sowie Projekt- und Sondertransporte.",
        },
        {
          question: "Welche Dokumente werden für den Transport nach Kirgisistan benötigt?",
          answer: "Typischerweise werden Zolldokumente wie Ausfuhrbegleitdokumente (EX-A, EX-C) sowie Transitdokumente (T1) benötigt. Globalsped unterstützt bei der vollständigen Abwicklung.",
        },
        {
          question: "Bietet Globalsped Unterstützung bei der Zollabwicklung?",
          answer: "Ja. Globalsped unterstützt bei Export, Import, Transit und allen notwendigen Dokumenten für einen reibungslosen Transport nach Kirgisistan.",
        },
      ],
      ctaLabel: "Transport nach Kirgisistan anfragen",
    },
    {
      slug: "transport-turkmenistan",
      country: "Turkmenistan",
      region: "Zentralasien",
      heroImage: "/images/country-hero/turkmenistan.jpg",

      title: "Transport nach",
      highlight: "Turkmenistan",

      intro: "Globalsped organisiert zuverlässige Transporte nach Turkmenistan – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte für anspruchsvolle Lieferketten nach Zentralasien.",

      seoText: "Wir unterstützen Unternehmen bei internationalen Transporten von Europa nach Turkmenistan, insbesondere nach Aschgabat, Türkmenbaşy und in weitere wirtschaftlich relevante Regionen. Unsere Leistungen umfassen Transportplanung, Routenkoordination, Zollabwicklung, Export- und Importprozesse sowie individuelle Betreuung für komplexe Transporte in anspruchsvolle Märkte Zentralasiens.",

      services: [
        "FTL Komplettladungen nach Turkmenistan",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],

      cities: ["Aschgabat", "Türkmenbaşy", "Mary"],

      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte nach",
        citiesTitle: "Wichtige Zielorte",
        faqTitle: "Häufige Fragen zu Transporten nach {country}",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Südroute",
              description:
                "LTL (Stückgutverkehr, Sammelgutladungen) und FTL (Komplettladungen) im Regelfall über Österreich, Ungarn, Rumänien, Bulgarien, Türkei, Georgien, Aserbaidschan, Fähre über das Kaspische Meer bis nach Turkmenistan.",
            },
            {
              title: "Alternative Route",
              description:
                "Je nach Projektanforderung sind individuelle Routenführungen über angrenzende Länder Zentralasiens möglich.",
            },
          ],
        },

        runtime: {
          label: "Laufzeit",
          value: "ca. 20–30 Tage (abhängig von Route und Zollabwicklung)",
        },

        customsOffice: {
          label: "Ausgangszollamt",
          offices: [
            {
              route: "Südroute",
              office: "BG001015 Kapitan Andreevo",
            },
          ],
        },

        documents: {
          label: "Unterlagen",
          documents: [
            "Zolldokument",
            "Ausfuhrbegleitdokument",
            "EX-A",
            "EX-C",
            "T1",
          ],
          note:
            "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
        },

        requiredInformation: {
          label: "Benötigte Informationen",
          intro:
            "Für eine reibungslose Transportabwicklung werden folgende Informationen benötigt:",
          items: [
            "Vollständige Empfängeradresse",
            "Kontaktperson des Empfängers",
            "Telefonnummer oder E-Mail-Adresse des Empfängers",
          ],
        },
      },

      faq: [
        {
          question: "Welche Herausforderungen gibt es beim Transport nach Turkmenistan?",
          answer: "Transporte nach Turkmenistan erfordern Erfahrung in der Zollabwicklung und Routenplanung. Besonders die Abstimmung von Transitdokumenten und Grenzprozessen ist entscheidend für eine reibungslose Lieferung.",
        },
        {
          question: "Ist ein Transport nach Turkmenistan zuverlässig planbar?",
          answer: "Ja, mit der richtigen Vorbereitung und einem erfahrenen Logistikpartner lassen sich Transporte nach Turkmenistan zuverlässig planen und durchführen – auch bei komplexen Anforderungen.",
        },
        {
          question: "Für welche Waren eignet sich ein Transport nach Turkmenistan?",
          answer: "Typischerweise werden Industrieprodukte, Maschinen, Konsumgüter und temperaturempfindliche Waren transportiert. Globalsped bietet hierfür passende Transportlösungen.",
        },
      ],
      ctaLabel: "Transport nach Turkmenistan anfragen",
    },

    {
      slug: "transport-tadschikistan",
      country: "Tadschikistan",
      region: "Zentralasien",
      heroImage: "/images/country-hero/tadschikistan.jpg",

      title: "Transport nach",
      highlight: "Tadschikistan",

      intro:
        "Globalsped organisiert zuverlässige Transporte nach Tadschikistan – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte für anspruchsvolle Lieferketten nach Zentralasien.",

      seoText:
        "Wir unterstützen Unternehmen bei internationalen Transporten von Europa nach Tadschikistan, insbesondere nach Duschanbe, Chudschand und weitere wirtschaftlich relevante Regionen. Unsere Leistungen umfassen Transportplanung, Routenkoordination, Zollabwicklung, Export- und Importprozesse sowie individuelle Betreuung für komplexe Transporte in anspruchsvolle Märkte Zentralasiens.",

      services: [
        "FTL Komplettladungen nach Tadschikistan",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],

      cities: ["Duschanbe", "Chudschand", "Kulob"],

      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte nach",
        citiesTitle: "Wichtige Zielorte",
        faqTitle: "Häufige Fragen zu Transporten nach {country}",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Südroute",
              description:
                "LTL (Stückgutverkehr, Sammelgutladungen) und FTL (Komplettladungen) im Regelfall über Österreich, Ungarn, Rumänien, Bulgarien, Türkei, Georgien, Aserbaidschan, Fähre über das Kaspische Meer, Kasachstan und Usbekistan bis nach Tadschikistan.",
            },
            {
              title: "Nordroute",
              description:
                "FTL (Komplettladungen) im Regelfall über Polen, Belarus, Russland, Kasachstan und Usbekistan bis nach Tadschikistan.",
            },
          ],
        },

        runtime: {
          label: "Laufzeit",
          value: "ca. 20–30 Tage (abhängig von Route, Grenzabwicklung und Zielregion)",
        },

        customsOffice: {
          label: "Ausgangszollamt",
          offices: [
            {
              route: "Südroute",
              office: "BG001015 Kapitan Andreevo",
            },
            {
              route: "Nordroute",
              office: "PL301040 Koroszczyn",
            },
          ],
        },

        documents: {
          label: "Unterlagen",
          documents: [
            "Zolldokument",
            "Ausfuhrbegleitdokument",
            "EX-A",
            "EX-C",
            "T1",
          ],
          note:
            "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
        },

        requiredInformation: {
          label: "Benötigte Informationen",
          intro:
            "Für eine reibungslose Transportabwicklung werden folgende Informationen benötigt:",
          items: [
            "Vollständige Empfängeradresse",
            "Kontaktperson des Empfängers",
            "Telefonnummer oder E-Mail-Adresse des Empfängers",
          ],
        },
      },

      faq: [
        {
          question: "Welche Besonderheiten gibt es beim Transport nach Tadschikistan?",
          answer: "Transporte nach Tadschikistan erfordern Erfahrung in der Routenplanung und Grenzabwicklung, da mehrere Transitländer durchquert werden. Eine sorgfältige Vorbereitung der Dokumente ist entscheidend.",
        },
        {
          question: "Ist ein Transport nach Tadschikistan zuverlässig planbar?",
          answer: "Ja, mit einem erfahrenen Logistikpartner lassen sich Transporte nach Tadschikistan zuverlässig planen. Entscheidend sind die richtige Route und eine professionelle Zollabwicklung.",
        },
        {
          question: "Welche Güter werden typischerweise nach Tadschikistan transportiert?",
          answer: "Häufig werden Maschinen, Industrieprodukte, Konsumgüter sowie temperaturempfindliche Waren nach Tadschikistan transportiert.",
        },
      ],

      ctaLabel: "Transport nach Tadschikistan anfragen",
    },
    {
      slug: "transport-mongolei",
      country: "Mongolei",
      region: "Zentralasien",
      heroImage: "/images/country-hero/mongolei.jpg",

      title: "Transport in die",
      highlight: "Mongolei",

      intro:
        "Globalsped organisiert zuverlässige Transporte in die Mongolei – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte für anspruchsvolle Lieferketten nach Zentralasien.",

      seoText:
        "Wir unterstützen Unternehmen bei internationalen Transporten von Europa in die Mongolei, insbesondere nach Ulaanbaatar und weitere wirtschaftlich relevante Regionen. Unsere Leistungen umfassen Transportplanung, Routenkoordination, Zollabwicklung, Export- und Importprozesse sowie individuelle Betreuung für komplexe Transporte in abgelegene und logistisch anspruchsvolle Märkte.",

      services: [
        "FTL Komplettladungen in die Mongolei",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],

      cities: ["Ulaanbaatar", "Darkhan", "Erdenet"],

      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte in die",
        citiesTitle: "Wichtige Zielorte",
        faqTitle: "Häufige Fragen zu Transporten in die {country}",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Nordroute",
              description:
                "FTL (Komplettladungen) im Regelfall über Polen, Belarus, Russland bis in die Mongolei. Diese Route wird häufig für stabile und planbare Transporte genutzt.",
            },
            {
              title: "Alternative Route",
              description:
                "Je nach Projektanforderung sind alternative Routenführungen über Zentralasien und China möglich, insbesondere für komplexe oder zeitkritische Transporte.",
            },
          ],
        },

        runtime: {
          label: "Laufzeit",
          value: "ca. 20–30 Tage (abhängig von Route, Infrastruktur und Zielort)",
        },

        customsOffice: {
          label: "Ausgangszollamt",
          offices: [
            {
              route: "Nordroute",
              office: "PL301040 Koroszczyn",
            },
          ],
        },

        documents: {
          label: "Unterlagen",
          documents: [
            "Zolldokument",
            "Ausfuhrbegleitdokument",
            "EX-A",
            "EX-C",
            "T1",
          ],
          note:
            "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
        },

        requiredInformation: {
          label: "Benötigte Informationen",
          intro:
            "Für eine reibungslose Transportabwicklung werden folgende Informationen benötigt:",
          items: [
            "Vollständige Empfängeradresse",
            "Kontaktperson des Empfängers",
            "Telefonnummer oder E-Mail-Adresse des Empfängers",
          ],
        },
      },

      faq: [
        {
          question: "Wie lange dauert ein Transport in die Mongolei?",
          answer: "Die Laufzeit für Transporte in die Mongolei beträgt in der Regel zwischen 20 und 30 Tagen, abhängig von Route, Infrastruktur und Zielort.",
        },
        {
          question: "Welche besonderen Herausforderungen gibt es bei Transporten in die Mongolei?",
          answer: "Die Mongolei gilt als logistisch anspruchsvoller Markt aufgrund großer Entfernungen, begrenzter Infrastruktur und klimatischer Bedingungen. Eine sorgfältige Planung und erfahrene Partner sind entscheidend.",
        },
        {
          question: "Welche Transportarten sind in die Mongolei möglich?",
          answer: "Möglich sind FTL Komplettladungen, LTL Teilladungen, Sammelguttransporte sowie Projekt- und Sondertransporte – abgestimmt auf die Anforderungen des Zielmarktes.",
        },
      ],
      ctaLabel: "Transport in die Mongolei anfragen",
    },
    {
      slug: "transport-aserbaidschan",
      country: "Aserbaidschan",
      region: "Kaukasus",
      heroImage: "/images/country-hero/aserbaidschan.jpg",

      title: "Transport nach",
      highlight: "Aserbaidschan",

      intro:
        "Globalsped organisiert zuverlässige Transporte nach Aserbaidschan – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte für anspruchsvolle Lieferketten im Kaukasus.",

      seoText:
        "Wir unterstützen Unternehmen bei internationalen Transporten von Europa nach Aserbaidschan, insbesondere nach Baku, Sumqayit und Ganja. Als wichtiges Transitland zwischen Europa und Zentralasien spielt Aserbaidschan eine zentrale Rolle im internationalen Warenverkehr. Unsere Leistungen umfassen Transportplanung, Routenkoordination, Zollabwicklung sowie Export- und Importprozesse für effiziente und sichere Transporte in den Kaukasus.",

      services: [
        "FTL Komplettladungen nach Aserbaidschan",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],

      cities: ["Baku", "Sumqayit", "Ganja"],

      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte nach",
        citiesTitle: "Wichtige Zielorte",
        faqTitle: "Häufige Fragen zu Transporten nach {country}",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Südosteuropa / Türkei Route",
              description:
                "FTL und LTL Transporte im Regelfall über Österreich, Ungarn, Rumänien, Bulgarien und die Türkei direkt nach Georgien und weiter nach Aserbaidschan.",
            },
            {
              title: "Kaspische Verbindung",
              description:
                "Aserbaidschan dient als wichtiger Transitknotenpunkt für Transporte über das Kaspische Meer in Richtung Zentralasien (z. B. Kasachstan, Turkmenistan).",
            },
          ],
        },

        runtime: {
          label: "Laufzeit",
          value: "ca. 7–14 Tage (abhängig von Route und Grenzabwicklung)",
        },

        customsOffice: {
          label: "Ausgangszollamt",
          offices: [
            {
              route: "Südroute",
              office: "BG001015 Kapitan Andreevo",
            },
          ],
        },

        documents: {
          label: "Unterlagen",
          documents: [
            "Zolldokument",
            "Ausfuhrbegleitdokument",
            "EX-A",
            "EX-C",
            "T1",
          ],
          note:
            "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
        },

        requiredInformation: {
          label: "Benötigte Informationen",
          intro:
            "Für eine reibungslose Transportabwicklung werden folgende Informationen benötigt:",
          items: [
            "Vollständige Empfängeradresse",
            "Kontaktperson des Empfängers",
            "Telefonnummer oder E-Mail-Adresse des Empfängers",
          ],
        },
      },

      faq: [
        {
          question: "Wie lange dauert ein Transport nach Aserbaidschan?",
          answer: "Die Laufzeit für Transporte nach Aserbaidschan beträgt in der Regel zwischen 7 und 14 Tagen, abhängig von Route, Grenzabwicklung und Zielort.",
        },
        {
          question: "Warum ist Aserbaidschan ein wichtiger Logistikstandort?",
          answer: "Aserbaidschan ist ein zentraler Transitknoten zwischen Europa und Zentralasien. Insbesondere die Verbindung über das Kaspische Meer spielt eine wichtige Rolle im internationalen Warenverkehr.",
        },
        {
          question: "Welche Waren werden typischerweise nach Aserbaidschan transportiert?",
          answer: "Häufig werden Industrieprodukte, Maschinen, Konsumgüter sowie Projektladungen transportiert. Auch temperaturgeführte Transporte sind möglich.",
        },
      ],

      ctaLabel: "Transport nach Aserbaidschan anfragen",
    },
    {
      slug: "transport-georgien",
      country: "Georgien",
      region: "Kaukasus",
      heroImage: "/images/country-hero/georgien.jpg",

      title: "Transport nach",
      highlight: "Georgien",

      intro:
        "Globalsped organisiert zuverlässige Transporte nach Georgien – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte für anspruchsvolle Lieferketten im Kaukasus.",

      seoText:
        "Wir unterstützen Unternehmen bei internationalen Transporten von Europa nach Georgien, insbesondere nach Tiflis, Batumi und Kutaissi. Georgien ist ein zentraler Logistikstandort zwischen Europa und Asien und spielt eine wichtige Rolle als Transitland für Transporte in den Kaukasus und nach Zentralasien. Unsere Leistungen umfassen Transportplanung, Routenkoordination, Zollabwicklung sowie Export- und Importprozesse für sichere und effiziente Transporte.",

      services: [
        "FTL Komplettladungen nach Georgien",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],

      cities: ["Tiflis", "Batumi", "Kutaissi"],

      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte nach",
        citiesTitle: "Wichtige Zielorte",
        faqTitle: "Häufige Fragen zu Transporten nach {country}",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Südosteuropa / Türkei Route",
              description:
                "FTL und LTL Transporte im Regelfall über Österreich, Ungarn, Rumänien, Bulgarien und die Türkei direkt nach Georgien.",
            },
            {
              title: "Transitroute Richtung Zentralasien",
              description:
                "Georgien dient als wichtiger Transitkorridor für Transporte nach Aserbaidschan und weiter über das Kaspische Meer nach Zentralasien.",
            },
          ],
        },

        runtime: {
          label: "Laufzeit",
          value: "ca. 7–12 Tage (abhängig von Route und Grenzabwicklung)",
        },

        customsOffice: {
          label: "Ausgangszollamt",
          offices: [
            {
              route: "Südroute",
              office: "BG001015 Kapitan Andreevo",
            },
          ],
        },

        documents: {
          label: "Unterlagen",
          documents: [
            "Zolldokument",
            "Ausfuhrbegleitdokument",
            "EX-A",
            "EX-C",
            "T1",
          ],
          note:
            "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
        },

        requiredInformation: {
          label: "Benötigte Informationen",
          intro:
            "Für eine reibungslose Transportabwicklung werden folgende Informationen benötigt:",
          items: [
            "Vollständige Empfängeradresse",
            "Kontaktperson des Empfängers",
            "Telefonnummer oder E-Mail-Adresse des Empfängers",
          ],
        },
      },

      faq: [
        {
          question: "Wie lange dauert ein Transport nach Georgien?",
          answer: "Die Laufzeit für Transporte nach Georgien beträgt in der Regel zwischen 7 und 12 Tagen, abhängig von Route, Grenzabwicklung und Zielort.",
        },
        {
          question: "Warum ist Georgien ein wichtiger Logistikstandort?",
          answer: "Georgien ist ein strategisches Bindeglied zwischen Europa und Asien und dient als wichtiger Transitkorridor für Transporte in den Kaukasus und nach Zentralasien.",
        },
        {
          question: "Welche Transportarten sind nach Georgien möglich?",
          answer: "Möglich sind FTL Komplettladungen, LTL Teilladungen, Sammelguttransporte, Thermotransporte sowie Projekt- und Sondertransporte.",
        },
      ],

      ctaLabel: "Transport nach Georgien anfragen",
    },
    {
      slug: "transport-armenien",
      country: "Armenien",
      region: "Kaukasus",
      heroImage: "/images/country-hero/armenien.jpg",

      title: "Transport nach",
      highlight: "Armenien",

      intro:
        "Globalsped organisiert zuverlässige Transporte nach Armenien – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte für anspruchsvolle Lieferketten im Kaukasus.",

      seoText:
        "Wir unterstützen Unternehmen bei internationalen Transporten von Europa nach Armenien, insbesondere nach Jerewan und weitere wirtschaftlich relevante Regionen. Armenien stellt aufgrund seiner geografischen Lage besondere Anforderungen an Transportplanung und Routenführung. Unsere Leistungen umfassen Transportkoordination, Zollabwicklung sowie Export- und Importprozesse für sichere und effiziente Transporte in den Kaukasus.",

      services: [
        "FTL Komplettladungen nach Armenien",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],

      cities: ["Jerewan", "Gjumri", "Vanadsor"],

      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte nach",
        citiesTitle: "Wichtige Zielorte",
        faqTitle: "Häufige Fragen zu Transporten nach {country}",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Südosteuropa / Türkei Route",
              description:
                "FTL und LTL Transporte im Regelfall über Österreich, Ungarn, Rumänien, Bulgarien und die Türkei bis nach Georgien und weiter nach Armenien.",
            },
            {
              title: "Individuelle Routenführung",
              description:
                "Aufgrund der geopolitischen Lage erfolgt die Routenplanung individuell je nach Projektanforderung und aktueller Situation in der Region.",
            },
          ],
        },

        runtime: {
          label: "Laufzeit",
          value: "ca. 10–18 Tage (abhängig von Route und Grenzabwicklung)",
        },

        customsOffice: {
          label: "Ausgangszollamt",
          offices: [
            {
              route: "Südroute",
              office: "BG001015 Kapitan Andreevo",
            },
          ],
        },

        documents: {
          label: "Unterlagen",
          documents: [
            "Zolldokument",
            "Ausfuhrbegleitdokument",
            "EX-A",
            "EX-C",
            "T1",
          ],
          note:
            "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
        },

        requiredInformation: {
          label: "Benötigte Informationen",
          intro:
            "Für eine reibungslose Transportabwicklung werden folgende Informationen benötigt:",
          items: [
            "Vollständige Empfängeradresse",
            "Kontaktperson des Empfängers",
            "Telefonnummer oder E-Mail-Adresse des Empfängers",
          ],
        },
      },

      faq: [
        {
          question: "Welche Besonderheiten gibt es beim Transport nach Armenien?",
          answer: "Transporte nach Armenien erfordern aufgrund der geografischen und politischen Rahmenbedingungen eine sorgfältige Routenplanung. Erfahrung in der Region ist entscheidend für eine sichere und zuverlässige Abwicklung.",
        },
        {
          question: "Wie lange dauert ein Transport nach Armenien?",
          answer: "Die Laufzeit für Transporte nach Armenien beträgt in der Regel zwischen 10 und 18 Tagen, abhängig von Route, Grenzabwicklung und Zielort.",
        },
        {
          question: "Ist ein Transport nach Armenien zuverlässig planbar?",
          answer: "Ja, mit einem erfahrenen Logistikpartner lassen sich Transporte nach Armenien zuverlässig planen. Entscheidend sind eine flexible Routenstrategie und professionelle Zollabwicklung.",
        },
      ],

      ctaLabel: "Transport nach Armenien anfragen",
    },
    {
      slug: "transport-irak",
      country: "Irak",
      region: "Naher Osten",
      heroImage: "/images/country-hero/irak.jpg",

      title: "Transport in den",
      highlight: "Irak",

      intro:
        "Globalsped organisiert zuverlässige Transporte in den Irak – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte für anspruchsvolle Lieferketten im Nahen Osten.",

      seoText:
        "Wir unterstützen Unternehmen bei internationalen Transporten von Europa in den Irak, insbesondere nach Bagdad, Erbil und Basra. Transporte in den Irak erfordern besondere Erfahrung in Planung, Sicherheit und Zollabwicklung. Unsere Leistungen umfassen individuelle Routenplanung, Export- und Importabwicklung sowie professionelle Betreuung für komplexe und sicherheitsrelevante Transporte.",

      services: [
        "FTL Komplettladungen in den Irak",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],

      cities: ["Bagdad", "Erbil", "Basra"],

      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte in den",
        citiesTitle: "Wichtige Zielorte",
        faqTitle: "Häufige Fragen zu Transporten in den {country}",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Türkei Route",
              description:
                "FTL und LTL Transporte erfolgen im Regelfall über Österreich, Ungarn, Bulgarien und die Türkei bis in den Irak. Diese Route ist die am häufigsten genutzte Verbindung für stabile Transporte.",
            },
            {
              title: "Individuelle Projektlösungen",
              description:
                "Je nach Anforderung werden individuelle Routen für Projekttransporte und sensible Güter geplant, abgestimmt auf Sicherheits- und Infrastrukturbedingungen.",
            },
          ],
        },

        runtime: {
          label: "Laufzeit",
          value: "ca. 8–18 Tage (abhängig von Route, Sicherheitslage und Zielregion)",
        },

        customsOffice: {
          label: "Ausgangszollamt",
          offices: [
            {
              route: "Türkei Route",
              office: "BG001015 Kapitan Andreevo",
            },
          ],
        },

        documents: {
          label: "Unterlagen",
          documents: [
            "Zolldokument",
            "Ausfuhrbegleitdokument",
            "EX-A",
            "EX-C",
            "T1",
          ],
          note:
            "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente für den Irak.",
        },

        requiredInformation: {
          label: "Benötigte Informationen",
          intro:
            "Für eine reibungslose Transportabwicklung werden folgende Informationen benötigt:",
          items: [
            "Vollständige Empfängeradresse",
            "Kontaktperson des Empfängers",
            "Telefonnummer oder E-Mail-Adresse des Empfängers",
          ],
        },
      },

      faq: [
        {
          question: "Welche Besonderheiten gibt es beim Transport in den Irak?",
          answer: "Transporte in den Irak erfordern Erfahrung in Sicherheitsplanung, Zollabwicklung und Routenführung. Eine sorgfältige Vorbereitung ist entscheidend für eine erfolgreiche Durchführung.",
        },
        {
          question: "Wie lange dauert ein Transport in den Irak?",
          answer: "Die Laufzeit beträgt in der Regel zwischen 8 und 18 Tagen, abhängig von Route, Zielregion und aktuellen Rahmenbedingungen.",
        },
        {
          question: "Welche Güter werden typischerweise in den Irak transportiert?",
          answer: "Häufig werden Maschinen, Industrieanlagen, Ersatzteile, Konsumgüter sowie Projektladungen transportiert. Globalsped bietet hierfür passende Transportlösungen.",
        },
      ],
      ctaLabel: "Transport in den Irak anfragen",
    },
    {
      slug: "transport-ukraine",
      country: "Ukraine",
      region: "Osteuropa",
      heroImage: "/images/country-hero/ukraine.jpg",

      title: "Transport in die",
      highlight: "Ukraine",

      intro:
        "Globalsped organisiert zuverlässige Transporte in die Ukraine – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte für anspruchsvolle Lieferketten nach Osteuropa.",

      seoText:
        "Wir unterstützen Unternehmen bei internationalen Transporten von Europa in die Ukraine, insbesondere nach Kiew, Lwiw, Odessa und weitere wirtschaftlich relevante Regionen. Transporte in die Ukraine erfordern eine sorgfältige Routenplanung, aktuelle Kenntnis der Grenz- und Zollprozesse sowie flexible Abstimmung mit Versendern und Empfängern. Unsere Leistungen umfassen Transportkoordination, Export- und Importabwicklung, Zollunterstützung sowie persönliche Betreuung für sichere und planbare Lieferketten.",

      services: [
        "FTL Komplettladungen in die Ukraine",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],

      cities: ["Kiew", "Lwiw", "Odessa", "Dnipro"],

      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte in die",
        citiesTitle: "Wichtige Zielorte",
        faqTitle: "Häufige Fragen zu Transporten in die {country}",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Osteuropa Route",
              description:
                "FTL und LTL Transporte erfolgen im Regelfall über Österreich, Ungarn, die Slowakei oder Polen in Richtung Ukraine. Die genaue Routenführung wird abhängig von Abholort, Zielregion und aktueller Grenzsituation geplant.",
            },
            {
              title: "Individuelle Routenplanung",
              description:
                "Für Projekttransporte, zeitkritische Sendungen oder sensible Waren wird die Route individuell abgestimmt, inklusive Grenzabwicklung und Dokumentenprüfung.",
            },
          ],
        },

        runtime: {
          label: "Laufzeit",
          value: "ca. 3–8 Tage (abhängig von Route, Zielregion und Grenzabwicklung)",
        },

        customsOffice: {
          label: "Ausgangszollamt",
          offices: [
            {
              route: "Polen Route",
              office: "abhängig vom Abgangsort und Grenzübergang",
            },
            {
              route: "Slowakei / Ungarn Route",
              office: "abhängig vom Abgangsort und Grenzübergang",
            },
          ],
        },

        documents: {
          label: "Unterlagen",
          documents: [
            "Zolldokument",
            "Ausfuhrbegleitdokument",
            "EX-A",
            "EX-C",
            "T1",
            "Handelsrechnung",
            "Packliste",
          ],
          note:
            "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung und Prüfung aller notwendigen Transport- und Zolldokumente für die Ukraine.",
        },

        requiredInformation: {
          label: "Benötigte Informationen",
          intro:
            "Für eine reibungslose Transportabwicklung werden folgende Informationen benötigt:",
          items: [
            "Vollständige Empfängeradresse",
            "Kontaktperson des Empfängers",
            "Telefonnummer oder E-Mail-Adresse des Empfängers",
            "Warenbeschreibung, Gewicht, Maße und Packstücke",
          ],
        },
      },

      faq: [
        {
          question: "Welche Besonderheiten gibt es beim Transport in die Ukraine?",
          answer:
            "Transporte in die Ukraine erfordern eine aktuelle Routenprüfung, sorgfältige Dokumentenabstimmung und flexible Planung der Grenzabwicklung. Ein erfahrener Logistikpartner hilft, Verzögerungen zu vermeiden.",
        },
        {
          question: "Wie lange dauert ein Transport in die Ukraine?",
          answer:
            "Die Laufzeit beträgt in der Regel zwischen 3 und 8 Tagen, abhängig von Abholort, Zielregion, Transportart und Grenzabwicklung.",
        },
        {
          question: "Welche Transportarten sind in die Ukraine möglich?",
          answer:
            "Möglich sind FTL Komplettladungen, LTL Teilladungen, Sammelguttransporte, Thermotransporte sowie Projekt- und Sondertransporte.",
        },
      ],

      ctaLabel: "Transport in die Ukraine anfragen",
    },
  ],
  customs: {
    badge: "Zollabwicklung",
    title: "Zollabwicklung für Transporte in Drittstaaten",
    highlight: "nach Zentralasien, Kaukasus, Osteuropa und in den Mittleren Osten",
    intro: "GLOBALSPED unterstützt Unternehmen bei der professionellen Zollabwicklung für internationale Transporte in Drittstaaten. Wir begleiten Export-, Import- und Transitprozesse für Transporte nach Zentralasien, in den Kaukasus, nach Osteuropa und in den Mittleren Osten. Dazu gehören die Vorbereitung wichtiger Transport- und Zolldokumente, die Abstimmung mit Versendern, Empfängern, Fahrern und Zollpartnern sowie die Koordination entlang komplexer internationaler Routen.",
    cta: {
      href: "/de/transport-anfrage",
      label: "Zollabwicklung anfragen",
    },
    processTitle: "Unsere Unterstützung bei Export, Import und Transit",
    processItems: [
      {
        title: "Export & Ausfuhr",
        text:
          "Unterstützung bei Ausfuhrbegleitdokumenten, Handelsrechnung, Packliste, Warendaten und allen relevanten Informationen für die Ausfuhr in Drittstaaten.",
      },
      {
        title: "Transitverfahren",
        text:
          "Koordination von Transitdokumenten wie T1 sowie Abstimmung mit Zollstellen entlang der Route – insbesondere bei Transporten nach Zentralasien und in den Kaukasus.",
      },
      {
        title: "Import & Zielland",
        text:
          "Vorbereitung der notwendigen Informationen für Empfänger, Zollpartner und Behörden im Zielland, damit die Importabwicklung möglichst reibungslos erfolgen kann.",
      },
      {
        title: "Dokumentenprüfung",
        text:
          "Prüfung wichtiger Angaben wie Warenbeschreibung, Empfängeradresse, Kontaktperson, Packstücke, Gewichte, Maße, Rechnungsdaten und Transportdokumente.",
      },
    ],

    requiredTitle: "Welche Unterlagen werden für die Zollabwicklung benötigt?",
    requiredIntro:
      "Für internationale Transporte in Drittstaaten sind je nach Ware, Route und Zielland unterschiedliche Dokumente erforderlich. Häufig benötigt werden:",

    requiredDocuments: [
      "Handelsrechnung oder Proforma-Rechnung",
      "Packliste mit Packstücken, Gewichten und Maßen",
      "Ausfuhrbegleitdokument / ABD",
      "T1 / Transitdokumente",
      "CMR-Frachtbrief",
      "Ursprungszeugnis oder Präferenznachweis, falls erforderlich",
      "Zertifikate, Genehmigungen oder Lizenzen je nach Ware",
      "Empfängeradresse und Kontaktdaten im Zielland",
    ],

    benefitTitle: "Warum GLOBALSPED für die Zollabwicklung?",
    benefits: [
      "Erfahrung mit Zollprozessen für Transporte nach Zentralasien, Kaukasus, Osteuropa und Mittlerer Osten",
      "Persönliche Betreuung statt anonymer Standardabwicklung",
      "Klare Abstimmung zwischen Versender, Empfänger, Fahrer und Zollpartnern",
      "Reduzierung von Verzögerungen durch vollständige Dokumentenvorbereitung",
      "Unterstützung bei Export-, Import- und Transitprozessen",
      "Praktische Erfahrung mit FTL, LTL, Thermotransporten und Projekttransporten",
    ],
  },
  services: {
    badge: "Unsere Leistungen",
    title: "Logistiklösungen für komplexe Märkte.",
    highlight: "Zuverlässig. Persönlich. International.",
    intro: "GLOBALSPED bietet maßgeschneiderte Transport- und Logistiklösungen für anspruchsvolle Verbindungen zwischen Europa, Zentralasien, Kaukasus, Osteuropa und dem Mittleren Osten. Mit über 30 Jahren Erfahrung, persönlicher Betreuung und einem starken Partnernetzwerk sorgen wir für eine sichere, effiziente und transparente Abwicklung Ihrer Transporte.",
    cta:  {
      label: "Transport anfragen",
      href: "/de/transport-anfrage"
    },
    learnMoreLabel: "Mehr erfahren",
    strengthsBadge: "Unsere Logistiklösungen",

    serviceItems: [
      {
        icon: "truck",
        title: "FTL – Komplettladungen",
        text:
          "Direkttransporte mit exklusiver Nutzung des Fahrzeugs für maximale Sicherheit, Effizienz und termingerechte Lieferung.",
      },
      {
        icon: "boxes",
        title: "LTL – Teilladungen",
        text:
          "Wirtschaftliche Transportlösungen durch gebündelte Ladungen und regelmäßige Verbindungen in unsere Zielregionen.",
      },
      {
        icon: "temperature",
        title: "Thermotransporte",
        text:
          "Temperaturgeführte Transporte für sensible Güter – mit moderner Kühltechnik und durchgehender Überwachung.",
      },
      {
        icon: "shield",
        title: "Gefahrguttransporte",
        text: "Sichere und regelkonforme Transporte sensibler Gefahrgüter inklusive ADR-konformer Dokumentation und internationaler Abwicklung.",
      },
      {
        icon: "fileShield",
        title: "Zoll & Dokumente",
        text: "Komplette Zollabwicklung und Unterstützung bei allen erforderlichen Dokumenten für Export, Import und Transit.",
      },
      {
        icon: "crane",
        title: "Projektlogistik",
        text:
          "Individuelle Lösungen für komplexe Projekte, Schwertransporte und überdimensionale Ladungen.",
      }
    ],

    imageOne: {
      src: "/images/services/globalsped-service-truck.png",
      alt: "LKW auf internationaler Route Richtung Zentralasien",
    },

    imageTwo: {
      src: "/images/services/globalsped-project-logistics.png",
      alt: "Projektlogistik mit Containerumschlag und LKW",
    },

    strengthsTitle: "Flexibel. Erfahren. International.",
    strengths: [
      {
        title: "Internationale Netzwerke",
        text: "Zugriff auf ein starkes Partnernetzwerk in Europa, Zentralasien, Kaukasus, Osteuropa und dem Mittleren Osten.",
      },
      {
        title: "Sicherheit & Compliance",
        text: "Einhaltung relevanter Transport-, Zoll- und Sicherheitsanforderungen für sensible und komplexe Sendungen.",
      },
      {
        title: "Persönliche Betreuung",
        text: "Fester Ansprechpartner für Ihr Projekt – von der Planung bis zur finalen Zustellung.",
      },
      {
        title: "Transparenz & Kommunikation",
        text: "Klare Abstimmung während des gesamten Transportprozesses – mit Versendern, Empfängern, Fahrern und Partnern.",
      },
    ],

    stats: [
      { value: "30+", label: "Jahre Erfahrung" },
      { value: "20+", label: "Zielländer" },
      { value: "FTL/LTL", label: "Flexible Lösungen" },
      { value: "Zoll", label: "Abwicklung aus einer Hand" },
    ],
  },
  aboutUs: {
    badge: "Über GLOBALSPED",
    title: "Erfahrung, Netzwerk und persönliche Betreuung",
    highlight: "für anspruchsvolle internationale Transporte",
    intro: "GLOBALSPED ist eine internationale Spedition mit Spezialisierung auf Transporte zwischen Europa, Zentralasien, Kaukasus, Osteuropa und dem Mittleren Osten. Seit vielen Jahren organisieren wir Sammelgut, LTL-Teilladungen, FTL-Komplettladungen, Thermotransporte, ADR-Transporte, Projektlogistik und Zollgüter für Unternehmen mit komplexen Anforderungen.",
    text: "Unsere Stärke liegt in kurzen Kommunikationswegen, persönlicher Betreuung und einem erfahrenen Team mit aktuellem Logistik-Fachwissen und sprachlicher Kompetenz. Gerade auf anspruchsvollen Routen zählt nicht nur der Preis, sondern die verlässliche Koordination von Versender, Empfänger, Fahrer, Zollpartnern und internationalen Netzwerkpartnern.",
    cta: {
      label: "Transport anfragen",
      href: "/de/transport-anfrage"
    },

    images: [
      {
        src: "/images/about/globalsped-backoffice.png",
        alt: "GLOBALSPED Team bei der internationalen Transportplanung",
        label: "Backoffice & Planung",
      },
      {
        src: "/images/about/globalsped-headquater.png",
        alt: "Internationale Logistikroute mit LKW Richtung Zentralasien",
        label: "Standort und Wohlfühlroase",
      },
    ],

    values: [
      {
        icon: "experience",
        title: "Erfahrung seit den 1990er Jahren",
        text: "Frühe Spezialisierung auf Transporte nach Zentralasien, Kaukasus und angrenzende Märkte.",
      },
      {
        icon: "network",
        title: "Starkes Partnernetzwerk",
        text: "Verlässliche Kontakte entlang internationaler Routen für FTL, LTL, Sammelgut und Projekttransporte.",
      },
      {
        icon: "communication",
        title: "Direkte Kommunikation",
        text: "Kurze Entscheidungswege, persönliche Ansprechpartner und schnelle Reaktion bei operativen Fragen.",
      },
      {
        icon: "customs",
        title: "Zoll- und Dokumentenkompetenz",
        text: "Unterstützung bei Export, Import, Transit, T1, ABD, CMR und transportrelevanten Unterlagen.",
      },
    ],

    teamIntroBox: {
      icon: "communication",
      title: "Persönlich. Mehrsprachig. Lösungsorientiert.",
      text: "Wir verstehen uns nicht als anonyme Plattform, sondern als persönlicher Logistikpartner. Unser Team verbindet praktische Erfahrung, Marktkenntnis und klare Kommunikation – besonders dort, wo Transporte komplex, zeitkritisch oder dokumentenintensiv sind.",
    },
    teamListTitle: "Ihr persönliches GLOBALSPED Team",
    teamListIntro: "Unsere Account Agents und Ansprechpartner unterstützen Sie persönlich bei Transportanfragen, Zollthemen und der operativen Abwicklung Ihrer Sendungen.",

    teamMembers: [
      {
        imgURL: "/images/team/globalsped-selina.jpg",
        name: "Selina Tatzmann",
        job: "Account Agent",
        contact: {
          phone: "+49 8654 5762 27",
          email: "st@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-no-image.gif",
        name: "Adisa Metolli",
        job: "Account Agent",
        contact: {
          phone: "+49 8654 5762 51",
          email: "am@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-jahan.jpg",
        name: "Jahan Ilgeldyyeva",
        job: "Account Agent",
        contact: {
          phone: "+49 8654 5762 34",
          email: "ji@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-thomas.jpg",
        name: "Thomas Höllmüller",
        job: "Account Agent",
        contact: {
          phone: "+49 8654 5762 28",
          email: "th@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-manfred.jpg",
        name: "Manfred Steidl",
        job: "Account Agent",
        contact: {
          phone: "+49 8654 5762 23",
          email: "ms@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-herbert.jpg",
        name: "Herbert Sesko",
        job: "Manager",
        contact: {
          phone: "+49 8654 5762 21",
          email: "hs@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-no-image.gif",
        name: "Elias Schuhböck",
        job: "Account Agent",
        contact: {
          phone: "+49 8654 5762 25",
          email: "es@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-no-image.gif",
        name: "Ida Tosun Kaiymova",
        job: "Account Agent",
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
        job: "Inkasso",
        contact: {
          phone: "+49 (0)8654 5762 0",
          email: "fini@globalsped.de",
        },
      },
    ],
  },
  jobs: {
    badge: "Karriere bei GLOBALSPED",
    title: "Jobs in der internationalen Spedition",
    highlight: "für Menschen, die mitdenken und gestalten wollen",
    intro:
      "Sie suchen keinen eintönigen Bürojob, sondern eine abwechslungsreiche Aufgabe in der internationalen Logistik? Bei GLOBALSPED arbeiten Sie an Transportlösungen für Zentralasien, Kaukasus, Osteuropa und den Mittleren Osten – mit direktem Kundenkontakt, Verantwortung und Entwicklungsmöglichkeiten.",
  
    image: {
      src: "/images/jobs/globalsped-jobs.jpg",
      alt: "Karriere und Jobs bei GLOBALSPED",
    },
    imageOverlayCards: [
      {
        title: "Karriere bei GLOBALSPED",
        text: "Internationale Aufgaben. Direkter Kundenkontakt. Echte Verantwortung.",
        icon: "users",
      },
      {
        title: "Entwicklung & Perspektive",
        text: "Abwechslungsreiche Tätigkeiten mit persönlicher Weiterentwicklung.",
        icon: "star",
      },
    ],
  
    openPositionsTitle: "Offene Stellenangebote",
    applyLabel: "Jetzt bewerben",
    detailsLabel: "Aufgaben ansehen",
    email: "jobs@globalsped.de",
  
    positions: [
      {
        title: "Export Sachbearbeiter (m/w/d)",
        subtitle: "Exportabwicklung, Zollunterlagen und internationale Kundenbetreuung",
        description: "In dieser Position unterstützen Sie unsere Exportabwicklung für internationale Transporte in anspruchsvolle Zielmärkte. Sie arbeiten strukturiert, kommunizieren sicher mit Kunden und Partnern und behalten auch bei komplexen Dokumentenprozessen den Überblick.",
        tasks: [
          "Annahme, Bearbeitung und Nachverfolgung von Kundenaufträgen",
          "Erfassung und Pflege transportrelevanter Daten im Warenwirtschaftssystem",
          "Erstellung von Versandunterlagen, Lieferscheinen, Rechnungen und länderspezifischen Begleitdokumenten",
          "Zolltechnische Abwicklung bei Transporten in Drittstaaten",
          "Telefonische und schriftliche Betreuung internationaler Kunden in englischer Sprache",
          "Prüfung von Eingangs- und Ausgangsfrachten",
          "Ausstellen von Lieferantenerklärungen",
          "Erstellung der monatlichen Intrahandelsstatistik",
        ],
      },
      {
        title: "Kaufmann/-frau für Spedition & Logistikdienstleistungen (m/w/d)",
        subtitle: "Disposition, internationale Sendungen, Import, Export, See- und Luftfracht",
        description: "Sie organisieren internationale Sendungen, koordinieren Kunden, Partner und Frachtführer und sorgen dafür, dass Dokumente, Termine und Informationen zuverlässig zusammenlaufen.",
        tasks: [
          "Ansprechpartner für Kunden in den Bereichen Import, Export, See- und Luftfracht sowie Container-Trucking",
          "Einkauf von Frachtraum und Abstimmung mit Transportpartnern",
          "Disposition, Organisation und Abwicklung internationaler Sendungen",
          "Erstellung erforderlicher Dokumente, unter anderem über ATLAS und DBH",
          "Dokumentation von Aufträgen und Angeboten",
          "Steuerung und Überwachung des Dokumenten- und Informationsflusses",
          "Überwachung von Lieferterminen zur fristgerechten Vertragserfüllung",
        ],
      },
    ],
  
    initiative: {
      title: "Quereinstieg & Initiativbewerbung",
      text: "Sie erfüllen nicht jedes fachliche Kriterium, bringen aber Organisationstalent, Sprachkenntnisse, Lernbereitschaft und PC-Grundkenntnisse mit? Dann freuen wir uns ebenfalls über Ihre Initiativbewerbung.",
    },
  
    companyTitle: "Unser Unternehmen",
    companyText: "GLOBALSPED ist eine internationale Spedition mit Schwerpunkt auf Exporten nach Zentralasien, Kaukasus, Osteuropa und in den Mittleren Osten. Statt Massengeschäft entwickeln wir individuelle Transportlösungen für komplexe Anforderungen – von Hilfsguttransporten über Medikamentenlieferungen bis zu Maschinen- und Projekttransporten.",
  
    values: [
      "Internationale Transporte statt Standardroutine",
      "Kurze Entscheidungswege und persönliche Zusammenarbeit",
      "Aufgaben mit Verantwortung und Entwicklungsmöglichkeiten",
      "Teamarbeit, Sprachenvielfalt und operative Nähe zum Kunden",
    ],
  
    closing: "Wenn Sie kreativ denken, lernbereit sind und auch ungewöhnliche Aufgaben professionell lösen möchten, möchten wir Sie gerne kennenlernen.",
  },
  contact: {
    badge: "Kontakt",
    title: "Kontaktieren Sie uns",
    highlight: "für Ihre Transportanfrage",
    intro: "Sie haben Fragen zu internationalen Transporten, Zollabwicklung, FTL, LTL oder Projektlogistik? Schreiben Sie uns eine Nachricht – unser Team meldet sich schnellstmöglich bei Ihnen.",

    form: {
      nameLabel: "Name",
      emailLabel: "E-Mail",
      messageLabel: "Nachricht",
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "Ihre E-Mail-Adresse",
      messagePlaceholder: "Ihre Nachricht",
      submitLabel: "Nachricht senden",
      validationRequired: "Bitte füllen Sie alle Felder aus.",
      successMessage: "Vielen Dank. Ihre Nachricht wurde versendet.",
    },

    locationsTitle: "Unsere Standorte",
    routeLabel: "Route planen",

    locations: [
      {
        title: "Deutschland (HQ)",
        address: "Pendelhagen 1, D-83416 Saaldorf-Surheim",
        phone: "+49 (0)8654 5762-0",
        email: "info@globalsped.de",
        mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Pendelhagen%201%2C%2083416%20Saaldorf-Surheim%2C%20Germany",
      },
      {
        title: "Österreich",
        address: "Metzgerstraße 54, A-5020 Salzburg",
        phone: "+43 (0)662 45084-21",
        email: "afrim.sabani@globalsped.de",
        mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Metzgerstra%C3%9Fe%2054%2C%205020%20Salzburg%2C%20Austria",
      },
    ],

    mapTitle: "Standorte auf Google Maps",
    mapEmbedUrl: "https://www.google.com/maps?q=Pendelhagen%201%2C%2083416%20Saaldorf-Surheim%20Germany%20OR%20Metzgerstra%C3%9Fe%2054%2C%205020%20Salzburg%20Austria&output=embed",
  },
  footer: {
    companyName: "Globalsped Internationale Spedition GmbH",
    shortName: "GLOBALSPED",
    claim: "International Transport Solutions",
    text:
      "Spezialisierte Transport- und Logistiklösungen zwischen Europa, Zentralasien, Kaukasus, Osteuropa und dem Mittleren Osten – inklusive Zollabwicklung, FTL, LTL, Thermotransporten und Projektlogistik.",

    contactTitle: "Kontakt",
    contact: {
      email: "info@globalsped.de",
      phone: "+49 (0) 8654 5762 0",
      address: "Pendel­hagen 1, D-83416 Saaldorf-Surheim",
    },

    pageLinksTitle: "Seiten",
    pageLinks: [
      { label: "Start", href: "/de" },
      { label: "Impressum", href: "/de/impressum" },
      { label: "Datenschutzerklärung", href: "/de/datenschutz" },
      { label: "FAQ", href: "/de/faq" },
    ],

    transportsTitle: "Main Transporte",
    transports: [
      { label: "Transport Usbekistan", href: "/de/transport-usbekistan" },
      { label: "Transport Kasachstan", href: "/de/transport-kasachstan" },
      { label: "Transport Kirgisistan", href: "/de/transport-kirgisistan" },
      { label: "Transport Turkmenistan", href: "/de/transport-turkmenistan" },
      { label: "Transport Tadschikistan", href: "/de/transport-tadschikistan" },
      { label: "Transport Mongolei", href: "/de/transport-mongolei" },
      { label: "Transport Aserbaidschan", href: "/de/transport-aserbaidschan" },
      { label: "Transport Georgien", href: "/de/transport-georgien" },
      { label: "Transport Armenien", href: "/de/transport-armenien" },
      { label: "Transport Irak", href: "/de/transport-irak" },
      { label: "Transport Ukraine", href: "/de/transport-ukraine" },
    ],

    membershipsTitle: "Mitgliedschaften & Standards",
    memberships: [
      {
        label: "GDP",
        text: "Good Distribution Practice",
        href: "https://en.wikipedia.org/wiki/Good_distribution_practice",
        icon: "shield",
      },
      {
        label: "FIATA",
        text: "International Federation of Freight Forwarders Associations",
        href: "https://en.wikipedia.org/wiki/International_Federation_of_Freight_Forwarders_Associations",
        icon: "globe",
      },
    ],

    copyright:
      "© GLOBALSPED International Tranport GmbH. Alle Rechte vorbehalten.",
  },
};