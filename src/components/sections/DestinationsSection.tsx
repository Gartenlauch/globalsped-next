import Image from "next/image";
import Link from "next/link";
import { Globe2, MapPin, Route, ShieldCheck, Truck } from "lucide-react";
import { getContent } from "@/content";

type Props = {
  locale: string;
};

const regionIcons = {
  zentralasien: Route,
  kaukasus: ShieldCheck,
  "mittlerer-osten": Globe2,
};

export function DestinationsSection({ locale }: Props) {
  const t = getContent(locale).destinations;
  const allCountries = t.regions.flatMap((region) =>
    region.countries.map((country) => ({
      ...country,
      region: region.title,
    }))
  );

  return (
    <section
      id="destinationen"
      className="relative overflow-hidden bg-[var(--color-global-deep)] py-24 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(163,230,53,0.14),transparent_32%),linear-gradient(135deg,rgba(0,40,31,1),rgba(0,59,47,0.94))]" />

      <div className="container relative z-10">
        <div className="max-w-[920px]">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
            {t.badge}
          </p>

          <h2 className="text-[30px] font-black uppercase leading-[1.05] md:text-[38px]">
            {t.title}
            <span className="block text-lime-300">{t.highlight}</span>
          </h2>

          <p className="mt-6 max-w-[780px] text-base leading-8 text-white/86 md:text-lg">
            {t.intro}
          </p>
        </div>

        {/* Premium Region Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.regions.map((region) => {
            const Icon =
              regionIcons[region.slug as keyof typeof regionIcons] ?? Globe2;

            return (
              <article
                key={region.slug}
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/8 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-lime-300/50 hover:shadow-[0_36px_100px_rgba(107,159,18,0.20)]"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={region.image}
                    alt={`Internationale Transporte nach ${region.title}`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,40,31,0.88)_100%)]" />
                </div>

                <div className="relative p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 text-lime-300 shadow-[0_0_28px_rgba(163,230,53,0.18)]">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>

                    <h3 className="text-xl font-black uppercase tracking-wide text-lime-300">
                      {region.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-6 text-white/84">
                    {region.subtitle}
                  </p>

                  <ul className="mt-5 grid gap-2 text-sm font-semibold text-white/90">
                    {region.countries.map((country) => {
                      if(country.slug==='ukraine')
                        return null
                      return (
                      <li key={country.slug} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(163,230,53,0.85)]" />
                        {country.name}
                      </li>
                    )})}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* Country Image Grid */}
        <div className="mt-20">
          <div className="mb-8 max-w-[820px]">
            <p className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.25em] text-lime-300">
              <Truck size={16} />
              Zielländer
            </p>

            <h3 className="text-[26px] font-black uppercase leading-tight md:text-[34px]">
              {t.countryGridTitle}
            </h3>

            <p className="mt-4 text-base leading-7 text-white/78">
              {t.countryGridIntro}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {allCountries.map((country) => (
              <Link
              href={`/${locale}/transport-${country.slug}`}
              key={country.slug}
              className="group relative h-[210px] overflow-hidden rounded-2xl border border-white/12 bg-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.30)]"
            >
                <Image
                  src={`/images/countries/${country.slug}.jpg`}
                  alt={`Transport nach ${country.name}`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,40,31,0.85)_100%)] transition group-hover:bg-[rgba(0,40,31,0.55)]" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="mb-2 flex items-center gap-2 text-lime-300">
                    <MapPin size={16} />
                    <span className="text-xs font-bold uppercase tracking-wide">
                      {country.region}
                    </span>
                  </div>

                  <h4 className="text-xl font-black uppercase text-white">
                    {country.name}
                  </h4>

                  {country.cities && country.cities.length > 0 && (
                    <p className="mt-2 line-clamp-2 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {country.cities.join(" · ")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Link href={t.cta.href} className="btn-primary">
            {t.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}