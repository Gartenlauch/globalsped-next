import Link from "next/link";
import { ArrowLeft, Send, Truck } from "lucide-react";
import { getNotFoundContent } from "@/content/not-found";

type Props = {
    params?: {
        locale?: string;
    };
};

export default function NotFound({ params }: Props) {
    const locale = params?.locale ?? "de";
    const t = getNotFoundContent(locale);

    const primaryHref = t.primaryCta.href.replace("{locale}", locale);
    const secondaryHref = t.secondaryCta.href.replace("{locale}", locale);

    return (
        <main className="relative flex min-h-screen items-center overflow-hidden bg-[var(--color-global-deep)] px-6 pt-32 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(163,230,53,0.14),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.06),transparent_28%)]" />

            <div className="container relative z-10 grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                    <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
                        {t.badge}
                    </p>

                    <h1 className="max-w-[820px] text-[34px] font-black uppercase leading-[1.05] md:text-[54px]">
                        {t.title}
                        <span className="block text-lime-300">{t.highlight}</span>
                    </h1>

                    <p className="mt-6 max-w-[680px] text-base leading-8 text-white/82 md:text-lg">
                        {t.intro}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link href={primaryHref} className="btn-primary">
                            <ArrowLeft size={17} />
                            {t.primaryCta.label}
                        </Link>

                        <Link
                            href={secondaryHref}
                            className="inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-[var(--color-global-dark)]"
                        >
                            {t.secondaryCta.label}
                            <Send size={17} />
                        </Link>
                    </div>

                    <p className="mt-6 text-sm font-semibold text-white/58">
                        {t.hint}
                    </p>
                </div>

                <div className="relative">
                    <div className="relative overflow-hidden rounded-[36px] border border-white/14 bg-[rgba(0,40,31,0.72)] p-8 shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                        <div className="relative h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] md:h-[420px]">
                            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-lime-300/30" />

                            <div className="animate-[drive_4s_ease-in-out_infinite] absolute left-8 top-1/2 -translate-y-1/2">
                                <div className="flex h-20 w-32 items-center justify-center rounded-2xl border border-lime-300/35 bg-lime-300/12 text-lime-300 shadow-[0_0_40px_rgba(163,230,53,0.22)]">
                                    <Truck size={54} strokeWidth={1.6} />
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/12 bg-[rgba(0,40,31,0.72)] p-5 backdrop-blur-xl">
                                <div className="text-7xl font-black leading-none text-lime-300">
                                    404
                                </div>
                                <div className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-white/70">
                                    {t.errorCodeLabel}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}