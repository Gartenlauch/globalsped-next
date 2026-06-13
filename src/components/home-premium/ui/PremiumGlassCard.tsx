import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function PremiumGlassCard({ children, className = "" }: Props) {
  return (
    <div
      className={[
        "rounded-3xl border border-[#f7f7f2]/10 bg-[#f7f7f2]/[0.055] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}