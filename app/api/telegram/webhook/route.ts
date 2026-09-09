import { Bot } from "grammy";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { propFirms } from "@/db/schema";
import { desc, eq, ilike, sql } from "drizzle-orm";

let botInstance: Bot | null = null;

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
      `💼 <b>${firm.name}</b>`,
      `${rankEmoji(firm.trustScore)} Trust score: <b>${firm.trustScore}/100</b>`,
      "",
      `💰 Fee: <b>$${firm.challengeFeeUsd?.toLocaleString() ?? "—"}</b>`,
      `📊 Size: <b>$${firm.accountSizeUsd?.toLocaleString() ?? "—"}</b>`,
      `🎯 Payout: <b>${firm.payoutSplitPct ?? "—"}%</b>`,
      `📏 Daily DD: <b>${firm.maxDailyDrawdownPct ?? "—"}%</b>`,
      restrictions.length > 0 ? `⚠️ ${restrictions.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  bot.command("start", async (ctx) => {
    await ctx.reply(
      "👋 <b>Welcome to PropRank</b> — ScoutOps prop-firm directory.\n\n" +
        "💼 <b>Commands</b>\n" +
        "/top — top ranked prop firms\n" +
        "/firm NAME — details for one firm\n" +
        "/search TEXT — search firms\n" +
        "/compare A vs B — compare two firms\n\n" +
        "🆓 100% free — no subscriptions.",
      { parse_mode: "HTML" }
    );
  });

  bot.command(["top", "proprank", "scoutops"], async (ctx) => {
    const firms = await db
      .select()
      .from(propFirms)
      .where(eq(propFirms.isActive, true))
      .orderBy(desc(propFirms.isSponsored), desc(propFirms.trustScore))
      .limit(5);

    if (firms.length === 0) {
      await ctx.reply("⚠️ No firms in the database yet.");
      return;
    }

    const lines = ["🏆 <b>Top Prop Firms</b>\n"];
    const keyboard: { text: string; callback_data: string }[][] = [];

    firms.forEach((f, i) => {
      lines.push(
        `${i + 1}. ${rankEmoji(f.trustScore)} <b>${f.name}</b> — Trust ${f.trustScore}/100\n` +
          `   Fee: $${f.challengeFeeUsd?.toLocaleString() ?? "—"}`
      );
      keyboard.push([{ text: `${f.name} details`, callback_data: `firm:${f.slug}` }]);
    });

    await ctx.reply(lines.join("\n"), {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: keyboard },
    });
  });

  bot.command("firm", async (ctx) => {
    const args = ctx.match;
    if (!args) {
      await ctx.reply("Usage: <code>/firm ftmo</code>", { parse_mode: "HTML" });
      return;
    }

    const firm = await db.query.propFirms.findFirst({
      where: sql`(${propFirms.slug} = ${args.toLowerCase()} OR LOWER(${propFirms.name}) = ${args.toLowerCase()}) AND ${propFirms.isActive} = true`,
    });

    if (!firm) {
      await ctx.reply(
        `❌ No firm found for '<b>${args}</b>'.\nTry <code>/search ${args}</code>`,
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
    const args = ctx.match;
    if (!args) {
      await ctx.reply("Usage: <code>/search funded</code>", { parse_mode: "HTML" });
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

    const lines = [`🔎 <b>Results for '${args}'</b>\n`];
    const keyboard = firms.map((f) => [{ text: `${f.name} details`, callback_data: `firm:${f.slug}` }]);

    firms.forEach((f) => {
      lines.push(`• <b>${f.name}</b> — Trust ${f.trustScore}/100`);
    });

    await ctx.reply(lines.join("\n"), {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: keyboard },
    });
  });

  bot.command("compare", async (ctx) => {
    const args = ctx.match;
    if (!args || !args.toLowerCase().includes(" vs ")) {
      await ctx.reply("Usage: <code>/compare FTMO vs FundedNext</code>", { parse_mode: "HTML" });
      return;
    }

    const [aName, bName] = args.toLowerCase().split(" vs ", 2).map((s) => s.trim());
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
        `⚔️ <b>${a.name} vs ${b.name}</b>`,
        "",
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
              { text: `${a.name} details`, callback_data: `firm:${a.slug}` },
              { text: `${b.name} details`, callback_data: `firm:${b.slug}` },
            ],
          ],
        },
      }
    );
  });

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
    await ctx.answerCallbackQuery();
  });

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
    const update = await request.json();
    await bot.handleUpdate(update);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
