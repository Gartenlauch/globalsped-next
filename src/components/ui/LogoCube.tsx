type LogoCubeVariant = "default" | "executive" | "executive-dark";

type LogoCubeProps = {
  className?: string;
  variant?: LogoCubeVariant;
};

export function LogoCube({
  className = "",
  variant = "default",
}: LogoCubeProps) {
  const size = variant === "executive-dark" ? 82 : 84;
  const depth = size / 2 + 0.25;

  const isExecutive = variant === "executive" || variant === "executive-dark";
  const isExecutiveDark = variant === "executive-dark";

  const baseFaceClasses = [
    "logo-cube-face",
    "absolute flex items-center justify-center overflow-hidden",
    isExecutiveDark ? "rounded-[2px]" : isExecutive ? "rounded-[3px]" : "rounded-[4px]",
  ].join(" ");

  const facePalettes = isExecutiveDark
    ? {
        front:
          "bg-[linear-gradient(145deg,#f7fbf8_0%,#dce8e1_52%,#b9c9c0_100%)] text-[var(--color-global-dark)]",
        right:
          "bg-[linear-gradient(145deg,#83b920_0%,#5f910f_50%,#365f06_100%)] text-white",
        back:
          "bg-[linear-gradient(145deg,#dce9cf_0%,#aac58c_52%,#78995b_100%)] text-[var(--color-global-dark)]",
        left:
          "bg-[linear-gradient(145deg,#004637_0%,#003326_50%,#001b15_100%)] text-white",
        top:
          "bg-[linear-gradient(145deg,#ffffff_0%,#ecf5ef_52%,#cbd9d1_100%)] text-[var(--color-global-dark)]",
        bottom:
          "bg-[linear-gradient(145deg,#24352e_0%,#12221b_58%,#07110d_100%)] text-white",
      }
    : isExecutive
      ? {
          front:
            "bg-[linear-gradient(145deg,#ffffff_0%,#edf5f0_55%,#cbd8d1_100%)] text-[var(--color-global-dark)]",
          right:
            "bg-[linear-gradient(145deg,#92c82b_0%,#6b9f12_52%,#4d7809_100%)] text-white",
          back:
            "bg-[linear-gradient(145deg,#eef7e5_0%,#d6e8c3_52%,#abc88b_100%)] text-[var(--color-global-dark)]",
          left:
            "bg-[linear-gradient(145deg,#00513f_0%,#003b2f_52%,#00251d_100%)] text-white",
          top:
            "bg-[linear-gradient(145deg,#ffffff_0%,#f3faf6_52%,#dce8e1_100%)] text-[var(--color-global-dark)]",
          bottom:
            "bg-[linear-gradient(145deg,#c8d6ce_0%,#8ea59a_54%,#526b60_100%)] text-white",
        }
      : {
          front:
            "bg-[linear-gradient(145deg,#ffffff_0%,#f0f6f2_55%,#ccd9d2_100%)] text-[var(--color-global-dark)]",
          right:
            "bg-[linear-gradient(145deg,#91c82d_0%,#6b9f12_52%,#4a7408_100%)] text-white",
          back:
            "bg-[linear-gradient(145deg,#edf6e5_0%,#d9e9ca_52%,#b1cc91_100%)] text-[var(--color-global-dark)]",
          left:
            "bg-[linear-gradient(145deg,#00503f_0%,#003b2f_52%,#00251d_100%)] text-white",
          top:
            "bg-[linear-gradient(145deg,#ffffff_0%,#f4faf6_52%,#dce8e1_100%)] text-[var(--color-global-dark)]",
          bottom:
            "bg-[linear-gradient(145deg,#cad8d1_0%,#8fa69a_54%,#526d61_100%)] text-white",
        };

  const faces = [
    {
      key: "front",
      text: "LTL",
      transform: `rotateY(0deg) translateZ(${depth}px)`,
      className: facePalettes.front,
      textClassName:
      "text-[22px] font-black uppercase tracking-[0.1em]"
    },
    {
      key: "right",
      text: "FTL",
      transform: `rotateY(90deg) translateZ(${depth}px)`,
      className: facePalettes.right,
      textClassName:
      "text-[13px] font-black uppercase tracking-[0.1em]",
    },
    {
      key: "back",
      text: "LOGISTICS",
      transform: `rotateY(180deg) translateZ(${depth}px)`,
      className: facePalettes.back,
      textClassName:
      "text-[10px] font-black uppercase tracking-[0.08em]",
    },
    {
      key: "left",
      text: "30+",
      transform: `rotateY(-90deg) translateZ(${depth}px)`,
      className: facePalettes.left,
      textClassName:
      "text-[16px] font-black uppercase tracking-[0.06em]",
    },
    {
      key: "top",
      text: "",
      transform: `rotateX(90deg) translateZ(${depth}px)`,
      className: facePalettes.top,
      textClassName: "",
    },
    {
      key: "bottom",
      text: "",
      transform: `rotateX(-90deg) translateZ(${depth}px)`,
      className: facePalettes.bottom,
      textClassName: "",
    },
  ];

  return (
    <div
      className={`logo-cube-wrap flex justify-start ${className}`}
      aria-hidden="true"
      style={{
        height: size,
        width: size,
        perspective: isExecutiveDark ? "1250px" : "1150px",
      }}
    >
      <div
        className={`logo-cube-stage ${isExecutiveDark ? "logo-cube-stage--dark" : ""}`}
        style={{ height: size, width: size }}
      >
        {faces.map((face) => (
          <div
            key={face.key}
            className={`${baseFaceClasses} ${face.className}`}
            style={{
              height: size,
              width: size,
              transform: face.transform,
            }}
          >
          
            <span className="logo-cube-face-edge logo-cube-face-edge--top" />
            <span className="logo-cube-face-edge logo-cube-face-edge--right" />
            <span className="logo-cube-face-edge logo-cube-face-edge--bottom" />
            <span className="logo-cube-face-edge logo-cube-face-edge--left" />

            {face.text ? (
             <span className={`relative z-10 ${face.textClassName}`}>
                {face.text}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}