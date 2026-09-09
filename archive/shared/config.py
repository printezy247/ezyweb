"""Shared configuration — everything via env vars."""
import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    """Base config shared by all suites and products."""

    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-me")
    DEBUG = os.getenv("DEBUG", "false").lower() in ("1", "true", "yes")

    # Database: PostgreSQL on Railway, SQLite locally
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./ezyweb.db")
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Telegram bots (one per product)
    TELEGRAM_BOT_TOKENS = {
        "proprank": os.getenv("PROPRANK_BOT_TOKEN", "").strip(),
        "trendspot": os.getenv("TRENDSPOT_BOT_TOKEN", "").strip(),
        "goldpulse": os.getenv("GOLDPULSE_BOT_TOKEN", "").strip(),
        "signalcheck": os.getenv("SIGNALCHECK_BOT_TOKEN", "").strip(),
        "eventsentry": os.getenv("EVENTSENTRY_BOT_TOKEN", "").strip(),
        "armorcalc": os.getenv("ARMORCALC_BOT_TOKEN", "").strip(),
        "tradelog": os.getenv("TRADELOG_BOT_TOKEN", "").strip(),
        "pulsetrack": os.getenv("PULSETRACK_BOT_TOKEN", "").strip(),
        "alertrelay": os.getenv("ALERTRELAY_BOT_TOKEN", "").strip(),
    }

    # Monetization hooks
    PROPRANK_AFFILIATE_URL = os.getenv("PROPRANK_AFFILIATE_URL", "https://example.com/propfirm").strip()
    PROPRANK_AFFILIATE_LABEL = os.getenv("PROPRANK_AFFILIATE_LABEL", "💼 Funded Account (partner)")

    # Brand URLs for cross-links
    SCOUTOPS_WEB_URL = os.getenv("SCOUTOPS_WEB_URL", "https://example.com/scoutops")

    DISCLAIMER = "Not financial advice. Do your own due diligence before choosing a prop firm."
