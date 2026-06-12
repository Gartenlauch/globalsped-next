import { notFound, permanentRedirect } from "next/navigation";
import { getContent } from "@/content";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const countryPages = getContent("de").countryPages ?? [];

  return countryPages.map((page) => ({
    locale: "de",
    slug: page.slug,
  }));
}

export default async function OldCountryRouteRedirect({ params }: Props) {
  const { locale, slug } = await params;

  const page = getContent(locale).countryPages?.find(
    (countryPage) => countryPage.slug === slug
  );

  if (!page) {
    notFound();
  }

  permanentRedirect(`/${locale}/ziellaender/${slug}`);
}