"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function AccountContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  return (
    <main className="min-h-screen bg-void py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-black mb-6 gradient-text">Your Account</h1>

        {success && (
          <div className="mb-8 p-4 rounded-xl bg-green/10 border border-green/30 text-green">
            ✅ Payment received! Your subscription will activate within 1 minute.
          </div>
        )}

        <div className="bg-surface rounded-2xl p-8 border border-surface-light mb-8">
          <p className="text-text-dim mb-4">
            Web account linking is coming soon. Right now the fastest way to manage your subscription is through the Telegram bot.
          </p>
          <div className="p-4 rounded-xl bg-surface-light font-mono text-sm text-text-dim mb-6">
            /my_tier
          </div>
          <p className="text-text-dim text-sm">
            Use this command in PropRank bot to check your current tier, expiry, and HFM verification status.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/pricing" className="block w-full py-3 rounded-xl bg-gold text-void font-bold hover:bg-gold-light transition">
            Upgrade Plan
          </Link>
          <Link href="/hfm-unlock" className="block w-full py-3 rounded-xl border border-gold text-gold font-bold hover:bg-gold/10 transition">
            Unlock via HFM IB
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void" />}>
      <AccountContent />
    </Suspense>
  );
}
