import { notFound, permanentRedirect } from "next/navigation";
import { getContent } from "@/content";
import { getDestinationPath } from "@/lib/i18n/routes";
import {
  getLocalizedCountrySlug,
  normalizeLocale,
} from "@/lib/i18n/slug-pairs";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function OldCountryRouteRedirect({ params }: Props) {
  const { locale, slug } = await params;

  const targetLocale = normalizeLocale(locale);
  const localizedSlug = getLocalizedCountrySlug(slug, targetLocale);

  const page = getContent(targetLocale).countryPages?.find(
    (item) => item.slug === localizedSlug
  );

  if (!page) {
    notFound();
  }

  permanentRedirect(getDestinationPath(targetLocale, localizedSlug));
}