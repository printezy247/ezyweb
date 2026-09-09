import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userTierEnum = pgEnum("user_tier", ["scout", "ranger", "operator", "rambo"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "cancelled", "expired", "pending"]);
export const subscriptionProviderEnum = pgEnum("subscription_provider", [
  "stripe",
  "telegram_stars",
  "usdt_manual",
  "hfm_ib",
]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "completed", "failed", "refunded"]);
export const hfmVerificationStatusEnum = pgEnum("hfm_verification_status", ["pending", "approved", "rejected"]);

export const propFirms = pgTable("prop_firms", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  logoUrl: text("logo_url"),

  challengeFeeUsd: integer("challenge_fee_usd"),
  accountSizeUsd: integer("account_size_usd"),

  maxDailyDrawdownPct: integer("max_daily_drawdown_pct"),
  maxTotalDrawdownPct: integer("max_total_drawdown_pct"),
  profitTargetPct: integer("profit_target_pct"),
  minTradingDays: integer("min_trading_days"),
  allowsOvernight: boolean("allows_overnight").notNull().default(true),
  allowsNewsTrading: boolean("allows_news_trading").notNull().default(true),
  allowsEaBots: boolean("allows_ea_bots").notNull().default(true),

  payoutSplitPct: integer("payout_split_pct"),
  firstPayoutDays: integer("first_payout_days"),

  trustScore: integer("trust_score").notNull().default(70),
  country: varchar("country", { length: 80 }),
  regulationNote: text("regulation_note"),

  affiliateUrl: text("affiliate_url"),
  affiliateLabel: varchar("affiliate_label", { length: 120 }),
  isSponsored: boolean("is_sponsored").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  telegramId: varchar("telegram_id", { length: 64 }).unique(),
  email: varchar("email", { length: 255 }).unique(),
  name: varchar("name", { length: 120 }),
  username: varchar("username", { length: 120 }),
  currentTier: userTierEnum("current_tier").notNull().default("scout"),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  tier: userTierEnum("tier").notNull(),
  status: subscriptionStatusEnum("status").notNull().default("pending"),
  provider: subscriptionProviderEnum("provider").notNull(),
  providerRef: varchar("provider_ref", { length: 255 }),
  amountUsd: integer("amount_usd"),
  interval: varchar("interval", { length: 20 }), // monthly / yearly / lifetime
  startedAt: timestamp("started_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  cancelledAt: timestamp("cancelled_at"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  subscriptionId: integer("subscription_id").references(() => subscriptions.id),
  amountUsd: integer("amount_usd").notNull(),
  provider: subscriptionProviderEnum("provider").notNull(),
  providerRef: varchar("provider_ref", { length: 255 }),
  status: paymentStatusEnum("status").notNull().default("pending"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const hfmIbVerifications = pgTable("hfm_ib_verifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  refidUsed: varchar("refid_used", { length: 40 }),
  hfmAccountId: varchar("hfm_account_id", { length: 80 }),
  proofUrl: text("proof_url"),
  status: hfmVerificationStatusEnum("status").notNull().default("pending"),
  reviewerNote: text("reviewer_note"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
});

export type PropFirm = typeof propFirms.$inferSelect;
export type NewPropFirm = typeof propFirms.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

export type HfmIbVerification = typeof hfmIbVerifications.$inferSelect;
export type NewHfmIbVerification = typeof hfmIbVerifications.$inferInsert;

export const usersRelations = relations(users, ({ many }) => ({
  subscriptions: many(subscriptions),
  payments: many(payments),
  hfmIbVerifications: many(hfmIbVerifications),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, { fields: [subscriptions.userId], references: [users.id] }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, { fields: [payments.userId], references: [users.id] }),
  subscription: one(subscriptions, { fields: [payments.subscriptionId], references: [subscriptions.id] }),
}));

export const hfmIbVerificationsRelations = relations(hfmIbVerifications, ({ one }) => ({
  user: one(users, { fields: [hfmIbVerifications.userId], references: [users.id] }),
}));
