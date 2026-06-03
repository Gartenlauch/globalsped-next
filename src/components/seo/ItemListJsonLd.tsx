// src/components/seo/ItemListJsonLd.tsx

import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/seo/urls";

type Item = {
  name: string;
  href: string;
};

type Props = {
  name: string;
  items: Item[];
};

export function ItemListJsonLd({ name, items }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.href),
    })),
  };

  return <JsonLd data={jsonLd} />;
}