import Image from "next/image";
import Link from "next/link";
import {
    BriefcaseBusiness,
    Building2,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Mail,
    Send,
    Star,
    Users,
} from "lucide-react";
import { getContent } from "@/content";

type Props = {
    locale: string;
};
const imageCardIcons = {
    users: Users,
    star: Star,
} as const;

export function JobsSection({ locale }: Props) {
    const t = getContent(locale).jobs;

    return (
        <section
            id="jobs"
            className="relative overflow-hidden bg-[var(--color-global-deep)] py-28 text-white"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(163,230,53,0.14),transparent_28%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.06),transparent_30%)]" />

            <div className="container relative z-10">
                <div className="mx-auto max-w-[980px] text-center">
                    <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
                        {t.badge}
                    </p>

                    <h1 className="text-[30px] font-semibold leading-[1.05] md:text-[46px]">
                        {t.title}
                        <span className="block text-lime-300">{t.highlight}</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-[760px] text-base leading-8 text-white/82 md:text-lg">
                        {t.intro}
                    </p>
                </div>

                <div className="relative mt-10 overflow-hidden rounded-[32px] border border-white/15 shadow-[0_35px_120px_rgba(0,0,0,0.48)]">
                    <Image
                        src={t.image.src}
                        alt={t.image.alt}
                        width={1200}
                        height={400}
                        className="h-[260px] w-full object-cover md:h-[360px] lg:h-[390px]"
                        priority
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_20%,rgba(0,40,31,0.50)_100%)]" />

                    <div className="absolute bottom-6 left-6 right-6 grid gap-5 md:grid-cols-2">
                        {t.imageOverlayCards.map((card, index) => {
                            const Icon = imageCardIcons[card.icon as keyof typeof imageCardIcons] ?? Users;

                            return (
                                <article
                                    key={card.title}
                                    className={`rounded-3xl border border-lime-300/35 bg-[rgba(0,40,31,0.78)] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl ${index === 1 ? "md:ml-auto md:max-w-[420px]" : "md:max-w-[420px]"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-lime-300/40 bg-lime-300/15 text-lime-300">
                                            <Icon size={28} />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold uppercase  text-white">
                                                {card.title}
                                            </h3>
                                            <p className="mt-2 text-sm leading-6 text-white/82">
                                                {card.text}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-lime-300/40 bg-lime-300/10 text-lime-300">
                                <BriefcaseBusiness size={24} />
                            </div>
                            <h3 className="text-2xl uppercase">
                                {t.openPositionsTitle}
                            </h3>
                            <div className="h-px flex-1 bg-lime-300/25" />
                        </div>

                        <div className="grid gap-5">
                            {t.positions.map((position, index) => (
                                <details
                                    key={position.title}
                                    open={index === 0}
                                    className="group overflow-hidden rounded-2xl border border-lime-300/30 bg-[rgba(0,40,31,0.70)] shadow-[0_25px_80px_rgba(0,0,0,0.30)] backdrop-blur-xl"
                                >
                                    <summary className="cursor-pointer list-none bg-lime-300/8 px-6 py-5 [&::-webkit-details-marker]:hidden">
                                        <div className="flex items-center justify-between gap-5">
                                            <div>
                                                <h4 className="text-xl font-semibold  text-white">
                                                    {position.title}
                                                </h4>
                                                <p className="mt-1 text-sm font-semibold text-lime-300/90">
                                                    {position.subtitle}
                                                </p>
                                            </div>

                                            <ChevronDown className="hidden text-lime-300 transition group-open:block" />
                                            <ChevronRight className="text-lime-300 transition group-open:hidden" />
                                        </div>
                                    </summary>

                                    <div className="px-6 pb-6 pt-5">
                                        <p className="text-sm leading-7 text-white/80">
                                            {position.description}
                                        </p>

                                        <ul className="mt-6 grid gap-3 md:grid-cols-2">
                                            {position.tasks.map((task) => (
                                                <li
                                                    key={task}
                                                    className="flex items-start gap-3 text-sm leading-6 text-white/84"
                                                >
                                                    <CheckCircle2
                                                        size={17}
                                                        className="mt-0.5 shrink-0 text-lime-300"
                                                    />
                                                    {task}
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href="/de/jobs/bewerbung"
                                            className="mt-7 inline-flex items-center gap-3 rounded-full bg-lime-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-[var(--color-global-dark)] transition hover:bg-lime-200"
                                        >
                                            <Mail size={17} />
                                            {t.applyLabel}
                                        </Link>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>

                    <aside>
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-lime-300/40 bg-lime-300/10 text-lime-300">
                                <Building2 size={24} />
                            </div>
                            <h3 className="text-2xl  uppercase">
                                {t.companyTitle}
                            </h3>
                            <div className="h-px flex-1 bg-lime-300/25" />
                        </div>

                        <div className="rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.72)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                            <p className="text-sm leading-7 text-white/80">
                                {t.companyText}
                            </p>

                            <div className="mt-6 overflow-hidden rounded-2xl border border-white/12">
                                {t.values.map((value) => (
                                    <div
                                        key={value}
                                        className="flex items-start gap-3 border-b border-white/10 bg-white/5 p-4 last:border-b-0"
                                    >
                                        <CheckCircle2
                                            size={18}
                                            className="mt-1 shrink-0 text-lime-300"
                                        />
                                        <p className="text-sm font-semibold leading-6 text-white/82">
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-2xl border border-lime-300/25 bg-lime-300/10 p-5">
                                <div className="flex gap-4">
                                    <Send className="mt-1 shrink-0 text-lime-300" size={24} />
                                    <div>
                                        <h4 className="font-semibold uppercase text-lime-300">
                                            {t.initiative.title}
                                        </h4>
                                        <p className="mt-2 text-sm leading-6 text-white/78">
                                            {t.initiative.text}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-6 text-lg font-black leading-7 text-white">
                                {t.closing}
                            </p>
                        </div>
                    </aside>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-lime-300/35 bg-[rgba(0,40,31,0.70)] px-6 py-4 shadow-[0_25px_80px_rgba(0,0,0,0.28)]">
                    <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide text-white/86">
                        <Mail size={20} className="text-lime-300" />
                        {t.closing}

                    </div>
                    <Link href="/de/jobs/bewerbung" className="btn-primary">
                        {t.applyLabel}
                    </Link>

                </div>
            </div>
        </section>
    );
}