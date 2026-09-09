"""Tiny JSON persistence for price alerts — atomic writes, zero dependencies."""
from __future__ import annotations

import json
import os
import threading
import time

from config import DATA_DIR, MAX_ALERTS_PER_USER

_LOCK = threading.Lock()
_FILE = os.path.join(DATA_DIR, "alerts.json")


def _load() -> dict:
    if not os.path.exists(_FILE):
        return {"alerts": []}
    try:
        with open(_FILE, "r", encoding="utf-8") as fh:
            data = json.load(fh)
            data.setdefault("alerts", [])
            return data
    except (json.JSONDecodeError, OSError):
        return {"alerts": []}


def _save(data: dict) -> None:
    os.makedirs(DATA_DIR, exist_ok=True)
    tmp = _FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=1)
    os.replace(tmp, _FILE)  # atomic on POSIX and Windows


def add_alert(chat_id: int, direction: str, price: float) -> tuple[bool, str]:
    """Add an alert. Returns (ok, message)."""
    with _LOCK:
        data = _load()
        mine = [a for a in data["alerts"] if a["chat_id"] == chat_id]
        if len(mine) >= MAX_ALERTS_PER_USER:
            return False, f"Limit reached ({MAX_ALERTS_PER_USER} alerts). /clear some first."
        data["alerts"].append({
            "chat_id": chat_id,
            "direction": direction,
            "price": price,
            "created": int(time.time()),
        })
        _save(data)
        return True, f"Alert set: gold {direction} ${price:,.2f} 🔔"


def list_alerts(chat_id: int) -> list[dict]:
    with _LOCK:
        return [a for a in _load()["alerts"] if a["chat_id"] == chat_id]


def clear_alerts(chat_id: int) -> int:
    """Remove all alerts for a chat. Returns count removed."""
    with _LOCK:
        data = _load()
        before = len(data["alerts"])
        data["alerts"] = [a for a in data["alerts"] if a["chat_id"] != chat_id]
        _save(data)
        return before - len(data["alerts"])


def pop_triggered(current_price: float) -> list[dict]:
    """Return and remove every alert triggered at current_price."""
    with _LOCK:
        data = _load()
        triggered, keep = [], []
        for a in data["alerts"]:
            hit = (a["direction"] == "above" and current_price >= a["price"]) or \
                  (a["direction"] == "below" and current_price <= a["price"])
            (triggered if hit else keep).append(a)
        if triggered:
            data["alerts"] = keep
            _save(data)
        return triggered
