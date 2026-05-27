import { ApplicationPage } from "@/components/pages/ApplicationPage";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function BewerbungPage({ params }: Props) {
  const { locale } = await params;

  return <ApplicationPage locale={locale} />;
}