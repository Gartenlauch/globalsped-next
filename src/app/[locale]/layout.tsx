import "../globals.css";
import { SmartBackButton } from "@/components/navigation/SmartBackButton";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { supportedLocales } from "@/content/index";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollHandler } from "@/app/[locale]/SmothScroll";
import { CookieConsentBanner } from "@/components/cookies/CookieConsentBanner";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { GlobalJsonLd } from "@/components/seo/GlobalJsonLd";
import { siteConfig, siteUrl } from "@/content/metadata/config";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});


type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getMetadataContent(locale);

  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteConfig.siteName,
    ...buildPageMetadata({
      locale,
      meta: metadata.pages.home,
    }),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${openSans.variable}`}
    >
      <body>
        <Header locale={locale} />
        <ScrollHandler />
        <GlobalJsonLd />
        {children}
        <SmartBackButton locale={locale} />
        <CookieConsentBanner locale={locale} />
        <Footer locale={locale} />
      </body>
    </html>
  );
}