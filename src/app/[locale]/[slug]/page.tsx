import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getContent } from "@/content";
import { CountryTransportPage } from "@/components/pages/CountryTransportPage";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const metadata = getMetadataContent(locale);

  const countryMeta = metadata.countries[slug];

  if (!countryMeta) {
    return buildPageMetadata({
      locale,
      meta: metadata.pages.notFound,
    });
  }

  return buildPageMetadata({
    locale,
    meta: {
      title: countryMeta.title,
      description: countryMeta.description,
      path: `/${locale}/${slug}`,
      ogTitle: countryMeta.ogTitle,
      ogDescription: countryMeta.ogDescription,
      ogImage: countryMeta.ogImage,
    },
  });
}

export default async function DynamicCountryPage({ params }: Props) {
  const { locale, slug } = await params;
  const page = getContent(locale).countryPages?.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  return <CountryTransportPage locale={locale} page={page} />;
}