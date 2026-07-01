import type { Metadata } from "next";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getImpressumContent } from "@/content/legal/impressum";
import { ImpressumPageContent } from "@/components/pages/ImpressumPageContent";
import { redirect } from "next/navigation";
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

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  if (locale === "en") {
    redirect(getLocalizedRoute(locale, "legalNotice"));
  }
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
          { name: "Start", href: `/${locale}` },
          { name: "Impressum", href: pageMeta.path },
        ]}
      />
      <ImpressumPageContent content={content} locale={locale} />
    </>
  );
}