import Link from "next/link";
import { db } from "@/db";
import { propFirms } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const revalidate = 60;

function rankEmoji(score: number) {
  if (score >= 85) return "🥇";
  if (score >= 70) return "🥈";
  return "🥉";
}

function formatCurrency(value: number | null) {
  if (!value) return "—";
  return `$${value.toLocaleString()}`;
}

export default async function PropRankPage() {
  const firms = await db
    .select()
    .from(propFirms)
    .where(eq(propFirms.isActive, true))
    .orderBy(desc(propFirms.isSponsored), desc(propFirms.trustScore));

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-black text-text sm:text-5xl">
            <span className="text-cyan">🔭 ScoutOps</span> · PropRank
          </h1>
          <p className="mx-auto max-w-2xl text-text-dim">
            Compare prop firms. Find the best challenge. No subscription.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <StatCard label="Firms listed" value={firms.length.toString()} />
          <StatCard label="Sponsored" value={firms.filter((f) => f.isSponsored).length.toString()} />
          <StatCard label="Top trust score" value={`${Math.max(...firms.map((f) => f.trustScore))}/100`} />
        </div>

        {/* Directory */}
        <div className="overflow-hidden rounded-2xl border border-surface-light bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-light bg-surface-light/50 text-left text-xs uppercase tracking-wider text-gold">
                  <th className="px-6 py-4">Firm</th>
                  <th className="px-6 py-4">Fee</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Trust</th>
                  <th className="px-6 py-4">Payout</th>
                  <th className="px-6 py-4">Restrictions</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-light">
                {firms.map((firm) => (
                  <tr key={firm.id} className="transition hover:bg-surface-light/30">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{rankEmoji(firm.trustScore)}</span>
                        <div>
                          <div className="font-bold text-text">{firm.name}</div>
                          {firm.isSponsored && (
                            <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs font-semibold text-gold">
                              Sponsored
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-text-dim">{formatCurrency(firm.challengeFeeUsd)}</td>
                    <td className="px-6 py-5 text-text-dim">{formatCurrency(firm.accountSizeUsd)}</td>
                    <td className="px-6 py-5 font-bold text-gold">{firm.trustScore}/100</td>
                    <td className="px-6 py-5 text-text-dim">
                      {firm.payoutSplitPct ? `${firm.payoutSplitPct}%` : "—"}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1">
                        {!firm.allowsOvernight && <Tag>No overnight</Tag>}
                        {!firm.allowsNewsTrading && <Tag>No news</Tag>}
                        {!firm.allowsEaBots && <Tag>No EAs</Tag>}
                        {firm.allowsOvernight && firm.allowsNewsTrading && firm.allowsEaBots && (
                          <span className="text-sm text-cyan">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <Link
                        href={`/scoutops/proprank/${firm.slug}`}
                        className="rounded-lg bg-gradient-to-r from-gold to-gold-light px-4 py-2 text-sm font-bold text-void transition hover:opacity-90"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-text-muted">
          Want your firm listed?{" "}
          <a href="mailto:hello@example.com" className="text-gold hover:underline">
            Sponsor a listing
          </a>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-surface-light bg-surface p-6 text-center transition hover:-translate-y-1 hover:border-gold/30">
      <div className="text-3xl font-black text-gold">{value}</div>
      <div className="text-sm text-text-dim">{label}</div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-surface-light px-2 py-1 text-xs text-text-muted">{children}</span>
  );
}
