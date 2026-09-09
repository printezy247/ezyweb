# 🚀 GoldPulse — Deploy & Secrets Guide

Zero-cost deploy. The bot uses **polling** (no webhook, no public URL, no domain needed) — it just needs an always-on process.

---

## Step 0 — Create the bot & get secrets (2 min)

1. In Telegram open **@BotFather** → `/newbot` → pick a name (e.g. `GoldPulse`) and username (e.g. `@your_goldpulse_bot`) → **copy the token** (`123456:ABC...`).
2. Optional but recommended — paste this into BotFather via `/setcommands`:

```
price - Live gold price card
alert - Set alert: /alert above 3700 or below 3600
alerts - Your active alerts
clear - Delete all alerts
chart - 24h sparkline
session - Sessions open now + spread risk
tip - Support the bot (Stars)
help - Show all commands
```

## Secrets / env vars

| Variable | Required | What to put |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | ✅ | BotFather token from Step 0 |
| `GOLD_AFFILIATE_URL` | ✅ (money) | Your broker/exchange referral link (Exness, XM, Binance…) |
| `GOLD_AFFILIATE_LABEL` | ➖ | Button text, default `💱 Trade Gold (partner)` |
| `GOLD_ALERT_POLL_SECONDS` | ➖ | Default `30` |
| `GOLD_DATA_DIR` | ➖ | Default `./data` (set `/data` on Fly.io — already in fly.toml) |

> ⚠️ Never commit `.env`. It's already gitignored.

---

## Option A — Railway (easiest, recommended)

1. Push this repo to GitHub (already done).
2. [railway.app](https://railway.app) → **New Project → Deploy from GitHub repo** → select `sambangold-products`.
3. In the service → **Settings → Root Directory** → set `apps/goldpulse` (monorepo).
4. **Variables** tab → add:
   - `TELEGRAM_BOT_TOKEN` = your token
   - `GOLD_AFFILIATE_URL` = your ref link
5. Deploy — Railway builds the included `Dockerfile` automatically (`railway.json` configures restarts).
6. **Logs** tab should show: `GoldPulse running — polling every 30s`.

> Railway free trial credit covers a 256MB bot easily; afterwards it's ~$1–2/mo or move to Option C.

---

## Option B — Fly.io (free allowance)

```bash
cd apps/goldpulse
fly auth login
fly launch --no-deploy                 # uses the included fly.toml
fly volumes create goldpulse_data --size 1 --region iad
fly secrets set TELEGRAM_BOT_TOKEN="123456:ABC..." GOLD_AFFILIATE_URL="https://your-ref-link"
fly deploy
fly logs                               # should show: GoldPulse running
```

Free allowance covers `shared-cpu-1x / 256MB` + 1GB volume. Alerts persist on the mounted `/data` volume.

---

## Option C — Oracle Cloud Always Free VM (truly $0 forever)

4 ARM cores / 24GB RAM free forever — enough for all 9 bots later.

```bash
# on the VM (Ubuntu 22.04+)
sudo apt update && sudo apt install -y python3-pip git
git clone https://github.com/printezy247/sambangold-products.git
cd sambangold-products/apps/goldpulse
pip3 install -r requirements.txt
cp .env.example .env && nano .env      # paste token + affiliate URL

# systemd service
sudo tee /etc/systemd/system/goldpulse.service <<'EOF'
[Unit]
Description=GoldPulse Telegram bot
After=network.target

[Service]
WorkingDirectory=%h/sambangold-products/apps/goldpulse
ExecStart=/usr/bin/python3 bot.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl enable --now goldpulse
journalctl -u goldpulse -f             # logs
```

---

## ✅ Post-deploy smoke test (in Telegram)

1. `/start` → command list appears
2. `/price` → live gold card with 🔄 Refresh + affiliate + tip buttons
3. `/alert above 999999` → ✅ confirm; `/alerts` → listed; `/clear` → deleted
4. `/alert below 9999` → should **trigger within ~30s** (price is way above) → 🚨 alert message arrives
5. `/chart` and `/session` → sparkline + sessions render

If all 5 pass → Product #1 is LIVE. Tick the launch gate in the root README checklist.
