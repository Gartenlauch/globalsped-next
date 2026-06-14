import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "dark" | "light";
  className?: string;
};

export function PremiumSectionHeading({
  children,
  variant = "dark",
  className = "",
}: Props) {
  return (
    <h2
      className={[
        "text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl",
        variant === "dark" ? "text-white" : "text-[#00281f]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </h2>
  );
}