import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { PrivacyPolicyPageContent } from "@/components/pages/PrivacyPolicyPage";
import { getContent } from "@/content";
import { getDatenschutzContent } from "@/content/legal/datenschutz";
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
    meta: metadata.pages.privacy,
  });
}

export default async function PrivacyPolicyAliasPage({ params }: Props) {
  const { locale } = await params;

  if (locale !== "en") {
    redirect(getLocalizedRoute(locale, "privacy"));
  }

  const siteContent = getContent(locale);
  const content = getDatenschutzContent(locale);
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.privacy;

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

      <PrivacyPolicyPageContent content={content} locale={locale} />
    </>
  );
}