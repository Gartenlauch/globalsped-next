export function LogoCube({ className = "", variant = "default" }) {
  const size = variant === "executive-dark" ? 70 : 72;
  const depth = size / 2;
  const isExecutive = variant === "executive" || variant === "executive-dark";
  const isExecutiveDark = variant === "executive-dark";
  const baseFaceClasses = isExecutiveDark
    ? "absolute flex items-center justify-center rounded-[1px] border border-[#9eaea6] ring-1 ring-[#d6dfda] shadow-[0_7px_16px_rgba(0,0,0,0.2)]"
    : isExecutive
      ? "absolute flex items-center justify-center rounded-[2px] border border-[#bdcbc3] ring-1 ring-[#f4f7f5] shadow-[0_7px_14px_rgba(0,0,0,0.14)]"
    : "absolute flex items-center justify-center rounded-[4px] border border-[#cfdad4] ring-1 ring-[#eef3ef] shadow-[0_8px_16px_rgba(0,0,0,0.16)]";

  const facePalettes = isExecutiveDark
    ? {
        front: "bg-[linear-gradient(155deg,#f5faf7_0%,#e3ece7_100%)] text-[var(--color-global-dark)]",
        side: "bg-[linear-gradient(155deg,#eaf2ee_0%,#d6e1db_100%)] text-[var(--color-global-dark)]",
        back: "bg-[linear-gradient(155deg,#e2edd5_0%,#cad8bc_100%)] text-[var(--color-global-dark)]",
        top: "bg-[linear-gradient(155deg,#edf4ef_0%,#dce7e1_100%)]",
        bottom:
          "bg-[linear-gradient(155deg,#c4d3cb_0%,#afc0b7_100%)] border-[#98aaa0]",
      }
    : isExecutive
    ? {
        front: "bg-[linear-gradient(155deg,#ffffff_0%,#eff5f1_100%)] text-[var(--color-global-dark)]",
        side: "bg-[linear-gradient(155deg,#f1f6f3_0%,#e2ebe6_100%)] text-[var(--color-global-dark)]",
        back: "bg-[linear-gradient(155deg,#e9f3de_0%,#dae6cc_100%)] text-[var(--color-global-dark)]",
        top: "bg-[linear-gradient(155deg,#f7fcf8_0%,#e4ede8_100%)]",
        bottom:
          "bg-[linear-gradient(155deg,#d7e3dc_0%,#c6d4cc_100%)] border-[#b9c8bf]",
      }
    : {
        front:
          "bg-[linear-gradient(155deg,#ffffff_0%,#f2f7f4_100%)] text-[var(--color-global-dark)]",
        side: "bg-[linear-gradient(155deg,#f4f8f6_0%,#e7efeb_100%)] text-[var(--color-global-dark)]",
        back: "bg-[linear-gradient(155deg,#edf5e3_0%,#dfe9d1_100%)] text-[var(--color-global-dark)]",
        top: "bg-[linear-gradient(155deg,#f8fcf8_0%,#e8f0eb_100%)]",
        bottom:
          "bg-[linear-gradient(155deg,#dbe7e0_0%,#cfdbd4_100%)] border-[#c5d3cb]",
      };

  const faces = [
    {
      key: "front",
      text: "GS",
      transform: `rotateY(0deg) translateZ(${depth}px)`,
      className: facePalettes.front,
      textClassName:
        "text-[18px] font-black uppercase tracking-[0.1em] text-[var(--color-global-dark)]",
    },
    {
      key: "right",
      text: "EST",
      transform: `rotateY(90deg) translateZ(${depth}px)`,
      className: facePalettes.side,
      textClassName:
        "text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-global-dark)]/90",
    },
    {
      key: "back",
      text: "LOGISTICS",
      transform: `rotateY(180deg) translateZ(${depth}px)`,
      className: facePalettes.back,
      textClassName:
        "text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--color-global-dark)]/90",
    },
    {
      key: "left",
      text: "30+",
      transform: `rotateY(-90deg) translateZ(${depth}px)`,
      className: facePalettes.side,
      textClassName:
        "text-[14px] font-black uppercase tracking-[0.08em] text-[var(--color-global-dark)]",
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
      className={`logo-cube-wrap flex justify-start [perspective:1100px] ${className}`}
      aria-hidden="true"
      style={{ height: size, width: size }}
    >
      <div
        className={`cube-spin relative ${isExecutiveDark ? "cube-spin--executive-dark" : ""}`}
        style={{ height: size, width: size }}
      >
        {faces.map((face) => (
          <div
            key={face.key}
            className={`${baseFaceClasses} ${face.className}`}
            style={{ height: size, width: size, transform: face.transform }}
          >
            {face.text ? <span className={face.textClassName}>{face.text}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}