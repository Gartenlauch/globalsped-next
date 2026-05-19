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
    <main className="bg-[var(--color-global-deep)] text-white">
      <section className="relative overflow-hidden pt-36 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(163,230,53,0.14),transparent_32%)]" />

        <div className="container relative z-10">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
            {service.badge}
          </p>

          <h1 className="max-w-[980px] text-[34px] font-black uppercase leading-[1.05] md:text-[54px]">
            {service.hero.title}
            <span className="block text-lime-300">
              {service.hero.highlight}
            </span>
          </h1>

          <p className="mt-6 max-w-[760px] text-lg leading-8 text-white/82">
            {service.hero.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/${locale}/transport-anfrage`} className="btn-primary">
              {service.cta.primary}
            </Link>

            <Link
              href={`/${locale}#leistungen`}
              className="inline-flex items-center rounded-full border border-white/25 px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-[var(--color-global-dark)]"
            >
              {service.cta.secondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="container grid gap-10 lg:grid-cols-[1fr_360px]">
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

          <aside className="h-fit rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.76)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl lg:sticky lg:top-28">
            <h2 className="text-xl font-black uppercase text-lime-300">
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
    <article className="rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.72)] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-4 text-lime-300">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10">
          {icon}
        </div>

        <h2 className="text-2xl font-black uppercase text-white">{title}</h2>
      </div>

      <p className="text-base leading-8 text-white/78">{text}</p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/82"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-lime-300" />
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}