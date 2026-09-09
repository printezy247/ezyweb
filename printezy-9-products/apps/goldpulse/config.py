"""GoldPulse configuration — everything via env, zero cost to run."""
import os

from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()

# Monetization hooks (no subscriptions — affiliate CPA + Stars tips)
AFFILIATE_URL = os.getenv("GOLD_AFFILIATE_URL", "https://example.com/set-your-affiliate-link")
AFFILIATE_LABEL = os.getenv("GOLD_AFFILIATE_LABEL", "💱 Trade Gold (partner)")

ALERT_POLL_SECONDS = int(os.getenv("GOLD_ALERT_POLL_SECONDS", "30"))
DATA_DIR = os.path.abspath(os.getenv("GOLD_DATA_DIR", os.path.join(os.path.dirname(__file__), "data")))

MAX_ALERTS_PER_USER = 10
TIP_AMOUNTS_XTR = (50, 100, 250)  # Telegram Stars tip options

DISCLAIMER = "Not financial advice. Verify prices with your broker."
