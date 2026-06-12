"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Globe2,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { getContent } from "@/content";

type Props = {
  locale: string;
};

const teaserIcons = {
  truck: Truck,
  globe: Globe2,
  briefcase: BriefcaseBusiness,
  shield: ShieldCheck,
};

export function HomeTeaserSection({ locale }: Props) {
  const t = getContent(locale).homeTeasers;
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const resolveHref = (href: string) => href.replace("{locale}", locale);

  const markLoaded = (id: string) => {
    setLoadedImages((current) => ({
      ...current,
      [id]: true,
    }));
  };

  return (
    <section className="relative overflow-hidden bg-[var(--color-global-light)] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(107,159,18,0.10),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(0,59,47,0.08),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-black uppercase tracking-[0.22em] text-[var(--color-global-green)]">
            {t.badge}
          </span>

          <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-[var(--color-global-dark)] md:text-5xl">
            {t.title}{" "}
            <span className="text-[var(--color-global-green)]">
              {t.highlight}
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-700">{t.intro}</p>
        </div>

        <div className="grid gap-10">
          {t.items.map((item, index) => {
            const Icon =
              teaserIcons[item.icon as keyof typeof teaserIcons] ?? Truck;
            const isReverse = index % 2 === 1;
            const isLoaded = loadedImages[item.id];

            return (
              <article
                id={item.anchorId}
                key={item.id}
                style={{ animationDelay: `${index * 120}ms` }}
                className="home-teaser-card scroll-mt-28 overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_28px_90px_rgba(0,40,31,0.12)]"
              >
                <div className="grid lg:grid-cols-2">
                  <div
                    className={`group relative min-h-[330px] overflow-hidden bg-slate-200 md:min-h-[430px] ${
                      isReverse ? "lg:order-2" : ""
                    }`}
                  >
                    {!isLoaded && (
                      <div className="home-teaser-shimmer absolute inset-0" />
                    )}

                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      quality={72}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className={`object-cover transition duration-700 group-hover:scale-105 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => markLoaded(item.id)}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                    <div className="home-teaser-float absolute bottom-5 left-5 right-5 rounded-3xl border border-white/20 bg-white/14 p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-300 text-[var(--color-global-dark)]">
                          <Icon size={22} />
                        </span>

                        <p className="text-sm font-black uppercase tracking-[0.16em]">
                          {item.imageLabel}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex min-h-[430px] flex-col justify-center bg-[var(--color-global-light)] p-7 md:p-12">
                    <span className="text-sm font-black uppercase tracking-[0.22em] text-[var(--color-global-green)]">
                      {item.eyebrow}
                    </span>

                    <h3 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight text-[var(--color-global-dark)] md:text-4xl">
                      {item.title}
                    </h3>

                    <p className="mt-5 text-base leading-8 text-slate-700 md:text-lg">
                      {item.text}
                    </p>

                    <ul className="mt-7 grid gap-3">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm font-bold leading-6 text-[var(--color-global-dark)] md:text-base"
                        >
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-global-green)]/14 text-[var(--color-global-green)]">
                            <ArrowRight size={13} />
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={resolveHref(item.cta.href)}
                      className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--color-global-green)] px-7 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_50px_rgba(107,159,18,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--color-global-dark)]"
                    >
                      {item.cta.label}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}