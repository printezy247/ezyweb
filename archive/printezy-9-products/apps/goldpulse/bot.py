"""GoldPulse 🥇 — free XAUUSD live price & alert Telegram bot.

No subscriptions. Monetized via affiliate CPA links + Telegram Stars tips.
Run:  python bot.py   (needs TELEGRAM_BOT_TOKEN in .env)
"""
from __future__ import annotations

import asyncio
import logging
from datetime import datetime, timezone

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, LabeledPrice, Update
from telegram.constants import ParseMode
from telegram.ext import (
    Application,
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    PreCheckoutQueryHandler,
    filters,
)

import config
import data
import store

logging.basicConfig(format="%(asctime)s %(levelname)s %(name)s: %(message)s", level=logging.INFO)
log = logging.getLogger("goldpulse")


# ── formatting ────────────────────────────────────────────────────────────────

def _trend(change: float | None) -> str:
    if change is None:
        return "⚪"
    return "🟢" if change >= 0 else "🔴"


def _fmt_change(change: float | None) -> str:
    return "n/a" if change is None else f"{change:+.2f}%"


def price_card() -> str:
    p = data.get_price()
    ts = datetime.fromtimestamp(p["ts"], tz=timezone.utc).strftime("%d %b %Y · %H:%M UTC")
    return (
        "🥇 <b>GOLD · XAU/USD</b>\n\n"
        f"💵 <b>${p['price']:,.2f}</b>  {_trend(p['change_pct'])} {_fmt_change(p['change_pct'])} <i>(24h)</i>\n\n"
        f"📡 {p['source']}\n"
        f"🕐 {ts}\n\n"
        f"<i>{config.DISCLAIMER}</i>"
    )


def price_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("🔄 Refresh", callback_data="price"),
         InlineKeyboardButton("🔔 My Alerts", callback_data="alerts")],
        [InlineKeyboardButton(config.AFFILIATE_LABEL, url=config.AFFILIATE_URL)],
        [InlineKeyboardButton("⭐ Tip 50", callback_data="tip:50"),
         InlineKeyboardButton("⭐ Tip 100", callback_data="tip:100"),
         InlineKeyboardButton("⭐ Tip 250", callback_data="tip:250")],
    ])


# ── commands ──────────────────────────────────────────────────────────────────

async def cmd_start(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_html(
        "👋 <b>Welcome to GoldPulse</b> — free live gold (XAU/USD) tracker.\n\n"
        "📌 <b>Commands</b>\n"
        "/price — live gold price card\n"
        "/alert above 3700 — notify me above a price\n"
        "/alert below 3600 — notify me below a price\n"
        "/alerts — your active alerts\n"
        "/clear — delete all your alerts\n"
        "/chart — 24h sparkline\n"
        "/session — sessions open now + spread risk\n"
        "/tip — support the bot (Telegram Stars) ⭐\n\n"
        "🆓 100% free — no subscriptions, ever.\n"
        f"<i>{config.DISCLAIMER}</i>"
    )


async def cmd_price(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    try:
        text = await asyncio.to_thread(price_card)
    except data.FeedError:
        text = "⚠️ Live feed temporarily unavailable — try again in a minute."
    await update.message.reply_html(text, reply_markup=price_keyboard())


async def cmd_alert(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    args = update.message.text.split()[1:]
    if len(args) != 2 or args[0].lower() not in ("above", "below"):
        await update.message.reply_html("Usage: <code>/alert above 3700</code> or <code>/alert below 3600</code>")
        return
    try:
        target = float(args[1].replace(",", "").replace("$", ""))
    except ValueError:
        await update.message.reply_html("❌ Invalid price. Example: <code>/alert above 3700</code>")
        return
    ok, msg = store.add_alert(update.effective_chat.id, args[0].lower(), target)
    await update.message.reply_html(("✅ " if ok else "⚠️ ") + msg)


async def _alerts_text(chat_id: int) -> str:
    alerts = store.list_alerts(chat_id)
    if not alerts:
        return "🔕 No active alerts. Set one: <code>/alert above 3700</code>"
    lines = ["🔔 <b>Your gold alerts</b>\n"]
    lines += [f"• {'▲ above' if a['direction'] == 'above' else '▼ below'} <b>${a['price']:,.2f}</b>" for a in alerts]
    lines.append("\n/clear to delete all")
    return "\n".join(lines)


async def cmd_alerts(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_html(await _alerts_text(update.effective_chat.id))


async def cmd_clear(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    n = store.clear_alerts(update.effective_chat.id)
    await update.message.reply_html(f"🗑 Deleted {n} alert(s)." if n else "🔕 Nothing to clear.")


async def cmd_chart(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    try:
        closes = await asyncio.to_thread(data.get_hourly_closes, 24)
    except Exception:
        await update.message.reply_html("⚠️ Chart data unavailable right now.")
        return
    lo, hi, last = min(closes), max(closes), closes[-1]
    await update.message.reply_html(
        "📈 <b>GOLD · last 24h</b>\n\n"
        f"<code>{data.sparkline(closes)}</code>\n\n"
        f"Low <b>${lo:,.2f}</b> · High <b>${hi:,.2f}</b> · Last <b>${last:,.2f}</b>"
    )


async def cmd_session(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    s = data.get_sessions()
    rows = "\n".join(f"{'🟢' if open_ else '⚪'} {name}  <code>{hours}</code>" for name, hours, open_ in s["sessions"])
    await update.message.reply_html(
        f"🌍 <b>Trading sessions</b>  🕐 {s['utc_now']}\n\n{rows}\n\n"
        f"📊 <b>Gold spread risk: {s['risk']}</b>\n{s['why']}\n\n"
        "⚠️ <i>Avoid scalping XAUUSD when risk is HIGH — spread + slippage eat small stops.</i>"
    )


async def cmd_tip(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_html(
        "⭐ <b>Support GoldPulse</b>\nKeeping live gold data free for everyone.",
        reply_markup=InlineKeyboardMarkup([[
            InlineKeyboardButton("⭐ 50", callback_data="tip:50"),
            InlineKeyboardButton("⭐ 100", callback_data="tip:100"),
            InlineKeyboardButton("⭐ 250", callback_data="tip:250"),
        ]]),
    )


# ── callbacks / payments ─────────────────────────────────────────────────────

async def on_button(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    q = update.callback_query
    await q.answer()
    if q.data == "price":
        try:
            text = await asyncio.to_thread(price_card)
        except data.FeedError:
            text = "⚠️ Live feed temporarily unavailable — try again in a minute."
        await q.edit_message_text(text, parse_mode=ParseMode.HTML, reply_markup=price_keyboard())
    elif q.data == "alerts":
        await q.edit_message_text(await _alerts_text(q.message.chat_id), parse_mode=ParseMode.HTML)
    elif q.data.startswith("tip:"):
        amount = int(q.data.split(":")[1])
        if amount not in config.TIP_AMOUNTS_XTR:
            return
        await q.message.reply_invoice(
            title="GoldPulse tip ⭐",
            description="Support free live gold alerts — no subscriptions, ever.",
            payload=f"tip:{amount}",
            provider_token="",  # empty = Telegram Stars (XTR)
            currency="XTR",
            prices=[LabeledPrice("Tip", amount)],
        )


async def on_precheckout(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    await update.pre_checkout_query.answer(ok=True)


async def on_paid(update: Update, _: ContextTypes.DEFAULT_TYPE) -> None:
    stars = update.message.successful_payment.total_amount
    await update.message.reply_html(f"🙏 Thank you for the <b>{stars}⭐</b> tip — keeps GoldPulse free!")


# ── alert engine ─────────────────────────────────────────────────────────────

async def check_alerts(context: ContextTypes.DEFAULT_TYPE) -> None:
    try:
        price = (await asyncio.to_thread(data.get_price))["price"]
    except data.FeedError:
        return  # skip this cycle silently
    for a in store.pop_triggered(price):
        arrow = "▲ above" if a["direction"] == "above" else "▼ below"
        try:
            await context.bot.send_message(
                a["chat_id"],
                f"🚨 <b>GOLD ALERT</b>\n\nXAU/USD is now <b>${price:,.2f}</b> — your {arrow} ${a['price']:,.2f} alert triggered.\n\n"
                f"<i>{config.DISCLAIMER}</i>",
                parse_mode=ParseMode.HTML,
                reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton(config.AFFILIATE_LABEL, url=config.AFFILIATE_URL)]]),
            )
        except Exception as exc:  # user blocked bot etc.
            log.warning("alert delivery failed: %s", exc)


def main() -> None:
    if not config.BOT_TOKEN:
        raise SystemExit("❌ Set TELEGRAM_BOT_TOKEN in .env first (see .env.example)")
    app = Application.builder().token(config.BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("help", cmd_start))
    app.add_handler(CommandHandler("price", cmd_price))
    app.add_handler(CommandHandler("alert", cmd_alert))
    app.add_handler(CommandHandler("alerts", cmd_alerts))
    app.add_handler(CommandHandler("clear", cmd_clear))
    app.add_handler(CommandHandler("chart", cmd_chart))
    app.add_handler(CommandHandler("session", cmd_session))
    app.add_handler(CommandHandler("tip", cmd_tip))
    app.add_handler(CallbackQueryHandler(on_button))
    app.add_handler(PreCheckoutQueryHandler(on_precheckout))
    app.add_handler(MessageHandler(filters.SUCCESSFUL_PAYMENT, on_paid))
    app.job_queue.run_repeating(check_alerts, interval=config.ALERT_POLL_SECONDS, first=10)
    log.info("GoldPulse running — polling every %ss", config.ALERT_POLL_SECONDS)
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
