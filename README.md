# ezyweb 🚀

**Focuses on developing high‑end financial monetization funnels using interactive user experiences and experimental methods to test conversions on set parameters.**

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/printezy247/ezyweb/main/assets/banner.svg" alt="ezyweb banner" width="600"/>
</p>

<br>

## 📡 Problem Research – What Traders & Clients Struggle With

| Problem | Who feels it | Why it matters |
|---|---|---|
| <span style="color:#00ffef">No simple live‑price alerts for XAUUSD</span> | Gold/forex traders, retail investors | Missed entries/exits, constant chart‑watching |
| <span style="color:#00ffef">Unclear prop‑firm drawdown limits</span> | Prop‑firm traders | Accidental breaches, lost capital |
| <span style="color:#00ffef">Can't verify copy‑trade signal performance</span> | Copy‑trade followers | Blind trust, no P&L tracking |
| <span style="color:#00ffef">IB commission & rebate calculations are opaque</span> | Interactive Brokers clients | Under‑claimed rebates, budgeting errors |
| <span style="color:#00ffef">Economic events sneak up on them</span> | Forex & crypto traders | Surprise volatility, stops loss hunts |
| <span style="color:#00ffef">Courses/influencers promise results without accountability</span> | Course buyers | Waste of money, no measurable outcome |
| <span style="color:#00ffef">Free lot‑size/risk calculators are primitive</span> | All traders | Poor position sizing, over‑leveraging |
| <span style="color:#00ffef">Affiliate tracking is a black box</span> | Affiliate marketers | No transparent EPC/CPC stats |
| <span style="color:#00ffef">Crypto fear & sentiment digest is scattered</span> | Crypto enthusiasts | Hard to gauge market mood quickly |

<br>

## 🛠️ 9 Free Developable Products (Checklist)

- [ ] **GoldPulse Bot** – Telegram bot that pushes live XAUUSD price & custom alerts (using free gold‑api.com). ✅ *Selected as Product #1*
- [ ] **PropFirm Drawdown Guardian** – Calculates remaining daily/overall drawdown, warns when breached.
- [ ] **CopyTrade Leaderboard** – Public P&L tracker for signal channels (CSV/DB back‑end).
- [ ] **IB Commission Calculator** – Estimate rebates based on volume & instrument.
- [ ] **Economic Calendar Alert Bot** – Scrapes ForexFactory/Investing.com, sends event‑time reminders.
- [ ] **Micro‑Site for Courses/Influencers** – Link‑in‑bio page with live tickers, sign‑up form.
- [ ] **Universal Risk/Lot‑Size Calculator** – Input account size, risk % → lot size for any instrument.
- [ ] **Affiliate Dashboard Lite** – Simple stats page (clicks, earnings, conversion rate).
- [ ] **Crypto Fear & Sentiment Daily Digest** – Aggregates Twitter/Reddit sentiment, sends at 09:00 UTC.

<br>

## 🏆 Top 3 Prioritized (What We'll Build First)

1. **GoldPulse Bot** – Live XAUUSD price + alerts (Telegram). *Now in development.*
2. **PropFirm Drawdown Guardian** – Drawdown rule checker & breach notifier.
3. **Universal Risk/Lot‑Size Calculator** – Quick web or bot calculator.

<br>

## 🚀 Build Progress

| # | Product | Status | Deployed |
|---|---|---|---|
| 1 | GoldPulse Bot (Telegram) | 🔧 In progress | Will add after setup |
| 2 | PropFirm Drawdown Guardian | ⏳ Planned | – |
| 3 | Risk/Lot‑Size Calculator | ⏳ Planned | – |

<br>

## 📦 How to Run / Deploy the First Product (GoldPulse Bot)

> **Note:** You’re a newbie – I’ll handle the heavy lifting. Just give me the Telegram Bot Token when asked.

### 1. Prerequisites (I’ll set up)

- Python 3.10+  
- `requirements.txt` (just `requests`)  
- `.env` with `TELEGRAM_TOKEN=YOUR_TOKEN`

### 2. Run locally

```bash
python -m pip install -r requirements.txt
export $(grep -o 'TELEGRAM_TOKEN=[^ ]+' .env)
python bot.py
```

The bot will:

- `/start` – welcome message  
- `/price` – current XAUUSD price from **gold‑api.com** (free, no key)  
- `/setalert above|below <price>` – set a price‑trigger alert (stored in `alerts.json`)  
- `/alerts` – list active alerts  
- `/clear` – clear all alerts  

Background thread polls the price every 30 seconds and notifies you when the trigger price is hit.

### 3. Free deployment options (pick one)

#### 🌐 Railway (easiest for a newbie)

1. Create a free account at <https://railway.app/>  
2. Click **New Project** → **Deploy from GitHub** → select this repo.  
3. Add variable **TELEGRAM_TOKEN** in the Variables tab.  
4. Railway will auto‑detect `python` and run `python bot.py`.  
5. Grab the generated **URL** and set it as a webhook or keep long‑polling (Railway supports both).

#### ✈️ Fly.io (also free tier)

```bash
fly launch   # follow prompts, choose minimal RAM
fly secrets set TELEGRAM_TOKEN=YOUR_TOKEN
fly deploy
```

Fly’s free tier gives 256 MB RAM always‑on instance – enough for a single bot.

### 4. Adding a pretty chart (optional)

QuickChart.io can generate a 1‑day sparkline:

```
https://quickchart.io/chart?c={type:%27line%27,data:%27{labels:['2024-01-01',now],datasets:[{label:Gold,data:[price,price]}]}&format=png&width=300&height=150
```

You can embed that URL in a Telegram message with `markdown` preview.

<br>

## 📅 Roadmap (Next 2 Weeks)

- [x] Finalise GoldPulse Bot code & README  
- [ ] Deploy to Railway & share live URL  
- [ ] Collect first user feedback & iterate alerts  
- [ ] Start PropFirm Drawdown Guardian spec  

<br>

---

*Built with ❤️ by ezyweb.  Stay sharp, stay profitable.*