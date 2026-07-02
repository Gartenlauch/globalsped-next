import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { ApplicationPage } from "@/components/pages/ApplicationPage";
import { getContent } from "@/content";
import { getApplicationFormContent } from "@/content/forms/application";
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
    meta: metadata.pages.application,
  });
}

export default async function CareersApplicationAliasPage({ params }: Props) {
  const { locale } = await params;

  if (locale !== "en") {
    redirect(getLocalizedRoute(locale, "careersApplication"));
  }

  const siteContent = getContent(locale);
  const formContent = getApplicationFormContent(locale);
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.application;

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={pageMeta.path}
        name={pageMeta.title}
        description={pageMeta.description}
      />

      <BreadcrumbJsonLd
        items={[
          {
            name: siteContent.navigationActions.homeLabel,
            href: getLocalizedRoute(locale, "home"),
          },
          {
            name: formContent.breadcrumbs.careers,
            href: getLocalizedRoute(locale, "careers"),
          },
          {
            name: formContent.breadcrumbs.application,
            href: getLocalizedRoute(locale, "careersApplication"),
          },
        ]}
      />

      <ApplicationPage locale={locale} />
    </>
  );
}