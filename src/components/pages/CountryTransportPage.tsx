import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Route,
  ShieldCheck,
  Truck,
} from "lucide-react";

import type { CountryTransportPage as CountryTransportPageType } from "@/content/types";

type Props = {
  locale: string;
  page: CountryTransportPageType;
};

function splitRuntime(value: string) {
  const match = value.match(/^(ca\.\s*\d+\s*[–-]\s*\d+\s*Tage)(.*)$/i);

  return {
    main: match?.[1] ?? value,
    note: match?.[2]?.trim() ?? "",
  };
}

export function CountryTransportPage({ locale, page }: Props) {
  const runtime = splitRuntime(page.transportDetails.runtime.value);

  return (
    <main className="bg-[var(--color-global-deep)] text-white">

      {/* HERO */}
      <section className="relative min-h-[620px] overflow-hidden">
        <Image
          src={page.heroImage}
          alt={`Transport nach ${page.country}`}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,40,31,0.9)_0%,rgba(0,59,47,0.7)_50%,rgba(0,40,31,0.3)_100%)]" />

        <div className="container relative z-10 flex min-h-[620px] items-center">
          <div className="max-w-[820px]">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
              {page.region}
            </p>

            <h1 className="text-[34px] font-black uppercase leading-[1.05] md:text-[48px]">
              {page.title}
              <span className="block text-lime-300">{page.highlight}</span>
            </h1>

            <p className="mt-6 max-w-[680px] text-lg leading-8 text-white/88">
              {page.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={page.cta.href} className="btn-primary">
                {page.cta.label}
              </Link>

              <Link
                href={`/${locale}#destinationen`}
                className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[var(--color-global-dark)]"
              >
                {page.labels.backToDestinations}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(163,230,53,0.10),transparent_32%)]" />

        <div className="container relative z-10">
          {/* Intro */}
          <div className="max-w-[900px]">
            <p className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.25em] text-lime-300">
              <Truck size={16} />
              {page.labels.introBadge}
            </p>

            <h2 className="text-[28px] font-black uppercase leading-tight md:text-[38px]">
              {page.labels.logisticsTitlePrefix} {page.country}
            </h2>

            <p className="mt-6 text-base leading-8 text-white/82">
              {page.seoText}
            </p>
          </div>

          {/* Services */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.services.map((service) => (
              <div
                key={service}
                className="flex gap-3 rounded-2xl border border-white/12 bg-white/8 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <CheckCircle2 className="mt-1 shrink-0 text-lime-300" size={20} />
                <p className="text-sm font-semibold leading-6 text-white/88">
                  {service}
                </p>
              </div>
            ))}
          </div>

          {/* Route full width */}
          <article className="mt-14 rounded-3xl border border-white/15 bg-white/8 p-7 shadow-xl backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3 text-lime-300">
              <Route size={24} />
              <h3 className="text-xl font-black uppercase">
                {page.transportDetails.route.label}
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {page.transportDetails.route.routes.map((route) => (
                <div key={route.title}>
                  <h4 className="font-black uppercase text-white">{route.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-white/78">
                    {route.description}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Compact Info Grid */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Laufzeit */}
            <article className="rounded-3xl border border-white/15 bg-white/8 p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3 text-lime-300">
                <Clock size={22} />
                <h3 className="text-lg font-black uppercase">
                  {page.transportDetails.runtime.label}
                </h3>
              </div>

              <div>
                <p className="text-[28px] font-black leading-tight text-white md:text-[32px]">
                  {runtime.main}
                </p>

                {runtime.note && (
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/68 md:text-base">
                    {runtime.note}
                  </p>
                )}
              </div>
            </article>

            {/* Zielorte */}
            <article className="rounded-3xl border border-white/15 bg-white/8 p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3 text-lime-300">
                <MapPin size={22} />
                <h3 className="text-lg font-black uppercase">{page.labels.citiesTitle}
                </h3></div>
              <ul className="grid gap-2">
                {page.cities.map((city) => (
                  <li key={city} className="flex items-center gap-2 text-sm text-white/86">
                    <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_10px_rgba(163,230,53,0.75)]" />
                    {city}
                  </li>
                ))}
              </ul>
            </article>

            {/* Zollamt */}
            <article className="rounded-3xl border border-white/15 bg-white/8 p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3 text-lime-300">
                <ShieldCheck size={22} />
                <h3 className="text-lg font-black uppercase">
                  {page.transportDetails.customsOffice.label}
                </h3>
              </div>

              <ul className="grid gap-3">
                {page.transportDetails.customsOffice.offices.map((item) => (
                  <li key={`${item.route}-${item.office}`} className="text-sm leading-6 text-white/82">
                    <span className="font-black text-white">{item.route}:</span>{" "}
                    {item.office}
                  </li>
                ))}
              </ul>
            </article>

            {/* Unterlagen */}
            <article className="rounded-3xl border border-white/15 bg-white/8 p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3 text-lime-300">
                <FileText size={22} />
                <h3 className="text-lg font-black uppercase">
                  {page.transportDetails.documents.label}
                </h3>
              </div>

              <ul className="grid gap-2">
                {page.transportDetails.documents.documents.map((doc) => (
                  <li key={doc} className="flex items-center gap-2 text-sm text-white/86">
                    <CheckCircle2 size={15} className="shrink-0 text-lime-300" />
                    {doc}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* Documents note */}
          <div className="mt-6 rounded-3xl border border-lime-300/20 bg-lime-300/10 p-5 text-sm leading-7 text-white/82 shadow-xl backdrop-blur-xl">
            {page.transportDetails.documents.note}
          </div>

          {/* Required Information */}
          <article className="mt-6 rounded-3xl border border-white/15 bg-white/8 p-7 shadow-xl backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3 text-lime-300">
              <Truck size={24} />
              <h3 className="text-xl font-black uppercase">
                {page.transportDetails.requiredInformation.label}
              </h3>
            </div>

            <p className="text-sm leading-7 text-white/78">
              {page.transportDetails.requiredInformation.intro}
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {page.transportDetails.requiredInformation.items.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-white/86">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-lime-300" />
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 text-[var(--color-global-dark)]">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--color-global-medium)]">
              {page.labels.authorityBadge}
            </p>

            <h2 className="mt-3 text-[28px] font-black uppercase md:text-[36px]">
              {page.countryAuthorityContent.title}
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-700">
              {page.countryAuthorityContent.intro}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4">
              {page.countryAuthorityContent.operationalHints.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-black/10 bg-[var(--color-global-light)] p-6 shadow-sm"
                >
                  <h3 className="text-lg font-black">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>

            <aside className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black uppercase">
                {page.labels.authorityLinksTitle}
              </h3>

              <div className="mt-5 grid gap-4">
                {page.countryAuthorityContent.authorityLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-black/10 bg-[var(--color-global-light)] p-4 transition hover:border-[var(--color-global-medium)]"
                  >
                    <span className="block text-sm font-black uppercase text-[var(--color-global-medium)]">
                      {link.topic}
                    </span>

                    <span className="mt-1 block font-black">
                      {link.label}
                    </span>

                    <span className="mt-2 block text-sm leading-6 text-slate-600">
                      {link.source}
                    </span>
                  </a>
                ))}
              </div>

              {page.countryAuthorityContent.internalLinks.length > 0 && (
                <div className="mt-8 border-t border-black/10 pt-6">
                  <h4 className="font-black uppercase">
                    {page.labels.internalLinksTitle}
                  </h4>

                  <div className="mt-4 grid gap-3">
                    {page.countryAuthorityContent.internalLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="font-bold text-[var(--color-global-medium)] hover:underline"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          <div className="mt-10">
            <Link href={page.cta.href} className="btn-primary">
              {page.cta.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}