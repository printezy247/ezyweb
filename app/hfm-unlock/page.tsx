"use client";

import { useState } from "react";
import Link from "next/link";

export default function HfmUnlockPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const hfmMalaysiaUrl = process.env.NEXT_PUBLIC_HFM_MALAYSIA_URL || "https://www.hfmmalaysia.com/sv/en/?refid=30548341";
  const hfmIndonesiaUrl = process.env.NEXT_PUBLIC_HFM_INDONESIA_URL || "https://www.hfmmalaysia.com/sv/en/?refid=30548341";
  const usdtWallet = process.env.NEXT_PUBLIC_USDT_WALLET || "YOUR_USDT_TRC20_WALLET";

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-void py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 gradient-text">Unlock Rambo for Life</h1>
          <p className="text-text-dim text-lg">
            Activate a live HFM trading account under our Introducing Broker link and get Rambo tier free forever.
          </p>
        </div>

        <div className="space-y-6">
          <section className="bg-surface rounded-2xl p-6 border border-surface-light">
            <h2 className="text-2xl font-black mb-4">1. Open & Activate HFM Account</h2>
            <p className="text-text-dim mb-4">
              Click your region link below, register, and make at least one deposit + trade. Use a VPN for Indonesia if needed.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-light border border-surface-light">
                <div className="font-bold mb-2">🌏 Malaysia / Global</div>
                <a
                  href={hfmMalaysiaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan hover:underline break-all text-sm"
                >
                  {hfmMalaysiaUrl}
                </a>
              </div>
              <div className="p-4 rounded-xl bg-surface-light border border-surface-light">
                <div className="font-bold mb-2">🇮🇩 Indonesia (VPN)</div>
                <a
                  href={hfmIndonesiaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan hover:underline break-all text-sm"
                >
                  {hfmIndonesiaUrl}
                </a>
              </div>
            </div>
          </section>

          <section className="bg-surface rounded-2xl p-6 border border-surface-light">
            <h2 className="text-2xl font-black mb-4">2. Submit for Verification</h2>
            <p className="text-text-dim mb-4">
              In Telegram, send your HFM account ID and a screenshot of your activated account to the PropRank bot:
            </p>
            <div className="p-4 rounded-xl bg-surface-light font-mono text-sm text-text-dim mb-4">
              /hfm_unlock &lt;your-hfm-account-id&gt;
            </div>
            <p className="text-text-dim text-sm">
              Admin will review within 24 hours. Once approved, your Telegram account gets Rambo tier forever.
            </p>
          </section>

          <section className="bg-surface rounded-2xl p-6 border border-surface-light">
            <h2 className="text-2xl font-black mb-4">3. Or Pay with USDT (TRC20)</h2>
            <p className="text-text-dim mb-4">
              Send the equivalent USD amount in USDT-TRC20, then email/Telegram the tx hash. Admin will upgrade you manually.
            </p>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-light border border-surface-light">
              <code className="flex-1 break-all text-sm text-text-dim">{usdtWallet}</code>
              <button
                onClick={() => copy(usdtWallet, "wallet")}
                className="px-4 py-2 bg-cyan text-void rounded-lg font-bold text-sm hover:bg-cyan-dark transition"
              >
                {copied === "wallet" ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="mt-4 text-sm text-text-dim">
              Plans: Ranger $7/mo · Operator $15/mo · Rambo $29/mo (yearly discounts available in bot)
            </div>
          </section>
        </div>

        <div className="mt-10 text-center">
          <Link href="/pricing" className="text-cyan hover:underline">
            ← Back to pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
