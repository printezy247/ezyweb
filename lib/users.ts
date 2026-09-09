import { db } from "@/db";
import { users, subscriptions, hfmIbVerifications, payments } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import type { TierId } from "@/lib/tiers";

export async function getOrCreateUserByTelegram(input: {
  telegramId: string;
  name?: string;
  username?: string;
}) {
  const existing = await db.query.users.findFirst({
    where: eq(users.telegramId, input.telegramId),
  });
  if (existing) {
    await db
      .update(users)
      .set({
        name: input.name || existing.name,
        username: input.username || existing.username,
        updatedAt: new Date(),
      })
      .where(eq(users.id, existing.id));
    return { ...existing, name: input.name || existing.name, username: input.username || existing.username };
  }

  const [created] = await db
    .insert(users)
    .values({
      telegramId: input.telegramId,
      name: input.name || null,
      username: input.username || null,
      currentTier: "scout",
    })
    .returning();
  return created;
}

export async function getUserTier(telegramId: string): Promise<TierId> {
  const user = await db.query.users.findFirst({
    where: eq(users.telegramId, telegramId),
  });
  return (user?.currentTier as TierId) || "scout";
}

export async function setUserTier(telegramId: string, tier: TierId) {
  const user = await db.query.users.findFirst({
    where: eq(users.telegramId, telegramId),
  });
  if (!user) return null;

  await db
    .update(users)
    .set({ currentTier: tier, updatedAt: new Date() })
    .where(eq(users.id, user.id));
  return tier;
}

export async function createSubscription(input: {
  userId: number;
  tier: TierId;
  provider: "stripe" | "telegram_stars" | "usdt_manual" | "hfm_ib";
  providerRef?: string;
  amountUsd?: number;
  interval?: "monthly" | "yearly" | "lifetime";
  expiresAt?: Date;
  status?: "active" | "pending";
  metadata?: string;
}) {
  const [subscription] = await db
    .insert(subscriptions)
    .values({
      userId: input.userId,
      tier: input.tier,
      provider: input.provider,
      providerRef: input.providerRef || null,
      amountUsd: input.amountUsd || null,
      interval: input.interval || "monthly",
      expiresAt: input.expiresAt || null,
      status: input.status || "pending",
      metadata: input.metadata || null,
    })
    .returning();
  return subscription;
}

export async function activateSubscription(subscriptionId: number) {
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.id, subscriptionId),
  });
  if (!subscription) return null;

  await db
    .update(subscriptions)
    .set({ status: "active", updatedAt: new Date() })
    .where(eq(subscriptions.id, subscriptionId));

  await db
    .update(users)
    .set({ currentTier: subscription.tier as TierId, updatedAt: new Date() })
    .where(eq(users.id, subscription.userId));

  return subscription;
}

export async function recordPayment(input: {
  userId: number;
  subscriptionId?: number;
  amountUsd: number;
  provider: "stripe" | "telegram_stars" | "usdt_manual" | "hfm_ib";
  providerRef?: string;
  status?: "pending" | "completed" | "failed";
  metadata?: string;
}) {
  const [payment] = await db
    .insert(payments)
    .values({
      userId: input.userId,
      subscriptionId: input.subscriptionId || null,
      amountUsd: input.amountUsd,
      provider: input.provider,
      providerRef: input.providerRef || null,
      status: input.status || "pending",
      metadata: input.metadata || null,
    })
    .returning();
  return payment;
}

export async function createHfmVerification(input: {
  userId: number;
  refidUsed?: string;
  hfmAccountId?: string;
  proofUrl?: string;
}) {
  const [verification] = await db
    .insert(hfmIbVerifications)
    .values({
      userId: input.userId,
      refidUsed: input.refidUsed || null,
      hfmAccountId: input.hfmAccountId || null,
      proofUrl: input.proofUrl || null,
      status: "pending",
    })
    .returning();
  return verification;
}

export async function getPendingHfmVerifications() {
  return db.query.hfmIbVerifications.findMany({
    where: eq(hfmIbVerifications.status, "pending"),
    with: {
      user: true,
    },
    orderBy: desc(hfmIbVerifications.submittedAt),
  });
}

export async function decideHfmVerification(
  verificationId: number,
  decision: "approved" | "rejected",
  reviewerNote?: string
) {
  const verification = await db.query.hfmIbVerifications.findFirst({
    where: eq(hfmIbVerifications.id, verificationId),
  });
  if (!verification) return null;

  await db
    .update(hfmIbVerifications)
    .set({
      status: decision,
      reviewerNote: reviewerNote || null,
      reviewedAt: new Date(),
    })
    .where(eq(hfmIbVerifications.id, verificationId));

  if (decision === "approved") {
    await db
      .update(users)
      .set({ currentTier: "rambo", updatedAt: new Date() })
      .where(eq(users.id, verification.userId));

    const user = await db.query.users.findFirst({
      where: eq(users.id, verification.userId),
    });
    if (user) {
      await createSubscription({
        userId: user.id,
        tier: "rambo",
        provider: "hfm_ib",
        interval: "lifetime",
        status: "active",
        metadata: JSON.stringify({ verificationId, hfmAccountId: verification.hfmAccountId }),
      });
    }
  }

  return verification;
}
