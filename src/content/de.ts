export const de = {
  header: {
    logoLabel: "GLOBALSPED",
    nav: [
      { label: "Start", href: "/{locale}" },
      { label: "Leistungen", href: "/{locale}#leistungen" },
      { label: "Destinationen", href: "/{locale}#destinationen" },
      { label: "Zollabwicklung", href: "/{locale}/leistungen/zollabwicklung" },
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
      highlight: "nach Zentralasien in den Kaukasus",
      line2: "und den Mittleren Osten",
    },

    subline:
      "GLOBALSPED organisiert FTL-Komplettladungen, LTL-Teilladungen, Thermotransporte, Gefahrgut, Projektlogistik und Zollabwicklung für Unternehmen mit anspruchsvollen Export- und Importzielen.",

    ctaPrimary: {
      label: "Transport unverbindlich anfragen",
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
      "Ukraine",
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
          {
            name: "Kasachstan",
            slug: "kasachstan",
            cities: ["Astana", "Almaty", "Atyrau"],
          },
          {
            name: "Usbekistan",
            slug: "usbekistan",
            cities: ["Taschkent", "Samarkand", "Navoi"],
          },
          {
            name: "Kirgisistan",
            slug: "kirgisistan",
            cities: ["Bischkek", "Osch"],
          },
          {
            name: "Turkmenistan",
            slug: "turkmenistan",
            cities: ["Aschgabat", "Mary"],
          },
          {
            name: "Tadschikistan",
            slug: "tadschikistan",
            cities: ["Duschanbe", "Chudschand"],
          },
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
          {
            name: "Aserbaidschan",
            slug: "aserbaidschan",
            cities: ["Baku", "Ganja", "Sumqayit"],
          },
          {
            name: "Georgien",
            slug: "georgien",
            cities: ["Tiflis", "Batumi", "Kutaissi"],
          },
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
          {
            name: "Türkei",
            slug: "tuerkei",
            cities: ["Istanbul", "Ankara", "Izmir"],
          },
          {
            name: "Ukraine",
            slug: "ukraine",
            cities: ["Kiew", "Lwiw", "Odessa"],
          },
        ],
      },
    ],

    countryGridTitle: "Ausgewählte Zielländer",
    countryGridIntro:
      "Unsere wichtigsten Zielmärkte für internationale Transporte, FTL, LTL, Thermotransporte, Projektlogistik und Zollabwicklung.",

    cta: {
      label: "Transport anfragen",
      href: "/de/transport-anfrage",
    },
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
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – gerne sind wir Ihnen bei der Erstellung der notwendigen Unterlagen behilflich.",
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
      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Bei Transporten nach Usbekistan sind vollständige Exportpapiere, korrekte Warenklassifizierung und eine abgestimmte Transitplanung besonders wichtig. Die Kombination aus Binnenland, Transitstrecken und landesspezifischen Einfuhrvorgaben macht eine sorgfältige Vorbereitung erforderlich.",
        operationalHints: [
          {
            title: "Einfuhrdokumente exakt vorbereiten",
            text: "Für Usbekistan sollten Handelsrechnung, Packliste, CMR, Ausfuhrdokumente und Warenbeschreibung vor Versand konsistent geprüft werden. Abweichungen zwischen Dokumenten und Ladung können die Abfertigung verzögern.",
          },
          {
            title: "Transitstrecken frühzeitig prüfen",
            text: "Da Usbekistan ein Binnenland ist, hängt die Laufzeit stark vom gewählten Transitkorridor, Grenzabläufen und regionalen Verkehrsbedingungen ab. Besonders bei terminrelevanten Lieferungen ist ein belastbarer Routenplan wichtig.",
          },
          {
            title: "Zolltarifnummer und Warenwert plausibel angeben",
            text: "Unklare Zolltarifnummern, unvollständige Artikelbeschreibungen oder nicht nachvollziehbare Warenwerte führen häufig zu Rückfragen. Eine saubere Vorprüfung reduziert Standzeiten.",
          },
          {
            title: "Sanktions- und Compliance-Prüfung einplanen",
            text: "Vor Exporten nach Usbekistan sollten Empfänger, Warenart und Verwendungszweck geprüft werden. Dies ist besonders bei technischen Gütern, Ersatzteilen und Industrieausrüstung relevant.",
          },
        ],
        authorityLinks: [
          {
            label: "GTAI-Informationen zu Zoll und Einfuhr in Usbekistan",
            href: "https://www.gtai.de/de/trade/usbekistan-wirtschaft/zoll-und-einfuhr-kompakt",
            source: "Germany Trade & Invest",
            topic: "Zoll und Einfuhr",
            reason:
              "Aktuelle länderspezifische Quelle zu Einfuhrverfahren, Dokumenten, Abgaben sowie Verboten und Beschränkungen.",
          },
          {
            label: "TARIC-Datenbank für Zolltarifnummern",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=de",
            source: "Europäische Kommission",
            topic: "Zolltarifnummern",
            reason:
              "Hilft bei der fachlich korrekten Einordnung von Waren und stärkt die Zoll-Entity-Signale.",
          },
          {
            label: "IRU-Informationen zum TIR-Verfahren",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / Transit",
            reason:
              "Relevant für internationale Straßentransporte mit Transit durch mehrere Zollgebiete.",
          },
          {
            label: "Informationen des deutschen Zolls zur Ausfuhr",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "Deutscher Zoll",
            topic: "Exportabwicklung",
            reason:
              "Offizielle Quelle zur Ausfuhr aus Deutschland und zur Prüfung exportrelevanter Vorgaben.",
          },
        ],
        internalLinks: [
          {
            label: "FTL-Komplettladungen nach Zentralasien",
            href: "/de/leistungen/ftl-komplettladungen",
            reason:
              "Verbindet Usbekistan-Transporte mit der passenden Service-Leistung für Direkttransporte.",
          },
          {
            label: "Zoll & Dokumente für Exporte",
            href: "/de/leistungen/zollabwicklung",
            reason:
              "Stärkt die interne Relevanz für Exportdokumente und Zollabwicklung.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport nach Usbekistan anfragen",
      },
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
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – gerne sind wir Ihnen bei der Erstellung der notwendigen Unterlagen behilflich.",
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

      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Für Transporte nach Kasachstan sind eine saubere Exportdokumentation, korrekte Zolltarifnummern und eine frühzeitige Prüfung von Transit- und Einfuhrvorgaben entscheidend. Besonders bei Maschinen, Ersatzteilen, Industrieausrüstung und Handelsware reduziert eine vollständige Dokumentenprüfung Verzögerungen an Grenz- und Zollstellen.",
        operationalHints: [
          {
            title: "Zoll- und Einfuhrprüfung früh vorbereiten",
            text: "Bei Exporten nach Kasachstan sollten Handelsrechnung, Packliste, Warenbeschreibung, Zolltarifnummer und Ursprungsangaben vor Abholung geprüft werden. Unklare Warenbeschreibungen oder abweichende Gewichte führen häufig zu Rückfragen in der Zollabwicklung.",
          },
          {
            title: "TIR und CMR sauber abstimmen",
            text: "Bei Straßentransporten nach Kasachstan sind TIR- und CMR-Dokumente zentrale Bestandteile der Transport- und Transitabwicklung. Die Angaben müssen mit Rechnung, Packliste und tatsächlicher Ladung übereinstimmen.",
          },
          {
            title: "EAWU-Anforderungen berücksichtigen",
            text: "Kasachstan ist Teil der Eurasischen Wirtschaftsunion. Je nach Ware können Konformitätsnachweise, technische Anforderungen oder zusätzliche Importdokumente erforderlich sein.",
          },
          {
            title: "Transitkorridore realistisch planen",
            text: "Für Transporte nach Kasachstan sollten Grenzübergänge, saisonale Laufzeiten und mögliche Wartezeiten im Transit frühzeitig berücksichtigt werden. Eine realistische Laufzeitplanung ist besonders bei Produktions- und Projektlieferungen wichtig.",
          },
        ],
        authorityLinks: [
          {
            label: "GTAI-Informationen zu Zoll und Einfuhr in Kasachstan",
            href: "https://www.gtai.de/de/trade/kasachstan-wirtschaft/zoll-einfuhr-kompakt",
            source: "Germany Trade & Invest",
            topic: "Zoll und Einfuhr",
            reason:
              "Länderspezifische Authority-Quelle zu Einfuhrverfahren, Warenbegleitdokumenten, Abgaben sowie Verboten und Beschränkungen.",
          },
          {
            label: "TARIC-Datenbank für Zolltarifnummern",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=de",
            source: "Europäische Kommission",
            topic: "Zolltarifnummern",
            reason:
              "Stärkt die semantische Verknüpfung zu Zolltarifnummern, Exportprüfung und korrekter Wareneinreihung.",
          },
          {
            label: "IRU-Informationen zum TIR-Verfahren",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / Transit",
            reason:
              "Offizielle Fachquelle zum internationalen TIR-Transitsystem für grenzüberschreitende Straßentransporte.",
          },
          {
            label: "Informationen des deutschen Zolls zur Ausfuhr",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "Deutscher Zoll",
            topic: "Ausfuhrabwicklung",
            reason:
              "Offizielle Quelle zu Exportvorgaben und Ausfuhrprozessen aus Deutschland in Drittländer.",
          },
        ],
        internalLinks: [
          {
            label: "Zoll & Dokumente für internationale Transporte",
            href: "/de/leistungen/zollabwicklung",
            reason:
              "Stärkt die interne Themenverknüpfung zwischen Kasachstan-Transporten, Zollabwicklung und Exportdokumenten.",
          },
          {
            label: "Transportanfrage für Kasachstan stellen",
            href: "/de/transport-anfrage",
            reason:
              "Führt Nutzer mit konkretem Transportbedarf direkt zur Conversion.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport nach Kasachstan anfragen",
      },
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
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – gerne unterstützen wir Sie bei der Erstellung der erforderlichen Transport- und Zolldokumente.",
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
      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Transporte nach Kirgisistan erfordern eine präzise Abstimmung von Transitstrecke, Zollpapieren und Warenbegleitdokumenten. Aufgrund der geografischen Lage und der Gebirgsregionen sollten Laufzeiten und Routen realistisch geplant werden.",
        operationalHints: [
          {
            title: "Transitabhängigkeit berücksichtigen",
            text: "Kirgisistan ist im Straßengüterverkehr stark von internationalen Transitkorridoren abhängig. Grenzübergänge, Wetterbedingungen und regionale Infrastruktur können die Laufzeit beeinflussen.",
          },
          {
            title: "Dokumente vor Abfahrt auf Konsistenz prüfen",
            text: "CMR, Handelsrechnung, Packliste und Ausfuhrdokumente müssen in Warenbezeichnung, Gewicht und Packstückzahl übereinstimmen. Unstimmigkeiten führen häufig zu zusätzlichen Prüfungen.",
          },
          {
            title: "EAWU-Bezug beachten",
            text: "Kirgisistan ist Mitglied der Eurasischen Wirtschaftsunion. Je nach Ware können technische Anforderungen, Konformitätsnachweise oder zusätzliche Importvorgaben relevant sein.",
          },
          {
            title: "Gebirgs- und Winterbedingungen einplanen",
            text: "Bei Transporten in entlegene Regionen Kirgisistans sollten saisonale Straßenbedingungen, Höhenlagen und mögliche Einschränkungen im Winter bereits in der Planung berücksichtigt werden.",
          },
        ],
        authorityLinks: [
          {
            label: "IRU-Informationen zum TIR-Verfahren",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / Transit",
            reason:
              "Authority-Quelle für internationale Straßentransporte und Transitverfahren über mehrere Zollgrenzen.",
          },
          {
            label:
              "UNECE-CMR-Informationen zum internationalen Straßengüterverkehr",
            href: "https://unece.org/DAM/trans/conventn/cmr_e.pdf",
            source: "UNECE",
            topic: "CMR",
            reason:
              "Offizielle Grundlage für den internationalen Straßengüterverkehr und transportrechtliche Dokumentation.",
          },
          {
            label: "TARIC-Datenbank für Zolltarifnummern",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=de",
            source: "Europäische Kommission",
            topic: "Zolltarifnummern",
            reason:
              "Stärkt die fachliche Einordnung von Exportwaren und die semantische Relevanz für Zollprozesse.",
          },
          {
            label: "Informationen des deutschen Zolls zur Ausfuhr",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "Deutscher Zoll",
            topic: "Ausfuhrabwicklung",
            reason:
              "Offizielle Grundlage für Exportformalitäten bei Lieferungen aus Deutschland in Drittländer.",
          },
        ],
        internalLinks: [
          {
            label: "LTL-Teilladungen nach Zentralasien",
            href: "/de/leistungen/ltl-teilladungen",
            reason:
              "Passt zu Sammelgut- und Teilladungstransporten in Richtung Kirgisistan.",
          },
          {
            label: "Transportanfrage für Kirgisistan stellen",
            href: "/de/transport-anfrage",
            reason:
              "Leitet Nutzer mit konkretem Bedarf direkt in den Anfrageprozess.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport nach Kirgisistan anfragen",
      },
    },
    {
      slug: "transport-turkmenistan",
      country: "Turkmenistan",
      region: "Zentralasien",
      heroImage: "/images/country-hero/turkmenistan.jpg",

      title: "Transport nach",
      highlight: "Turkmenistan",

      intro:
        "Globalsped organisiert zuverlässige Transporte nach Turkmenistan – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte für anspruchsvolle Lieferketten nach Zentralasien.",

      seoText:
        "Wir unterstützen Unternehmen bei internationalen Transporten von Europa nach Turkmenistan, insbesondere nach Aschgabat, Türkmenbaşy und in weitere wirtschaftlich relevante Regionen. Unsere Leistungen umfassen Transportplanung, Routenkoordination, Zollabwicklung, Export- und Importprozesse sowie individuelle Betreuung für komplexe Transporte in anspruchsvolle Märkte Zentralasiens.",

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
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
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

      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Transporte nach Turkmenistan benötigen eine besonders sorgfältige Vorbereitung von Dokumenten, Transitstrecken und Empfängerangaben. Aufgrund landesspezifischer Vorgaben und Transitabhängigkeiten sollte die Transportplanung frühzeitig erfolgen.",
        operationalHints: [
          {
            title: "Dokumentationsqualität ist entscheidend",
            text: "Für Turkmenistan sollten Handelsrechnung, Packliste, CMR und Ausfuhrunterlagen vollständig und eindeutig sein. Besonders Warenbeschreibung, Warenwert, Gewicht und Empfängerdaten müssen konsistent sein.",
          },
          {
            title: "Transitplanung früh abstimmen",
            text: "Je nach Route können Transitländer, Grenzübergänge und regionale Vorschriften die Laufzeit beeinflussen. Eine abgestimmte Routenplanung reduziert operative Unsicherheiten.",
          },
          {
            title: "Compliance-Prüfung nicht vernachlässigen",
            text: "Vor Versand sollten Warenart, Empfänger und Endverwendung geprüft werden. Dies ist besonders bei technischen Gütern, Ersatzteilen und Industriekomponenten relevant.",
          },
          {
            title: "Zoll- und Einfuhrvorgaben vorab klären",
            text: "Da Einfuhr- und Abfertigungsanforderungen je nach Ware unterschiedlich sein können, sollten Importvorgaben und benötigte Begleitdokumente vor Transportbeginn abgestimmt werden.",
          },
        ],
        authorityLinks: [
          {
            label: "Informationen des deutschen Zolls zur Ausfuhr",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "Deutscher Zoll",
            topic: "Ausfuhrabwicklung",
            reason:
              "Offizielle Quelle für Exportvorgaben und Ausfuhrprozesse aus Deutschland in Drittländer.",
          },
          {
            label: "IRU-Informationen zum TIR-Verfahren",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / Transit",
            reason:
              "Relevant für Straßentransporte mit mehreren Zoll- und Transitabschnitten.",
          },
          {
            label:
              "UNECE-CMR-Informationen zum internationalen Straßengüterverkehr",
            href: "https://unece.org/DAM/trans/conventn/cmr_e.pdf",
            source: "UNECE",
            topic: "CMR",
            reason:
              "Stärkt die transportrechtliche Entity-Verknüpfung zu CMR und internationalem Straßengüterverkehr.",
          },
          {
            label: "TARIC-Datenbank für Zolltarifnummern",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=de",
            source: "Europäische Kommission",
            topic: "Zolltarifnummern",
            reason:
              "Authority-Quelle für korrekte Zolltarifnummern und Exportprüfung.",
          },
        ],
        internalLinks: [
          {
            label: "Zoll & Dokumente für internationale Transporte",
            href: "/de/leistungen/zollabwicklung",
            reason:
              "Thematisch passend für Transporte mit erhöhtem Dokumentationsbedarf.",
          },
          {
            label: "Projektlogistik für komplexe Transporte",
            href: "/de/leistungen/projektlogistik",
            reason:
              "Geeignet für industrielle Lieferungen und komplexere Transporte nach Turkmenistan.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport nach Turkmenistan anfragen",
      },
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
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
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
          value:
            "ca. 20–30 Tage (abhängig von Route, Grenzabwicklung und Zielregion)",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
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

      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Bei Transporten nach Tadschikistan sind sorgfältige Dokumentation, belastbare Transitplanung und eine realistische Einschätzung der Infrastruktur besonders wichtig. Je nach Zielregion können Grenzabläufe, Gebirgsstrecken und saisonale Bedingungen die Durchführung beeinflussen.",
        operationalHints: [
          {
            title: "Begleitdokumente vollständig vorbereiten",
            text: "Für Tadschikistan sollten CMR, Handelsrechnung, Packliste und Zollunterlagen vollständig und widerspruchsfrei sein. Besonders bei Industrie- und Ersatzteillieferungen sind präzise Warenbeschreibungen wichtig.",
          },
          {
            title: "Transit und Grenzabwicklung realistisch planen",
            text: "Tadschikistan ist stark transitabhängig. Route, Grenzübergänge und lokale Abfertigung sollten vor Transportbeginn abgestimmt werden, um unnötige Standzeiten zu vermeiden.",
          },
          {
            title: "Infrastruktur- und Gebirgsbedingungen beachten",
            text: "Je nach Zielort können Straßenverhältnisse, Höhenlagen und saisonale Einschränkungen relevant sein. Für empfindliche oder terminrelevante Ware ist eine realistische Laufzeitplanung entscheidend.",
          },
          {
            title: "Einfuhrbeschränkungen prüfen",
            text: "Je nach Warengruppe können zusätzliche Einfuhrvorgaben oder Beschränkungen bestehen. Eine Vorprüfung reduziert das Risiko von Verzögerungen bei der Importabfertigung.",
          },
        ],
        authorityLinks: [
          {
            label: "GTAI-Informationen zu Zoll und Einfuhr in Tadschikistan",
            href: "https://www.gtai.de/de/trade/tadschikistan-wirtschaft/zoll-einfuhr-kompakt",
            source: "Germany Trade & Invest",
            topic: "Zoll und Einfuhr",
            reason:
              "Länderspezifische Quelle zu Einfuhrverfahren, Warenbegleitdokumenten, Abgaben sowie Verboten und Beschränkungen.",
          },
          {
            label:
              "GTAI-Informationen zu Einfuhrverboten und Beschränkungen in Tadschikistan",
            href: "https://www.gtai.de/de/trade/tadschikistan/zoll/einfuhrverbote-und-beschraenkungen-645316",
            source: "Germany Trade & Invest",
            topic: "Einfuhrbeschränkungen",
            reason:
              "Stärkt die fachliche Tiefe bei Warenkontrolle, Beschränkungen und Importprüfung.",
          },
          {
            label: "IRU-Informationen zum TIR-Verfahren",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / Transit",
            reason:
              "Relevant für Transitplanung und internationale Straßentransporte nach Zentralasien.",
          },
          {
            label: "Informationen des deutschen Zolls zur Ausfuhr",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "Deutscher Zoll",
            topic: "Ausfuhrabwicklung",
            reason:
              "Offizielle Quelle zur deutschen Exportabwicklung in Drittländer.",
          },
        ],
        internalLinks: [
          {
            label: "Zoll & Dokumente für Transporte nach Zentralasien",
            href: "/de/leistungen/zollabwicklung",
            reason:
              "Stärkt die semantische Verbindung zwischen Tadschikistan-Transporten und Zollkompetenz.",
          },
          {
            label: "Transportanfrage für Tadschikistan stellen",
            href: "/de/transport-anfrage",
            reason:
              "Führt direkt zur Leadgenerierung für konkrete Transportanfragen.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport nach Tadschikistan anfragen",
      },
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
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
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
          value:
            "ca. 20–30 Tage (abhängig von Route, Infrastruktur und Zielort)",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
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

      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Transporte in die Mongolei benötigen eine besonders belastbare Routen- und Transitplanung. Aufgrund der großen Distanzen, der Binnenlage und der infrastrukturellen Besonderheiten sind vollständige Dokumente und realistische Laufzeiten entscheidend.",
        operationalHints: [
          {
            title: "Lange Transitstrecken realistisch kalkulieren",
            text: "Die Mongolei ist für europäische Straßentransporte ein anspruchsvolles Ziel. Transitländer, Grenzübergänge und regionale Infrastruktur beeinflussen die Laufzeit erheblich.",
          },
          {
            title: "Dokumente vor Verladung prüfen",
            text: "CMR, Handelsrechnung, Packliste und Ausfuhrdokumente müssen eindeutig und vollständig sein. Besonders bei Maschinen, Ersatzteilen und Industrieausrüstung sind präzise Warenbeschreibungen wichtig.",
          },
          {
            title: "Zolltarifnummer und Empfängerdaten abstimmen",
            text: "Unklare Zolltarifnummern oder abweichende Empfängerdaten können Rückfragen verursachen. Eine saubere Vorabprüfung verhindert Verzögerungen im Transit und bei der Einfuhr.",
          },
          {
            title: "Saisonale Bedingungen berücksichtigen",
            text: "Wetter, Straßenverhältnisse und regionale Erreichbarkeit können in der Mongolei eine größere Rolle spielen als bei Standardzielen. Eine flexible Laufzeitplanung ist sinnvoll.",
          },
        ],
        authorityLinks: [
          {
            label:
              "GTAI-Informationen zur Wirtschaft und zu Rahmenbedingungen in der Mongolei",
            href: "https://www.gtai.de/de/trade/mongolei-wirtschaft",
            source: "Germany Trade & Invest",
            topic: "Länder- und Handelsinformationen",
            reason:
              "Institutionelle Quelle für wirtschaftliche Rahmenbedingungen, Recht, Zoll und Außenhandel.",
          },
          {
            label: "IRU-Informationen zum TIR-Verfahren",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / Transit",
            reason:
              "Stärkt die fachliche Einordnung internationaler Transittransporte in entfernte Binnenmärkte.",
          },
          {
            label:
              "UNECE-CMR-Informationen zum internationalen Straßengüterverkehr",
            href: "https://unece.org/DAM/trans/conventn/cmr_e.pdf",
            source: "UNECE",
            topic: "CMR",
            reason:
              "Offizielle Grundlage für CMR-Dokumentation im internationalen Straßengüterverkehr.",
          },
          {
            label: "Informationen des deutschen Zolls zur Ausfuhr",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "Deutscher Zoll",
            topic: "Exportabwicklung",
            reason:
              "Offizielle Quelle zu Ausfuhrprozessen aus Deutschland in Drittländer.",
          },
        ],
        internalLinks: [
          {
            label: "Projektlogistik für internationale Spezialtransporte",
            href: "/de/leistungen/projektlogistik",
            reason:
              "Mongolei-Transporte haben häufig erhöhten Planungsbedarf bei Route, Laufzeit und Abwicklung.",
          },
          {
            label: "Transportanfrage für Mongolei stellen",
            href: "/de/transport-anfrage",
            reason: "Führt Nutzer direkt zur konkreten Anfrage.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport in die Mongolei anfragen",
      },
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
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
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

      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Transporte nach Aserbaidschan verbinden Zollabwicklung, Kaukasus-Transit und präzise Exportdokumentation. Besonders bei Industrie-, Maschinenbau- und Handelswaren ist eine saubere Vorbereitung der Unterlagen wichtig.",
        operationalHints: [
          {
            title: "Einfuhrvorgaben vor Versand prüfen",
            text: "Für Aserbaidschan sollten Importvorgaben, Warenbegleitdokumente und mögliche produktspezifische Anforderungen vor Transportbeginn geklärt werden.",
          },
          {
            title: "Kaukasus-Transit sauber planen",
            text: "Je nach Route können Transitländer, Grenzübergänge und regionale Abfertigungsprozesse die Laufzeit beeinflussen. Eine realistische Routenplanung reduziert Verzögerungen.",
          },
          {
            title: "Warenwert und Zolltarifnummer konsistent angeben",
            text: "Unklare Warenwerte oder unpräzise Zolltarifnummern können zu Rückfragen führen. Handelsrechnung, Packliste und CMR sollten dieselben Daten enthalten.",
          },
          {
            title: "Compliance bei technischen Waren prüfen",
            text: "Bei Maschinen, Ersatzteilen und Industriekomponenten sollte vorab geprüft werden, ob Exportkontrolle oder zusätzliche Nachweise relevant sind.",
          },
        ],
        authorityLinks: [
          {
            label: "GTAI-Informationen zu Zoll und Einfuhr in Aserbaidschan",
            href: "https://www.gtai.de/de/trade/aserbaidschan-wirtschaft/zoll-einfuhr-kompakt",
            source: "Germany Trade & Invest",
            topic: "Zoll und Einfuhr",
            reason:
              "Aktuelle länderspezifische Authority-Quelle zu Einfuhrverfahren, Dokumenten und Abgaben.",
          },
          {
            label: "TARIC-Datenbank für Zolltarifnummern",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=de",
            source: "Europäische Kommission",
            topic: "Zolltarifnummern",
            reason:
              "Stärkt die fachliche Relevanz für korrekte Wareneinreihung und Exportdokumentation.",
          },
          {
            label: "IRU-Informationen zum TIR-Verfahren",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / Transit",
            reason:
              "Relevant für internationale Straßentransporte über mehrere Zollgebiete in Richtung Kaukasus.",
          },
          {
            label: "Informationen des deutschen Zolls zur Ausfuhr",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "Deutscher Zoll",
            topic: "Exportabwicklung",
            reason:
              "Offizielle Grundlage für Ausfuhrprozesse und Exportkontrolle aus Deutschland.",
          },
        ],
        internalLinks: [
          {
            label: "FTL-Komplettladungen in den Kaukasus",
            href: "/de/leistungen/ftl-komplettladungen",
            reason:
              "Verbindet Aserbaidschan-Transporte mit einer wichtigen Service-Leistung.",
          },
          {
            label: "Zoll & Dokumente für Aserbaidschan-Transporte",
            href: "/de/leistungen/zollabwicklung",
            reason:
              "Stärkt die interne Themenautorität für Zollabwicklung und Dokumente.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport nach Aserbaidschan anfragen",
      },
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
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
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

      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Georgien ist für Transporte in den Kaukasus und weiter Richtung Zentralasien ein wichtiger Ziel- und Transitmarkt. Entscheidend sind vollständige Transportdokumente, korrekte Zollangaben und eine abgestimmte Abwicklung mit den lokalen Importprozessen.",
        operationalHints: [
          {
            title: "Zollanmeldung und Fristen beachten",
            text: "Für Georgien sollten Einfuhrdokumente frühzeitig vorbereitet werden. Verzögerungen entstehen häufig, wenn Warenbeschreibung, Rechnung, Packliste oder Transportdaten nicht zusammenpassen.",
          },
          {
            title: "Kaukasus-Route realistisch planen",
            text: "Je nach Herkunftsort und Transitstrecke können Grenzabfertigung, regionale Verkehrsbedingungen und saisonale Einflüsse die Laufzeit beeinflussen.",
          },
          {
            title: "Präferenz- und Ursprungsfragen prüfen",
            text: "Bei bestimmten Waren kann der Ursprung für Zollbehandlung und Dokumentation relevant sein. Eine frühzeitige Prüfung verhindert Nachforderungen.",
          },
          {
            title: "Dokumente bei Waren mit Sonderanforderungen abstimmen",
            text: "Für einzelne Produktgruppen können zusätzliche Nachweise, Zertifikate oder Kennzeichnungsvorgaben erforderlich sein. Dies sollte vor Abholung geprüft werden.",
          },
        ],
        authorityLinks: [
          {
            label: "GTAI-Informationen zu Zoll und Einfuhr in Georgien",
            href: "https://www.gtai.de/de/trade/georgien-wirtschaft/zoll-kompakt",
            source: "Germany Trade & Invest",
            topic: "Zoll und Einfuhr",
            reason:
              "Aktuelle Authority-Quelle zu georgischen Einfuhrverfahren, Abgaben und Warenbegleitdokumenten.",
          },
          {
            label: "GTAI-Informationen zum Zollverfahren in Georgien",
            href: "https://www.gtai.de/de/trade/georgien/zoll/zollverfahren--610482",
            source: "Germany Trade & Invest",
            topic: "Zollverfahren",
            reason:
              "Vertieft die fachliche Relevanz für Zollanmeldung und Importabfertigung.",
          },
          {
            label: "IRU-Informationen zum TIR-Verfahren",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / Transit",
            reason:
              "Stärkt die Entity-Verknüpfung zu internationalem Transit und Straßengüterverkehr.",
          },
          {
            label:
              "UNECE-CMR-Informationen zum internationalen Straßengüterverkehr",
            href: "https://unece.org/DAM/trans/conventn/cmr_e.pdf",
            source: "UNECE",
            topic: "CMR",
            reason:
              "Offizielle Grundlage für CMR-bezogene Transportdokumentation.",
          },
        ],
        internalLinks: [
          {
            label: "Transporte in den Kaukasus anfragen",
            href: "/de/transport-anfrage",
            reason:
              "Unterstützt Conversion für konkrete Georgien- und Kaukasus-Transporte.",
          },
          {
            label: "Zoll & Dokumente für internationale Transporte",
            href: "/de/leistungen/zollabwicklung",
            reason:
              "Stärkt die semantische Verbindung zu Zoll- und Dokumentenkompetenz.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport nach Georgien anfragen",
      },
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
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente.",
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

      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Für Transporte nach Armenien sind präzise Exportdokumente, abgestimmte Transitwege und eine frühzeitige Prüfung der Einfuhrvorgaben wichtig. Aufgrund der geografischen Lage müssen Route und Grenzprozesse besonders sorgfältig geplant werden.",
        operationalHints: [
          {
            title: "Transitroute vorab klären",
            text: "Armenien erfordert je nach Ausgangsort eine sorgfältige Abstimmung der Transitstrecke. Grenzabläufe, regionale Routen und politische Rahmenbedingungen können die Laufzeit beeinflussen.",
          },
          {
            title: "EAWU-Kontext berücksichtigen",
            text: "Armenien ist Mitglied der Eurasischen Wirtschaftsunion. Für bestimmte Waren können technische Anforderungen, Konformitätsnachweise oder zusätzliche Dokumente relevant sein.",
          },
          {
            title: "Dokumente konsistent halten",
            text: "Handelsrechnung, Packliste, CMR und Ausfuhrdokumente sollten bei Warenbezeichnung, Gewicht, Packstückzahl und Warenwert übereinstimmen.",
          },
          {
            title: "Sanktions- und Exportkontrolle prüfen",
            text: "Bei technischen Gütern, Maschinen und Ersatzteilen sollte vor Versand geprüft werden, ob Exportkontrollvorgaben oder Endverwendungsprüfungen relevant sind.",
          },
        ],
        authorityLinks: [
          {
            label:
              "GTAI-Informationen zur Wirtschaft und zu Rahmenbedingungen in Armenien",
            href: "https://www.gtai.de/de/trade/armenien-wirtschaft",
            source: "Germany Trade & Invest",
            topic: "Länder- und Handelsinformationen",
            reason:
              "Institutionelle Quelle für wirtschaftliche Rahmenbedingungen, Recht, Zoll und Außenhandel in Armenien.",
          },
          {
            label: "IRU-Informationen zum TIR-Verfahren",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / Transit",
            reason:
              "Relevant für internationale Straßentransporte mit Transitabwicklung.",
          },
          {
            label: "TARIC-Datenbank für Zolltarifnummern",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=de",
            source: "Europäische Kommission",
            topic: "Zolltarifnummern",
            reason:
              "Stärkt die fachliche Verbindung zu Wareneinreihung und Exportdokumentation.",
          },
          {
            label: "Informationen des deutschen Zolls zur Ausfuhr",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "Deutscher Zoll",
            topic: "Exportabwicklung",
            reason:
              "Offizielle Quelle zu deutschen Exportformalitäten und Ausfuhrprozessen.",
          },
        ],
        internalLinks: [
          {
            label: "Projektlogistik für komplexe Transporte",
            href: "/de/leistungen/projektlogistik",
            reason:
              "Passt zu anspruchsvollen Lieferungen mit erhöhter Routen- und Dokumentationsplanung.",
          },
          {
            label: "Zoll & Dokumente für Armenien-Transporte",
            href: "/de/leistungen/zollabwicklung",
            reason:
              "Stärkt die thematische Verknüpfung mit Exportdokumenten und Zollabwicklung.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport nach Armenien anfragen",
      },
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
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
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
          value:
            "ca. 8–18 Tage (abhängig von Route, Sicherheitslage und Zielregion)",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente für den Irak.",
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

      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Transporte in den Irak erfordern eine besonders sorgfältige Prüfung von Dokumenten, Empfängerangaben, Zollwerten und Compliance-Anforderungen. Je nach Zielregion und Warenart können zusätzliche Abstimmungen vor Versand notwendig sein.",
        operationalHints: [
          {
            title: "Vorabanforderungen und Zollwerte prüfen",
            text: "Für Irak-Transporte sollten Handelsrechnung, Warenwert, Zahlungs- und Empfängerdaten besonders sorgfältig vorbereitet werden. Unklare oder unvollständige Angaben können die Abfertigung verzögern.",
          },
          {
            title: "Compliance vor Transportbeginn klären",
            text: "Bei Exporten in den Irak sollten Empfänger, Endverwendung und Warenart frühzeitig geprüft werden. Dies gilt besonders für technische Güter, Ersatzteile und Industrieausrüstung.",
          },
          {
            title: "Regionale Zielorte unterscheiden",
            text: "Lieferungen nach Bagdad, Basra, Erbil oder in andere Regionen können unterschiedliche operative Anforderungen haben. Route, Grenzabfertigung und lokale Zustellung sollten vorab abgestimmt werden.",
          },
          {
            title: "Dokumente mit lokaler Importabwicklung abstimmen",
            text: "Packliste, CMR, Handelsrechnung und ggf. zusätzliche Nachweise sollten mit den Anforderungen des Empfängers und der Importabfertigung abgeglichen werden.",
          },
        ],
        authorityLinks: [
          {
            label:
              "GTAI-Informationen zur Wirtschaft und zu Zollthemen im Irak",
            href: "https://www.gtai.de/de/trade/irak-wirtschaft",
            source: "Germany Trade & Invest",
            topic: "Länder- und Zollinformationen",
            reason:
              "Institutionelle Quelle für Rahmenbedingungen, Recht, Zoll und wirtschaftliche Entwicklungen im Irak.",
          },
          {
            label:
              "GTAI-Informationen zu neuen Regeln zur Zollwertermittlung im Irak",
            href: "https://www.gtai.de/de/trade/irak/zoll/irak-zollwert-1986908",
            source: "Germany Trade & Invest",
            topic: "Zollwert / Vorabanmeldung",
            reason:
              "Aktuelle Quelle zu irakischen Zollwert- und Vorabanmeldeanforderungen.",
          },
          {
            label: "Informationen des deutschen Zolls zur Ausfuhr",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "Deutscher Zoll",
            topic: "Exportabwicklung",
            reason:
              "Offizielle Grundlage für Ausfuhrprozesse, Exportkontrolle und Drittlandslieferungen.",
          },
          {
            label: "TARIC-Datenbank für Zolltarifnummern",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=de",
            source: "Europäische Kommission",
            topic: "Zolltarifnummern",
            reason:
              "Stärkt die fachliche Relevanz für korrekte Warenklassifizierung und Exportdokumente.",
          },
        ],
        internalLinks: [
          {
            label: "Zoll & Dokumente für Irak-Transporte",
            href: "/de/leistungen/zollabwicklung",
            reason:
              "Sehr relevant wegen erhöhter Anforderungen an Dokumente, Zollwerte und Compliance.",
          },
          {
            label: "Transportanfrage für Irak stellen",
            href: "/de/transport-anfrage",
            reason: "Leitet qualifizierte Nutzer direkt zur Anfrage.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport in den Irak anfragen",
      },
    },
    {
      slug: "transport-tuerkei",
      country: "Türkei",
      region: "Mittlerer Osten",
      heroImage: "/images/country-hero/tuerkei.jpg",

      title: "Transport in die",
      highlight: "Türkei",

      intro:
        "Globalsped organisiert zuverlässige Transporte in die Türkei – darunter FTL, LTL, Sammelgut, Thermotransporte und Projekttransporte für anspruchsvolle Lieferketten in den Mittleren Osten.",

      seoText:
        "Wir unterstützen Unternehmen bei internationalen Landtransporten von Europa in die Türkei, insbesondere nach Istanbul, Ankara, Izmir, Bursa und weitere wichtige Wirtschaftsregionen. Die Türkei ist ein bedeutender Logistikstandort zwischen Europa, dem Kaukasus, Zentralasien und dem Nahen Osten und spielt eine zentrale Rolle als Transit- und Handelsdrehscheibe. Unsere Leistungen umfassen Transportplanung, Routenkoordination, Zollabwicklung sowie Export- und Importprozesse für sichere, zuverlässige und effiziente Transporte.",

      services: [
        "FTL Komplettladungen in die Türkei",
        "LTL Teilpartien und Sammelgut",
        "Thermotransporte für temperaturempfindliche Waren",
        "Projekttransporte und Sondertransporte",
        "Zollabwicklung, Export, Import und Transit",
      ],

      cities: ["Istanbul", "Ankara", "Izmir", "Bursa", "Adana", "Antalya"],

      labels: {
        backToDestinations: "Zurück zu Destinationen",
        introBadge: "Internationale Logistik",
        logisticsTitlePrefix: "Logistiklösungen für Transporte in den",
        citiesTitle: "Wichtige Zielorte",
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
      },

      transportDetails: {
        route: {
          label: "Route",
          routes: [
            {
              title: "Südosteuropa / Türkei Route",
              description:
                "FTL- und LTL-Transporte erfolgen im Regelfall über Österreich, Ungarn, Rumänien und Bulgarien direkt in die Türkei. Je nach Zielregion, Warenart und Transportanforderung koordinieren wir geeignete Routen für zuverlässige Transporte nach Istanbul, Ankara, Izmir, Bursa sowie in weitere türkische Wirtschaftsregionen.",
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
          value: "Ca. 6-10 Tage (abhängig von Route und Grenzabwicklung)",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung aller notwendigen Transport- und Zolldokumente für den Irak.",
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

      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Transporte in die Türkei verbinden EU-Exportprozesse, Zollabwicklung und komplexe Transit- und Grenzprozesse zwischen Europa und dem Mittleren Osten. Besonders bei Industrie-, Maschinenbau-, Automotive- und Handelswaren ist eine präzise Dokumentation entscheidend.",
        operationalHints: [
          {
            title: "Export- und Zolldokumente konsistent vorbereiten",
            text: "Abweichungen zwischen Handelsrechnung, Packliste, CMR und Zolltarifnummern führen bei Türkei-Transporten häufig zu Verzögerungen oder zusätzlichen Zollprüfungen.",
          },
          {
            title: "Grenzübergänge realistisch einplanen",
            text: "Grenzübergänge wie Kapıkule können je nach Saison, Feiertagen und Verkehrsaufkommen erhebliche Wartezeiten verursachen. Laufzeiten sollten entsprechend geplant werden.",
          },
          {
            title: "Transit- und TIR-Prozesse frühzeitig abstimmen",
            text: "Bei Transitverkehren Richtung Kaukasus, Zentralasien oder Mittlerer Osten sollten TIR- und Transitverfahren vor Transportbeginn vollständig abgestimmt werden.",
          },
          {
            title: "Technische Waren und Dual-Use-Produkte prüfen",
            text: "Für bestimmte Maschinen, Elektronik- oder Industriekomponenten können Exportkontrolle, Compliance-Prüfungen oder zusätzliche Nachweise erforderlich sein.",
          },
          {
            title: "ADR- und Thermotransporte sauber vorbereiten",
            text: "Gefahrgut- und temperaturgeführte Transporte erfordern vollständige Begleitdokumente sowie abgestimmte Grenz- und Zollprozesse entlang der Route.",
          },
        ],
        authorityLinks: [
          {
            label: "GTAI-Informationen zu Zoll und Einfuhr in der Türkei",
            href: "https://www.gtai.de/de/trade/tuerkei-wirtschaft/zoll-einfuhr-kompakt",
            source: "Germany Trade & Invest",
            topic: "Zoll und Einfuhr",
            reason:
              "Hochwertige Authority-Quelle zu türkischen Einfuhrbestimmungen, Zollverfahren und Dokumentationsanforderungen.",
          },
          {
            label: "TARIC-Datenbank für Zolltarifnummern",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=de",
            source: "Europäische Kommission",
            topic: "Zolltarifnummern",
            reason:
              "Relevante Fachquelle zur korrekten Wareneinreihung und Vorbereitung internationaler Exportdokumente.",
          },
          {
            label: "IRU-Informationen zum TIR-Verfahren",
            href: "https://www.iru.org/what-we-do/facilitating-trade-and-transit/tir",
            source: "IRU",
            topic: "TIR / Transitverfahren",
            reason:
              "Internationale Authority-Quelle für TIR- und Transitprozesse im grenzüberschreitenden Straßengüterverkehr.",
          },
          {
            label: "UNECE-Regelungen zum internationalen Straßengüterverkehr",
            href: "https://unece.org/transport",
            source: "UNECE",
            topic: "Internationaler Straßentransport",
            reason:
              "Stärkt die semantische Relevanz für internationale Transportregelwerke, Transitprozesse und CMR-Themen.",
          },
          {
            label:
              "Türkische Zollbehörde – Zoll- und Außenhandelsinformationen",
            href: "https://ticaret.gov.tr/",
            source: "Republik Türkei – Handelsministerium",
            topic: "Nationale Zollinformationen",
            reason:
              "Offizielle Regierungsquelle zu Zollverfahren, Importanforderungen und regulatorischen Vorgaben in der Türkei.",
          },
        ],
        internalLinks: [
          {
            label: "FAQ zu Zoll- und Exportdokumenten",
            href: "/de/faq",
            reason:
              "Sinnvolle interne Vertiefung zu Exportpapieren, Zollprozessen und internationalen Transportanforderungen.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport in die Türkei anfragen",
      },
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
        authorityBadge: "Dokumente & Hinweise",
        authorityLinksTitle: "Seriöse Quellen & weiterführende Informationen",
        internalLinksTitle: "Relevante GLOBALSPED Inhalte",
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
          value:
            "ca. 3–8 Tage (abhängig von Route, Zielregion und Grenzabwicklung)",
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
            "Handelsrechnung",
            "Packliste / Ladeliste",
            "Zolldokumente: (ABD) bei EU-Exporten oder T1-Transitdokument bei Drittlandsware",
            "Weitere warenbezogene Dokumente, z. B. Ursprungszeugnis,",
          ],
          note: "Sprechen Sie uns an – wir unterstützen Sie bei der vollständigen Erstellung und Prüfung aller notwendigen Transport- und Zolldokumente für die Ukraine.",
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

      countryAuthorityContent: {
        title: "Wichtige Informationen & Dokumente",
        intro:
          "Transporte in die Ukraine erfordern eine genaue Prüfung von Route, Empfänger, Warenart und Exportdokumenten. Aufgrund der aktuellen Lage sind Compliance, Sicherheit und flexible Transportplanung besonders wichtig.",
        operationalHints: [
          {
            title: "Route und Zustellregion sorgfältig prüfen",
            text: "Bei Ukraine-Transporten sollten Zielregion, Sicherheitslage, verfügbare Grenzübergänge und lokale Zustellmöglichkeiten vor Versand abgestimmt werden.",
          },
          {
            title: "Export- und Einfuhrdokumente vollständig vorbereiten",
            text: "Handelsrechnung, Packliste, CMR, Ausfuhranmeldung und Warenbeschreibung sollten vollständig und konsistent sein. Abweichungen führen häufig zu Verzögerungen.",
          },
          {
            title: "Sanktions- und Compliance-Prüfung durchführen",
            text: "Vor Transportbeginn sollten Empfänger, Warenart, Endverwendung und mögliche Exportkontrollvorgaben geprüft werden. Dies ist bei technischen Gütern besonders wichtig.",
          },
          {
            title: "Laufzeiten flexibel planen",
            text: "Grenzabfertigung, Sicherheitslage und regionale Einschränkungen können sich kurzfristig auswirken. Für dringende Lieferungen ist eine realistische und flexible Planung erforderlich.",
          },
        ],
        authorityLinks: [
          {
            label: "GTAI-Informationen zu Zoll und Einfuhr in der Ukraine",
            href: "https://www.gtai.de/de/trade/ukraine-wirtschaft/zoll-und-einfuhr-kompakt",
            source: "Germany Trade & Invest",
            topic: "Zoll und Einfuhr",
            reason:
              "Länderspezifische Authority-Quelle zu Einfuhrverfahren, Warenbegleitdokumenten, Abgaben und Beschränkungen.",
          },
          {
            label: "Informationen des deutschen Zolls zur Ausfuhr",
            href: "https://www.zoll.de/EN/Businesses/Movement-of-goods/Export/export_node.html",
            source: "Deutscher Zoll",
            topic: "Exportabwicklung",
            reason:
              "Offizielle Quelle für Exportvorgaben, Ausfuhranmeldung und Drittlandslieferungen.",
          },
          {
            label: "TARIC-Datenbank für Zolltarifnummern",
            href: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=de",
            source: "Europäische Kommission",
            topic: "Zolltarifnummern",
            reason:
              "Stärkt die Relevanz für korrekte Wareneinreihung und Exportdokumentation.",
          },
          {
            label:
              "UNECE-CMR-Informationen zum internationalen Straßengüterverkehr",
            href: "https://unece.org/DAM/trans/conventn/cmr_e.pdf",
            source: "UNECE",
            topic: "CMR",
            reason:
              "Offizielle Grundlage für CMR-bezogene Dokumentation im internationalen Straßentransport.",
          },
        ],
        internalLinks: [
          {
            label: "Zoll & Dokumente für Ukraine-Transporte",
            href: "/de/leistungen/zollabwicklung",
            reason:
              "Stärkt die interne Verbindung zu Exportdokumenten, Compliance und Zollabwicklung.",
          },
          {
            label: "Transportanfrage für Ukraine stellen",
            href: "/de/transport-anfrage",
            reason:
              "Leitet Nutzer mit konkretem Transportbedarf direkt zur Anfrage.",
          },
        ],
      },
      cta: {
        href: "/de/transport-anfrage",
        label: "Transport in die Ukraine anfragen",
      },
    },
  ],
  services: {
    badge: "Unsere Leistungen",
    title: "Logistiklösungen für komplexe Märkte.",
    highlight: "Zuverlässig. Persönlich. International.",
    intro:
      "GLOBALSPED bietet maßgeschneiderte Transport- und Logistiklösungen für anspruchsvolle Verbindungen zwischen Europa, Zentralasien, Kaukasus, Osteuropa und dem Mittleren Osten. Mit über 30 Jahren Erfahrung, persönlicher Betreuung und einem starken Partnernetzwerk sorgen wir für eine sichere, effiziente und transparente Abwicklung Ihrer Transporte.",
    cta: {
      label: "Transport anfragen",
      href: "/de/transport-anfrage",
    },
    learnMoreLabel: "Mehr erfahren",
    strengthsBadge: "Unsere Logistiklösungen",

    serviceItems: [
      {
        icon: "truck",
        title: "FTL – Komplettladungen",
        text: "Direkttransporte mit exklusiver Nutzung des Fahrzeugs für maximale Sicherheit, Effizienz und termingerechte Lieferung.",
        href: "/de/leistungen/ftl-komplettladungen",
      },
      {
        icon: "boxes",
        title: "LTL – Teilladungen",
        text: "Wirtschaftliche Transportlösungen durch gebündelte Ladungen und regelmäßige Verbindungen in unsere Zielregionen.",
        href: "/de/leistungen/ltl-teilladungen",
      },
      {
        icon: "temperature",
        title: "Thermotransporte",
        text: "Temperaturgeführte Transporte für sensible Güter – mit moderner Kühltechnik und durchgehender Überwachung.",
        href: "/de/leistungen/thermotransporte",
      },
      {
        icon: "shield",
        title: "Gefahrguttransporte",
        text: "Sichere und regelkonforme Transporte sensibler Gefahrgüter inklusive ADR-konformer Dokumentation und internationaler Abwicklung.",
        href: "/de/leistungen/gefahrguttransporte",
      },
      {
        icon: "fileShield",
        title: "Zollabwicklung",
        text: "Zollabwicklung, Export-, Import- und Transitunterstützung für internationale Transporte in Drittstaaten.",
        href: "/de/leistungen/zollabwicklung",
      },
      {
        icon: "crane",
        title: "Projektlogistik",
        text: "Individuelle Lösungen für komplexe Projekte, Schwertransporte und überdimensionale Ladungen.",
        href: "/de/leistungen/projektlogistik",
      },
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
    intro:
      "GLOBALSPED ist eine internationale Spedition mit Spezialisierung auf Transporte zwischen Europa, Zentralasien, Kaukasus, Osteuropa und dem Mittleren Osten. Seit vielen Jahren organisieren wir Sammelgut, LTL-Teilladungen, FTL-Komplettladungen, Thermotransporte, ADR-Transporte, Projektlogistik und Zollgüter für Unternehmen mit komplexen Anforderungen.",
    text: "Unsere Stärke liegt in kurzen Kommunikationswegen, persönlicher Betreuung und einem erfahrenen Team mit aktuellem Logistik-Fachwissen und sprachlicher Kompetenz. Gerade auf anspruchsvollen Routen zählt nicht nur der Preis, sondern die verlässliche Koordination von Versender, Empfänger, Fahrer, Zollpartnern und internationalen Netzwerkpartnern.",
    cta: {
      label: "Transport anfragen",
      href: "/de/transport-anfrage",
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
    teamListIntro:
      "Unsere Account Agents und Ansprechpartner unterstützen Sie persönlich bei Transportanfragen, Zollthemen und der operativen Abwicklung Ihrer Sendungen.",

    teamMembers: [
      {
        imgURL: "/images/team/globalsped-robert.jpg",
        name: "Robert Tiefenthaler",
        job: "Geschäftsführer",
        contact: {
          phone: "+49 8654 5762 20",
          email: "rt@globalsped.de",
        },
      },
      {
        imgURL: "/images/team/globalsped-selina.jpg",
        name: "Selina Tatzmann",
        job: "Hauptgesellschafterin",
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
        job: "Prokurist",
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
        subtitle:
          "Exportabwicklung, Zollunterlagen und internationale Kundenbetreuung",
        description:
          "In dieser Position unterstützen Sie unsere Exportabwicklung für internationale Transporte in anspruchsvolle Zielmärkte. Sie arbeiten strukturiert, kommunizieren sicher mit Kunden und Partnern und behalten auch bei komplexen Dokumentenprozessen den Überblick.",
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
        title:
          "Kaufmann/-frau für Spedition & Logistikdienstleistungen (m/w/d)",
        subtitle:
          "Disposition, internationale Sendungen, Import, Export, See- und Luftfracht",
        description:
          "Sie organisieren internationale Sendungen, koordinieren Kunden, Partner und Frachtführer und sorgen dafür, dass Dokumente, Termine und Informationen zuverlässig zusammenlaufen.",
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
    companyText:
      "GLOBALSPED ist eine internationale Spedition mit Schwerpunkt auf Exporten nach Zentralasien, Kaukasus, Osteuropa und in den Mittleren Osten. Statt Massengeschäft entwickeln wir individuelle Transportlösungen für komplexe Anforderungen – von Hilfsguttransporten über Medikamentenlieferungen bis zu Maschinen- und Projekttransporten.",

    values: [
      "Internationale Transporte statt Standardroutine",
      "Kurze Entscheidungswege und persönliche Zusammenarbeit",
      "Aufgaben mit Verantwortung und Entwicklungsmöglichkeiten",
      "Teamarbeit, Sprachenvielfalt und operative Nähe zum Kunden",
    ],

    closing:
      "Wenn Sie kreativ denken, lernbereit sind und auch ungewöhnliche Aufgaben professionell lösen möchten, möchten wir Sie gerne kennenlernen.",
  },
  contact: {
    badge: "Kontakt",
    title: "Kontaktieren Sie uns",
    highlight: "für Ihre Transportanfrage",
    intro:
      "Sie haben Fragen zu internationalen Transporten, Zollabwicklung, FTL, LTL oder Projektlogistik? Schreiben Sie uns eine Nachricht – unser Team meldet sich schnellstmöglich bei Ihnen.",
  
    form: {
      nameLabel: "Name",
      companyLabel: "Firma",
      emailLabel: "E-Mail",
      phoneLabel: "Telefon",
      messageLabel: "Nachricht",

      namePlaceholder: "Ihr Name",
      companyPlaceholder: "Ihre Firma",
      emailPlaceholder: "Ihre E-Mail-Adresse",
      phonePlaceholder: "Ihre Telefonnummer",
      messagePlaceholder: "Ihre Nachricht",

      privacyLabel:
        "Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Kontaktanfrage verarbeitet werden.",

      submitLabel: "Nachricht senden",
      sendingLabel: "Nachricht wird gesendet ...",
      submittedLabel: "Nachricht versendet",

      validationRequired: "Bitte füllen Sie Name, E-Mail und Nachricht aus.",
      validationEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      privacyRequired: "Bitte bestätigen Sie die Datenschutz-Hinweise.",
      submitError:
        "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.",
      successMessage:
        "Vielen Dank. Ihre Nachricht wurde versendet.",
    },

    locationsTitle: "Unsere Standorte",
    routeLabel: "Route planen",

    locations: [
      {
        title: "Deutschland (HQ)",
        address: "Pendelhagen 1, D-83416 Saaldorf-Surheim",
        phone: "+49 (0)8654 5762-0",
        email: "info@globalsped.de",
        mapsUrl:
          "https://www.google.com/maps/dir/?api=1&destination=Pendelhagen%201%2C%2083416%20Saaldorf-Surheim%2C%20Germany",
      },
      {
        title: "Österreich",
        address: "Metzgerstraße 54, A-5020 Salzburg",
        phone: "+43 (0)662 45084-21",
        email: "afrim.sabani@globalsped.de",
        mapsUrl:
          "https://www.google.com/maps/dir/?api=1&destination=Metzgerstra%C3%9Fe%2054%2C%205020%20Salzburg%2C%20Austria",
      },
    ],

    mapTitle: "Standorte auf Google Maps",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Pendelhagen%201%2C%2083416%20Saaldorf-Surheim%20Germany%20OR%20Metzgerstra%C3%9Fe%2054%2C%205020%20Salzburg%20Austria&output=embed",
  },
  footer: {
    companyName: "Globalsped Internationale Spedition GmbH",
    shortName: "GLOBALSPED",
    claim: "International Transport Solutions",
    text: "Spezialisierte Transport- und Logistiklösungen zwischen Europa, Zentralasien, Kaukasus, Osteuropa und dem Mittleren Osten – inklusive Zollabwicklung, FTL, LTL, Thermotransporten und Projektlogistik.",

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
        href: "https://www.dekra-certification.de/de/gdp-good-distribution-practice-zertifizierung/",
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
      "© GLOBALSPED International Transport GmbH. Alle Rechte vorbehalten.",
  },
};
