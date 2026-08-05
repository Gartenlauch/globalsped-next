import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { TransportRequestPage } from "@/components/pages/TransportRequestPage";
import { getContent } from "@/content";
import { getTransportRequestContent } from "@/content/forms/transport";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getLocalizedRoute } from "@/lib/i18n/routes";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    destination?: string | string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getMetadataContent(locale);

  return buildPageMetadata({
    locale,
    meta: metadata.pages.transportRequest,
  });
}

export default async function TransportRequestAliasPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  const initialDestinationQuery =
    typeof resolvedSearchParams.destination === "string"
      ? resolvedSearchParams.destination
      : undefined;

  if (locale !== "en") {
    const targetPath = getLocalizedRoute(locale, "transportRequest");

    redirect(
      initialDestinationQuery
        ? `${targetPath}?destination=${encodeURIComponent(
          initialDestinationQuery,
        )}`
        : targetPath,
    );
  }

  const siteContent = getContent(locale);
  const formContent = getTransportRequestContent(locale);

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={formContent.routes.pagePath}
        name={formContent.structuredData.pageName}
        description={formContent.structuredData.pageDescription}
      />

      <ServiceJsonLd
        path={formContent.routes.pagePath}
        name={formContent.structuredData.serviceName}
        description={formContent.structuredData.serviceDescription}
        serviceType={formContent.structuredData.serviceName}
      />

      <BreadcrumbJsonLd
        items={[
          {
            name: siteContent.navigationActions.homeLabel,
            href: getLocalizedRoute(locale, "home"),
          },
          {
            name: formContent.structuredData.pageName,
            href: formContent.routes.pagePath,
          },
        ]}
      />

      <TransportRequestPage
        locale={locale}
        initialDestinationQuery={initialDestinationQuery}
      />
    </>
  );
}