# Deep Research: Trading / Crypto / Stocks / Forex — Client Problems & 9 Buildable Products

Workspace: `C:\Users\User\Documents\Default Project`
Repo: `printezy-9-products` (showcase README + specs in `products/`, code in `apps/`)
Date: 2026-09-09 (v2 — refined constraints)
Status: **BUILD MODE — Product #1 in progress**

## v2 Constraints (user-locked, 2026-09-09)
1. **Telegram bots or websites only.**
2. **No paid subscriptions** — neither as a revenue model nor as a build dependency.
3. **Free live data only** — Binance public API (PAXGUSDT spot gold), Yahoo Finance chart API (GC=F futures, indices, FX), no API keys.
4. **Monetization = affiliate/IB CPA links, Telegram Stars tips, AdsGram/web ads, sponsored directory listings, cross-funnel between the 9 products.**
5. **Gold / XAUUSD is the priority niche.**

---

## 1. Deep Research by Niche (evidence base)

### 1.1 Interactive Brokers (IB) / Broker Affiliates
- **Evidence**: BBB / ComplaintsBoard (~1.2/5 ratings); complaints of buggy platform, slow withdrawals.
- **Client Problems**: opaque affiliate payout rules; compliance friction for small creators; affiliates bear reputational damage from broker-side failures.

### 1.2 Prop Firms (FTMO, The5ers, etc.)
- **Evidence**: joinprop.com 2025 FTMO review; propfirmupdate.com; forexpeacearmy.com; traderssecondbrain.com (Mar 2026).
- **Client Problems**: challenge-fee conflict of interest (~90% fail, $500–$5,000 fees kept); hidden rules (overnight holds, news bans, daily loss); payout delays/denials post-approval.

### 1.3 Gold / XAUUSD (FOCUS)
- **Evidence**: tradingcup.com 2025; EzyAi constants (PAXGUSDT spot + GC=F fallback, `SPREAD_ESTIMATES`).
- **Client Problems**: Telegram gold-signal scams (fake MT4 screenshots, cherry-picked trades, $30–$300/mo VIP traps); signal lag + slippage; backtesting mirage + seasonality neglect; spread widening destroys scalps outside London/NY and around news.

### 1.4 Crypto / Copy-Trade / Social Trading
- **Evidence**: OKX Learn Jun 2025 (2,000% malware surge); Bitget wiki Aug 2025; scamfirstaid.org.
- **Client Problems**: fake verification bots/malware; influencer impersonation + deepfakes; unregulated broker IB traps earning lifetime commissions on trader losses.

### 1.5 Forex Signal Courses / Providers
- **Evidence**: marketinsiders.in Jul 2025; tradingcup.com Apr 2025; forexgdp.com 2026 Trustpilot analysis.
- **Client Problems**: "100% accuracy" promises; no verified performance (MyFXBook/FX Blue avoided); subscription trap + upsell pipelines.

### 1.6 Influencer / Social Media Trading Scams
- **Evidence**: FTC Apr 2026 ($2.1B social-media scam losses 2025; $1.1B investment scams); Forbes May 2025 (~80% TikTok fin-advice misleading).
- **Client Problems**: rented-lifestyle credibility theater; fake profit screenshots; unregulated offshore broker copy-trade funnels.

### 1.7 Fintech / Telegram Bot Monetization
- **Evidence**: TeleSuite Jun 2026; TrafficSigma 2024–2026; BAZU 2025; AdsGram Aug 2025.
- **Client Problems**: scam bots poison trust; subscription fatigue ("free" scam channels depress willingness to pay); regulatory gray zone for financial bots.

**Key insight for v2:** the audience already refuses subscriptions because scammers burned them — so *free tools monetized by affiliate CPA + tips + ads* convert better than PRO tiers in this niche.

---

## 2. The 9 Products (v2 — bots/websites, free live data, no subscriptions)

| # | Product | Type | Live Data (free) | Monetization |
|---|---------|------|------------------|--------------|
| 1 | **GoldPulse** — XAUUSD live price, alerts, sessions, sparkline | Telegram bot | Binance PAXGUSDT + Yahoo GC=F | Broker/exchange CPA buttons, Stars tips, AdsGram |
| 2 | **GoldSignalCheck** — verify any gold signal vs real ticks | Telegram bot | Binance PAXG klines + Yahoo | CPA links, tips, viral verdict cards |
| 3 | **GoldEventRadar** — FOMC/CPI/NFP countdowns + seasonality | Website + bot alerts | Yahoo GC=F history, static ICS calendars | Affiliate banners, web ads, sponsored listings |
| 4 | **PropCalc** — prop-firm challenge EV + hidden-rule scanner | Website | — (computed) | Prop-firm affiliate links, web ads |
| 5 | **ScamBotCheck** — audit Telegram bots/channels for scam patterns | Telegram bot | TG API heuristics | CPA links, tips, directory listings |
| 6 | **CopyAudit** — broker regulation & copy-trade safety checker | Telegram + web | Regulator registers (static+links) | Regulated-broker CPA, directory |
| 7 | **RedFlagScanner** — NLP red-flag scan of signal ads | Website | — (text NLP) | SEO → ads → cross-funnel |
| 8 | **IBCalc** — affiliate/IB net-revenue calculator | Website | — (computed) | B2B leads, affiliate-program referrals |
| 9 | **InfluencerAudit** — finfluencer credibility audit + loss-report template | Telegram bot | Public profile heuristics | Tips, viral shares, cross-funnel |

---

## 3. TOP 3 — DECIDED (build order)

### 🥇 #1 — GoldPulse (XAUUSD Live Price & Alert Bot)
- **Why first:** daily-use retention engine; gold is the stated focus and is at record-high retail interest; fastest to build (data layer already proven in EzyAi); every other product cross-promotes inside it.
- **MVP:** `/price` (PAXG spot + GC=F fallback, 24h change), `/alert above|below PRICE` with 30s polling, `/alerts` `/clear`, `/chart` (24h sparkline), `/session` (live sessions + spread-risk flag), `/tip` (Telegram Stars), affiliate button on every price card.

### 🥈 #2 — GoldSignalCheck (Signal Verifier Bot)
- **Why second:** viral growth engine — verdict cards get pasted into gold Telegram groups (free distribution); same data layer as #1 (reuse `data.py`).
- **MVP:** `/verify ENTRY SL TP` → checks claimed entry/SL/TP against real PAXG klines → `VERDICT: REAL / IMPOSSIBLE` + gap %; shareable card format.

### 🥉 #3 — GoldEventRadar (News & Seasonality Radar)
- **Why third:** web SEO/traffic engine + feeds event alerts into GoldPulse (ecosystem lock-in).
- **MVP:** Flask page with live countdowns to next FOMC/CPI/NFP (static curated ICS → auto-refresh), 10-year monthly seasonality chart computed live from Yahoo GC=F, spread-widening warning banner; GoldPulse `/events` command pulls from it.

**Rejected for top 3:** PropCalc/IBCalc (no live data — weaker fit to constraint), ScamBotCheck/CopyAudit/InfluencerAudit (build on top of the audience the top 3 create), RedFlagScanner (SEO payoff is slow).

---

## 4. Build Status

- [ ] **#1 GoldPulse** — `apps/goldpulse/` — IN PROGRESS
- [ ] #2 GoldSignalCheck — `apps/goldsignalcheck/`
- [ ] #3 GoldEventRadar — `apps/goldeventradar/`
- [ ] #4–#9 — backlog

## 5. Tech Stack (free tier only)
- Python 3.12 · `python-telegram-bot[job-queue]` · Flask (web products) · `requests`
- Data: Binance public REST (PAXGUSDT ticker/klines) → Yahoo Finance chart API (GC=F) fallback — no keys, no cost
- Money: Telegram Stars (XTR invoices, no provider token needed), affiliate URLs via env, AdsGram later
- Deploy: Fly.io free tier / any always-on box; JSON persistence on local volume

## 6. Evidence References
- FTC 2025 scam data; joinprop.com; forexpeacearmy.com; tradingcup.com (gold Telegram scams); OKX Learn (malware surge); marketinsiders.in; Forbes (finfluencers); TeleSuite/TrafficSigma/AdsGram (Telegram monetization).
