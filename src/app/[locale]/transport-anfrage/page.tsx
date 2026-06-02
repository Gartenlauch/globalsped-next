import { TransportRequestPage } from "@/components/pages/TransportRequestPage";
import type { Metadata } from "next";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";

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
    meta: metadata.pages.transportRequest,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  return <TransportRequestPage locale={locale} />;
}