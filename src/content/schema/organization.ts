// src/content/schema/organization.ts

import { absoluteUrl } from "@/lib/seo/urls";

const organizationId = `${absoluteUrl()}/#organization`;
const localBusinessId = `${absoluteUrl()}/#localbusiness`;
const websiteId = `${absoluteUrl()}/#website`;

export const globalspedOrganization = {
  "@type": "Organization",
  "@id": organizationId,
  name: "GLOBALSPED Internationale Spedition GmbH",
  legalName: "GLOBALSPED Internationale Spedition GmbH",
  alternateName: "GLOBALSPED",
  url: absoluteUrl(),
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/images/logo/globalsped-logo.png"),
    contentUrl: absoluteUrl("/images/logo/globalsped-logo.png"),
  },
  description:
    "GLOBALSPED organisiert internationale Transporte, FTL, LTL, Thermotransporte, Gefahrguttransporte, Projektlogistik und Zollabwicklung zwischen Europa, Zentralasien, Kaukasus, Osteuropa und dem Mittleren Osten.",
  email: "info@globalsped.de",
  telephone: "+49 8654 5762-0",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pendelhagen 1",
    postalCode: "83416",
    addressLocality: "Saaldorf-Surheim",
    addressCountry: "DE",
  },
  foundingDate: "1997",
  sameAs: [
    "https://www.linkedin.com/company/globalsped-internationale-spedition-gmbh",
  ],
  areaServed: [
    "Deutschland",
    "Europa",
    "Zentralasien",
    "Kaukasus",
    "Osteuropa",
    "Mittlerer Osten",
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
  knowsAbout: [
    "Internationale Spedition",
    "FTL Komplettladungen",
    "LTL Teilladungen",
    "Thermotransporte",
    "GDP Transporte",
    "Gefahrguttransporte",
    "ADR",
    "Projektlogistik",
    "Zollabwicklung",
    "Export",
    "Import",
    "Transit",
    "Zentralasien",
    "Kaukasus",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+49 8654 5762-0",
      email: "info@globalsped.de",
      contactType: "customer service",
      areaServed: ["DE", "AT", "EU"],
      availableLanguage: ["de"],
    },
  ],
};

export const globalspedProfessionalService = {
  "@type": "ProfessionalService",
  "@id": localBusinessId,
  name: "GLOBALSPED Internationale Spedition GmbH",
  url: absoluteUrl(),
  image: absoluteUrl("/images/og/globalsped-og.jpg"),
  logo: absoluteUrl("/images/logo/globalsped-logo.png"),
  description:
    "Internationale Spedition für Transporte zwischen Europa, Zentralasien, Kaukasus, Osteuropa und dem Mittleren Osten.",
  telephone: "+49 8654 5762-0",
  email: "info@globalsped.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pendelhagen 1",
    postalCode: "83416",
    addressLocality: "Saaldorf-Surheim",
    addressCountry: "DE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  parentOrganization: {
    "@id": organizationId,
  },
  areaServed: [
    "Europa",
    "Zentralasien",
    "Kaukasus",
    "Osteuropa",
    "Mittlerer Osten",
  ],
};

export const globalspedWebSite = {
  "@type": "WebSite",
  "@id": websiteId,
  url: absoluteUrl(),
  name: "GLOBALSPED",
  publisher: {
    "@id": organizationId,
  },
  inLanguage: "de-DE",
};