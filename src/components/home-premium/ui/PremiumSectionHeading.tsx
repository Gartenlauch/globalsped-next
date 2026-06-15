import type { ReactNode } from "react";

type Props = {
  children: string;
  highlight?: string;
  variant?: "dark" | "light";
  className?: string;
};

export function PremiumSectionHeading({
  children,
  highlight,
  variant = "dark",
  className = "",
}: Props) {
  const textColor = variant === "light" ? "text-[#00281f]" : "text-white";
  const highlightColor = variant === "light" ? "text-[#6b9f12]" : "text-[#9bc43a]";

  if (!highlight || !children.includes(highlight)) {
    return (
      <h2
        className={`mt-4 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] ${textColor} sm:text-4xl lg:text-[46px] ${className}`}
      >
        {children}
      </h2>
    );
  }

  const [before, after] = children.split(highlight);

  return (
    <h2
      className={`mt-4 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] ${textColor} sm:text-4xl lg:text-[46px] ${className}`}
    >
      {before}
      <span className={highlightColor}>{highlight}</span>
      {after}
    </h2>
  );
}