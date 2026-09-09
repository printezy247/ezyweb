"""Smoke tests for GoldPulse data and store layers.

Run with: pytest tests/test_goldpulse.py -q
"""
import os
import sys
import tempfile

# Make the app package importable from the tests folder
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import data
import store


def test_get_price_returns_shape():
    p = data.get_price()
    assert isinstance(p["price"], float)
    assert p["price"] > 1000  # gold is never this cheap
    assert "change_pct" in p
    assert "source" in p
    assert "ts" in p


def test_get_hourly_closes():
    closes = data.get_hourly_closes(24)
    assert len(closes) == 24
    assert all(isinstance(c, float) for c in closes)


def test_sparkline():
    chars = data.sparkline([1, 2, 3, 4, 5])
    assert len(chars) == 5
    assert all(c in data.SPARK_CHARS for c in chars)


def test_sessions():
    s = data.get_sessions()
    assert "risk" in s
    assert "open" in s
    assert len(s["sessions"]) == 4


def test_alert_store():
    with tempfile.TemporaryDirectory() as tmp:
        # Override the data file location for an isolated test
        original_file = store._FILE
        store._FILE = os.path.join(tmp, "alerts.json")
        try:
            chat_id = 999999
            ok, msg = store.add_alert(chat_id, "above", 5000)
            assert ok is True
            assert "Alert set" in msg
            alerts = store.list_alerts(chat_id)
            assert len(alerts) == 1

            triggered = store.pop_triggered(5100)
            assert len(triggered) == 1
            assert triggered[0]["chat_id"] == chat_id
            assert len(store.list_alerts(chat_id)) == 0

            assert store.clear_alerts(chat_id) == 0
        finally:
            store._FILE = original_file
