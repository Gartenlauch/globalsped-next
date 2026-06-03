// src/components/seo/ServiceJsonLd.tsx

import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/seo/urls";

type Props = {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string[];
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
}: Props) {
  const pageUrl = absoluteUrl(path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name,
    description,
    serviceType,
    url: pageUrl,
    provider: {
      "@id": `${absoluteUrl()}/#organization`,
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
  };

  return <JsonLd data={jsonLd} />;
}