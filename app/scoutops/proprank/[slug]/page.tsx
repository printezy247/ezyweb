import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { propFirms } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function FirmDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const firm = await db.query.propFirms.findFirst({
    where: eq(propFirms.slug, slug),
  });

  if (!firm || !firm.isActive) {
    notFound();
  }

  const trustColor = firm.trustScore >= 80 ? "text-green" : firm.trustScore >= 60 ? "text-gold" : "text-rose";

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/scoutops/proprank"
          className="mb-6 inline-block text-sm text-text-dim transition hover:text-cyan"
        >
          ← Back to directory
        </Link>

        <div className="overflow-hidden rounded-2xl border border-surface-light bg-surface">
          <div className="h-2 bg-gradient-to-r from-gold via-cyan to-rose" />

          <div className="p-8 sm:p-10">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black text-text">{firm.name}</h1>
                <p className="mt-1 text-text-dim">{firm.country}</p>
              </div>
              <div className={`text-3xl font-black ${trustColor}`}>{firm.trustScore}/100</div>
            </div>

            {firm.regulationNote && (
              <div className="mb-6 rounded-xl border border-gold/20 bg-gold/5 p-4 text-sm text-text-dim">
                🛡️ {firm.regulationNote}
              </div>
            )}

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <Detail label="Challenge Fee" value={`$${firm.challengeFeeUsd?.toLocaleString() ?? "—"}`} />
              <Detail label="Account Size" value={`$${firm.accountSizeUsd?.toLocaleString() ?? "—"}`} />
              <Detail label="Payout Split" value={firm.payoutSplitPct ? `${firm.payoutSplitPct}%` : "—"} />
              <Detail label="First Payout" value={firm.firstPayoutDays ? `${firm.firstPayoutDays} days` : "—"} />
              <Detail label="Daily DD" value={firm.maxDailyDrawdownPct ? `${firm.maxDailyDrawdownPct}%` : "—"} />
              <Detail label="Total DD" value={firm.maxTotalDrawdownPct ? `${firm.maxTotalDrawdownPct}%` : "—"} />
              <Detail label="Profit Target" value={firm.profitTargetPct ? `${firm.profitTargetPct}%` : "—"} />
              <Detail label="Min Trading Days" value={firm.minTradingDays?.toString() ?? "—"} />
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-text">Rules</h3>
              <div className="flex flex-wrap gap-2">
                <RuleTag ok={firm.allowsOvernight}>Overnight</RuleTag>
                <RuleTag ok={firm.allowsNewsTrading}>News trading</RuleTag>
                <RuleTag ok={firm.allowsEaBots}>EA/Bots</RuleTag>
              </div>
            </div>

            <a
              href={firm.affiliateUrl || process.env.PROPRANK_AFFILIATE_URL || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-xl bg-gradient-to-r from-gold to-gold-light px-8 py-4 font-bold text-void shadow-lg shadow-gold/20 transition hover:scale-105"
            >
              {firm.affiliateLabel || "💼 Funded Account (partner)"}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-surface-light bg-surface-light/30 p-4">
      <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
      <div className="mt-1 text-xl font-bold text-text">{value}</div>
    </div>
  );
}

function RuleTag({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        ok ? "bg-green/10 text-green" : "bg-rose/10 text-rose"
      }`}
    >
      {ok ? "✅" : "❌"} {children}
    </span>
  );
}
