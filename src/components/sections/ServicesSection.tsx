import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  CheckCircle2,
  FileCheck2,
  ShieldAlert,
  Thermometer,
  Truck,
  Warehouse,
} from "lucide-react";
import { getContent } from "@/content";

type Props = {
  locale: string;
};

const serviceIcons = {
  truck: Truck,
  boxes: Boxes,
  temperature: Thermometer,
  crane: Warehouse,
  fileShield: FileCheck2,
  shield: ShieldAlert,
};

export function ServicesSection({ locale }: Props) {
  const t = getContent(locale).services;

  return (
    <section
      id="leistungen"
      className="relative overflow-hidden bg-[var(--color-global-deep)] py-28 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(163,230,53,0.12),transparent_32%)]" />

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
              {t.badge}
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[46px]">
              {t.title}
              <span className="block text-lime-300">{t.highlight}</span>
            </h2>

            <p className="mt-6 max-w-[760px] text-base leading-8 text-white/84 md:text-lg">
              {t.intro}
            </p>

            <div className="mt-8">
              <Link href={t.cta.href} className="btn-primary">
                {t.cta.label}
              </Link>
            </div>
          </div>

          <div className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
            <Image
              src={t.imageOne.src}
              alt={t.imageOne.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.28)_100%)]" />
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {t.serviceItems.map((item) => {
            const Icon =
              serviceIcons[item.icon as keyof typeof serviceIcons] ?? Truck;

            return (
              <article
                key={item.title}
                className="group relative flex min-h-[255px] flex-col overflow-hidden rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.72)] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-lime-300/45 hover:shadow-[0_30px_100px_rgba(163,230,53,0.16)]"
              >
                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-lime-300/10 blur-3xl transition group-hover:bg-lime-300/20" />

                <div className="relative mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 text-lime-300 shadow-[0_0_24px_rgba(163,230,53,0.16)]">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <h3 className="max-w-[320px] text-center text-lg font-semibold leading-tight tracking-[-0.025em] text-white">
                    {item.title}
                  </h3>
                </div>

                <p className="relative flex-1 text-sm leading-6 text-white/78">
                  {item.text}
                </p>

                <Link
                  href={item.href}
                  className="relative mt-4 inline-flex items-center text-sm font-black uppercase tracking-wide text-lime-300 transition hover:text-lime-200"
                >
                  {t.learnMoreLabel}
                  <span className="ml-2 transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
            <Image
              src={t.imageTwo.src}
              alt={t.imageTwo.alt}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.22)_100%)]" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
              {t.strengthsBadge}
            </p>

            <h3 className="text-[28px] leading-tight md:text-[38px]">
              {t.strengthsTitle}
            </h3>

            <div className="mt-8 grid gap-4">
              {t.strengths.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 border-b border-white/12 pb-4"
                >
                  <CheckCircle2 className="mt-1 shrink-0 text-lime-300" />
                  <div>
                    <h4 className="font-black uppercase text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-white/74">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href={t.cta.href}
            className="inline-flex items-center rounded-full bg-lime-300 px-10 py-5 text-sm font-black uppercase tracking-[0.12em] text-[var(--color-global-dark)] shadow-[0_15px_45px_rgba(163,230,53,0.30)] transition duration-300 hover:scale-[1.03] hover:bg-lime-200 hover:shadow-[0_20px_60px_rgba(163,230,53,0.45)]"
          >
            {t.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}