import Image from "next/image";
import Link from "next/link";
import {
    Award,
    FileCheck2,
    Globe2,
    Headphones,
    Mail,
    MessageCircle,
    Phone,
  } from "lucide-react";
import { getContent } from "@/content";

type Props = {
    locale: string;
};

const valueIcons: Record<string, typeof Globe2> = {
    experience: Award,
    network: Globe2,
    communication: MessageCircle,
    customs: FileCheck2,
};

export function AboutUsSection({ locale }: Props) {
    const t = getContent(locale).aboutUs;

    return (
        <section
            id="ueber-uns"
            className="relative overflow-hidden bg-[var(--color-global-deep)] py-28 text-white"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.12),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(255,255,255,0.06),transparent_28%)]" />

            <div className="container relative z-10">
                <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr]">
                    <div>
                        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
                            {t.badge}
                        </p>

                        <h2 className="text-[30px] font-black uppercase leading-[1.05] md:text-[40px]">
                            {t.title}
                            <span className="block text-lime-300">{t.highlight}</span>
                        </h2>

                        <p className="mt-6 max-w-[780px] text-base leading-8 text-white/86 md:text-lg">
                            {t.intro}
                        </p>

                        <p className="mt-5 max-w-[780px] text-base leading-8 text-white/76">
                            {t.text}
                        </p>

                        <div className="mt-8">
                            <Link href={t.cta.href} className="btn-primary">
                                {t.cta.label}
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-5">
                        {t.images.map((image, index) => (
                            <div
                                key={image.src}
                                className={`group relative overflow-hidden rounded-3xl border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.38)] ${index === 0 ? "min-h-[260px]" : "min-h-[220px]"
                                    }`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                                />

                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_35%,rgba(0,40,31,0.58)_100%)]" />

                                <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-[rgba(0,40,31,0.72)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-lime-300 backdrop-blur-md">
                                    {image.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {t.values.map((item) => {
                        const Icon = valueIcons[item.icon] ?? Globe2;

                        return (
                            <article
                                key={item.title}
                                className="group rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.74)] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-lime-300/45"
                            >
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 text-lime-300">
                                    <Icon size={24} strokeWidth={1.8} />
                                </div>

                                <h3 className="text-lg font-black uppercase leading-tight text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-4 text-sm leading-6 text-white/78">
                                    {item.text}
                                </p>
                            </article>
                        );
                    })}
                </div>
                <div className="mt-12 rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.78)] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl">
                    <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 text-lime-300 shadow-[0_0_28px_rgba(163,230,53,0.18)]">
                            <Headphones size={30} strokeWidth={1.8} />
                        </div>

                        <div>
                            <h3 className="text-[24px] font-black uppercase leading-tight text-white md:text-[32px]">
                                {t.teamIntroBox.title}
                            </h3>

                            <p className="mt-4 max-w-[980px] text-base leading-8 text-white/80">
                                {t.teamIntroBox.text}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="max-w-[860px]">
                        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.25em] text-lime-300">
                            {t.badge}
                        </p>

                        <h3 className="text-[28px] font-black uppercase leading-tight md:text-[36px]">
                            {t.teamListTitle}
                        </h3>

                        <p className="mt-5 text-base leading-8 text-white/78">
                            {t.teamListIntro}
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {t.teamMembers.map((member) => (
                            <article
                                key={member.contact.email ?? member.name}
                                className="group overflow-hidden rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.74)] shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-lime-300/45 hover:shadow-[0_30px_90px_rgba(163,230,53,0.14)]"
                            >
                                <div className="relative aspect-square overflow-hidden bg-white/5">
                                    <Image
                                        src={member.imgURL}
                                        alt={`${member.name} – ${member.job} bei GLOBALSPED`}
                                        fill
                                        className="object-cover transition duration-700 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_45%,rgba(0,40,31,0.55)_100%)]" />
                                </div>

                                <div className="p-5">
                                    <h4 className="text-lg font-black uppercase leading-tight text-white">
                                        {member.name}
                                    </h4>

                                    <p className="mt-1 text-sm font-bold uppercase tracking-wide text-lime-300">
                                        {member.job}
                                    </p>

                                    <div className="mt-5 grid gap-3 text-sm text-white/82">
                                        <a
                                            href={`mailto:${member.contact.email}`}
                                            className="flex items-center gap-2 transition hover:text-lime-300"
                                        >
                                            <Mail size={16} className="shrink-0 text-lime-300" />
                                            {member.contact.email}
                                        </a>

                                        <a
                                            href={`tel:${member.contact.phone.replaceAll(" ", "")}`}
                                            className="flex items-center gap-2 transition hover:text-lime-300"
                                        >
                                            <Phone size={16} className="shrink-0 text-lime-300" />
                                            {member.contact.phone}
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}