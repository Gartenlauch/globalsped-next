import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { ServicesSection } from "@/components/sections/ServicesSection";
import { getContent } from "@/content";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ServiceCatalogJsonLd } from "@/components/seo/ServiceCatalogJsonLd";
import { getServicesCatalogSchema } from "@/content/schema/services";
import { getLocalizedRoute } from "@/lib/i18n/routes";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "en") {
    const metadata = getMetadataContent(locale);

    return buildPageMetadata({
      locale,
      meta: metadata.pages.services,
    });
  }

  const metadata = getMetadataContent(locale);

  return buildPageMetadata({
    locale,
    meta: metadata.pages.services,
  });
}

export default async function ServicesAliasPage({ params }: Props) {
  const { locale } = await params;

  if (locale !== "en") {
    redirect(getLocalizedRoute(locale, "services"));
  }

  const siteContent = getContent(locale);
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.services;
  const servicesCatalogSchema = getServicesCatalogSchema(locale);

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={pageMeta.path}
        name={pageMeta.title}
        description={pageMeta.description}
        type="CollectionPage"
      />

      <ServiceCatalogJsonLd
        path={pageMeta.path}
        name={servicesCatalogSchema.name}
        description={servicesCatalogSchema.description}
        services={servicesCatalogSchema.services}
      />

      <BreadcrumbJsonLd
        items={[
          {
            name: siteContent.navigationActions.homeLabel,
            href: getLocalizedRoute(locale, "home"),
          },
          {
            name: siteContent.services.badge,
            href: pageMeta.path,
          },
        ]}
      />

      <ServicesSection locale={locale} />
    </>
  );
}