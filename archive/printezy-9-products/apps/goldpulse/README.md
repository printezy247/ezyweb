# 🥇 GoldPulse — Product #1

Free XAUUSD live price & alert Telegram bot. **No subscriptions** — monetized via affiliate CPA links + Telegram Stars tips.

## Why this first
Gold is the priority niche: Telegram gold-signal channels are full of scams, spreads widen without warning, and traders miss entries. GoldPulse is the daily-use retention engine that cross-promotes products #2 (Signal Verifier) and #3 (Event Radar).

## Features
| Command | What it does |
|---|---|
| `/price` | Live gold card — Binance PAXG/USDT spot, Yahoo `GC=F` fallback, 24h change |
| `/alert above 3700` / `/alert below 3600` | Price alerts, checked every 30s |
| `/alerts` · `/clear` | Manage your alerts (max 10) |
| `/chart` | 24h ASCII sparkline with low/high/last |
| `/session` | Sessions open now + gold spread-risk flag (🟢/🟡/🔴) |
| `/tip` | Telegram Stars tip jar (XTR — no payment provider needed) |

## Data (free, no keys)
- **Primary:** Binance public API — `PAXGUSDT` (tokenized gold ≈ 1 troy oz, trades 24/7)
- **Fallback:** Yahoo Finance chart API — `GC=F` (COMEX futures)

## Monetization (no subscriptions)
- Affiliate button on every price card + every alert (`GOLD_AFFILIATE_URL`)
- Telegram Stars tips (`/tip` → 50/100/250 XTR)
- AdsGram later once audience grows

## Run
```bash
pip install -r requirements.txt
cp .env.example .env   # add your TELEGRAM_BOT_TOKEN
python data.py         # smoke-test the live feeds (no token needed)
python bot.py          # start the bot
```

## Deploy (free tier)
Any always-on box works (polling, no webhook). Fly.io: one shared-cpu VM + 1GB volume mounted at `/data`, set `GOLD_DATA_DIR=/data`.

---
*Not financial advice. Verify every price with your broker before acting.*
