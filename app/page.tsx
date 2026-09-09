import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 py-24">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan/10 blur-[120px]" />

        <div className="relative z-10 text-center">
          <h1 className="mb-6 text-5xl font-black tracking-tight sm:text-7xl md:text-8xl">
            <span className="gradient-text">🚀 EZYWEB</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-dim sm:text-xl">
            Free trading tools for traders burned by subscriptions, scams, and opaque markets.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-text-muted">
            Telegram bots + web dashboards · Free live data · No paid subscriptions
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/scoutops/proprank"
              className="rounded-xl bg-gradient-to-r from-gold to-gold-light px-8 py-4 font-bold text-void shadow-lg shadow-gold/20 transition hover:scale-105 hover:shadow-gold/30"
            >
              Explore PropRank
            </Link>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-surface-light bg-surface px-8 py-4 font-bold text-text transition hover:border-cyan hover:text-cyan"
            >
              Telegram Bot
            </a>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-text">
            🪖 <span className="text-gold">4 Brands</span> · 9 Products
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <BrandCard
              emoji="🥇"
              name="AurumOps"
              desc="Gold / XAUUSD intelligence suite"
              products="GoldPulse, SignalCheck, EventSentry"
              color="gold"
            />
            <BrandCard
              emoji="🛡️"
              name="ShieldOps"
              desc="Risk & account protection"
              products="ArmorCalc, TradeLog, PulseTrack"
              color="cyan"
            />
            <BrandCard
              emoji="🔭"
              name="ScoutOps"
              desc="Discovery & opportunity"
              products="PropRank ✅, TrendSpot"
              color="violet"
            />
            <BrandCard
              emoji="📡"
              name="RelayOps"
              desc="Signal infrastructure"
              products="AlertRelay"
              color="rose"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-light px-6 py-12 text-center text-text-muted">
        <p className="gradient-text text-xl font-bold">printezy · ezyweb</p>
        <p className="mt-2 text-sm">Built for traders. Free forever. No subscriptions.</p>
        <p className="mt-4 text-xs">Educational research only. Not financial advice.</p>
      </footer>
    </main>
  );
}

function BrandCard({
  emoji,
  name,
  desc,
  products,
  color,
}: {
  emoji: string;
  name: string;
  desc: string;
  products: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    gold: "border-gold/20 hover:border-gold/50",
    cyan: "border-cyan/20 hover:border-cyan/50",
    violet: "border-violet/20 hover:border-violet/50",
    rose: "border-rose/20 hover:border-rose/50",
  };

  return (
    <div
      className={`rounded-2xl border ${colorClasses[color]} bg-surface p-8 transition hover:-translate-y-1 hover:bg-surface-light`}
    >
      <div className="mb-4 text-4xl">{emoji}</div>
      <h3 className="mb-2 text-2xl font-bold text-text">{name}</h3>
      <p className="mb-4 text-text-dim">{desc}</p>
      <p className="text-sm text-text-muted">{products}</p>
    </div>
  );
}
