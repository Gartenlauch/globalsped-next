type Props = {
    children: string;
    variant?: "dark" | "light";
  };
  
  export function PremiumEyebrow({ children, variant = "dark" }: Props) {
    return (
      <p
        className={[
          "mb-4 text-xs font-semibold uppercase tracking-[0.22em]",
          variant === "dark" ? "text-[#9bc43a]" : "text-[#6b9f12]",
        ].join(" ")}
      >
        {children}
      </p>
    );
  }