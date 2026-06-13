export function resolveHref(href: string, locale: string) {
    return href.replace("{locale}", locale);
  }