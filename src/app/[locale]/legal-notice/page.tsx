import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { ImpressumPageContent } from "@/components/pages/ImpressumPageContent";
import { getContent } from "@/content";
import { getImpressumContent } from "@/content/legal/impressum";
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
    meta: metadata.pages.imprint,
  });
}

export default async function LegalNoticeAliasPage({ params }: Props) {
  const { locale } = await params;

  if (locale !== "en") {
    redirect(getLocalizedRoute(locale, "legalNotice"));
  }

  const siteContent = getContent(locale);
  const content = getImpressumContent(locale);
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.imprint;

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
            name: content.title,
            href: pageMeta.path,
          },
        ]}
      />

      <ImpressumPageContent content={content} locale={locale} />
    </>
  );
}