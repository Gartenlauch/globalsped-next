import type { ServicePageContent } from "./types";

export const adrService: ServicePageContent = {
  slug: "gefahrguttransporte",
  badge: "ADR Gefahrguttransporte",
  seo: {
    title: "ADR Gefahrguttransporte nach Zentralasien & Kaukasus | GLOBALSPED",
    description:
      "GLOBALSPED organisiert ADR Gefahrguttransporte von Europa nach Zentralasien, Kaukasus und Osteuropa inklusive Dokumentation, Transit- und Zollabwicklung.",
  },
  hero: {
    title: "ADR Gefahrguttransporte",
    highlight: "für komplexe internationale Transportanforderungen",
    intro:
      "Gefahrguttransporte in Richtung Zentralasien, Kaukasus und Osteuropa erfordern weit mehr als ADR-Basiswissen. Unterschiedliche Transitregelungen, Grenzprozesse und Dokumentationsanforderungen machen Erfahrung und operative Planung entscheidend.",
  },
  trust: {
    title: "Gefahrguttransporte mit internationaler Erfahrung",
    text: "ADR Transporte in anspruchsvolle Zielmärkte benötigen zuverlässige Partner, korrekte Dokumente und saubere Vorbereitung. Schon kleine Fehler können an Grenzen oder bei Kontrollen zu erheblichen Verzögerungen führen.",
    items: [
      "Organisation internationaler ADR Transporte",
      "Abstimmung von Dokumenten und Kennzeichnung",
      "Berücksichtigung länderspezifischer Anforderungen",
      "Erfahrung mit Transitstrecken Richtung Zentralasien",
    ],
  },
  services: {
    title: "Leistungen im Bereich ADR",
    text: "GLOBALSPED unterstützt Unternehmen bei der Planung und Organisation internationaler Gefahrguttransporte für Industrie, Chemie und technische Güter.",
    items: [
      "ADR-konforme Gefahrguttransporte",
      "Abstimmung von Transport- und Sicherheitsanforderungen",
      "Planung geeigneter Routen und Transitländer",
      "Unterstützung bei Dokumentation und Kennzeichnung",
    ],
  },
  regions: {
    title: "Zielregionen für Gefahrguttransporte",
    text: "Insbesondere auf langen internationalen Transitstrecken sind Erfahrung mit Grenzprozessen und lokalen Anforderungen entscheidend.",
    items: [
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
  },
  challenges: {
    title: "Typische Herausforderungen",
    text: "Gefahrguttransporte sind häufig mit zusätzlichen regulatorischen Anforderungen, Kontrollen und Transitbeschränkungen verbunden.",
    items: [
      "Fehlende oder unvollständige ADR Dokumente",
      "Transitbeschränkungen in einzelnen Ländern",
      "Grenzkontrollen und Sicherheitsprüfungen",
      "Abweichende Anforderungen bei Kennzeichnung und Verpackung",
    ],
  },
  solutions: {
    title: "Praktische Lösungen",
    text: "GLOBALSPED unterstützt mit strukturierter Vorbereitung, realistischer Transportplanung und enger Abstimmung mit Kunden und Partnern.",
    items: [
      "Prüfung der transportrelevanten Unterlagen",
      "Abstimmung geeigneter Transitstrecken",
      "Koordination mit Transportpartnern",
      "Kommunikation entlang der Lieferkette",
    ],
  },
  expertSection: {
    badge: "ADR-Fachinformationen",
    title: "Wichtige ADR-Angaben für die Transportprüfung",
    authorityTitle: "Offizielle Informationen",
    externalLinkLabel: "externer Link",
    intro:
      "Für Gefahrguttransporte reicht die Angabe „Gefahrgut ja/nein“ in der Praxis nicht aus. Entscheidend sind die korrekte UN-Nummer, die Verpackungsgruppe, mögliche Freistellungen nach ADR 1.1.3.6 und die Frage, ob eine Beförderung als Limited Quantity zulässig ist. Diese Angaben beeinflussen Verpackung, Kennzeichnung, Beförderungspapier, Fahrzeugausrüstung, Routenplanung und die operative Abwicklung an Schnittstellen.",
    cards: [
      {
        title: "UN-Nummer",
        text: "Die UN-Nummer identifiziert gefährliche Güter eindeutig im internationalen Transportrecht. Sie bildet die Grundlage für die Zuordnung zu ADR-Klasse, offizieller Benennung, Verpackungsgruppe, Gefahrzetteln, Sondervorschriften und Beförderungsbedingungen. Für eine belastbare Transportprüfung sollte die UN-Nummer immer vollständig angegeben werden, zum Beispiel „UN 1203“.",
      },
      {
        title: "Verpackungsgruppe",
        text: "Die Verpackungsgruppe beschreibt den Gefahrgrad eines Stoffes und ist für die Auswahl zulässiger Gefahrgutverpackungen wesentlich. Verpackungsgruppe I steht für hohe Gefahr, Verpackungsgruppe II für mittlere Gefahr und Verpackungsgruppe III für geringe Gefahr. Fehler bei der Verpackungsgruppe können zu falscher Verpackung, unvollständigen Beförderungspapieren oder Verzögerungen bei Kontrollen führen.",
      },
      {
        title: "ADR unter 1000 Punkte",
        text: "Bei bestimmten Gefahrguttransporten kann die Freistellung nach ADR 1.1.3.6 relevant sein. Dafür wird je Beförderungseinheit eine Punkteberechnung auf Basis von Stoff, Beförderungskategorie und Menge vorgenommen. Liegt der berechnete Wert im zulässigen Bereich, können Erleichterungen gelten. Trotzdem bleiben Klassifizierung, Verpackung, Kennzeichnung und Dokumentation weiterhin sorgfältig zu prüfen.",
      },
      {
        title: "Limited Quantity (LQ)",
        text: "Limited Quantity bezeichnet gefährliche Güter in begrenzten Mengen nach ADR-Kapitel 3.4. Ob LQ genutzt werden darf, hängt vom konkreten Stoffeintrag, der zulässigen Menge je Innenverpackung, der Außenverpackung und der Kennzeichnung ab. Für internationale Transporte ist eine saubere Prüfung wichtig, weil LQ nicht automatisch bedeutet, dass alle Gefahrgutanforderungen entfallen.",
      },
    ],
    authorityLinks: [
      {
        label: "BAM-Datenbank GEFAHRGUT zum UN-Nummern-System",
        href: "https://tes.bam.de/TES/Navigation/DE/DGG/Produkte/Gefahrgutdatenservice/gefahrgutdatenservice.html",
        source: "Bundesanstalt für Materialforschung und -prüfung",
      },
      {
        label: "BAM-Hinweise zu Gefahrgutverpackungen und Verpackungsgruppen",
        href: "https://tes.bam.de/TES/Content/DE/Standardartikel/Umschliessungen/Gefahrgutverpackungen/fragen-antworten.html",
        source: "Bundesanstalt für Materialforschung und -prüfung",
      },
      {
        label: "BG Verkehr zu ADR-Freistellungen und 1000-Punkte-Regelung",
        href: "https://www.bg-verkehr.de/arbeitssicherheit-gesundheit/themen/gefahrgut/gefahrgutrecht/strasse",
        source: "BG Verkehr",
      },
      {
        label: "UNECE ADR 2025 mit Regelungen zu Limited Quantities",
        href: "https://unece.org/adr-2025-files",
        source: "UNECE",
      },
    ],
   note: "Die Angaben unterstützen die erste fachliche Einschätzung. In der Transportanfrage können UN-Nummer, Verpackungsgruppe, ADR-Punkte und Limited Quantity direkt mit übermittelt werden, damit die operative Prüfung schneller erfolgen kann.",
  },
  sidebar: {
    title: "ADR auf einen Blick",
    items: [
      "Internationale Gefahrguttransporte",
      "ADR-konforme Transportorganisation",
      "Transit- und Zollabwicklung",
      "Fokus auf Zentralasien und Kaukasus",
      "Prüfung von UN-Nummer, Verpackungsgruppe und ADR-Klasse",
      "Bewertung von Limited Quantity und ADR-Freistellungen",
      "Unterstützung bei Beförderungspapieren und Dokumentationsanforderungen",
    ],
  },
  cta: {
    primary: "Gefahrguttransport anfragen",
    secondary: "Zurück zu Leistungen",
  },
};
