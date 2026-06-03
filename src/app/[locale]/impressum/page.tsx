import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";
import { getMetadataContent } from "@/content/metadata";
import { buildPageMetadata } from "@/content/metadata/helpers";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getImpressumContent } from "@/content/legal/impressum";

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
    meta: metadata.pages.imprint,
  });
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  const content = getImpressumContent(locale);
  const metadata = getMetadataContent(locale);
  const pageMeta = metadata.pages.imprint;

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={pageMeta.path}
        name={pageMeta.title}
        description={pageMeta.description}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: `/${locale}` },
          { name: "Impressum", href: pageMeta.path },
        ]}
      />
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
                <Scale size={18} />
                {content.badge}
              </p>

              <h1 className="mt-4 text-4xl font-black uppercase leading-tight md:text-6xl">
                {content.title}
              </h1>

              <p className="mt-5 text-base leading-7 text-white/72 md:text-lg">
                {content.intro}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {content.sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-[28px] border border-white/12 bg-white/[0.04] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl md:p-7"
                >
                  <h2 className="text-xl font-black uppercase text-lime-300">
                    {section.title}
                  </h2>

                  <div className="mt-5 grid gap-3 text-base leading-7 text-white/78">
                    {section.lines.map((line) => {
                      const contentLine = line.label ? (
                        <>
                          <span className="font-black text-white">
                            {line.label}:
                          </span>{" "}
                          {line.href ? (
                            <a
                              href={line.href}
                              className="text-white/82 transition hover:text-lime-300"
                            >
                              {line.value}
                            </a>
                          ) : (
                            line.value
                          )}
                        </>
                      ) : line.href ? (
                        <a
                          href={line.href}
                          className="text-white/82 transition hover:text-lime-300"
                        >
                          {line.value}
                        </a>
                      ) : (
                        line.value
                      );

                      return <p key={`${section.title}-${line.value}`}>{contentLine}</p>;
                    })}
                  </div>
                </section>
              ))}
            </div>

            {content.notes.length > 0 && (
              <div className="mt-6 grid gap-5">
                {content.notes.map((note) => (
                  <section
                    key={note.title}
                    className="rounded-[28px] border border-lime-300/20 bg-lime-300/10 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.20)] backdrop-blur-xl md:p-7"
                  >
                    <h2 className="text-xl font-black uppercase text-lime-300">
                      {note.title}
                    </h2>

                    <p className="mt-4 text-base leading-7 text-white/78">
                      {note.text}
                    </p>
                  </section>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}