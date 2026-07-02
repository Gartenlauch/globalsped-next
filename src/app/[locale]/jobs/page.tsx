import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { JobsSection } from "@/components/sections/JobsSection";
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
    meta: metadata.pages.jobs,
  });
}

export default async function JobsPage({ params }: Props) {
  const { locale } = await params;

  if (locale === "en") {
    redirect(getLocalizedRoute(locale, "careers"));
  }

  const siteContent = getContent(locale);
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.jobs;

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
            name: siteContent.jobs.badge,
            href: getLocalizedRoute(locale, "careers"),
          },
        ]}
      />
      <JobsSection
        locale={locale}
        applicationHref={getLocalizedRoute(locale, "careersApplication")}
      />
    </>
  );
}