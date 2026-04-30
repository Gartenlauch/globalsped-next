export function LogoCube() {
  const faces = ["G", "S", "30+", "EU", "AZ", "LOG"];

  const transforms = [
    "rotateY(0deg) translateZ(42px)",
    "rotateY(90deg) translateZ(42px)",
    "rotateY(180deg) translateZ(42px)",
    "rotateY(-90deg) translateZ(42px)",
    "rotateX(90deg) translateZ(42px)",
    "rotateX(-90deg) translateZ(42px)",
  ];

  return (
    <div className="mb-8 h-[84px] w-[84px] [perspective:800px] flex justify-start">
      <div className="cube-spin relative h-[84px] w-[84px]">
        {faces.map((face, index) => (
          <div
            key={face}
            className="absolute flex h-[84px] w-[84px] items-center justify-center rounded-xl border border-white/30 bg-white/90 text-xl font-black text-[var(--color-global-dark)] shadow-xl"
            style={{ transform: transforms[index] }}
          >
            {face}
          </div>
        ))}
      </div>
    </div>
  );
}