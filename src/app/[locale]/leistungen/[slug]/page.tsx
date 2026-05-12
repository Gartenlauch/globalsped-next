import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceBySlug, getServiceSlugs } from "@/content/services/de/";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({
    locale: "de",
    slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePage locale={locale} service={service} />;
}