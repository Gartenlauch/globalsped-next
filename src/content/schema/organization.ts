// src/content/schema/organization.ts

import { absoluteUrl } from "@/lib/seo/urls";

export const globalspedOrganization = {
  "@type": "Organization",
  "@id": `${absoluteUrl()}/#organization`,
  name: "GLOBALSPED Internationale Spedition GmbH",
  alternateName: "GLOBALSPED",
  url: absoluteUrl(),
  logo: absoluteUrl("/images/globalsped_logo.jpg"),
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
      availableLanguage: ["de", "en"],
    },
  ],
};

export const globalspedProfessionalService = {
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl()}/#localbusiness`,
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
    parentOrganization: {
      "@id": `${absoluteUrl()}/#organization`,
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
    "@id": `${absoluteUrl()}/#website`,
    url: absoluteUrl(),
    name: "GLOBALSPED",
    publisher: {
      "@id": `${absoluteUrl()}/#organization`,
    },
    inLanguage: "de-DE",
  };