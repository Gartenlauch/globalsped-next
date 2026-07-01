import { TransportRequestPage } from "@/components/pages/TransportRequestPage";
import type { Metadata } from "next";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { redirect } from "next/navigation";
import { getLocalizedRoute } from "@/lib/i18n/routes";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "en") {
    redirect(getLocalizedRoute(locale, "transportRequest"));
  }
  const metadata = getMetadataContent(locale);

  return buildPageMetadata({
    locale,
    meta: metadata.pages.transportRequest,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={`/${locale}/transport-anfrage`}
        name="Transportanfrage international"
        description="Transportanfrage für FTL, LTL, Thermo, Gefahrgut, Palettenware oder Projektlogistik direkt online stellen."
        type="ContactPage"
      />

      <ServiceJsonLd
        path={`/${locale}/transport-anfrage`}
        name="Internationale Transportanfrage"
        description="Anfrage für internationale Transporte zwischen Europa, Zentralasien, Kaukasus, Osteuropa und dem Mittleren Osten."
        serviceType="Internationale Transport- und Logistikanfrage"
      />
      <TransportRequestPage locale={locale} />
    </>
  );
}