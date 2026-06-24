
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.globalsped.de";

export function absoluteUrl(path = "") {
  if (!path) return siteUrl;

  if (path.startsWith("http")) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}