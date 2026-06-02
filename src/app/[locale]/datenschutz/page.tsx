import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { getDatenschutzContent } from "@/content/legal/datenschutz";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getMetadataContent(locale);

  return buildPageMetadata({
    locale,
    meta: metadata.pages.privacy,
  });
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params;
  const content = getDatenschutzContent(locale);

  return (
    <main className="min-h-screen bg-[var(--color-global-deep)] text-white">
      <section className="relative overflow-hidden px-5 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,230,53,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.10),transparent_32%)]" />

        <div className="relative mx-auto max-w-5xl">
          <Link
            href={`/${locale}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-white/70 transition hover:text-lime-300"
          >
            <ArrowLeft size={17} />
            {content.backLink.label}
          </Link>

          <div className="mb-10 max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.28em] text-lime-300">
              <ShieldCheck size={18} />
              {content.badge}
            </p>

            <h1 className="mt-4 text-4xl font-black uppercase leading-tight md:text-6xl">
              {content.title}
            </h1>

            <p className="mt-5 text-base leading-7 text-white/72 md:text-lg">
              {content.intro}
            </p>

            <p className="mt-4 text-sm font-bold text-white/50">
              {content.lastUpdated}
            </p>
          </div>

          <div className="grid gap-5">
            {content.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="rounded-[28px] border border-white/12 bg-white/[0.04] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl md:p-7"
              >
                <h2 className="text-xl font-black uppercase text-lime-300 md:text-2xl">
                  {section.title}
                </h2>

                {section.paragraphs && (
                  <div className="mt-5 grid gap-4 text-base leading-8 text-white/78">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {section.lists && (
                  <div className="mt-5 grid gap-5">
                    {section.lists.map((list) => (
                      <div key={list.title ?? list.items.join("-")}>
                        {list.title && (
                          <h3 className="mb-3 font-black uppercase text-white">
                            {list.title}
                          </h3>
                        )}

                        <ul className="grid gap-2 text-base leading-7 text-white/78">
                          {list.items.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime-300" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}