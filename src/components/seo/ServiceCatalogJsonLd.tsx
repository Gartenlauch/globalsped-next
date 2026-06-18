import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/seo/urls";

type CatalogService = {
  name: string;
  description: string;
  url: string;
};

type Props = {
  path: string;
  name: string;
  description: string;
  services: readonly CatalogService[];
};

export function ServiceCatalogJsonLd({
  path,
  name,
  description,
  services,
}: Props) {
  const pageUrl = absoluteUrl(path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${pageUrl}#service-catalog`,
    name,
    description,
    url: pageUrl,
    itemListElement: services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: absoluteUrl(service.url),
        provider: {
          "@id": `${absoluteUrl()}/#organization`,
        },
      },
    })),
  };

  return <JsonLd data={jsonLd} />;
}