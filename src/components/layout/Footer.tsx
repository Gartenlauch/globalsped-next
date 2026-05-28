import Link from "next/link";
import {
  Globe2,
  Mail,
  MapPin,
  Phone,
  Building2,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { getContent } from "@/content";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";

type Props = {
  locale: string;
};

const membershipIcons: Record<string, typeof ShieldCheck> = {
  shield: ShieldCheck,
  globe: Globe2,
};

export function Footer({ locale }: Props) {
  const t = getContent(locale).footer;

  return (
    <footer className="relative overflow-hidden border-t border-lime-300/20 bg-[#031a15] text-white shadow-[0_-30px_90px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(3,26,21,1)_45%,rgba(1,12,10,1)_100%)]" />
      <div className="absolute left-0 top-0 flex w-full items-center justify-center">
        {/* LINKE LINIE */}
        <div className="h-[2px] flex-1 bg-[linear-gradient(90deg,transparent,rgba(163,230,53,0.75))]" />

        {/* LOGO */}
        <div className="mx-6 flex h-16 w-16 items-center justify-center rounded-full border border-lime-300/30 bg-[rgba(3,26,21,0.95)] shadow-[0_0_35px_rgba(163,230,53,0.18)] backdrop-blur-xl">
          <img
            src="/images/globalsped_logo.jpg"
            alt="GLOBALSPED Logo"
            className="h-8 w-8 object-contain"
          />
        </div>

        {/* RECHTE LINIE */}
        <div className="h-[2px] flex-1 bg-[linear-gradient(90deg,rgba(163,230,53,0.75),transparent)]" />
      </div>

      <div className="absolute -top-24 left-1/2 h-48 w-[680px] -translate-x-1/2 rounded-full bg-lime-300/10 blur-3xl" />

      <div className="container relative z-10 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          <div>
            <div className="text-2xl font-black uppercase tracking-tight text-lime-300">
              {t.shortName}
            </div>
            <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
              {t.claim}
            </div>

            <p className="mt-6 max-w-[420px] text-sm leading-7 text-white/72">
              {t.text}
            </p>

            <div className="mt-6 grid gap-3 text-sm text-white/78">
              <div className="flex items-center gap-3">
                <Building2 size={18} className="text-lime-300 shrink-0" />
                <span>
                  {t.companyName}
                </span>
              </div>
              <a
                href={`mailto:${t.contact.email}`}
                className="flex items-center gap-3 transition hover:text-lime-300"
              >
                <Mail size={17} className="text-lime-300" />
                {t.contact.email}
              </a>

              <a
                href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 transition hover:text-lime-300"
              >
                <Phone size={17} className="text-lime-300" />
                {t.contact.phone}
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 text-lime-300" />
                <span>{t.contact.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">
              {t.pageLinksTitle}
            </h3>

            <ul className="mt-5 grid gap-3">
              {t.pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-white/76 transition hover:text-lime-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <CookieSettingsButton
  label="Cookie-Einstellungen"
  className="text-sm text-white/70 transition hover:text-lime-300"
/>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">
              {t.transportsTitle}
            </h3>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {t.transports.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-white/76 transition hover:text-lime-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">
              {t.membershipsTitle}
            </h3>

            <div className="mt-5 grid gap-4">
              {t.memberships.map((item) => {
                const Icon = membershipIcons[item.icon] ?? ShieldCheck;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-white/12 bg-white/7 p-4 transition hover:-translate-y-0.5 hover:border-lime-300/45 hover:bg-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-lime-300/30 bg-lime-300/10 text-lime-300">
                        <Icon size={22} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-base font-black uppercase text-white">
                          {item.label}
                          <ExternalLink
                            size={14}
                            className="text-white/45 transition group-hover:text-lime-300"
                          />
                        </div>
                        <p className="mt-1 text-xs leading-5 text-white/65">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-wide text-white/45">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}