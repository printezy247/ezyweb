"""PropRank business logic."""
from __future__ import annotations

from sqlalchemy import desc, func

from shared.db import db_session
from suites.scoutops.proprank.models import PropFirm


def list_firms(filters: dict | None = None, limit: int = 50) -> list[dict]:
    """Return prop firms as dicts, optionally filtered."""
    query = db_session.query(PropFirm).filter(PropFirm.is_active.is_(True))

    if filters:
        if filters.get("max_fee"):
            query = query.filter(PropFirm.challenge_fee_usd <= filters["max_fee"])
        if filters.get("min_account"):
            query = query.filter(PropFirm.account_size_usd >= filters["min_account"])
        if filters.get("allows_ea") is not None:
            query = query.filter(PropFirm.allows_ea_bots.is_(filters["allows_ea"]))
        if filters.get("allows_news") is not None:
            query = query.filter(PropFirm.allows_news_trading.is_(filters["allows_news"]))

    # Sponsored first, then highest trust score
    firms = query.order_by(desc(PropFirm.is_sponsored), desc(PropFirm.trust_score)).limit(limit).all()
    return [f.to_dict() for f in firms]


def get_firm(slug_or_name: str) -> PropFirm | None:
    """Look up a firm by exact slug or case-insensitive name match."""
    firm = db_session.query(PropFirm).filter(
        (PropFirm.slug == slug_or_name.lower()) | (func.lower(PropFirm.name) == slug_or_name.lower())
    ).first()
    return firm


def search_firms(q: str, limit: int = 10) -> list[dict]:
    """Search firms by name."""
    pattern = f"%{q}%"
    firms = (
        db_session.query(PropFirm)
        .filter(PropFirm.is_active.is_(True), PropFirm.name.ilike(pattern))
        .order_by(desc(PropFirm.trust_score))
        .limit(limit)
        .all()
    )
    return [f.to_dict() for f in firms]


def format_firm_card(firm: PropFirm) -> str:
    """Format a firm as a Telegram HTML card."""
    rules = []
    if firm.max_daily_drawdown_pct is not None:
        rules.append(f"Daily DD: {firm.max_daily_drawdown_pct:g}%")
    if firm.max_total_drawdown_pct is not None:
        rules.append(f"Total DD: {firm.max_total_drawdown_pct:g}%")
    if firm.profit_target_pct is not None:
        rules.append(f"Target: {firm.profit_target_pct:g}%")

    restrictions = []
    if not firm.allows_overnight:
        restrictions.append("❌ No overnight")
    if not firm.allows_news_trading:
        restrictions.append("❌ No news trading")
    if not firm.allows_ea_bots:
        restrictions.append("❌ No EAs")

    price = f"${firm.challenge_fee_usd:,}" if firm.challenge_fee_usd else "N/A"
    size = f"${firm.account_size_usd:,}" if firm.account_size_usd else "N/A"
    payout = f"{firm.payout_split_pct:g}%" if firm.payout_split_pct else "N/A"
    trust = "🟢" if firm.trust_score >= 80 else "🟡" if firm.trust_score >= 60 else "🔴"

    lines = [
        f"💼 <b>{firm.name}</b>",
        f"{trust} Trust score: <b>{firm.trust_score}/100</b>",
        "",
        f"💰 Fee: <b>{price}</b> · Size: <b>{size}</b>",
        f"🎯 Payout split: <b>{payout}</b>",
        f"📏 Rules: {', '.join(rules) if rules else 'See site'}",
    ]
    if restrictions:
        lines.append(f"⚠️ Restrictions: {', '.join(restrictions)}")
    if firm.regulation_note:
        lines.append(f"🛡️ {firm.regulation_note}")

    return "\n".join(lines)
