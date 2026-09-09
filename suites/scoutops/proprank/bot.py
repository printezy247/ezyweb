"""PropRank Telegram bot.

Commands:
/start   — welcome + command list
/top     — top ranked prop firms
/firm    — details for one firm
/search  — search firms by name
/compare — compare two firms
"""
from __future__ import annotations

import logging

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CallbackQueryHandler, CommandHandler, ContextTypes

from shared.config import Config
from shared.db import init_db
from shared.telegram import affiliate_row, build_menu, edit_message, reply_html
from suites.scoutops.proprank.services import format_firm_card, get_firm, list_firms, search_firms

logging.basicConfig(format="%(asctime)s %(levelname)s %(name)s: %(message)s", level=logging.INFO)
log = logging.getLogger("proprank.bot")


def _rank_emoji(score: int) -> str:
    if score >= 85:
        return "🥇"
    if score >= 70:
        return "🥈"
    return "🥉"


def _main_keyboard() -> InlineKeyboardMarkup:
    return build_menu([
        [InlineKeyboardButton("🏆 View Top Firms", callback_data="top")],
        [InlineKeyboardButton("🔎 Search", callback_data="search_prompt")],
        affiliate_row(Config.PROPRANK_AFFILIATE_URL, Config.PROPRANK_AFFILIATE_LABEL),
    ])


async def cmd_start(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    await reply_html(
        update,
        "👋 <b>Welcome to PropRank</b> — ScoutOps prop-firm directory.\n\n"
        "💼 <b>Commands</b>\n"
        "/top — top ranked prop firms\n"
        "/firm NAME — details for one firm\n"
        "/search TEXT — search firms\n"
        "/compare A vs B — compare two firms\n\n"
        "🆓 100% free — no subscriptions.",
        _main_keyboard(),
    )


async def cmd_top(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    init_db()
    firms = list_firms(limit=5)
    if not firms:
        await reply_html(update, "⚠️ No firms in the database yet.")
        return

    lines = ["🏆 <b>Top Prop Firms</b>\n"]
    buttons = []
    for i, f in enumerate(firms, 1):
        emoji = _rank_emoji(f["trust_score"])
        lines.append(
            f"{i}. {emoji} <b>{f['name']}</b> — Trust {f['trust_score']}/100\n"
            f"   Fee: ${f['challenge_fee_usd']:,} · Size: ${f['account_size_usd']:,} · Payout: {f['payout_split_pct']:g}%"
        )
        buttons.append([InlineKeyboardButton(f"{f['name']} details", callback_data=f"firm:{f['slug']}")])

    buttons.append(affiliate_row(Config.PROPRANK_AFFILIATE_URL, Config.PROPRANK_AFFILIATE_LABEL))
    await reply_html(update, "\n".join(lines), build_menu(buttons))


async def cmd_firm(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    args = update.message.text.split(maxsplit=1)
    if len(args) < 2:
        await reply_html(update, "Usage: <code>/firm ftmo</code> or <code>/firm FundedNext</code>")
        return
    init_db()
    firm = get_firm(args[1])
    if not firm:
        await reply_html(
            update,
            f"❌ No firm found for '<b>{args[1]}</b>'.\nTry <code>/search {args[1]}</code>",
        )
        return
    buttons = [
        [InlineKeyboardButton("🌐 Open web directory", url=f"{Config.SCOUTOPS_WEB_URL}/scoutops/proprank/firm/{firm.slug}")],
        affiliate_row(firm.affiliate_url or Config.PROPRANK_AFFILIATE_URL, firm.affiliate_label or Config.PROPRANK_AFFILIATE_LABEL),
    ]
    await reply_html(update, format_firm_card(firm), build_menu(buttons))


async def cmd_search(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    args = update.message.text.split(maxsplit=1)
    if len(args) < 2:
        await reply_html(update, "Usage: <code>/search funded</code>")
        return
    init_db()
    firms = search_firms(args[1], limit=5)
    if not firms:
        await reply_html(update, f"🔍 No results for '<b>{args[1]}</b>'.")
        return
    lines = [f"🔎 <b>Results for '{args[1]}'</b>\n"]
    buttons = []
    for f in firms:
        lines.append(f"• <b>{f['name']}</b> — Trust {f['trust_score']}/100")
        buttons.append([InlineKeyboardButton(f"{f['name']} details", callback_data=f"firm:{f['slug']}")])
    await reply_html(update, "\n".join(lines), build_menu(buttons))


async def cmd_compare(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    args = update.message.text.split(maxsplit=1)
    if len(args) < 2 or " vs " not in args[1].lower():
        await reply_html(update, "Usage: <code>/compare FTMO vs FundedNext</code>")
        return
    init_db()
    names = [n.strip() for n in args[1].lower().split(" vs ", 1)]
    firms = [get_firm(n) for n in names]
    if None in firms:
        await reply_html(update, "❌ Could not find both firms. Use exact names or slugs.")
        return

    a, b = firms
    lines = [
        f"⚔️ <b>{a.name} vs {b.name}</b>",
        "",
        f"Trust: {a.trust_score} — {b.trust_score}",
        f"Fee: ${a.challenge_fee_usd:,} — ${b.challenge_fee_usd:,}",
        f"Size: ${a.account_size_usd:,} — ${b.account_size_usd:,}",
        f"Payout: {a.payout_split_pct:g}% — {b.payout_split_pct:g}%",
        f"Daily DD: {a.max_daily_drawdown_pct:g}% — {b.max_daily_drawdown_pct:g}%",
        f"Total DD: {a.max_total_drawdown_pct:g}% — {b.max_total_drawdown_pct:g}%",
    ]
    await reply_html(update, "\n".join(lines), build_menu([
        [InlineKeyboardButton(f"{a.name} details", callback_data=f"firm:{a.slug}"),
         InlineKeyboardButton(f"{b.name} details", callback_data=f"firm:{b.slug}")],
        affiliate_row(Config.PROPRANK_AFFILIATE_URL, Config.PROPRANK_AFFILIATE_LABEL),
    ]))


async def on_button(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    q = update.callback_query
    await q.answer()
    data = q.data

    if data == "top":
        firms = list_firms(limit=5)
        lines = ["🏆 <b>Top Prop Firms</b>\n"]
        buttons = []
        for i, f in enumerate(firms, 1):
            emoji = _rank_emoji(f["trust_score"])
            lines.append(
                f"{i}. {emoji} <b>{f['name']}</b> — Trust {f['trust_score']}/100\n"
                f"   Fee: ${f['challenge_fee_usd']:,} · Size: ${f['account_size_usd']:,}"
            )
            buttons.append([InlineKeyboardButton(f"{f['name']} details", callback_data=f"firm:{f['slug']}")])
        buttons.append(affiliate_row(Config.PROPRANK_AFFILIATE_URL, Config.PROPRANK_AFFILIATE_LABEL))
        await edit_message(update, "\n".join(lines), build_menu(buttons))

    elif data.startswith("firm:"):
        slug = data.split(":", 1)[1]
        firm = get_firm(slug)
        if not firm:
            await edit_message(update, "❌ Firm not found.")
            return
        buttons = [
            [InlineKeyboardButton("🌐 Web profile", url=f"{Config.SCOUTOPS_WEB_URL}/scoutops/proprank/firm/{firm.slug}")],
            affiliate_row(firm.affiliate_url or Config.PROPRANK_AFFILIATE_URL, firm.affiliate_label or Config.PROPRANK_AFFILIATE_LABEL),
        ]
        await edit_message(update, format_firm_card(firm), build_menu(buttons))

    elif data == "search_prompt":
        await edit_message(
            update,
            "🔎 <b>Search Prop Firms</b>\nSend me a message like:\n<code>/search funded</code>",
        )


def main() -> None:
    token = Config.TELEGRAM_BOT_TOKENS.get("proprank")
    if not token:
        raise SystemExit("❌ Set PROPRANK_BOT_TOKEN in .env first")

    init_db()
    app = Application.builder().token(token).build()
    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("help", cmd_start))
    app.add_handler(CommandHandler("top", cmd_top))
    app.add_handler(CommandHandler("firm", cmd_firm))
    app.add_handler(CommandHandler("search", cmd_search))
    app.add_handler(CommandHandler("compare", cmd_compare))
    app.add_handler(CommandHandler("proprank", cmd_start))
    app.add_handler(CommandHandler("scoutops", cmd_start))

    app.add_handler(CallbackQueryHandler(on_button))

    log.info("PropRank bot running")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
