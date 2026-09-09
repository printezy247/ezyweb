import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getOrCreateUserByTelegram, createSubscription, recordPayment, activateSubscription } from "@/lib/users";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import type StripeType from "stripe";

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  let event: StripeType.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as StripeType.Checkout.Session;
      const { tier, interval, telegramId, email } = session.metadata || {};

      if (!tier || !interval) {
        console.error("Missing metadata in Stripe session", session.id);
        return NextResponse.json({ ok: true });
      }

      const user = await getOrCreateUserByTelegram({
        telegramId: telegramId || `stripe_${session.customer_email || session.id}`,
        name: email || session.customer_email || undefined,
      });

      const expiresAt = new Date();
      if (interval === "yearly") {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      } else {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      }

      const subscription = await createSubscription({
        userId: user.id,
        tier: tier as any,
        provider: "stripe",
        providerRef: session.subscription as string,
        amountUsd: session.amount_total ? session.amount_total / 100 : undefined,
        interval: interval as any,
        expiresAt,
        status: "active",
        metadata: JSON.stringify({ sessionId: session.id, customerId: session.customer }),
      });

      await recordPayment({
        userId: user.id,
        subscriptionId: subscription.id,
        amountUsd: session.amount_total ? session.amount_total / 100 : 0,
        provider: "stripe",
        providerRef: session.payment_intent as string,
        status: "completed",
        metadata: JSON.stringify({ sessionId: session.id }),
      });

      await activateSubscription(subscription.id);
    }

    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as StripeType.Invoice;
      const subscriptionId = (invoice as any).subscription;
      if (!subscriptionId) return NextResponse.json({ ok: true });

      const existing = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.providerRef, subscriptionId as string),
      });
      if (existing) {
        const newExpiry = new Date();
        if (existing.interval === "yearly") {
          newExpiry.setFullYear(newExpiry.getFullYear() + 1);
        } else {
          newExpiry.setMonth(newExpiry.getMonth() + 1);
        }
        await db
          .update(subscriptions)
          .set({ status: "active", expiresAt: newExpiry, updatedAt: new Date() })
          .where(eq(subscriptions.id, existing.id));
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object as StripeType.Subscription;
      const existing = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.providerRef, sub.id),
      });
      if (existing) {
        await db
          .update(subscriptions)
          .set({ status: "cancelled", cancelledAt: new Date(), updatedAt: new Date() })
          .where(eq(subscriptions.id, existing.id));
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
