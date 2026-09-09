"""Seed PropRank with sample prop firm data.

Run locally: python suites/scoutops/proprank/seed.py
"""
from shared.config import Config
from shared.db import db_session, init_db
from suites.scoutops.proprank.models import PropFirm


SAMPLE_FIRMS = [
    {
        "slug": "ftmo",
        "name": "FTMO",
        "challenge_fee_usd": 155,
        "account_size_usd": 10000,
        "max_daily_drawdown_pct": 5,
        "max_total_drawdown_pct": 10,
        "profit_target_pct": 10,
        "min_trading_days": 4,
        "allows_overnight": True,
        "allows_news_trading": True,
        "allows_ea_bots": True,
        "payout_split_pct": 80,
        "first_payout_days": 14,
        "trust_score": 92,
        "country": "Czech Republic",
        "regulation_note": "Established 2015, widely reviewed.",
        "affiliate_url": Config.PROPRANK_AFFILIATE_URL,
        "affiliate_label": "💼 FTMO Challenge",
    },
    {
        "slug": "the5ers",
        "name": "The5ers",
        "challenge_fee_usd": 39,
        "account_size_usd": 5000,
        "max_daily_drawdown_pct": 5,
        "max_total_drawdown_pct": 10,
        "profit_target_pct": 8,
        "min_trading_days": 3,
        "allows_overnight": True,
        "allows_news_trading": True,
        "allows_ea_bots": True,
        "payout_split_pct": 80,
        "first_payout_days": 5,
        "trust_score": 85,
        "country": "Israel",
        "regulation_note": "Instant funding option available.",
        "affiliate_url": Config.PROPRANK_AFFILIATE_URL,
        "affiliate_label": "💼 The5ers Challenge",
    },
    {
        "slug": "myforexfunds",
        "name": "My Forex Funds",
        "challenge_fee_usd": 49,
        "account_size_usd": 5000,
        "max_daily_drawdown_pct": 5,
        "max_total_drawdown_pct": 12,
        "profit_target_pct": 8,
        "min_trading_days": 0,
        "allows_overnight": True,
        "allows_news_trading": True,
        "allows_ea_bots": True,
        "payout_split_pct": 75,
        "first_payout_days": 14,
        "trust_score": 45,
        "country": "Canada",
        "regulation_note": "⚠️ Regulatory actions in 2023/2024 — verify before funding.",
        "affiliate_url": Config.PROPRANK_AFFILIATE_URL,
        "affiliate_label": "💼 My Forex Funds",
    },
    {
        "slug": "trueforexfunds",
        "name": "True Forex Funds",
        "challenge_fee_usd": 89,
        "account_size_usd": 10000,
        "max_daily_drawdown_pct": 5,
        "max_total_drawdown_pct": 10,
        "profit_target_pct": 10,
        "min_trading_days": 0,
        "allows_overnight": True,
        "allows_news_trading": False,
        "allows_ea_bots": True,
        "payout_split_pct": 80,
        "first_payout_days": 14,
        "trust_score": 78,
        "country": "Hungary",
        "regulation_note": "No news trading during evaluation.",
        "affiliate_url": Config.PROPRANK_AFFILIATE_URL,
        "affiliate_label": "💼 True Forex Funds",
    },
    {
        "slug": "fundednext",
        "name": "FundedNext",
        "challenge_fee_usd": 49,
        "account_size_usd": 6000,
        "max_daily_drawdown_pct": 5,
        "max_total_drawdown_pct": 10,
        "profit_target_pct": 10,
        "min_trading_days": 0,
        "allows_overnight": True,
        "allows_news_trading": True,
        "allows_ea_bots": True,
        "payout_split_pct": 80,
        "first_payout_days": 5,
        "trust_score": 82,
        "country": "UAE",
        "regulation_note": "Fast-growing, competitive pricing.",
        "affiliate_url": Config.PROPRANK_AFFILIATE_URL,
        "affiliate_label": "💼 FundedNext",
        "is_sponsored": True,
    },
]


def seed() -> int:
    """Insert sample firms if none exist. Returns count inserted."""
    init_db()
    existing = {f.slug for f in db_session.query(PropFirm.slug).all()}
    inserted = 0
    for data in SAMPLE_FIRMS:
        if data["slug"] in existing:
            continue
        firm = PropFirm(**data)
        db_session.add(firm)
        inserted += 1
    db_session.commit()
    return inserted


if __name__ == "__main__":
    count = seed()
    print(f"Seeded {count} prop firms.")
