import { JobsSection } from "@/components/sections/JobsSection";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function JobsPage({ params }: Props) {
  const { locale } = await params;

  return <JobsSection locale={locale} />;
}