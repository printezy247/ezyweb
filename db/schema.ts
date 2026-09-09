import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

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

export type PropFirm = typeof propFirms.$inferSelect;
export type NewPropFirm = typeof propFirms.$inferInsert;
