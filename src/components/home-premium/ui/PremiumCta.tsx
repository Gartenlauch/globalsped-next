import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PremiumCta as PremiumCtaType } from "@/content/home-premium/types";
import { resolveHref } from "../helpers/resolveHref";

type Props = {
  cta: PremiumCtaType;
  locale: string;
  variant?: "primary" | "secondary" | "dark";
};

export function PremiumCta({ cta, locale, variant = "primary" }: Props) {
  const classes = {
    primary:
      "bg-[#6b9f12] text-[#f7f7f2] shadow-[0_18px_45px_rgba(107,159,18,0.28)] hover:bg-[#7eb81b]",
    secondary:
      "border border-[#f7f7f2]/20 bg-[#f7f7f2]/5 text-[#f7f7f2] hover:bg-[#f7f7f2]/10",
    dark:
      "bg-[#00281f] text-[#f7f7f2] shadow-[0_18px_45px_rgba(0,40,31,0.18)] hover:bg-[#003b2f]",
  }[variant];

  return (
    <Link
      href={resolveHref(cta.href, locale)}
      className={[
        "inline-flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold transition",
        classes,
      ].join(" ")}
    >
      {cta.label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}