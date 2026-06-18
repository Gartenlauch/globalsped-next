import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/seo/urls";

type Props = {
  path: string;
  countryName: string;
  title: string;
  description: string;
};

export function CountryTransportJsonLd({
  path,
  countryName,
  title,
  description,
}: Props) {
  const pageUrl = absoluteUrl(path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#transport-service`,
    name: title,
    description,
    serviceType: `Internationale Transporte nach ${countryName}`,
    url: pageUrl,
    provider: {
      "@id": `${absoluteUrl()}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: countryName,
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Industrieunternehmen, Exporteure, Importeure, Logistikleiter und Supply-Chain-Manager",
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      availability: "https://schema.org/InStock",
      businessFunction: "https://schema.org/ProvideService",
      itemOffered: {
        "@id": `${pageUrl}#transport-service`,
      },
    },
  };

  return <JsonLd data={jsonLd} />;
}