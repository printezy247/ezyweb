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
<a href="#monetize"><img src="https://img.shields.io/badge/Monetize-No_subscriptions-f472b6?style=for-the-badge&labelColor=0f172a&color=ec4899"/></a>

<br><br>

</div>

---

## 🌌 Mission

**EzyWeb** builds **free trading tools** for traders burned by subscriptions, scams, and opaque markets.

<div align="center">

<svg width="700" height="80" viewBox="0 0 700 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="missionBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#f472b6"/>
    </linearGradient>
  </defs>
  <rect x="50" y="35" width="600" height="4" rx="2" fill="url(#missionBar)" opacity="0.4">
    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
  </rect>
  <text x="350" y="25" text-anchor="middle" fill="#e2e8f0" font-family="Segoe UI" font-weight="700" font-size="14" letter-spacing="2">WHAT WE BUILD</text>
  <circle cx="100" cy="37" r="6" fill="#f59e0b"><animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite"/></circle>
  <circle cx="250" cy="37" r="6" fill="#22d3ee"><animate attributeName="r" values="6;9;6" dur="2s" begin="0.5s" repeatCount="indefinite"/></circle>
  <circle cx="400" cy="37" r="6" fill="#f472b6"><animate attributeName="r" values="6;9;6" dur="2s" begin="1s" repeatCount="indefinite"/></circle>
  <circle cx="550" cy="37" r="6" fill="#a78bfa"><animate attributeName="r" values="6;9;6" dur="2s" begin="1.5s" repeatCount="indefinite"/></circle>
</svg>

</div>

- ⚡ **Telegram bots + web dashboards** for every product
- 📊 **Free live data & free APIs only**
- 💰 **No paid subscriptions** — monetized through affiliate CPA, Telegram Stars, ads, and sponsored listings
- 🪖 **4 soldier-themed brands, 9 products**

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
- `/top` — top ranked prop firms
- `/firm NAME` — detailed firm card with affiliate CTA
- `/search TEXT` — search firms
- `/compare A vs B` — side-by-side comparison

**Web dashboard:**
- `/scoutops/proprank` — directory with filters
- `/scoutops/proprank/firm/<slug>` — detail page
- `/scoutops/proprank/search?q=...` — search

### Code location

```
suites/scoutops/proprank/
├── bot.py              # Telegram bot
├── web.py              # Flask dashboard
├── models.py           # SQLAlchemy models
├── services.py         # Business logic
├── seed.py             # Sample prop-firm data
├── tests/              # Pytest suite
├── templates/proprank/ # Jinja2 templates
├── Dockerfile          # Railway deploy
├── railway.json        # Railway config
└── DEPLOY.md           # Step-by-step deploy
```

### Local run

```bash
# 1. Install deps
pip install -r requirements.txt

# 2. Copy env and edit
cp .env.example .env        # Linux/Mac
# Windows: copy .env.example .env

# 3. Seed the database
# Windows PowerShell:
$env:PYTHONPATH="."
$env:DATABASE_URL="sqlite:///./proprank.db"
python suites/scoutops/proprank/seed.py

# 4. Run web dashboard
$env:FLASK_APP="suites.scoutops.proprank.web:create_app()"
python -m flask run --port 5000

# 5. Run Telegram bot (another terminal)
$env:PYTHONPATH="."
$env:DATABASE_URL="sqlite:///./proprank.db"
python suites/scoutops/proprank/bot.py
```

### Tests

```bash
# Windows PowerShell:
$env:PYTHONPATH="."
$env:DATABASE_URL="sqlite:///./test_proprank.db"
python -m pytest suites/scoutops/proprank/tests/test_proprank.py -q
```

---

<a name="deploy"></a>
## 🚀 Deploy PropRank on Railway

<div align="center">

<svg width="600" height="60" viewBox="0 0 600 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="deployGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect x="20" y="15" width="560" height="30" rx="15" fill="none" stroke="url(#deployGrad)" stroke-width="2" stroke-dasharray="8 4">
    <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite"/>
  </rect>
  <text x="300" y="36" text-anchor="middle" fill="#e2e8f0" font-family="Segoe UI" font-weight="700" font-size="13" letter-spacing="2">DEPLOY IN 6 STEPS</text>
</svg>

</div>

1. Go to https://railway.app and sign in with GitHub.
2. **New Project → Deploy from GitHub repo** → choose `printezy247/ezyweb`.
3. In the service **Settings → Root Directory**, set: `suites/scoutops/proprank`.
4. Add a **PostgreSQL** database from Railway's dashboard.
5. Add environment variables:
   - `PROPRANK_BOT_TOKEN` = your @BotFather token
   - `SECRET_KEY` = any random string
   - `PROPRANK_AFFILIATE_URL` = your prop-firm referral link
   - `SCOUTOPS_WEB_URL` = your Railway public URL
6. Deploy. After deploy, run seed in Railway console:
   ```bash
   python suites/scoutops/proprank/seed.py
   ```

Full guide: [`suites/scoutops/proprank/DEPLOY.md`](./suites/scoutops/proprank/DEPLOY.md)

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

## 🏗️ Architecture

```
ezyweb/
├── shared/                 # Shared backend
│   ├── config.py           # Env config
│   ├── db.py               # SQLAlchemy + PostgreSQL/SQLite
│   ├── telegram.py         # Telegram helpers
│   ├── web.py              # Flask app factory
│   └── templates/          # Base web templates
├── suites/
│   ├── aurumops/           # Gold products
│   ├── shieldops/          # Risk/journal/portfolio
│   ├── scoutops/           # Discovery (PropRank ✅)
│   └── relayops/           # Signal infrastructure
└── requirements.txt
```

Every product reuses `shared/` and gets its own Telegram bot + web dashboard.

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
