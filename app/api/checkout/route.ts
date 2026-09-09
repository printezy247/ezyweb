import { NextRequest, NextResponse } from "next/server";
import { stripe, getStripePriceId } from "@/lib/stripe";
import { TierId, TIER_ORDER } from "@/lib/tiers";

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
    }

    const body = await request.json();
    const { tier, interval, telegramId, email } = body as {
      tier: TierId;
      interval: "monthly" | "yearly";
      telegramId?: string;
      email?: string;
    };

    if (!tier || !TIER_ORDER.includes(tier) || tier === "scout") {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }
    if (!interval || !["monthly", "yearly"].includes(interval)) {
      return NextResponse.json({ error: "Invalid interval" }, { status: 400 });
    }

    const priceId = getStripePriceId(tier, interval);
    if (!priceId) {
      return NextResponse.json({ error: "Stripe price not configured for this plan" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=1`,
      metadata: {
        tier,
        interval,
        telegramId: telegramId || "",
        email: email || "",
      },
      customer_email: email || undefined,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
