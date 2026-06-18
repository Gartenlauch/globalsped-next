// src/components/seo/ServiceJsonLd.tsx

import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/seo/urls";

type Props = {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string[];
  additionalType?: string;
};

export function ServiceJsonLd({
  path,
  name,
  description,
  serviceType,
  areaServed = [
    "Europa",
    "Zentralasien",
    "Kaukasus",
    "Osteuropa",
    "Mittlerer Osten",
  ],
  additionalType = "https://schema.org/Service",
}: Props) {
  const pageUrl = absoluteUrl(path);
  const serviceId = `${pageUrl}#service`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    name,
    description,
    serviceType,
    additionalType,
    url: pageUrl,
    provider: {
      "@id": `${absoluteUrl()}/#organization`,
    },
    isPartOf: {
      "@id": `${absoluteUrl()}/#website`,
    },
    areaServed: areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    audience: {
      "@type": "BusinessAudience",
      audienceType:
        "Industrieunternehmen, Exporteure, Importeure, Logistikleiter und Supply-Chain-Manager",
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      availability: "https://schema.org/InStock",
      businessFunction: "https://schema.org/ProvideService",
      itemOffered: {
        "@id": serviceId,
      },
    },
  };

  return <JsonLd data={jsonLd} />;
}