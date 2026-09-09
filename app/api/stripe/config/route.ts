import { NextResponse } from "next/server";
import { getStripePriceId } from "@/lib/stripe";
import { PRICING } from "@/lib/tiers";

export async function GET() {
  const missingPrices = PRICING.flatMap((p) =>
    ["monthly", "yearly"].filter((interval) => !getStripePriceId(p.tier, interval as "monthly" | "yearly"))
  ).length;

  return NextResponse.json({
    configured: Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET),
    pricesConfigured: missingPrices === 0,
  });
}

export const runtime = "nodejs";