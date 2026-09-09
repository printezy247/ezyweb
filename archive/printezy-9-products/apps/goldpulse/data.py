"""Free live gold data for GoldPulse.

Primary:  Binance public API  — PAXGUSDT (tokenized gold, 1 token ≈ 1 troy oz, trades 24/7)
Fallback: Yahoo Finance chart — GC=F (COMEX gold futures)
No API keys. No cost.
"""
from __future__ import annotations

import time
from datetime import datetime, timezone

import requests

BINANCE_TICKER = "https://api.binance.com/api/v3/ticker/24hr"
BINANCE_KLINES = "https://api.binance.com/api/v3/klines"
YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart/GC=F"

HEADERS = {"User-Agent": "GoldPulse/1.0 (free gold alert bot)"}
TIMEOUT = 8


class FeedError(RuntimeError):
    """Both data sources failed."""


def _get(url: str, params: dict | None = None) -> dict | list:
    resp = requests.get(url, params=params, headers=HEADERS, timeout=TIMEOUT)
    resp.raise_for_status()
    return resp.json()


def get_price() -> dict:
    """Return {'price', 'change_pct', 'source', 'ts'} — Binance first, Yahoo fallback."""
    try:
        j = _get(BINANCE_TICKER, {"symbol": "PAXGUSDT"})
        return {
            "price": float(j["lastPrice"]),
            "change_pct": float(j["priceChangePercent"]),
            "source": "Binance · PAXG/USDT (spot gold)",
            "ts": int(time.time()),
        }
    except Exception:
        pass
    try:
        j = _get(YAHOO_CHART, {"interval": "1m", "range": "1d"})
        meta = j["chart"]["result"][0]["meta"]
        price = meta.get("regularMarketPrice")
        prev = meta.get("chartPreviousClose") or meta.get("previousClose")
        if not price:
            raise FeedError("Yahoo returned no price")
        change = round((price - prev) / prev * 100, 2) if prev else None
        return {
            "price": float(price),
            "change_pct": change,
            "source": "Yahoo · GC=F (COMEX futures)",
            "ts": int(meta.get("regularMarketTime", time.time())),
        }
    except Exception as exc:
        raise FeedError(str(exc)) from exc


def get_hourly_closes(hours: int = 24) -> list[float]:
    """Hourly closes for the sparkline chart — Binance klines, Yahoo fallback."""
    try:
        j = _get(BINANCE_KLINES, {"symbol": "PAXGUSDT", "interval": "1h", "limit": hours})
        return [float(k[4]) for k in j]  # kline close price
    except Exception:
        pass
    j = _get(YAHOO_CHART, {"interval": "1h", "range": "5d"})
    closes = j["chart"]["result"][0]["indicators"]["quote"][0]["close"]
    closes = [c for c in closes if c is not None]
    if not closes:
        raise FeedError("no candle data")
    return closes[-hours:]


# Trading sessions in UTC (approximate, ignores DST shifts by design — keep it simple)
SESSIONS = [
    ("Sydney",   21, 6),
    ("Tokyo",    0, 9),
    ("London",   7, 16),
    ("New York", 12, 21),
]


def get_sessions(now: datetime | None = None) -> dict:
    """Which sessions are open right now + spread-risk assessment for gold scalpers."""
    now = now or datetime.now(timezone.utc)
    hour = now.hour + now.minute / 60
    open_now = []
    for name, start, end in SESSIONS:
        if start < end:
            is_open = start <= hour < end
        else:  # overnight window (Sydney)
            is_open = hour >= start or hour < end
        if is_open:
            open_now.append(name)

    london_ny_overlap = 12 <= hour < 16
    daily_break = 21 <= hour < 22  # COMEX daily close gap — thin liquidity

    if daily_break:
        risk, why = "🔴 HIGH", "Daily liquidity break (21–22 UTC) — spreads widen, stops get hunted."
    elif london_ny_overlap:
        risk, why = "🟢 LOW", "London × New York overlap — tightest spreads of the day."
    elif "London" in open_now or "New York" in open_now:
        risk, why = "🟡 MEDIUM", "One major session open — decent liquidity, moderate spreads."
    else:
        risk, why = "🔴 HIGH", "Only Asian sessions open — thin gold liquidity, wider spreads."

    return {
        "utc_now": now.strftime("%H:%M UTC"),
        "open": open_now,
        "risk": risk,
        "why": why,
        "sessions": [(n, f"{s:02d}:00–{e:02d}:00 UTC", n in open_now) for n, s, e in SESSIONS],
    }


SPARK_CHARS = "▁▂▃▄▅▆▇█"


def sparkline(closes: list[float]) -> str:
    """ASCII sparkline from a list of closes."""
    if not closes:
        return ""
    lo, hi = min(closes), max(closes)
    span = (hi - lo) or 1
    return "".join(SPARK_CHARS[min(int((c - lo) / span * (len(SPARK_CHARS) - 1)), len(SPARK_CHARS) - 1)] for c in closes)


if __name__ == "__main__":
    # Live smoke test: python data.py
    import sys
    sys.stdout.reconfigure(encoding="utf-8")  # Windows cp1252 consoles can't print ▁▂▃
    p = get_price()
    print(f"PRICE: ${p['price']:,.2f}  ({p['change_pct']}%)  via {p['source']}")
    closes = get_hourly_closes(24)
    print(f"24H:   {sparkline(closes)}  lo ${min(closes):,.0f} hi ${max(closes):,.0f}")
    s = get_sessions()
    print(f"SESS:  open={s['open']}  risk={s['risk']}  {s['why']}")
