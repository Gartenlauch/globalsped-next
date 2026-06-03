import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollHandler } from "@/app/[locale]/SmothScroll";
import { CookieConsentBanner } from "@/components/cookies/CookieConsentBanner";
import type { Metadata } from "next";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { GlobalJsonLd } from "@/components/seo/GlobalJsonLd";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getMetadataContent(locale);

  return buildPageMetadata({
    locale,
    meta: metadata.pages.home,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale}/>
      <ScrollHandler />
      <GlobalJsonLd />
      {children}
      <CookieConsentBanner locale={locale} />
      <Footer locale={locale} />
    </>
  );
}