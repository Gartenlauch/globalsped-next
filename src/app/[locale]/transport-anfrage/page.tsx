import { TransportRequestPage } from "@/components/pages/TransportRequestPage";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;

  return <TransportRequestPage locale={locale} />;
}