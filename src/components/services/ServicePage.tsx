import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe2,
  Route,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { ServicePageContent } from "@/content/services/de/types";

type Props = {
  locale: string;
  service: ServicePageContent;
};

export function ServicePage({ locale, service }: Props) {

  return (
    <main className="overflow-x-hidden bg-[var(--color-global-deep)] text-white">
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
        <div className="container grid min-w-0 gap-6 md:gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-8">
            <ServiceBlock
              icon={<ShieldCheck />}
              title={service.trust.title}
              text={service.trust.text}
              items={service.trust.items}
            />

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
          </div>

          <aside className="min-w-0 h-fit rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.76)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-6 lg:sticky lg:top-28">
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
                  {item}
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