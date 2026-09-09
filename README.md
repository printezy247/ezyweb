<div align="center">

<!-- 3D Hero Scene -->
<svg width="100%" height="420" viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg" style="max-width:900px;">
  <defs>
    <linearGradient id="heroSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#030510"/>
      <stop offset="50%" stop-color="#0a0f1e"/>
      <stop offset="100%" stop-color="#05080f"/>
    </linearGradient>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"><animate attributeName="stop-color" values="#f59e0b;#fbbf24;#f59e0b" dur="3s" repeatCount="indefinite"/></stop>
      <stop offset="100%" stop-color="#d4af37"/>
    </linearGradient>
    <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
    <radialGradient id="orbGold" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orbCyan" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="900" height="420" fill="url(#heroSky)" rx="20"/>

  <!-- 3D Perspective Grid -->
  <g transform="translate(0, 260)">
    <g opacity="0.15">
      <line x1="0" y1="160" x2="900" y2="160" stroke="#22d3ee" stroke-width="1">
        <animate attributeName="y1" values="160;150;160" dur="6s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="160;150;160" dur="6s" repeatCount="indefinite"/>
      </line>
      <line x1="450" y1="160" x2="0" y2="420" stroke="#22d3ee" stroke-width="1"/>
      <line x1="450" y1="160" x2="180" y2="420" stroke="#22d3ee" stroke-width="1"/>
      <line x1="450" y1="160" x2="360" y2="420" stroke="#22d3ee" stroke-width="1"/>
      <line x1="450" y1="160" x2="540" y2="420" stroke="#22d3ee" stroke-width="1"/>
      <line x1="450" y1="160" x2="720" y2="420" stroke="#22d3ee" stroke-width="1"/>
      <line x1="450" y1="160" x2="900" y2="420" stroke="#22d3ee" stroke-width="1"/>
    </g>
  </g>

  <!-- Floating Orbs -->
  <circle cx="180" cy="120" r="120" fill="url(#orbGold)" opacity="0.4">
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -15; 0 0" dur="7s" repeatCount="indefinite"/>
  </circle>
  <circle cx="720" cy="180" r="100" fill="url(#orbCyan)" opacity="0.3">
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 20; 0 0" dur="8s" repeatCount="indefinite"/>
  </circle>

  <!-- Rotating Rings -->
  <g transform="translate(450, 180)">
    <ellipse rx="160" ry="40" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.3" stroke-dasharray="8 8">
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse rx="120" ry="30" fill="none" stroke="#22d3ee" stroke-width="1.2" opacity="0.25" stroke-dasharray="6 6">
      <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="15s" repeatCount="indefinite"/>
    </ellipse>
  </g>

  <!-- 3D Platform -->
  <g transform="translate(450, 280)">
    <ellipse rx="180" ry="35" fill="none" stroke="url(#goldGradient)" stroke-width="2.5" filter="url(#glow)" opacity="0.8"/>
    <ellipse rx="160" ry="28" fill="rgba(245,158,11,0.08)" stroke="url(#goldGradient)" stroke-width="1" opacity="0.6"/>
  </g>

  <!-- Main Title with Animated Gradient -->
  <text x="450" y="160" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="62" fill="url(#goldGradient)" filter="url(#glow)">
    🚀 EZYWEB
  </text>
  <text x="450" y="205" text-anchor="middle" font-family="Segoe UI, system-ui, sans-serif" font-weight="700" font-size="20" fill="#e2e8f0" letter-spacing="4">
    TRADING INTELLIGENCE · FINTECH BOTS
  </text>
  <text x="450" y="235" text-anchor="middle" font-family="Segoe UI, system-ui, sans-serif" font-size="15" fill="#94a3b8" letter-spacing="2">
    No subscriptions · Free live data · Telegram + Web
  </text>

  <!-- Animated Particles -->
  <g>
    <circle r="3" fill="#f59e0b">
      <animate attributeName="cx" values="350;450;550;450;350" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="320;280;320;360;320" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;1;0;0" dur="8s" repeatCount="indefinite"/>
    </circle>
    <circle r="2.5" fill="#22d3ee">
      <animate attributeName="cx" values="550;450;350;450;550" dur="9s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="360;320;360;280;360" dur="9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;1;0;0" dur="9s" repeatCount="indefinite"/>
    </circle>
    <circle r="2" fill="#f472b6">
      <animate attributeName="cx" values="450;520;450;380;450" dur="7s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="300;340;380;340;300" dur="7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;1;0;0" dur="7s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>

<br>

<!-- Animated status pills -->
<a href="#build-1"><img src="https://img.shields.io/badge/🥇_PropRank-BUILT-22d3ee?style=for-the-badge&labelColor=0f172a&color=0ea5e9"/></a>
<a href="#brands"><img src="https://img.shields.io/badge/4_Brands-9_Products-f59e0b?style=for-the-badge&labelColor=0f172a&color=f59e0b"/></a>
<a href="#deploy"><img src="https://img.shields.io/badge/Deploy-Railway_+_PostgreSQL-00ffa3?style=for-the-badge&labelColor=0f172a&color=10b981"/></a>
<a href="#monetize"><img src="https://img.shields.io/badge/Monetize-No_subscriptions-f472b6?style=for-the-badge&labelColor=0f172a&color=ec4999"/></a>

<br><br>

</div>

---

## 🌌 Mission

**EzyWeb** builds **free trading tools** for traders burned by subscriptions, scams, and opaque markets.

- ⚡ **Telegram bots + web dashboards** for every product
- 📊 **Free live data & free APIs only**
- 💰 **No paid subscriptions** — monetized through affiliate CPA, Telegram Stars, ads, and sponsored listings
- 🪖 **4 soldier-themed brands, 9 products**
- ⚙️ **Built with Next.js 15, Tailwind 4, Drizzle ORM, PostgreSQL** (same stack pattern as `website_sam`)

> *“Build trust first. Monetize second.”*

---

<a name="brands"></a>
## 🪖 The 4 Brands & 9 Products

<div align="center">

<svg width="900" height="100" viewBox="0 0 900 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brandBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#f472b6"/>
    </linearGradient>
  </defs>
  <rect x="50" y="45" width="800" height="6" rx="3" fill="url(#brandBar)" opacity="0.3"/>
  <circle cx="120" cy="48" r="12" fill="#f59e0b"><animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite"/></circle>
  <circle cx="320" cy="48" r="10" fill="#22d3ee" opacity="0.8"><animate attributeName="r" values="10;13;10" dur="2.3s" repeatCount="indefinite"/></circle>
  <circle cx="520" cy="48" r="10" fill="#a78bfa" opacity="0.8"><animate attributeName="r" values="10;13;10" dur="2.6s" repeatCount="indefinite"/></circle>
  <circle cx="720" cy="48" r="10" fill="#f472b6" opacity="0.8"><animate attributeName="r" values="10;13;10" dur="2.9s" repeatCount="indefinite"/></circle>
  <text x="450" y="25" text-anchor="middle" fill="#e2e8f0" font-family="Segoe UI" font-weight="800" font-size="16" letter-spacing="3">4 BRANDS · 9 PRODUCTS · SHARED BACKEND</text>
</svg>

</div>

### 🥇 Brand 1 — AurumOps (Gold / XAUUSD)

| Product | Platform | What it does |
|---|---|---|
| **GoldPulse** | Telegram + web | Live gold price, alerts, sessions, DXY correlation, futures basis |
| **SignalCheck** | Telegram + web | Verify any gold signal vs real PAXG ticks → `REAL / IMPOSSIBLE` |
| **EventSentry** | Telegram + web | FOMC/CPI/NFP countdowns + gold volatility warnings |

### 🛡️ Brand 2 — ShieldOps (Risk & Account Protection)

| Product | Platform | What it does |
|---|---|---|
| **ArmorCalc** | Telegram + web | Position size, risk %, R-multiple calculator |
| **TradeLog** | Telegram + web | Trading journal with P&L analytics and export |
| **PulseTrack** | Telegram + web | Multi-exchange portfolio P&L + exposure summary |

### 🔭 Brand 3 — ScoutOps (Discovery)

| Product | Platform | What it does |
|---|---|---|
| **PropRank** ✅ | Telegram + web | Prop-firm directory, comparison, trust scores |
| **TrendSpot** | Telegram + web | Trending stocks/crypto/forex screener |

### 📡 Brand 4 — RelayOps (Signal Infrastructure)

| Product | Platform | What it does |
|---|---|---|
| **AlertRelay** | Telegram + web | TradingView webhook → Telegram bridge |

---

<a name="build-1"></a>
## 🥇 Build #1 — PropRank (BUILT)

<div align="center">

<svg width="680" height="220" viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="propGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
    <linearGradient id="propGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
    <filter id="cardGlow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Card background -->
  <rect x="20" y="20" width="640" height="180" rx="28" fill="#0b1020" stroke="url(#propGrad)" stroke-width="2.5" filter="url(#cardGlow)"/>

  <!-- Animated top bar -->
  <rect x="20" y="20" width="640" height="5" rx="2.5" fill="url(#propGrad2)">
    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
  </rect>

  <!-- Icon -->
  <text x="80" y="115" text-anchor="middle" font-size="48">🔭</text>

  <!-- Title -->
  <text x="340" y="85" text-anchor="middle" fill="#22d3ee" font-family="Segoe UI" font-weight="800" font-size="30">SCOUTOPS · PROPRANK</text>
  <text x="340" y="120" text-anchor="middle" fill="#e2e8f0" font-family="Segoe UI" font-weight="700" font-size="22">Prop-Firm Directory + Telegram Bot</text>
  <text x="340" y="150" text-anchor="middle" fill="#94a3b8" font-family="Segoe UI" font-size="13">No subscriptions · PostgreSQL · Interactive buttons · Web dashboard</text>

  <!-- Pulsing live dot -->
  <circle cx="600" cy="55" r="6" fill="#00ffa3">
    <animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  <text x="600" y="75" text-anchor="middle" fill="#00ffa3" font-family="Segoe UI" font-weight="700" font-size="10">LIVE</text>
</svg>

</div>

### Features

**Telegram bot commands:**
- `/start` — welcome + command list
- `/top` — top ranked prop firms
- `/firm NAME` — detailed firm card with affiliate CTA
- `/search TEXT` — search firms
- `/compare A vs B` — side-by-side comparison

**Web dashboard:**
- `/` — EzyWeb home
- `/scoutops/proprank` — directory with filters
- `/scoutops/proprank/<slug>` — detail page
- `/api/propfirms` — JSON API
- `/api/telegram/webhook` — Telegram bot webhook

### Tech stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 4 with custom dark/gold theme
- **Database:** PostgreSQL (production) / PGlite (local dev) via Drizzle ORM
- **Bot:** grammY webhook
- **Deploy:** Railway (Docker)

---

## 🚀 Quick Start (For Newbies)

Follow these steps exactly. Each command goes into **PowerShell** (search "PowerShell" on Windows).

### Step 0 — Install the tools

1. **Install Node.js 22** from https://nodejs.org/
   - Download the LTS version
   - Run the installer, click Next until done
   - Check "Automatically install necessary tools" if asked

2. **Install Git** from https://git-scm.com/download/win
   - Use default options

3. **Install VS Code** (optional but helpful) from https://code.visualstudio.com/

### Step 1 — Download the code

Open PowerShell and run:

```powershell
cd C:\Users\%USERNAME%\Documents
git clone https://github.com/printezy247/ezyweb.git
cd ezyweb
```

### Step 2 — Install project dependencies

```powershell
npm install
```

> If Windows says "running scripts is disabled", run this instead:
> ```powershell
> powershell -ExecutionPolicy Bypass -Command "npm install"
> ```

### Step 3 — Create your environment file

```powershell
copy .env.example .env.local
```

Open `.env.local` in Notepad and fill in:

```env
# For local dev, you can use PGlite (no PostgreSQL install needed)
DATABASE_URL=pglite://./tmp/ezyweb.db

# Your public site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Any random string
SECRET_KEY=change-me-later-12345

# From @BotFather (see Step 4)
TELEGRAM_BOT_TOKEN=your-bot-token-here

# Any random string for webhook security
TELEGRAM_WEBHOOK_SECRET=my-secret-token-123

# Your prop-firm affiliate link
PROPRANK_AFFILIATE_URL=https://your-propfirm-ref-link
```

### Step 4 — Create your Telegram bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Name it `PropRank`
4. Choose a username like `your_proprank_bot`
5. Copy the token (looks like `123456789:ABC...`)
6. Paste it into `.env.local` as `TELEGRAM_BOT_TOKEN`

### Step 5 — Create the local database

```powershell
mkdir tmp
$env:DATABASE_URL="pglite://./tmp/ezyweb.db"
npm run db:setup
```

You should see:
```
Migrations completed.
Seeded 5 prop firms.
```

### Step 6 — Run the website locally

```powershell
$env:DATABASE_URL="pglite://./tmp/ezyweb.db"
$env:TELEGRAM_BOT_TOKEN="your-bot-token-here"
$env:NEXT_PUBLIC_SITE_URL="http://localhost:3000"
npm run dev
```

Open your browser:
- http://localhost:3000 — home page
- http://localhost:3000/scoutops/proprank — PropRank directory

To stop the server, press `Ctrl + C` in PowerShell.

---

## 🤖 Test the Telegram Bot Locally

The bot needs a public URL for Telegram webhooks. For local testing, use **ngrok**:

1. Install ngrok from https://ngrok.com/download
2. Sign up free and copy your authtoken
3. In a new PowerShell window, run:
   ```powershell
   ngrok authtoken YOUR_NGROK_TOKEN
   ngrok http 3000
   ```
4. ngrok gives you a URL like `https://abc123.ngrok.io`
5. In another PowerShell window, set the webhook:
   ```powershell
   curl "https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook" `
     -d url="https://abc123.ngrok.io/api/telegram/webhook" `
     -d secret_token="my-secret-token-123"
   ```
6. Message your bot in Telegram:
   ```
   /start
   /top
   /firm ftmo
   /compare ftmo vs fundednext
   ```

---

## ☁️ Deploy to Railway (Go Live)

### What you need before deploying

| Variable | Where to get it |
|---|---|
| `TELEGRAM_BOT_TOKEN` | @BotFather |
| `TELEGRAM_WEBHOOK_SECRET` | Make up any random string |
| `NEXT_PUBLIC_SITE_URL` | Your Railway public URL (appears after first deploy) |
| `SECRET_KEY` | Make up any random string |
| `PROPRANK_AFFILIATE_URL` | Your prop-firm referral link |
| `DATABASE_URL` | Railway PostgreSQL (created below) |

### Deploy steps

1. Go to https://railway.app and sign in with GitHub.
2. Click **New Project → Deploy from GitHub repo**.
3. Select `printezy247/ezyweb`.
4. Click **+ New → Database → PostgreSQL**.
5. Click on your web service, then go to **Variables** tab.
6. Add each variable from the table above.
   - For `DATABASE_URL`, click **Add Reference** and choose your Postgres database.
7. Click **Deploy**.
8. After deploy, Railway shows your public URL (e.g. `https://ezyweb-production.up.railway.app`).
9. Go back to Variables and set `NEXT_PUBLIC_SITE_URL` to that URL.
10. Redeploy.
11. Set the Telegram webhook (replace the URL and token):
    ```powershell
    curl "https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook" `
      -d url="https://ezyweb-production.up.railway.app/api/telegram/webhook" `
      -d secret_token="YOUR_TELEGRAM_WEBHOOK_SECRET"
    ```

Done! Your PropRank is live.

---

<a name="monetize"></a>
## 💰 Monetization Rules (locked)

<div align="center">

<svg width="700" height="70" viewBox="0 0 700 70" xmlns="http://www.w3.org/2000/svg">
  <circle cx="80" cy="35" r="5" fill="#00ffa3"><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/></circle>
  <text x="100" y="40" fill="#e2e8f0" font-family="Segoe UI" font-size="13">Affiliate CPA</text>
  <circle cx="240" cy="35" r="5" fill="#00ffa3"><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.3s" repeatCount="indefinite"/></circle>
  <text x="260" y="40" fill="#e2e8f0" font-family="Segoe UI" font-size="13">Telegram Stars</text>
  <circle cx="420" cy="35" r="5" fill="#00ffa3"><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.6s" repeatCount="indefinite"/></circle>
  <text x="440" y="40" fill="#e2e8f0" font-family="Segoe UI" font-size="13">Sponsored listings</text>
  <circle cx="600" cy="35" r="5" fill="#00ffa3"><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.9s" repeatCount="indefinite"/></circle>
  <text x="620" y="40" fill="#e2e8f0" font-family="Segoe UI" font-size="13">One-time products</text>
</svg>

</div>

- ✅ Affiliate CPA links
- ✅ Telegram Stars tips
- ✅ Web ads / AdsGram
- ✅ Sponsored listings
- ✅ One-time template packs
- ❌ No user subscriptions
- ❌ No paid data/API services

---

## 🏗️ Project Structure

```
ezyweb/
├── app/                    # Next.js App Router
│   ├── api/
│   │   ├── propfirms/      # JSON API
│   │   └── telegram/
│   │       └── webhook/    # Telegram bot webhook
│   ├── scoutops/
│   │   └── proprank/
│   │       ├── page.tsx    # Directory page
│   │       └── [slug]/
│   │           └── page.tsx # Firm detail page
│   ├── globals.css         # Tailwind theme
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── db/
│   ├── index.ts            # DB connection (Postgres + PGlite)
│   ├── migrate.ts          # Migration runner
│   ├── schema.ts           # Drizzle schema
│   └── seed.ts             # Sample data
├── archive/                # Legacy Python code
├── drizzle/                # Generated SQL migrations
├── Dockerfile              # Railway deploy
├── railway.json            # Railway config
├── next.config.ts          # Next.js config
├── tailwind.config.ts      # Tailwind config
└── package.json
```

---

## ✅ 9-Product Build Checklist

> Rules: Telegram bot + website · free data/APIs · no paid subscriptions.

<div align="center">

<svg width="800" height="30" viewBox="0 0 800 30" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect x="0" y="12" width="800" height="3" rx="1.5" fill="url(#checkGrad)" opacity="0.3"/>
</svg>

</div>

### 🥇 Brand 1 — AurumOps

- [ ] **GoldPulse** — live XAUUSD price, alerts, sessions, DXY correlation
- [ ] **SignalCheck** — verify gold signals vs real ticks
- [ ] **EventSentry** — FOMC/CPI/NFP countdowns + volatility warnings

### 🛡️ Brand 2 — ShieldOps

- [ ] **ArmorCalc** — position size & risk calculator
- [ ] **TradeLog** — trading journal + P&L analytics
- [ ] **PulseTrack** — multi-exchange portfolio tracker

### 🔭 Brand 3 — ScoutOps

- [x] **PropRank** — prop-firm directory + comparison ✅ **BUILT**
- [ ] **TrendSpot** — trending assets screener

### 📡 Brand 4 — RelayOps

- [ ] **AlertRelay** — TradingView → Telegram webhook bridge

### 🚀 Launch gate (per product)

- [x] Runs on free tier
- [x] Affiliate link wired via env
- [ ] Telegram Stars / tips wired
- [x] Web dashboard live
- [ ] Cross-links to other live products
- [x] Not-financial-advice disclaimer
- [ ] Deployed + smoke-tested live

---

<div align="center">

<br>

<svg width="420" height="80" viewBox="0 0 420 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="footGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"><animate attributeName="stop-color" values="#f59e0b;#22d3ee;#f472b6;#f59e0b" dur="5s" repeatCount="indefinite"/></stop>
      <stop offset="100%" stop-color="#22d3ee"><animate attributeName="stop-color" values="#22d3ee;#f472b6;#f59e0b;#22d3ee" dur="5s" repeatCount="indefinite"/></stop>
    </linearGradient>
  </defs>
  <text x="210" y="40" text-anchor="middle" font-family="Segoe UI, system-ui, sans-serif" font-weight="800" font-size="24" fill="url(#footGrad)">printezy · ezyweb</text>
  <text x="210" y="62" text-anchor="middle" font-family="Segoe UI" font-size="11" fill="#64748b">Built for traders. Free forever. No subscriptions.</text>
</svg>

<br>

*Educational research only. Not financial advice.*

</div>
