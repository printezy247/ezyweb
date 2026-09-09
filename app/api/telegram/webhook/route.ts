import { Bot, Keyboard } from "grammy";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { propFirms, users, hfmIbVerifications } from "@/db/schema";
import { desc, eq, ilike, sql } from "drizzle-orm";
import {
  getOrCreateUserByTelegram,
  getUserTier,
  createSubscription,
  recordPayment,
  createHfmVerification,
  decideHfmVerification,
  setUserTier,
} from "@/lib/users";
import { PRICING, TIER_NAMES, TIER_DESCRIPTIONS, hasTier, getCompareLimit, tierMeets, type TierId } from "@/lib/tiers";

let botInstance: Bot | null = null;

const ADMIN_IDS = (process.env.ADMIN_TELEGRAM_IDS || "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

function isAdmin(ctx: any): boolean {
  const userId = ctx.from?.id?.toString();
  return userId ? ADMIN_IDS.includes(userId) : false;
}

const FUTURISTIC_HEADER = "━━━━━━━━━━━━━━━━━━━━━━━━━";
const FUTURISTIC_DIVIDER = "───────── ⚙ ─────────";

function mainKeyboard() {
  return new Keyboard()
    .text("🏆 Top Firms").text("🔎 Search")
    .row()
    .text("⚔️ Compare").text("👤 My Tier")
    .row()
    .text("⚡ Upgrade").text("🔓 HFM")
    .resized();
}

function getBot() {
  if (botInstance) return botInstance;

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set");
  }

  const bot = new Bot(token);

  function rankEmoji(score: number) {
    if (score >= 85) return "🥇";
    if (score >= 70) return "🥈";
    return "🥉";
  }

  function formatFirm(firm: typeof propFirms.$inferSelect) {
    const restrictions = [];
    if (!firm.allowsOvernight) restrictions.push("❌ No overnight");
    if (!firm.allowsNewsTrading) restrictions.push("❌ No news trading");
    if (!firm.allowsEaBots) restrictions.push("❌ No EAs");

    return [
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `💼 <b>${firm.name}</b>`,
      `${rankEmoji(firm.trustScore)} Trust score: <b>${firm.trustScore}/100</b>`,
      ``,
      `💰 Fee: <b>$${firm.challengeFeeUsd?.toLocaleString() ?? "—"}</b>`,
      `📊 Size: <b>$${firm.accountSizeUsd?.toLocaleString() ?? "—"}</b>`,
      `🎯 Payout: <b>${firm.payoutSplitPct ?? "—"}%</b>`,
      `📏 Daily DD: <b>${firm.maxDailyDrawdownPct ?? "—"}%</b>`,
      restrictions.length > 0 ? `⚠️ ${restrictions.join(", ")}` : "",
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function tierBadge(tier: TierId): string {
    if (tier === "rambo") return "🔥";
    if (tier === "operator") return "🛡️";
    if (tier === "ranger") return "🎯";
    return "🥾";
  }

  function formatUpgradeOptions(): string {
    return PRICING.map((p) => {
      const name = TIER_NAMES[p.tier].replace(/^[🥾🎯🛡️🔥]\s*/, "");
      return `• <b>${TIER_NAMES[p.tier]}</b>: $${p.monthlyUsd}/mo or $${p.yearlyUsd}/yr\n   ${TIER_DESCRIPTIONS[p.tier]}`;
    }).join("\n\n");
  }

  async function ensureUser(ctx: any) {
    const from = ctx.from;
    if (!from) return null;
    return getOrCreateUserByTelegram({
      telegramId: from.id.toString(),
      name: [from.first_name, from.last_name].filter(Boolean).join(" ") || undefined,
      username: from.username || undefined,
    });
  }

  // ===== Slash commands =====

  bot.command("start", async (ctx) => {
    await ensureUser(ctx);

    if (ctx.match === "upgrade") {
      const user = await ensureUser(ctx);
      if (!user) return;
      const keyboard: { text: string; callback_data: string }[][] = [];
      PRICING.forEach((p) => {
        keyboard.push([{ text: `${TIER_NAMES[p.tier]} — $${p.monthlyUsd}/mo`, callback_data: `upgrade:${p.tier}:monthly` }]);
        keyboard.push([{ text: `${TIER_NAMES[p.tier]} — $${p.yearlyUsd}/yr`, callback_data: `upgrade:${p.tier}:yearly` }]);
      });
      keyboard.push([{ text: "🔓 Unlock FREE via HFM IB", callback_data: "hfm_unlock" }]);

      await ctx.reply(
        [
          `${FUTURISTIC_HEADER}`,
          `⚡ <b>Upgrade PropRank</b>`,
          `${FUTURISTIC_HEADER}`,
          ``,
          `Pay with <b>Telegram Stars</b>, <b>Stripe</b> (card), or <b>USDT</b>.`,
          ``,
          formatUpgradeOptions(),
        ].join("\n"),
        {
          parse_mode: "HTML",
          reply_markup: { inline_keyboard: keyboard },
        }
      );
      return;
    }

    await ctx.reply(
      [
        `━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `🚀 <b>EZYWEB — PropRank</b>`,
        `ScoutOps Prop-Firm Directory`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        `Use the <b>menu buttons</b> below to navigate.`,
        `Or type a slash <code>/</code> to see all commands.`,
        ``,
        `🥾 Start free as a Scout`,
        `⚡ Upgrade for full power`,
        `🔓 Free Rambo via HFM IB`,
      ].join("\n"),
      { parse_mode: "HTML", reply_markup: mainKeyboard() }
    );
  });

  bot.command("my_tier", async (ctx) => {
    const user = await ensureUser(ctx);
    if (!user) return;
    const tier = (user.currentTier as TierId) || "scout";
    const compareLimit = getCompareLimit(tier);
    await ctx.reply(
      [
        `${FUTURISTIC_HEADER}`,
        `${tierBadge(tier)} <b>Your Tier: ${TIER_NAMES[tier]}</b>`,
        `${FUTURISTIC_HEADER}`,
        ``,
        `🔍 Search: ${tierMeets(tier, "search") ? "✅" : "❌"}`,
        `⚔️ Compare limit: ${compareLimit === 0 ? "❌" : compareLimit + " firms"}`,
        `📊 Advanced filters: ${tierMeets(tier, "advanced_filters") ? "✅" : "❌"}`,
        `📥 CSV export: ${tierMeets(tier, "csv_export") ? "✅" : "❌"}`,
        `🔑 API access: ${tierMeets(tier, "api_access") ? "✅" : "❌"}`,
        ``,
        `${FUTURISTIC_DIVIDER}`,
        `Tap ⚡ <b>Upgrade</b> or 🔓 <b>HFM</b> to level up.`,
      ].join("\n"),
      { parse_mode: "HTML", reply_markup: mainKeyboard() }
    );
  });

  bot.command("upgrade", async (ctx) => {
    await ensureUser(ctx);
    const keyboard: { text: string; callback_data: string }[][] = [];
    PRICING.forEach((p) => {
      keyboard.push([{ text: `${TIER_NAMES[p.tier]} — $${p.monthlyUsd}/mo`, callback_data: `upgrade:${p.tier}:monthly` }]);
      keyboard.push([{ text: `${TIER_NAMES[p.tier]} — $${p.yearlyUsd}/yr`, callback_data: `upgrade:${p.tier}:yearly` }]);
    });
    keyboard.push([{ text: "🔓 Unlock FREE via HFM IB", callback_data: "hfm_unlock" }]);

    await ctx.reply(
      [
        `${FUTURISTIC_HEADER}`,
        `⚡ <b>Upgrade PropRank</b>`,
        `${FUTURISTIC_HEADER}`,
        ``,
        `Pay with <b>Telegram Stars</b>, <b>Stripe</b> (card), or <b>USDT</b>.`,
        ``,
        formatUpgradeOptions(),
      ].join("\n"),
      {
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: keyboard },
      }
    );
  });

  bot.command("hfm_unlock", async (ctx) => {
    const user = await ensureUser(ctx);
    if (!user) return;

    const args = ctx.match?.toString().trim();
    if (!args) {
      await ctx.reply(
        [
          `${FUTURISTIC_HEADER}`,
          `🔓 <b>Free Rambo via HFM IB</b>`,
          `${FUTURISTIC_HEADER}`,
          ``,
          `1. Open & activate an HFM account:`,
          `   🇲🇾 <a href="${process.env.HFM_MALAYSIA_URL || "https://www.hfmmalaysia.com/sv/en/?refid=30548341"}">hfmmalaysia.com</a>`,
          `   🇮🇩 <a href="${process.env.HFM_INDONESIA_URL || process.env.HFM_MALAYSIA_URL || "https://www.hfmmalaysia.com/sv/en/?refid=30548341"}">hfmtrade-ind.com (VPN)</a>`,
          ``,
          `2. Submit your HFM account ID:`,
          `   <code>/hfm_unlock YOUR_HFM_ACCOUNT_ID</code>`,
          ``,
          `${FUTURISTIC_DIVIDER}`,
          `Admin will verify within 24 hours.`,
        ].join("\n"),
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "🇲🇾 Open HFM Malaysia", url: process.env.HFM_MALAYSIA_URL || "https://www.hfmmalaysia.com/sv/en/?refid=30548341" }],
              [{ text: "🇮🇩 Open HFM Indonesia", url: process.env.HFM_INDONESIA_URL || process.env.HFM_MALAYSIA_URL || "https://www.hfmmalaysia.com/sv/en/?refid=30548341" }],
            ],
          },
        }
      );
      return;
    }

    const hfmAccountId = args.split(" ")[0];
    await createHfmVerification({
      userId: user.id,
      refidUsed: "30548341",
      hfmAccountId,
    });

    await ctx.reply(
      [
        `${FUTURISTIC_HEADER}`,
        `✅ <b>HFM Verification Submitted</b>`,
        `${FUTURISTIC_HEADER}`,
        ``,
        `Account ID: <code>${hfmAccountId}</code>`,
        `Status: <b>Pending review</b>`,
        ``,
        `Send a screenshot if you have one. Admin will approve within 24 hours.`,
      ].join("\n"),
      { parse_mode: "HTML", reply_markup: mainKeyboard() }
    );

    for (const adminId of ADMIN_IDS) {
      try {
        await bot.api.sendMessage(
          adminId,
          `🔔 New HFM verification\nUser: ${user.telegramId}\nName: ${user.name || "—"}\nHFM ID: ${hfmAccountId}`,
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "✅ Approve", callback_data: `admin_hfm:${user.telegramId}:approve` }],
                [{ text: "❌ Reject", callback_data: `admin_hfm:${user.telegramId}:reject` }],
              ],
            },
          }
        );
      } catch (e) {
        console.error("Failed to notify admin", adminId, e);
      }
    }
  });

  bot.command(["top", "proprank", "scoutops"], async (ctx) => {
    const firms = await db
      .select()
      .from(propFirms)
      .where(eq(propFirms.isActive, true))
      .orderBy(desc(propFirms.isSponsored), desc(propFirms.trustScore))
      .limit(5);

    if (firms.length === 0) {
      await ctx.reply("⚠️ No firms in the database yet.", { reply_markup: mainKeyboard() });
      return;
    }

    const lines = [
      `${FUTURISTIC_HEADER}`,
      `🏆 <b>Top Prop Firms</b>`,
      `${FUTURISTIC_HEADER}`,
      ``,
    ];
    const keyboard: { text: string; callback_data: string }[][] = [];

    firms.forEach((f, i) => {
      lines.push(
        `${i + 1}. ${rankEmoji(f.trustScore)} <b>${f.name}</b> — Trust ${f.trustScore}/100\n` +
          `   Fee: $${f.challengeFeeUsd?.toLocaleString() ?? "—"}`
      );
      keyboard.push([{ text: `📡 ${f.name}`, callback_data: `firm:${f.slug}` }]);
    });

    await ctx.reply(lines.join("\n"), {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: keyboard },
    });
  });

  bot.command("firm", async (ctx) => {
    const args = ctx.match;
    if (!args) {
      await ctx.reply("Usage: <code>/firm ftmo</code>\nOr tap 🔎 Search from the menu.", { parse_mode: "HTML" });
      return;
    }

    const firm = await db.query.propFirms.findFirst({
      where: sql`(${propFirms.slug} = ${args.toLowerCase()} OR LOWER(${propFirms.name}) = ${args.toLowerCase()}) AND ${propFirms.isActive} = true`,
    });

    if (!firm) {
      await ctx.reply(
        `❌ No firm found for '<b>${args}</b>'.\nTry 🔎 Search from the menu.`,
        { parse_mode: "HTML" }
      );
      return;
    }

    await ctx.reply(formatFirm(firm), {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🌐 Web profile",
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/scoutops/proprank/${firm.slug}`,
            },
          ],
          [
            {
              text: firm.affiliateLabel || "💼 Funded Account",
              url: firm.affiliateUrl || process.env.PROPRANK_AFFILIATE_URL || "#",
            },
          ],
        ],
      },
    });
  });

  bot.command("search", async (ctx) => {
    const user = await ensureUser(ctx);
    const tier = (user?.currentTier as TierId) || "scout";
    if (!tierMeets(tier, "search")) {
      await ctx.reply(
        [
          `🔒 <b>Search requires Ranger tier</b>`,
          ``,
          `Use ⚡ Upgrade from the menu, or 🔓 HFM for free Rambo.`,
        ].join("\n"),
        { parse_mode: "HTML", reply_markup: mainKeyboard() }
      );
      return;
    }

    const args = ctx.match;
    if (!args) {
      await ctx.reply("Usage: <code>/search funded</code>\nOr tap 🔎 Search from the menu.", { parse_mode: "HTML" });
      return;
    }

    const firms = await db
      .select()
      .from(propFirms)
      .where(sql`${propFirms.isActive} = true AND ${ilike(propFirms.name, `%${args}%`)}`)
      .orderBy(desc(propFirms.trustScore))
      .limit(5);

    if (firms.length === 0) {
      await ctx.reply(`🔍 No results for '<b>${args}</b>'.`, { parse_mode: "HTML" });
      return;
    }

    const lines = [
      `${FUTURISTIC_HEADER}`,
      `🔎 <b>Results for '${args}'</b>`,
      `${FUTURISTIC_HEADER}`,
      ``,
    ];
    const keyboard = firms.map((f) => [{ text: `📡 ${f.name}`, callback_data: `firm:${f.slug}` }]);

    firms.forEach((f) => {
      lines.push(`• <b>${f.name}</b> — Trust ${f.trustScore}/100`);
    });

    await ctx.reply(lines.join("\n"), {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: keyboard },
    });
  });

  bot.command("compare", async (ctx) => {
    const user = await ensureUser(ctx);
    const tier = (user?.currentTier as TierId) || "scout";
    const limit = getCompareLimit(tier);
    if (limit === 0) {
      await ctx.reply(
        [
          `🔒 <b>Compare requires Ranger tier</b>`,
          ``,
          `Use ⚡ Upgrade from the menu, or 🔓 HFM for free Rambo.`,
        ].join("\n"),
        { parse_mode: "HTML", reply_markup: mainKeyboard() }
      );
      return;
    }

    const args = ctx.match;
    if (!args || !args.toLowerCase().includes(" vs ")) {
      await ctx.reply("Usage: <code>/compare FTMO vs FundedNext</code>", { parse_mode: "HTML" });
      return;
    }

    const names = args.toLowerCase().split(" vs ").map((s) => s.trim());
    if (names.length > limit + 1) {
      await ctx.reply(
        `🔒 <b>${TIER_NAMES[tier]}</b> allows comparing up to <b>${limit}</b> firms.\nUpgrade to compare more.`,
        { parse_mode: "HTML" }
      );
      return;
    }

    const [aName, bName] = names.slice(0, 2);
    const [a, b] = await Promise.all([
      db.query.propFirms.findFirst({
        where: sql`LOWER(${propFirms.name}) = ${aName} AND ${propFirms.isActive} = true`,
      }),
      db.query.propFirms.findFirst({
        where: sql`LOWER(${propFirms.name}) = ${bName} AND ${propFirms.isActive} = true`,
      }),
    ]);

    if (!a || !b) {
      await ctx.reply("❌ Could not find both firms. Use exact names.", { parse_mode: "HTML" });
      return;
    }

    await ctx.reply(
      [
        `${FUTURISTIC_HEADER}`,
        `⚔️ <b>${a.name} vs ${b.name}</b>`,
        `${FUTURISTIC_HEADER}`,
        ``,
        `Trust: ${a.trustScore} — ${b.trustScore}`,
        `Fee: $${a.challengeFeeUsd?.toLocaleString() ?? "—"} — $${b.challengeFeeUsd?.toLocaleString() ?? "—"}`,
        `Size: $${a.accountSizeUsd?.toLocaleString() ?? "—"} — $${b.accountSizeUsd?.toLocaleString() ?? "—"}`,
        `Payout: ${a.payoutSplitPct ?? "—"}% — ${b.payoutSplitPct ?? "—"}%`,
        `Daily DD: ${a.maxDailyDrawdownPct ?? "—"}% — ${b.maxDailyDrawdownPct ?? "—"}%`,
        `Total DD: ${a.maxTotalDrawdownPct ?? "—"}% — ${b.maxTotalDrawdownPct ?? "—"}%`,
      ].join("\n"),
      {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              { text: `📡 ${a.name}`, callback_data: `firm:${a.slug}` },
              { text: `📡 ${b.name}`, callback_data: `firm:${b.slug}` },
            ],
          ],
        },
      }
    );
  });

  // ===== Text button handlers (ReplyKeyboard) =====

  bot.hears("🏆 Top Firms", async (ctx: any) => {
    const firms = await db
      .select()
      .from(propFirms)
      .where(eq(propFirms.isActive, true))
      .orderBy(desc(propFirms.isSponsored), desc(propFirms.trustScore))
      .limit(5);

    if (firms.length === 0) {
      await ctx.reply("⚠️ No firms in the database yet.", { reply_markup: mainKeyboard() });
      return;
    }

    const lines = [
      `${FUTURISTIC_HEADER}`,
      `🏆 <b>Top Prop Firms</b>`,
      `${FUTURISTIC_HEADER}`,
      ``,
    ];
    const keyboard: { text: string; callback_data: string }[][] = [];

    firms.forEach((f, i) => {
      lines.push(
        `${i + 1}. ${rankEmoji(f.trustScore)} <b>${f.name}</b> — Trust ${f.trustScore}/100\n` +
          `   Fee: $${f.challengeFeeUsd?.toLocaleString() ?? "—"}`
      );
      keyboard.push([{ text: `📡 ${f.name}`, callback_data: `firm:${f.slug}` }]);
    });

    await ctx.reply(lines.join("\n"), {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: keyboard },
    });
  });

  bot.hears("🔎 Search", async (ctx: any) => {
    const user = await ensureUser(ctx);
    const tier = (user?.currentTier as TierId) || "scout";
    if (!tierMeets(tier, "search")) {
      await ctx.reply(
        [
          `🔒 <b>Search requires Ranger tier</b>`,
          ``,
          `Use ⚡ Upgrade from the menu, or 🔓 HFM for free Rambo.`,
        ].join("\n"),
        { parse_mode: "HTML", reply_markup: mainKeyboard() }
      );
      return;
    }
    await ctx.reply(
      [
        `${FUTURISTIC_HEADER}`,
        `🔎 <b>Search Firms</b>`,
        `${FUTURISTIC_HEADER}`,
        ``,
        `Type a firm name to search.`,
        `Example: <code>FTMO</code> or <code>Funded</code>`,
      ].join("\n"),
      { parse_mode: "HTML" }
    );
  });

  bot.hears("⚔️ Compare", async (ctx: any) => {
    const user = await ensureUser(ctx);
    const tier = (user?.currentTier as TierId) || "scout";
    const limit = getCompareLimit(tier);
    if (limit === 0) {
      await ctx.reply(
        [
          `🔒 <b>Compare requires Ranger tier</b>`,
          ``,
          `Use ⚡ Upgrade from the menu, or 🔓 HFM for free Rambo.`,
        ].join("\n"),
        { parse_mode: "HTML", reply_markup: mainKeyboard() }
      );
      return;
    }
    await ctx.reply(
      [
        `${FUTURISTIC_HEADER}`,
        `⚔️ <b>Compare Firms</b>`,
        `${FUTURISTIC_HEADER}`,
        ``,
        `Type two firm names separated by <code>vs</code>.`,
        `Example: <code>FTMO vs FundedNext</code>`,
      ].join("\n"),
      { parse_mode: "HTML" }
    );
  });

  bot.hears("👤 My Tier", async (ctx: any) => {
    const user = await ensureUser(ctx);
    if (!user) return;
    const tier = (user.currentTier as TierId) || "scout";
    const compareLimit = getCompareLimit(tier);
    await ctx.reply(
      [
        `${FUTURISTIC_HEADER}`,
        `${tierBadge(tier)} <b>Your Tier: ${TIER_NAMES[tier]}</b>`,
        `${FUTURISTIC_HEADER}`,
        ``,
        `🔍 Search: ${tierMeets(tier, "search") ? "✅" : "❌"}`,
        `⚔️ Compare limit: ${compareLimit === 0 ? "❌" : compareLimit + " firms"}`,
        `📊 Advanced filters: ${tierMeets(tier, "advanced_filters") ? "✅" : "❌"}`,
        `📥 CSV export: ${tierMeets(tier, "csv_export") ? "✅" : "❌"}`,
        `🔑 API access: ${tierMeets(tier, "api_access") ? "✅" : "❌"}`,
        ``,
        `${FUTURISTIC_DIVIDER}`,
        `Tap ⚡ <b>Upgrade</b> or 🔓 <b>HFM</b> to level up.`,
      ].join("\n"),
      { parse_mode: "HTML", reply_markup: mainKeyboard() }
    );
  });

  bot.hears("⚡ Upgrade", async (ctx: any) => {
    await ensureUser(ctx);
    const keyboard: { text: string; callback_data: string }[][] = [];
    PRICING.forEach((p) => {
      keyboard.push([{ text: `${TIER_NAMES[p.tier]} — $${p.monthlyUsd}/mo`, callback_data: `upgrade:${p.tier}:monthly` }]);
      keyboard.push([{ text: `${TIER_NAMES[p.tier]} — $${p.yearlyUsd}/yr`, callback_data: `upgrade:${p.tier}:yearly` }]);
    });
    keyboard.push([{ text: "🔓 Unlock FREE via HFM IB", callback_data: "hfm_unlock" }]);

    await ctx.reply(
      [
        `${FUTURISTIC_HEADER}`,
        `⚡ <b>Upgrade PropRank</b>`,
        `${FUTURISTIC_HEADER}`,
        ``,
        `Pay with <b>Telegram Stars</b>, <b>Stripe</b> (card), or <b>USDT</b>.`,
        ``,
        formatUpgradeOptions(),
      ].join("\n"),
      {
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: keyboard },
      }
    );
  });

  bot.hears("🔓 HFM", async (ctx: any) => {
    const user = await ensureUser(ctx);
    if (!user) return;
    await ctx.reply(
      [
        `${FUTURISTIC_HEADER}`,
        `🔓 <b>Free Rambo via HFM IB</b>`,
        `${FUTURISTIC_HEADER}`,
        ``,
        `1. Open & activate an HFM account:`,
        `   🇲🇾 <a href="${process.env.HFM_MALAYSIA_URL || "https://www.hfmmalaysia.com/sv/en/?refid=30548341"}">hfmmalaysia.com</a>`,
        `   🇮🇩 <a href="${process.env.HFM_INDONESIA_URL || process.env.HFM_MALAYSIA_URL || "https://www.hfmmalaysia.com/sv/en/?refid=30548341"}">hfmtrade-ind.com (VPN)</a>`,
        ``,
        `2. Submit your HFM account ID:`,
        `   <code>/hfm_unlock YOUR_HFM_ACCOUNT_ID</code>`,
        ``,
        `${FUTURISTIC_DIVIDER}`,
        `Admin will verify within 24 hours.`,
      ].join("\n"),
      {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "🇲🇾 Open HFM Malaysia", url: process.env.HFM_MALAYSIA_URL || "https://www.hfmmalaysia.com/sv/en/?refid=30548341" }],
            [{ text: "🇮🇩 Open HFM Indonesia", url: process.env.HFM_INDONESIA_URL || process.env.HFM_MALAYSIA_URL || "https://www.hfmmalaysia.com/sv/en/?refid=30548341" }],
          ],
        },
      }
    );
  });

  // ===== Payments via Telegram Stars =====

  function starsForPlan(tier: TierId, interval: "monthly" | "yearly"): number {
    const plan = PRICING.find((p) => p.tier === tier);
    if (!plan) return 0;
    const usd = interval === "yearly" ? plan.yearlyUsd : plan.monthlyUsd;
    return Math.ceil(usd / 0.013 / 10) * 10;
  }

  async function sendStarsInvoice(ctx: any, tier: TierId, interval: "monthly" | "yearly") {
    const user = await ensureUser(ctx);
    if (!user) return;

    const stars = starsForPlan(tier, interval);
    const title = `${TIER_NAMES[tier]} — ${interval}`;
    const description = TIER_DESCRIPTIONS[tier];
    const payload = JSON.stringify({ userId: user.id, tier, interval, provider: "telegram_stars" });

    await ctx.api.sendInvoice(ctx.chat.id, title, description, payload, "", "XTR", [
      { label: title, amount: stars },
    ]);
  }

  bot.on("pre_checkout_query", async (ctx) => {
    await ctx.answerPreCheckoutQuery(true);
  });

  bot.on("message:successful_payment", async (ctx) => {
    const payment = ctx.message.successful_payment;
    if (!payment) return;

    try {
      const meta = JSON.parse(payment.invoice_payload || "{}");
      const { userId, tier, interval } = meta;
      if (!userId || !tier) return;

      const totalUsd = payment.total_amount * 0.013;
      const expiresAt = new Date();
      if (interval === "yearly") expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      else expiresAt.setMonth(expiresAt.getMonth() + 1);

      const subscription = await createSubscription({
        userId,
        tier,
        provider: "telegram_stars",
        providerRef: payment.telegram_payment_charge_id,
        amountUsd: Math.round(totalUsd),
        interval,
        expiresAt,
        status: "active",
        metadata: JSON.stringify({ chargeId: payment.telegram_payment_charge_id }),
      });

      await recordPayment({
        userId,
        subscriptionId: subscription.id,
        amountUsd: Math.round(totalUsd),
        provider: "telegram_stars",
        providerRef: payment.telegram_payment_charge_id,
        status: "completed",
      });

      const tierId = tier as TierId;
      await db
        .update(users)
        .set({ currentTier: tierId, updatedAt: new Date() })
        .where(eq(users.id, userId));

      await ctx.reply(
        [
          `${FUTURISTIC_HEADER}`,
          `🎉 <b>Payment Successful!</b>`,
          `${FUTURISTIC_HEADER}`,
          ``,
          `You are now ${TIER_NAMES[tierId]}.`,
          `Expires: <code>${expiresAt.toDateString()}</code>`,
        ].join("\n"),
        { parse_mode: "HTML", reply_markup: mainKeyboard() }
      );
    } catch (e) {
      console.error("Stars payment handling error:", e);
      await ctx.reply("⚠️ Payment received but activation failed. Contact support.", { reply_markup: mainKeyboard() });
    }
  });

  // ===== Admin commands =====

  bot.command("admin_hfm", async (ctx) => {
    if (!isAdmin(ctx)) return;
    const args = ctx.match?.toString().trim().split(" ");
    if (!args || args.length < 3) {
      await ctx.reply("Usage: <code>/admin_hfm TELEGRAM_ID approve|reject [note]</code>", { parse_mode: "HTML" });
      return;
    }
    const [telegramId, decision, ...noteParts] = args;
    if (!["approve", "reject"].includes(decision)) {
      await ctx.reply("Decision must be <b>approve</b> or <b>reject</b>.", { parse_mode: "HTML" });
      return;
    }

    const user = await db.query.users.findFirst({ where: eq(users.telegramId, telegramId) });
    if (!user) {
      await ctx.reply("User not found.");
      return;
    }

    const pending = await db.query.hfmIbVerifications.findFirst({
      where: sql`${hfmIbVerifications.userId} = ${user.id} AND ${hfmIbVerifications.status} = 'pending'`,
      orderBy: desc(hfmIbVerifications.submittedAt),
    });

    if (!pending) {
      await ctx.reply("No pending HFM verification for this user.");
      return;
    }

    await decideHfmVerification(pending.id, decision as any, noteParts.join(" "));
    await ctx.reply(`✅ HFM verification ${decision} for user ${telegramId}.`);

    try {
      await bot.api.sendMessage(
        telegramId,
        decision === "approve"
          ? "🎉 <b>Your HFM verification is approved!</b>\n\nYou now have Rambo tier for life."
          : `❌ Your HFM verification was rejected. Reason: ${noteParts.join(" ") || "No reason provided"}`,
        { parse_mode: "HTML" }
      );
    } catch (e) {
      console.error("Failed to notify user", e);
    }
  });

  bot.command("set_tier", async (ctx) => {
    if (!isAdmin(ctx)) return;
    const args = ctx.match?.toString().trim().split(" ");
    if (!args || args.length < 2) {
      await ctx.reply("Usage: <code>/set_tier TELEGRAM_ID scout|ranger|operator|rambo</code>", { parse_mode: "HTML" });
      return;
    }
    const [telegramId, tier] = args;
    if (!["scout", "ranger", "operator", "rambo"].includes(tier)) {
      await ctx.reply("Invalid tier.");
      return;
    }
    await setUserTier(telegramId, tier as TierId);
    await ctx.reply(`✅ Tier set to ${tier} for user ${telegramId}.`);
  });

  // ===== Callbacks =====

  bot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;

    if (data.startsWith("firm:")) {
      const slug = data.slice(5);
      const firm = await db.query.propFirms.findFirst({
        where: eq(propFirms.slug, slug),
      });
      if (firm) {
        await ctx.reply(formatFirm(firm), {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🌐 Web profile",
                  url: `${process.env.NEXT_PUBLIC_SITE_URL}/scoutops/proprank/${firm.slug}`,
                },
              ],
            ],
          },
        });
      }
    }

    if (data.startsWith("upgrade:")) {
      const [, tier, interval] = data.split(":");
      if (tier && interval) {
        await sendStarsInvoice(ctx, tier as TierId, interval as any);
      }
    }

    if (data === "hfm_unlock") {
      await ctx.reply(
        "🔓 Use <code>/hfm_unlock YOUR_HFM_ACCOUNT_ID</code> to submit for verification.",
        { parse_mode: "HTML" }
      );
    }

    if (data.startsWith("admin_hfm:")) {
      if (!isAdmin(ctx)) {
        await ctx.answerCallbackQuery("Not authorized");
        return;
      }
      const [, telegramId, decision] = data.split(":");
      const user = await db.query.users.findFirst({ where: eq(users.telegramId, telegramId) });
      if (!user) {
        await ctx.answerCallbackQuery("User not found");
        return;
      }
      const pending = await db.query.hfmIbVerifications.findFirst({
        where: sql`${hfmIbVerifications.userId} = ${user.id} AND ${hfmIbVerifications.status} = 'pending'`,
        orderBy: desc(hfmIbVerifications.submittedAt),
      });
      if (!pending) {
        await ctx.answerCallbackQuery("No pending verification");
        return;
      }
      await decideHfmVerification(pending.id, decision as any);
      await ctx.answerCallbackQuery(`Verification ${decision}`);
      await ctx.editMessageText(`✅ HFM verification ${decision} for ${telegramId}.`);
    }

    await ctx.answerCallbackQuery();
  });

  // ===== Set bot commands menu =====
  bot.api.setMyCommands([
    { command: "start", description: "🚀 Welcome + menu" },
    { command: "top", description: "🏆 Top ranked firms" },
    { command: "search", description: "🔎 Search firms" },
    { command: "compare", description: "⚔️ Compare two firms" },
    { command: "upgrade", description: "⚡ Upgrade tier" },
    { command: "my_tier", description: "👤 Check your tier" },
    { command: "hfm_unlock", description: "🔓 Free Rambo via HFM IB" },
  ]).catch(console.error);

  botInstance = bot;
  return bot;
}

export async function POST(request: NextRequest) {
  try {
    const secretToken = process.env.TELEGRAM_WEBHOOK_SECRET;
    if (secretToken) {
      const header = request.headers.get("x-telegram-bot-api-secret-token");
      if (header !== secretToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const bot = getBot();
    await bot.init();
    const update = await request.json();
    await bot.handleUpdate(update);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
