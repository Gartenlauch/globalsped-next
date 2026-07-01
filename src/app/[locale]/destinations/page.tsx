import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { getContent } from "@/content";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getLocalizedRoute } from "@/lib/i18n/routes";

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

export default async function DestinationsAliasPage({ params }: Props) {
  const { locale } = await params;

  if (locale !== "en") {
    redirect(getLocalizedRoute(locale, "destinations"));
  }

  const siteContent = getContent(locale);
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.destinations;

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={pageMeta.path}
        name={pageMeta.title}
        description={pageMeta.description}
        type="CollectionPage"
      />

      <BreadcrumbJsonLd
        items={[
          {
            name: siteContent.navigationActions.homeLabel,
            href: getLocalizedRoute(locale, "home"),
          },
          {
            name: siteContent.destinations.badge,
            href: pageMeta.path,
          },
        ]}
      />

      <DestinationsSection locale={locale} />
    </>
  );
}