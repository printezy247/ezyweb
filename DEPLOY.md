# 🚀 EzyWeb Next.js — Deploy Guide

This is the Next.js rewrite of EzyWeb, starting with ScoutOps PropRank.

## Secrets you need

| Variable | Required | What to put |
|---|---|---|
| `DATABASE_URL` | ✅ | Railway PostgreSQL URL |
| `TELEGRAM_BOT_TOKEN` | ✅ | From @BotFather |
| `TELEGRAM_WEBHOOK_SECRET` | ✅ | Random string for webhook security |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Your public Railway URL |
| `SECRET_KEY` | ✅ | Random string for Next.js |
| `PROPRANK_AFFILIATE_URL` | ✅ (money) | Your prop-firm referral link |

## Deploy on Railway

1. Go to https://railway.app and sign in with GitHub.
2. **New Project → Deploy from GitHub repo** → `printezy247/ezyweb`.
3. Add a **PostgreSQL** database from Railway's dashboard.
4. Add environment variables (see table above).
5. Deploy. Railway builds the `Dockerfile` automatically.
6. After deploy, set the Telegram webhook:
   ```bash
   curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
     -d url="https://<YOUR_RAILWAY_URL>/api/telegram/webhook" \
     -d secret_token="<YOUR_TELEGRAM_WEBHOOK_SECRET>"
   ```

## Local development

1. Install Node.js 22+ from https://nodejs.org/
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy env file:
   ```bash
   cp .env.example .env.local
   ```
4. Get a PostgreSQL database. Easiest for beginners: create a free Railway Postgres project and copy its `DATABASE_URL`.
5. Fill in `.env.local`.
6. Run migrations and seed:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
7. Start dev server:
   ```bash
   npm run dev
   ```
8. Open http://localhost:3000 and http://localhost:3000/scoutops/proprank

## Telegram bot local testing

For local Telegram webhook testing, use ngrok:
1. Install ngrok and run: `ngrok http 3000`
2. Set webhook to your ngrok URL:
   ```bash
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook" \
     -d url="https://<NGROK_URL>/api/telegram/webhook" \
     -d secret_token="<SECRET>"
   ```
