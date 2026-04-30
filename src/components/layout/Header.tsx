import Link from "next/link";

export function Header() {
  return (
    <header style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <div className="container flex justify-between items-center py-4">
        <div className="font-extrabold tracking-wide text-[var(--color-global-green)]">
            GLOBALSPED
        </div>

        <nav className="flex gap-8 items-center text-sm font-bold uppercase tracking-wide nav-text">
          <Link href="/de">Start</Link>
          <Link href="/de/destinationen">Destinationen</Link>
          <Link href="/de/leistungen">Leistungen</Link>
          <Link href="/de/faq">FAQ</Link>

          <Link href="/de/anfrage" className="btn-primary">
            Anfrage
          </Link>
        </nav>
      </div>
    </header>
  );
}