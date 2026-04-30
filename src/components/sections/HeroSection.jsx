import Link from "next/link";
import { LogoCube } from "@/components/ui/LogoCube";

const destinations = [
  "Kasachstan",
  "Usbekistan",
  "Kirgisistan",
  "Turkmenistan",
  "Tadschikistan",
  "Aserbaidschan",
  "Georgien",
  "Armenien",
  "Mongolei",
  "Irak",
];

export function HeroSection() {
  const marqueeItems = [...destinations, ...destinations];

  return (
    <section
      id="hero"
      className="relative min-h-[680px] overflow-hidden bg-[var(--color-global-deep)]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,40,31,0.96)_0%,rgba(0,59,47,0.82)_42%,rgba(0,59,47,0.22)_100%)]" />

      <div className="relative z-10 flex min-h-[680px] items-center">
        <div className="container">
          <div className="max-w-[960px] text-white">
            <div className="mb-6 center-item">
              <LogoCube />
            </div>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.24em] text-lime-300">
              Globalsped International Logistics Solutions
            </p>

            <h1 className="text-[40px] font-black uppercase leading-[1.02] tracking-tight md:text-[58px]">
              Internationale Transporte
              <span className="block text-lime-300">zwischen Europa, Zentralasien</span>
              und dem Kaukasus
            </h1>

            <div className="mt-6 max-w-[960px] overflow-hidden border-y border-white/20 py-3">
              <div className="marquee-track flex w-max whitespace-nowrap text-sm font-bold uppercase tracking-wide text-white/90">
                {marqueeItems.map((item, index) => (
                  <span key={`${item}-${index}`} className="mr-8">
                    {index === 0 && (
                      <span className="mr-5 text-lime-300">🚛 Destinationen:</span>
                    )}
                    • {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 max-w-[540px] text-base leading-7 text-white/90 md:text-lg">
              Seit über 30 Jahren Ihr zuverlässiger Partner für FTL, LTL,
              Thermotransporte, Projekttransporte und Zollabwicklung in
              anspruchsvollen Märkten.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/de/anfrage" className="btn-primary">
                Transport anfragen
              </Link>

              <Link
                href="/de/destinationen"
                className="inline-flex items-center rounded-full border border-white/35 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[var(--color-global-dark)]"
              >
                Destinationen ansehen
              </Link>
            </div>

            <div className="mt-10 grid max-w-[960px] gap-4 md:grid-cols-3">
              {[
                ["Europa", "Direkte Transporte von und nach Europa."],
                ["Zentralasien", "Erfahrung auf anspruchsvollen Routen."],
                ["Kaukasus", "Zuverlässige Abwicklung in komplexen Märkten."],
              ].map(([title, text]) => (
                <article
                  key={title}
                  className="rounded-2xl border border-white/15 bg-[rgba(0,59,47,0.55)] p-5 shadow-xl backdrop-blur-md"
                >
                  <h2 className="text-xl font-black uppercase text-lime-300">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/85">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}