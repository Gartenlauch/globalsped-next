import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { AboutUsSection } from "@/components/sections/AboutUsSection";
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
    meta: metadata.pages.about,
  });
}

export default async function AboutUsAliasPage({ params }: Props) {
  const { locale } = await params;

  if (locale !== "en") {
    redirect(getLocalizedRoute(locale, "about"));
  }

  const siteContent = getContent(locale);
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.about;

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={pageMeta.path}
        name={pageMeta.title}
        description={pageMeta.description}
        type="AboutPage"
      />

      <BreadcrumbJsonLd
        items={[
          {
            name: siteContent.navigationActions.homeLabel,
            href: getLocalizedRoute(locale, "home"),
          },
          {
            name: siteContent.aboutUs.badge,
            href: pageMeta.path,
          },
        ]}
      />

      <AboutUsSection locale={locale} />
    </>
  );
}