"use client";
import Link from "next/link";
import { useState } from "react";
import { Mail, MapPin, Navigation, Phone, Send } from "lucide-react";
import { getContent } from "@/content";

type Props = {
    locale: string;
};

export function ContactSection({ locale }: Props) {
    const t = getContent(locale).contact;
    const [message, setMessage] = useState("");

    return (
        <section
            id="kontakt"
            className="relative overflow-hidden bg-[var(--color-global-deep)] py-28 text-white"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(163,230,53,0.12),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.06),transparent_28%)]" />

            <div className="container relative z-10">
                <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-lime-300">
                            {t.badge}
                        </p>

                        <h2 className="text-[30px] font-black uppercase leading-[1.05] md:text-[40px]">
                            {t.title}
                            <span className="block text-lime-300">{t.highlight}</span>
                        </h2>

                        <p className="mt-6 max-w-[760px] text-base leading-8 text-white/82 md:text-lg">
                            {t.intro}
                        </p>

                        <form
                            className="mt-8 grid gap-4"
                            onSubmit={(event) => {
                                event.preventDefault();

                                const formData = new FormData(event.currentTarget);
                                const name = String(formData.get("name") || "").trim();
                                const email = String(formData.get("email") || "").trim();
                                const messageText = String(formData.get("message") || "").trim();

                                if (!name || !email || !messageText) {
                                    setMessage(t.form.validationRequired);
                                    return;
                                }

                                setMessage(t.form.successMessage);
                            }}
                        >
                           <div className="grid gap-4 md:grid-cols-2">
                                <label className="grid gap-2 text-sm font-bold uppercase tracking-wide text-white/80">
                                    {t.form.nameLabel}
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={t.form.namePlaceholder}
                                        className="h-12 rounded-2xl border border-white/12 bg-white/95 px-4 py-3 text-[var(--color-global-dark)] outline-none transition focus:border-lime-300 focus:ring-4 focus:ring-lime-300/20"
                                    />
                                </label>

                                <label className="grid gap-2 text-sm font-bold uppercase tracking-wide text-white/80">
                                    {t.form.emailLabel}
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={t.form.emailPlaceholder}
                                        className="h-12 rounded-2xl border border-white/12 bg-white/95 px-4 py-3 text-[var(--color-global-dark)] outline-none transition focus:border-lime-300 focus:ring-4 focus:ring-lime-300/20"
                                    />
                                </label>
                            </div>

                            <label className="grid gap-2 text-sm font-bold uppercase tracking-wide text-white/80">
                                {t.form.messageLabel}
                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder={t.form.messagePlaceholder}
                                    className="min-h-[150px] resize-none rounded-2xl border border-white/12 bg-white/95 px-4 py-3 text-[var(--color-global-dark)] outline-none transition focus:border-lime-300 focus:ring-4 focus:ring-lime-300/20"
                                />
                            </label>
                            {message && (
                                <p className="rounded-2xl border border-lime-300/25 bg-lime-300/10 px-4 py-3 text-sm font-bold text-lime-300">
                                    {message}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="inline-flex w-fit items-center gap-3 rounded-full bg-lime-300 px-7 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-[var(--color-global-dark)] shadow-[0_15px_45px_rgba(163,230,53,0.30)] transition hover:scale-[1.03] hover:bg-lime-200"
                            >
                                {t.form.submitLabel}
                                <Send size={17} />
                            </button>
                        </form>
                    </div>

                    <aside className="rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.76)] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                        <h3 className="text-2xl font-black uppercase text-lime-300">
                            {t.locationsTitle}
                        </h3>

                        <div className="mt-6 grid gap-5">
                            {t.locations.map((location) => (
                                <article
                                    key={location.email}
                                    className="rounded-2xl border border-white/12 bg-white/7 p-5"
                                >
                                    <h4 className="text-lg font-black uppercase text-white">
                                        {location.title}
                                    </h4>

                                    <div className="mt-4 grid gap-3 text-sm text-white/82">
                                        <div className="flex gap-3">
                                            <MapPin size={17} className="mt-0.5 shrink-0 text-lime-300" />
                                            <span>{location.address}</span>
                                        </div>

                                        <a
                                            href={`tel:${location.phone.replace(/\s/g, "")}`}
                                            className="flex gap-3 transition hover:text-lime-300"
                                        >
                                            <Phone size={17} className="shrink-0 text-lime-300" />
                                            {location.phone}
                                        </a>

                                        <a
                                            href={`mailto:${location.email}`}
                                            className="flex gap-3 transition hover:text-lime-300"
                                        >
                                            <Mail size={17} className="shrink-0 text-lime-300" />
                                            {location.email}
                                        </a>
                                    </div>

                                    <a
                                        href={location.mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-lime-300 transition hover:text-lime-200"
                                    >
                                        <Navigation size={16} />
                                        {t.routeLabel}
                                    </a>
                                </article>
                            ))}
                        </div>
                    </aside>
                </div>

                <div className="mt-14 overflow-hidden rounded-3xl border border-white/12 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
                    <iframe
                        title={t.mapTitle}
                        src={t.mapEmbedUrl}
                        className="h-[420px] w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
}