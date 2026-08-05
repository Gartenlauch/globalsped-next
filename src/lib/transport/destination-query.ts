type SupportedLocale = "de" | "en";

type DestinationDefinition = {
  queryValue: string;
  de: string;
  en: string;
};

const DESTINATIONS: DestinationDefinition[] = [
  {
    queryValue: "kasachstan",
    de: "Kasachstan",
    en: "Kazakhstan",
  },
  {
    queryValue: "usbekistan",
    de: "Usbekistan",
    en: "Uzbekistan",
  },
  {
    queryValue: "kirgisistan",
    de: "Kirgisistan",
    en: "Kyrgyzstan",
  },
  {
    queryValue: "turkmenistan",
    de: "Turkmenistan",
    en: "Turkmenistan",
  },
  {
    queryValue: "tadschikistan",
    de: "Tadschikistan",
    en: "Tajikistan",
  },
  {
    queryValue: "aserbaidschan",
    de: "Aserbaidschan",
    en: "Azerbaijan",
  },
  {
    queryValue: "georgien",
    de: "Georgien",
    en: "Georgia",
  },
  {
    queryValue: "armenien",
    de: "Armenien",
    en: "Armenia",
  },
  {
    queryValue: "mongolei",
    de: "Mongolei",
    en: "Mongolia",
  },
  {
    queryValue: "irak",
    de: "Irak",
    en: "Iraq",
  },
  {
    queryValue: "ukraine",
    de: "Ukraine",
    en: "Ukraine",
  },
];

function normalizeLocale(locale: string): SupportedLocale {
  return locale === "en" ? "en" : "de";
}

function normalizeQueryValue(value: string): string {
  return value.trim().toLocaleLowerCase("de-DE");
}

export function getDestinationCountryFromQuery(
  locale: string,
  queryValue: string | null,
): string | null {
  if (!queryValue) {
    return null;
  }

  const normalizedLocale = normalizeLocale(locale);
  const normalizedQueryValue = normalizeQueryValue(queryValue);

  const destination = DESTINATIONS.find((item) => {
    const acceptedValues = [
      item.queryValue,
      item.de.toLocaleLowerCase("de-DE"),
      item.en.toLocaleLowerCase("en-US"),
    ];

    return acceptedValues.includes(normalizedQueryValue);
  });

  return destination?.[normalizedLocale] ?? null;
}

export function getDestinationQueryValue(
  locale: string,
  country: string,
): string | null {
  const normalizedLocale = normalizeLocale(locale);

  const destination = DESTINATIONS.find(
    (item) =>
      item[normalizedLocale].toLocaleLowerCase() ===
      country.trim().toLocaleLowerCase(),
  );

  return destination?.queryValue ?? null;
}

export function getTransportRequestHref(
  locale: string,
  country?: string,
): string {
  const normalizedLocale = normalizeLocale(locale);

  const basePath =
    normalizedLocale === "en"
      ? "/en/transport-request"
      : "/de/transport-anfrage";

  if (!country) {
    return basePath;
  }

  const destination = getDestinationQueryValue(
    normalizedLocale,
    country,
  );

  if (!destination) {
    return basePath;
  }

  return `${basePath}?destination=${encodeURIComponent(destination)}`;
}