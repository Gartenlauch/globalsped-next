import { DestinationsSection } from "@/components/sections/DestinationsSection";
import type { Metadata } from "next";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getMetadataContent(locale);

  return buildPageMetadata({
    locale,
    meta: metadata.pages.destinations,
  });
}

export default async function TargetCountriesPage({ params }: Props) {
  const { locale } = await params;
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.destinations;

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={`/${locale}/ziellaender`}
        name={metadata.pages.destinations.title}
        description={metadata.pages.destinations.description}
        type="CollectionPage"
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: `/${locale}` },
          { name: "Zielländer", href: `/${locale}/ziellaender` },
        ]}
      />

      <DestinationsSection locale={locale} />
    </>
  );
}