"""PropRank database models."""
from sqlalchemy import Boolean, Column, Float, Integer, String, Text

from shared.db import Base


class PropFirm(Base):
    """A proprietary trading firm listing."""

    __tablename__ = "prop_firms"

    id = Column(Integer, primary_key=True)
    slug = Column(String(80), unique=True, nullable=False, index=True)
    name = Column(String(120), nullable=False)
    logo_url = Column(String(255), nullable=True)

    # Challenge pricing
    challenge_fee_usd = Column(Integer, nullable=True)
    account_size_usd = Column(Integer, nullable=True)

    # Rules
    max_daily_drawdown_pct = Column(Float, nullable=True)
    max_total_drawdown_pct = Column(Float, nullable=True)
    profit_target_pct = Column(Float, nullable=True)
    min_trading_days = Column(Integer, nullable=True)
    allows_overnight = Column(Boolean, default=True)
    allows_news_trading = Column(Boolean, default=True)
    allows_ea_bots = Column(Boolean, default=True)

    # Payout
    payout_split_pct = Column(Float, nullable=True)  # e.g. 80.0 for 80/20
    first_payout_days = Column(Integer, nullable=True)

    # Trust
    trust_score = Column(Integer, default=70)  # 0-100
    country = Column(String(80), nullable=True)
    regulation_note = Column(Text, nullable=True)

    # Monetization
    affiliate_url = Column(String(500), nullable=True)
    affiliate_label = Column(String(120), nullable=True)
    is_sponsored = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "slug": self.slug,
            "name": self.name,
            "logo_url": self.logo_url,
            "challenge_fee_usd": self.challenge_fee_usd,
            "account_size_usd": self.account_size_usd,
            "max_daily_drawdown_pct": self.max_daily_drawdown_pct,
            "max_total_drawdown_pct": self.max_total_drawdown_pct,
            "profit_target_pct": self.profit_target_pct,
            "min_trading_days": self.min_trading_days,
            "allows_overnight": self.allows_overnight,
            "allows_news_trading": self.allows_news_trading,
            "allows_ea_bots": self.allows_ea_bots,
            "payout_split_pct": self.payout_split_pct,
            "first_payout_days": self.first_payout_days,
            "trust_score": self.trust_score,
            "country": self.country,
            "regulation_note": self.regulation_note,
            "affiliate_url": self.affiliate_url or "",
            "affiliate_label": self.affiliate_label or "Funded Account",
            "is_sponsored": self.is_sponsored,
        }
