import Link from "next/link";
import {
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Landmark,
  Route,
  ShieldCheck,
} from "lucide-react";
import { getContent } from "@/content";

type Props = {
  locale: string;
};

const processIcons = [FileText, Route, Landmark, ClipboardCheck];

export function CustomsSection({ locale }: Props) {
  const t = getContent(locale).customs;

  return (
    <section
      id="zollabwicklung"
      className="relative overflow-hidden bg-[var(--color-global-deep)] py-28 text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url(/images/customs/customs-map.jpg)" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,40,31,0.85)_0%,rgba(0,40,31,0.75)_35%,rgba(0,40,31,0.65)_60%,rgba(0,40,31,0.85)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(163,230,53,0.18),transparent_30%)]" />

      <div className="container relative z-10">
        <div className="max-w-[980px]">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
            {t.badge}
          </p>

          <h2 className="text-[30px] font-black uppercase leading-[1.05] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] md:text-[40px]">
            {t.title}
            <span className="block text-lime-300">{t.highlight}</span>
          </h2>

          <p className="text-white/95 leading-7 max-w-[720px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            {t.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-4">
          {t.processItems.map((item, index) => {
            const Icon = processIcons[index] ?? ShieldCheck;

            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(0,40,31,0.78)] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.50)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-lime-300/45 hover:shadow-[0_30px_100px_rgba(163,230,53,0.15)]"
              >
                <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-lime-300/16 blur-3xl transition group-hover:bg-lime-300/28" />

                <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 text-lime-300">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                <h3 className="relative text-lg font-black uppercase text-lime-300">
                  {item.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-white/84">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-3xl border border-white/10 bg-[rgba(0,40,31,0.80)] p-7 shadow-[0_25px_80px_rgba(0,0,0,0.50)] backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3 text-lime-300">
              <FileText size={24} />
              <h3 className="text-xl font-black uppercase">
                {t.requiredTitle}
              </h3>
            </div>

            <p className="text-sm leading-7 text-white/78">
              {t.requiredIntro}
            </p>

            <ul className="mt-6 grid gap-3">
              {t.requiredDocuments.map((document) => (
                <li
                  key={document}
                  className="flex items-start gap-3 text-sm text-white/88"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-lime-300"
                  />
                  {document}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href={t.cta.href} className="btn-primary">
                {t.cta.label}
              </Link>
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-[rgba(0,40,31,0.80)] p-7 shadow-[0_25px_80px_rgba(0,0,0,0.50)] backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3 text-lime-300">
              <ShieldCheck size={24} />
              <h3 className="text-xl font-black uppercase">
                {t.benefitTitle}
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {t.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl border border-white/12 bg-white/8 p-4"
                >
                  <div className="mb-3 h-[3px] w-10 rounded-full bg-lime-300 shadow-[0_0_16px_rgba(163,230,53,0.55)]" />
                  <p className="text-sm font-semibold leading-6 text-white/86">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}