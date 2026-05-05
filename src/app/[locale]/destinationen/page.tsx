import { DestinationsSection } from "@/components/sections/DestinationsSection";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function DestinationsPage({ params }: Props) {
  const { locale } = await params;

  return <DestinationsSection locale={locale} />;
}