import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  padding?: "default" | "compact";
};

export function PremiumGlassCard({
  children,
  className = "",
  padding = "default",
}: Props) {
  const paddingClass = padding === "compact" ? "p-5" : "p-6";

  return (
    <div
      className={[
        "rounded-3xl border border-[#f7f7f2]/10 bg-[#f7f7f2]/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        paddingClass,
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}