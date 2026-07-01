"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { Mail, MapPin, Navigation, Phone, Send } from "lucide-react";
import { getContent } from "@/content";
import { functions } from "@/lib/firebase/client";
import { trackContactFormSubmit } from "@/lib/tracking/google";
import { webMcpContent as webMcpDe } from "@/content/wmcp"
type Props = {
    locale: string;
};

type ContactInquiryPayload = {
    locale: string;
    pagePath: string;
    contact: {
        name: string;
        company: string;
        email: string;
        phone: string;
        message: string;
    };
    meta: {
        honeypot: string;
        userAgent: string;
    };
};

type ContactInquiryResponse = {
    success: boolean;
    leadId?: string;
    ignored?: boolean;
};

export function ContactSection({ locale }: Props) {
    const t = getContent(locale).contact;

    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formRef = useRef<HTMLFormElement | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (hasSubmitted) {
            return;
        }
        const form = event.currentTarget;
        const formData = new FormData(form);

        const name = String(formData.get("name") || "").trim();
        const company = String(formData.get("company") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const messageText = String(formData.get("message") || "").trim();
        const privacy = formData.get("privacy") === "on";
        const honeypot = String(formData.get("website") || "").trim();

        setIsSuccess(false);

        if (!name || !email || !messageText) {
            setMessage(t.form.validationRequired);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage(t.form.validationEmail);
            return;
        }

        if (!privacy) {
            setMessage(t.form.privacyRequired);
            return;
        }

        setIsSubmitting(true);
        setMessage("");

        try {
            const submitContactInquiry = httpsCallable<
                ContactInquiryPayload,
                ContactInquiryResponse
            >(functions, "submitContactInquiry");

            await submitContactInquiry({
                locale,
                pagePath: `/${locale}#kontakt`,
                contact: {
                    name,
                    company,
                    email,
                    phone,
                    message: messageText,
                },
                meta: {
                    honeypot,
                    userAgent:
                        typeof window !== "undefined" ? window.navigator.userAgent : "",
                },
            });
            trackContactFormSubmit(`/${locale}#kontakt`);
            formRef.current?.reset();
            setHasSubmitted(true);
            setIsSuccess(true);
            setMessage(t.form.successMessage);

        } catch (error) {
            console.error("submitContactInquiry failed:", error);
            setIsSuccess(false);
            setMessage(t.form.submitError);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="kontakt"
            className="relative overflow-hidden bg-[var(--color-global-dark)] py-24 text-white"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(107,159,18,0.18),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_34%)]" />

            <div className="relative mx-auto max-w-7xl px-5">
                <div className="mb-12 max-w-3xl">
                    <span className="text-sm font-black uppercase tracking-[0.22em] text-lime-300">
                        {t.badge}
                    </span>

                    <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[46px]">
                        {t.title}{" "}
                        <span className="text-lime-300">{t.highlight}</span>
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-white/76">{t.intro}</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-3xl border border-white/12 bg-white/8 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                        <form 
                            ref={formRef} 
                            onSubmit={handleSubmit}
                            className="grid gap-5"
                            toolname={webMcpDe.contactInquiry.toolname}
                            tooldescription={webMcpDe.contactInquiry.tooldescription}
                        >
                            <input
                                type="text"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                className="hidden"
                                aria-hidden="true"
                            />

                            <div className="grid gap-5 md:grid-cols-2">
                                <label className="grid gap-2 text-sm font-black uppercase tracking-wide text-white/75">
                                    {t.form.nameLabel}
                                    <input
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder={t.form.namePlaceholder}
                                        className="input-premium"
                                        disabled={isSubmitting}
                                        toolparamdescription={webMcpDe.contactInquiry.fields.name.description}
                                        
                                    />
                                </label>

                                <label className="grid gap-2 text-sm font-black uppercase tracking-wide text-white/75">
                                    {t.form.companyLabel}
                                    <input
                                        name="company"
                                        type="text"
                                        autoComplete="organization"
                                        placeholder={t.form.companyPlaceholder}
                                        className="input-premium"
                                        disabled={isSubmitting}
                                        toolparamdescription={webMcpDe.contactInquiry.fields.company.description}
                                    />
                                </label>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <label className="grid gap-2 text-sm font-black uppercase tracking-wide text-white/75">
                                    {t.form.emailLabel}
                                    <input
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder={t.form.emailPlaceholder}
                                        className="input-premium"
                                        disabled={isSubmitting}
                                        toolparamdescription={webMcpDe.contactInquiry.fields.email.description}
                                    />
                                </label>

                                <label className="grid gap-2 text-sm font-black uppercase tracking-wide text-white/75">
                                    {t.form.phoneLabel}
                                    <input
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder={t.form.phonePlaceholder}
                                        className="input-premium"
                                        disabled={isSubmitting}
                                        toolparamdescription={webMcpDe.contactInquiry.fields.phone.description}
                                    />
                                </label>
                            </div>

                            <label className="grid gap-2 text-sm font-black uppercase tracking-wide text-white/75">
                                {t.form.messageLabel}
                                <textarea
                                    name="message"
                                    placeholder={t.form.messagePlaceholder}
                                    rows={6}
                                    className="input-premium resize-none"
                                    disabled={isSubmitting}
                                    toolparamdescription={webMcpDe.contactInquiry.fields.message.description}
                                />
                            </label>

                            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/78">
                                <input
                                    name="privacy"
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 shrink-0 accent-lime-300"
                                    disabled={isSubmitting}
                                />
                                <span>{t.form.privacyLabel}</span>
                            </label>

                            {message && (
                                <p
                                    className={`rounded-2xl border px-4 py-3 text-sm font-bold ${isSuccess
                                            ? "border-lime-300/25 bg-lime-300/10 text-lime-300"
                                            : "border-red-300/30 bg-red-500/10 text-red-200"
                                        }`}
                                >
                                    {message}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting || hasSubmitted}
                                className="inline-flex w-fit items-center gap-3 rounded-full bg-lime-300 px-7 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-[var(--color-global-dark)] shadow-[0_15px_45px_rgba(163,230,53,0.30)] transition hover:scale-[1.03] hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                            >
                                {isSubmitting
                                    ? t.form.sendingLabel
                                    : hasSubmitted
                                        ? t.form.submittedLabel
                                        : t.form.submitLabel}
                                <Send size={17} />
                            </button>
                        </form>
                    </div>

                    <aside className="rounded-3xl border border-white/12 bg-[rgba(0,40,31,0.76)] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-lime-300">
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
                                            <MapPin
                                                size={17}
                                                className="mt-0.5 shrink-0 text-lime-300"
                                            />
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