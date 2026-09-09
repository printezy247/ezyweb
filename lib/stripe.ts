import Stripe from "stripe";
import { PRICING, type TierId } from "@/lib/tiers";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-08-26.dahlia" })
  : null;

export function getStripePriceId(tier: TierId, interval: "monthly" | "yearly"): string | null {
  const envMap: Record<string, string | undefined> = {
    ranger_monthly: process.env.STRIPE_PRICE_RANGER_MONTHLY,
    ranger_yearly: process.env.STRIPE_PRICE_RANGER_YEARLY,
    operator_monthly: process.env.STRIPE_PRICE_OPERATOR_MONTHLY,
    operator_yearly: process.env.STRIPE_PRICE_OPERATOR_YEARLY,
    rambo_monthly: process.env.STRIPE_PRICE_RAMBO_MONTHLY,
    rambo_yearly: process.env.STRIPE_PRICE_RAMBO_YEARLY,
  };
  return envMap[`${tier}_${interval}`] || null;
}

export function getPlanPrice(tier: TierId, interval: "monthly" | "yearly"): number {
  const plan = PRICING.find((p) => p.tier === tier);
  if (!plan) return 0;
  return interval === "yearly" ? plan.yearlyUsd : plan.monthlyUsd;
}

export function isStripeConfigured(): boolean {
  return Boolean(stripe && process.env.STRIPE_WEBHOOK_SECRET);
}
