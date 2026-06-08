import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FileText,
  Globe2,
  Route,
  ShieldCheck,
  Truck,
  Thermometer,
  PackageCheck,
} from "lucide-react";
import type { ServicePageContent } from "@/content/services/de/types";

type Props = {
  locale: string;
  service: ServicePageContent;
};

export function ServicePage({ locale, service }: Props) {
  return (
    <main className="bg-[var(--color-global-deep)] text-white [overflow-x:clip]">
      <section className="relative overflow-hidden px-0 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(163,230,53,0.14),transparent_32%)]" />

        <div className="container relative z-10">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
            {service.badge}
          </p>

          <h1 className="max-w-[980px] break-words text-[30px] font-black uppercase leading-[1.08] tracking-tight md:text-[54px]">
            {service.hero.title}
            <span className="block text-lime-300">
              {service.hero.highlight}
            </span>
          </h1>

          <p className="mt-5 max-w-[760px] text-base leading-7 text-white/82 md:mt-6 md:text-lg md:leading-8">
            {service.hero.intro}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8 md:gap-4">
            <Link href={`/${locale}/transport-anfrage`} className="btn-primary">
              {service.cta.primary}
            </Link>

            <Link
              href={`/${locale}#leistungen`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 px-5 py-3 text-center text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-[var(--color-global-dark)] sm:px-7 sm:py-4"
            >
              {service.cta.secondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="container grid min-w-0 items-start gap-6 md:gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-8">
            <ServiceBlock
              icon={<ShieldCheck />}
              title={service.trust.title}
              text={service.trust.text}
              items={service.trust.items}
            />

            {service.temperature && (
              <ServiceTemperatureSection section={service.temperature} />
            )}

            {service.useCases && (
              <ServiceUseCasesSection section={service.useCases} />
            )}

            <ServiceBlock
              icon={<Truck />}
              title={service.services.title}
              text={service.services.text}
              items={service.services.items}
            />

            <ServiceBlock
              icon={<Globe2 />}
              title={service.regions.title}
              text={service.regions.text}
              items={service.regions.items}
            />

            <ServiceBlock
              icon={<Route />}
              title={service.challenges.title}
              text={service.challenges.text}
              items={service.challenges.items}
            />

            <ServiceBlock
              icon={<FileText />}
              title={service.solutions.title}
              text={service.solutions.text}
              items={service.solutions.items}
            />

            {service.gdp && <ServiceDetailNotice section={service.gdp} />}

            {service.expertSection && (
              <ServiceExpertSection section={service.expertSection} />
            )}
          </div>

          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <aside className="min-w-0 rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.76)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-6">
              <h2 className="break-words text-lg font-black uppercase text-lime-300 md:text-xl">
                {service.sidebar.title}
              </h2>

              <div className="mt-6 grid gap-4">
                {service.sidebar.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 border-b border-white/10 pb-4 text-sm leading-6 text-white/82 last:border-b-0"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-lime-300"
                    />
                    <span className="min-w-0 break-words">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/transport-anfrage`}
                className="btn-primary mt-7 w-full justify-center"
              >
                {service.cta.primary}
                <ArrowRight size={17} />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceBlock({
  icon,
  title,
  text,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  items: string[];
}) {
  return (
    <article className="min-w-0 rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.72)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-7">
      <div className="mb-5 flex flex-col gap-3 text-lime-300 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 md:h-12 md:w-12">
          {icon}
        </div>

        <h2 className="break-words text-[21px] font-black uppercase leading-tight text-white md:text-2xl">
          {title}
        </h2>
      </div>

      <p className="text-[15px] leading-7 text-white/78 md:text-base md:leading-8">
        {text}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 md:mt-6">
        {items.map((item) => (
          <div
            key={item}
            className="min-w-0 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/82"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-lime-300" />
            <span className="min-w-0 break-words">{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ServiceTemperatureSection({
  section,
}: {
  section: NonNullable<ServicePageContent["temperature"]>;
}) {
  return (
    <article className="min-w-0 rounded-3xl border border-lime-300/20 bg-lime-300/10 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-7">
      <div className="mb-5 flex flex-col gap-3 text-lime-300 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 md:h-12 md:w-12">
          <Thermometer />
        </div>

        <div>
          <p className="mb-1 text-xs font-black uppercase tracking-[0.22em] text-lime-300">
            {section.eyebrow}
          </p>
          <h2 className="break-words text-[21px] font-black uppercase leading-tight text-white md:text-2xl">
            {section.title}
          </h2>
        </div>
      </div>

      <p className="text-[15px] leading-7 text-white/78 md:text-base md:leading-8">
        {section.text}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {section.facts.map((fact) => (
          <div
            key={fact.value}
            className="rounded-2xl border border-white/10 bg-[rgba(0,40,31,0.58)] p-5"
          >
            <p className="break-words text-xl font-black leading-tight text-lime-300 md:text-[20px]">
              {fact.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/72">{fact.label}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function ServiceUseCasesSection({
  section,
}: {
  section: NonNullable<ServicePageContent["useCases"]>;
}) {
  return (
    <article className="min-w-0 rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.72)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-7">
      <div className="mb-5 flex flex-col gap-3 text-lime-300 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 md:h-12 md:w-12">
          <PackageCheck />
        </div>

        <h2 className="break-words text-[21px] font-black uppercase leading-tight text-white md:text-2xl">
          {section.title}
        </h2>
      </div>

      <p className="text-[15px] leading-7 text-white/78 md:text-base md:leading-8">
        {section.text}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {section.items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h3 className="text-base font-black uppercase text-lime-300">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/76">{item.text}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function ServiceDetailNotice({
  section,
}: {
  section: NonNullable<ServicePageContent["gdp"]>;
}) {
  return (
    <article className="rounded-3xl border border-lime-300/20 bg-[rgba(163,230,53,0.1)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-7">
      <div className="mb-5 flex flex-col gap-3 text-lime-300 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 md:h-12 md:w-12">
          <ShieldCheck />
        </div>

        <h2 className="break-words text-[21px] font-black uppercase leading-tight text-white md:text-2xl">
          {section.title}
        </h2>
      </div>

      <p className="text-[15px] leading-7 text-white/78 md:text-base md:leading-8">
        {section.text}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 md:mt-6">
        {section.items.map((item) => (
          <div
            key={item}
            className="min-w-0 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/82"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-lime-300" />
            <span className="min-w-0 break-words">{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ServiceExpertSection({
  section,
}: {
  section: NonNullable<ServicePageContent["expertSection"]>;
}) {
  return (
    <article className="rounded-3xl border border-lime-300/20 bg-lime-300/10 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-7">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-lime-300">
        {section.badge}
      </p>

      <h2 className="text-2xl font-black uppercase text-white">
        {section.title}
      </h2>

      <p className="mt-4 text-base leading-8 text-white/78">
        {section.intro}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {section.cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/7 p-5"
          >
            <h3 className="text-lg font-black uppercase text-lime-300">
              {card.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/78">
              {card.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 rounded-2xl border border-white/10 bg-[rgba(0,40,31,0.58)] p-5">
        <h3 className="font-black uppercase text-white">
          {section.authorityTitle}
        </h3>

        <div className="mt-4 grid gap-3">
          {section.authorityLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} - externer Link`}
              className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-lime-300/40 hover:bg-lime-300/10"
            >
              <span className="flex items-start gap-2 font-black text-lime-300 group-hover:text-lime-200">
                <span>{link.label}</span>
                <ExternalLink
                  size={15}
                  className="mt-1 shrink-0 opacity-80"
                  aria-hidden="true"
                />
              </span>

              <span className="mt-1 block text-sm text-white/58">
                {link.source}
              </span>
            </a>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-white/68">
        {section.note}
      </p>
    </article>
  );
}