import type { ServicePageContent } from "../de/types";

export const adrService: ServicePageContent = {
  slug: "dangerous-goods-transport",
  badge: "ADR dangerous goods transport",
  seo: {
    title:
      "ADR Dangerous Goods Transport to Central Asia & the Caucasus | GLOBALSPED",
    description:
      "GLOBALSPED organizes ADR dangerous goods transport from Europe to Central Asia, the Caucasus and Eastern Europe, including documentation, transit and customs clearance.",
  },
  hero: {
    title: "ADR dangerous goods transport",
    highlight: "for complex international transport requirements",
    intro:
      "Dangerous goods transport toward Central Asia, the Caucasus and Eastern Europe requires far more than basic ADR knowledge. Different transit regulations, border processes and documentation requirements make experience and operational planning essential.",
  },
  trust: {
    title: "Dangerous goods transport with international experience",
    text:
      "ADR transport to demanding destination markets requires reliable partners, correct documents and careful preparation. Even minor errors can lead to significant delays at borders or during inspections.",
    items: [
      "Organization of international ADR transports",
      "Coordination of documents, marking and labelling",
      "Consideration of country-specific requirements",
      "Experience with transit routes toward Central Asia",
    ],
  },
  services: {
    title: "ADR transport services",
    text:
      "GLOBALSPED supports companies in planning and organizing international dangerous goods transport for industry, chemicals and technical goods.",
    items: [
      "ADR-compliant dangerous goods transport",
      "Coordination of transport and safety requirements",
      "Planning of suitable routes and transit countries",
      "Support with documentation, marking and labelling",
    ],
  },
  regions: {
    title: "Destination regions for dangerous goods transport",
    text:
      "Especially on long international transit routes, experience with border processes and local requirements is decisive.",
    items: [
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
  },
  challenges: {
    title: "Typical challenges",
    text:
      "Dangerous goods transports are often associated with additional regulatory requirements, inspections and transit restrictions.",
    items: [
      "Missing or incomplete ADR documents",
      "Transit restrictions in individual countries",
      "Border inspections and safety checks",
      "Different requirements for marking, labelling and packaging",
    ],
  },
  solutions: {
    title: "Practical solutions",
    text:
      "GLOBALSPED supports you with structured preparation, realistic transport planning and close coordination with customers and partners.",
    items: [
      "Review of transport-relevant documents",
      "Coordination of suitable transit routes",
      "Coordination with transport partners",
      "Communication along the supply chain",
    ],
  },
  expertSection: {
    badge: "ADR specialist information",
    title: "Important ADR details for transport checks",
    authorityTitle: "Official information",
    externalLinkLabel: "external link",
    intro:
      "For dangerous goods transport, simply stating “dangerous goods: yes/no” is not sufficient in practice. The correct UN number, packing group, possible exemptions under ADR 1.1.3.6 and whether transport as Limited Quantity is permitted are decisive. These details influence packaging, marking and labelling, the dangerous goods transport document, vehicle equipment, route planning and operational handling at interfaces.",
    cards: [
      {
        title: "UN number",
        text:
          "The UN number uniquely identifies dangerous goods under international transport regulations. It forms the basis for assigning the ADR class, proper shipping name, packing group, hazard labels, special provisions and conditions of carriage. For a reliable transport check, the UN number should always be provided in full, for example “UN 1203”.",
      },
      {
        title: "Packing group",
        text:
          "The packing group describes the degree of danger of a substance and is essential for selecting permitted dangerous goods packaging. Packing group I indicates high danger, packing group II medium danger and packing group III low danger. Incorrect packing group information can lead to unsuitable packaging, incomplete transport documents or delays during inspections.",
      },
      {
        title: "ADR below 1,000 points",
        text:
          "For certain dangerous goods transports, the exemption under ADR 1.1.3.6 may be relevant. For this purpose, a points calculation is carried out per transport unit based on substance, transport category and quantity. If the calculated value remains within the permitted range, certain relaxations may apply. Nevertheless, classification, packaging, marking, labelling and documentation must still be checked carefully.",
      },
      {
        title: "Limited Quantity (LQ)",
        text:
          "Limited Quantity refers to dangerous goods in limited quantities under ADR Chapter 3.4. Whether LQ may be used depends on the specific goods entry, the permitted quantity per inner packaging, the outer packaging and the required marking. For international transport, a careful check is important because LQ does not automatically mean that all dangerous goods requirements no longer apply.",
      },
    ],
    authorityLinks: [
      {
        label: "UNECE ADR 2025 official files",
        href: "https://unece.org/adr-2025-files",
        source: "UNECE",
      },
      {
        label: "UNECE ADR 2025 Volume I",
        href: "https://unece.org/transport/documents/2025/01/standards/adr-2025-volume-1",
        source: "UNECE",
      },
      {
        label: "HSE guidance on ADR exemptions and small load exemptions",
        href: "https://www.hse.gov.uk/cdg/manual/exemptions.htm",
        source: "Health and Safety Executive",
      },
      {
        label: "BAM overview of dangerous goods regulations",
        href: "https://tes.bam.de/TES/Content/EN/Standardartikel/Set-Of-Rules/Dangerous-Goods/dangerous-goods-regulations.html",
        source: "Federal Institute for Materials Research and Testing",
      },
    ],
    note:
      "This information supports an initial technical assessment. In the transport request, the UN number, packing group, ADR points and Limited Quantity information can be submitted directly so that the operational review can be completed more quickly.",
  },
  sidebar: {
    title: "ADR at a glance",
    items: [
      "International dangerous goods transport",
      "ADR-compliant transport organization",
      "Transit and customs clearance",
      "Focus on Central Asia and the Caucasus",
      "Review of UN number, packing group and ADR class",
      "Assessment of Limited Quantity and ADR exemptions",
      "Support with transport documents and documentation requirements",
    ],
  },
  cta: {
    primary: "Request dangerous goods transport",
    secondary: "Back to services",
  },
};