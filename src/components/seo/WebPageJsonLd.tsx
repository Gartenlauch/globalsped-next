// src/components/seo/WebPageJsonLd.tsx

import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/seo/urls";

type Props = {
  locale: string;
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage";
  mainEntityId?: string;
};

export function WebPageJsonLd({
  locale,
  path,
  name,
  description,
  type = "WebPage",
  mainEntityId,
}: Props) {
  const pageUrl = absoluteUrl(path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: locale === "de" ? "de-DE" : locale,
    isPartOf: {
      "@id": `${absoluteUrl()}/#website`,
    },
    publisher: {
      "@id": `${absoluteUrl()}/#organization`,
    },
    ...(mainEntityId
      ? {
          mainEntity: {
            "@id": mainEntityId,
          },
        }
      : {}),
  };

  return <JsonLd data={jsonLd} />;
}