import { NextRequest, NextResponse } from "next/server";
import { supportedLocales as locales, defaultLocale } from "./content/index";

const productionHosts = new Set([
  "www.globalsped.de",
  "globalsped.de",
]);

const gonePaths = new Set([
  "/transport-russland",
  "/transport-belarus",
]);

function hasLocale(pathname: string) {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

function shouldSkipProxy(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  );
}

function addNoIndexHeaderForNonProduction(
  response: NextResponse,
  request: NextRequest
) {
  const hostname = request.nextUrl.hostname.toLowerCase();

  if (!productionHosts.has(hostname)) {
    response.headers.set("x-robots-tag", "noindex, nofollow");
  }

  return response;
}

function goneResponse() {
  return new NextResponse(
    `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Seite dauerhaft entfernt | GLOBALSPED</title>
</head>
<body>
  <main style="font-family: system-ui, sans-serif; max-width: 720px; margin: 80px auto; padding: 0 24px;">
    <h1>Diese Seite ist dauerhaft entfernt.</h1>
    <p>Die frühere Seite zu diesem Transportziel ist nicht mehr verfügbar.</p>
    <p><a href="/de/ziellaender">Zu den aktuellen Zielländern</a></p>
  </main>
</body>
</html>`,
    {
      status: 410,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "x-robots-tag": "noindex, nofollow",
      },
    }
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldSkipProxy(pathname)) {
    return NextResponse.next();
  }

  const normalizedPathname =
    pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  /**
   * Wichtig:
   * Diese Prüfung muss VOR dem Locale-Redirect kommen.
   * Sonst würde /transport-russland erst auf /de/transport-russland
   * weitergeleitet und nie als 410 Gone ausgeliefert.
   */
  if (gonePaths.has(normalizedPathname)) {
    return goneResponse();
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;

    return addNoIndexHeaderForNonProduction(
      NextResponse.redirect(url),
      request
    );
  }

  if (!hasLocale(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;

    return addNoIndexHeaderForNonProduction(
      NextResponse.redirect(url),
      request
    );
  }

  return addNoIndexHeaderForNonProduction(NextResponse.next(), request);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};