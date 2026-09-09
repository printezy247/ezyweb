# 🚀 PropRank — Deploy Guide

PropRank is the first product in the **ScoutOps** suite: a prop-firm directory with both a Telegram bot and a web dashboard.

## Secrets you need

| Variable | Required | What to put |
|---|---|---|
| `PROPRANK_BOT_TOKEN` | ✅ | From @BotFather |
| `DATABASE_URL` | ✅ | Railway provides this automatically |
| `SECRET_KEY` | ✅ | Random string for Flask sessions |
| `PROPRANK_AFFILIATE_URL` | ✅ (money) | Your prop-firm referral link |
| `SCOUTOPS_WEB_URL` | ➖ | Public Railway URL for cross-links |

## Deploy on Railway

1. Push this repo to GitHub.
2. Go to https://railway.app → **New Project → Deploy from GitHub repo**.
3. Select `printezy247/ezyweb`.
4. In service settings, set **Root Directory** to `suites/scoutops/proprank`.
5. Add a **PostgreSQL database** from Railway's dashboard.
6. Add environment variables (see table above).
7. Deploy. Railway will build the `Dockerfile`.
8. Run the seed command once in Railway's console:
   ```bash
   python suites/scoutops/proprank/seed.py
   ```

## Optional: run the Telegram bot alongside the web service

Railway deploys the web dashboard by default. To also run the Telegram bot, create a second Railway service from the same repo with:
- **Root Directory**: `suites/scoutops/proprank`
- **Start Command**: `python suites/scoutops/proprank/bot.py`

Both services share the same `DATABASE_URL`.

## Local quick start

```bash
cd suites/scoutops/proprank
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r ../../../requirements.txt
export DATABASE_URL=sqlite:///./proprank.db
python seed.py
python -m flask --app web:create_app run --port 5000
```

In another terminal:
```bash
export DATABASE_URL=sqlite:///./proprank.db
python bot.py
```
