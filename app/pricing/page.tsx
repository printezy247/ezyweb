"use client";

import { useState } from "react";
import Link from "next/link";
import { TIER_NAMES, TIER_DESCRIPTIONS, PRICING, FEATURES, type TierId } from "@/lib/tiers";

export default function PricingPage() {
  const [loading, setLoading] = useState<TierId | null>(null);
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");

  const handleStripeCheckout = async (tier: TierId) => {
    setLoading(tier);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, interval }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed");
      }
    } finally {
      setLoading(null);
    }
  };

  const formatValue = (val: boolean | string) => {
    if (val === true) return "✅";
    if (val === false) return "❌";
    return val;
  };

  return (
    <main className="min-h-screen bg-void py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 gradient-text">PropRank Tiers</h1>
          <p className="text-text-dim text-lg max-w-2xl mx-auto">
            Upgrade your prop-firm research. Pay monthly, yearly, or unlock Rambo for life by activating an HFM account under our IB.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-surface rounded-full p-1 border border-surface-light">
            <button
              onClick={() => setInterval("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition ${
                interval === "monthly" ? "bg-gold text-void" : "text-text-dim hover:text-text"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setInterval("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition ${
                interval === "yearly" ? "bg-gold text-void" : "text-text-dim hover:text-text"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PRICING.map((plan) => (
            <div
              key={plan.tier}
              className={`relative rounded-2xl p-6 border transition hover-lift ${
                plan.tier === "rambo"
                  ? "bg-surface border-gold/50 glow-gold"
                  : "bg-surface border-surface-light"
              }`}
            >
              {plan.tier === "rambo" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-void text-xs font-black px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h2 className="text-2xl font-black mb-1">{TIER_NAMES[plan.tier]}</h2>
              <p className="text-text-dim text-sm mb-4">{TIER_DESCRIPTIONS[plan.tier]}</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-gold">
                  ${interval === "yearly" ? plan.yearlyUsd : plan.monthlyUsd}
                </span>
                <span className="text-text-dim">/{interval === "yearly" ? "year" : "month"}</span>
                {interval === "yearly" && (
                  <div className="text-green text-sm font-bold mt-1">{plan.yearlyDiscount}</div>
                )}
              </div>

              <button
                onClick={() => handleStripeCheckout(plan.tier)}
                disabled={loading === plan.tier}
                className={`w-full py-3 rounded-xl font-bold transition mb-3 ${
                  plan.tier === "rambo"
                    ? "bg-gold text-void hover:bg-gold-light"
                    : "bg-cyan text-void hover:bg-cyan-dark"
                } disabled:opacity-50`}
              >
                {loading === plan.tier ? "Loading..." : `Upgrade to ${plan.tier}`}
              </button>

              {plan.tier === "rambo" && (
                <Link
                  href="/hfm-unlock"
                  className="block w-full text-center py-2 rounded-xl font-bold border border-gold/50 text-gold hover:bg-gold/10 transition"
                >
                  🔓 Unlock FREE via HFM IB
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="bg-surface rounded-2xl border border-surface-light overflow-hidden">
          <div className="p-6 border-b border-surface-light">
            <h2 className="text-2xl font-black">Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-surface-light text-text-dim text-sm">
                  <th className="p-4">Feature</th>
                  <th className="p-4 text-center">{TIER_NAMES.scout}</th>
                  <th className="p-4 text-center">{TIER_NAMES.ranger}</th>
                  <th className="p-4 text-center">{TIER_NAMES.operator}</th>
                  <th className="p-4 text-center text-gold">{TIER_NAMES.rambo}</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((feature) => (
                  <tr key={feature.id} className="border-b border-surface-light last:border-0">
                    <td className="p-4 text-text">{feature.label}</td>
                    <td className="p-4 text-center text-text-dim">{formatValue(feature.scout)}</td>
                    <td className="p-4 text-center text-text-dim">{formatValue(feature.ranger)}</td>
                    <td className="p-4 text-center text-text-dim">{formatValue(feature.operator)}</td>
                    <td className="p-4 text-center text-gold font-bold">{formatValue(feature.rambo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-text-dim text-sm mb-4">
            Prefer to pay with USDT? Use the bot or email support after sending USDT (TRC20) to the wallet shown on the HFM unlock page.
          </p>
          <Link href="/hfm-unlock" className="text-cyan hover:underline">
            See HFM IB / USDT options →
          </Link>
        </div>
      </div>
    </main>
  );
}
