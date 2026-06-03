// src/components/seo/FaqJsonLd.tsx

import type { FaqItem } from "@/content/faq";
import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/seo/urls";

type Props = {
  faqs: FaqItem[];
  pagePath: string;
};

export function FaqJsonLd({ faqs, pagePath }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(pagePath)}#faq`,
    url: absoluteUrl(pagePath),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={jsonLd} />;
}