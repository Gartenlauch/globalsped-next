import { notFound, permanentRedirect } from "next/navigation";
import { getContent } from "@/content";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function OldCountryRouteRedirect({ params }: Props) {
  const { locale, slug } = await params;
  const page = getContent(locale).countryPages?.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  permanentRedirect(`/${locale}/ziellaender/${slug}`);
}