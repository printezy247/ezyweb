import os, json, threading, time, requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("TELEGRAM_TOKEN")
BASE_URL = f"https://api.telegram.org/bot{TOKEN}"

DATA_FILE = "alerts.json"


def load_alerts():
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except Exception:
        return []


def save_alerts(alerts):
    with open(DATA_FILE, "w") as f:
        json.dump(alerts, f)


def get_gold_price():
    # free, no‑key live price from gold‑api.com
    r = requests.get("https://api.gold-api.com/price/XAU", timeout=10)
    r.raise_for_status()
    return float(r.json()["price"])


def send_message(chat_id, text, parse_mode="Markdown"):
    payload = {"chat_id": chat_id, "text": text, "parse_mode": parse_mode}
    requests.post(f"{BASE_URL}/sendMessage", json=payload, timeout=10)


def handle_update(update):
    message = update.get("message", {})
    chat_id = message.get("chat_id")
    text = message.get("text", "").strip()

    if text == "/start":
        send_message(chat_id,
            "👋 Welcome to **GoldPulse Bot**!\n"
            "`/price` – get current XAUUSD\n"
            "`/setalert above|below <price>` – set a price trigger alert\n"
            "`/alerts` – list your alerts\n"
            "`/clear` – clear all alerts")
    elif text == "/price":
        price = get_gold_price()
        send_message(chat_id, f"🟡 **Current XAUUSD:** ${price:,.2f}\n*Source: gold‑api.com (free, live)*",
                     parse_mode="Markdown")
    elif text.startswith("/setalert "):
        parts = text.split()
        if len(parts) != 3:
            send_message(chat_id, "Usage: `/setalert above <price>` or `/setalert below <price>`")
            return
        direction, price_str = parts[1], parts[2]
        try:
            price_target = float(price_str)
        except ValueError:
            send_message(chat_id, "Price must be a number.")
            return
        if direction not in ("above", "below"):
            send_message(chat_id, "Direction must be 'above' or `below'`.")
            return
        alerts = load_alerts()
        alerts.append({"chat_id": chat_id, "direction": direction, "price": price_target,
                       "created": int(time.time())})
        save_alerts(alerts)
        send_message(chat_id, f"✅ Alert set: notify me when XAUUSD goes **{direction}** ${price_target:,.2f}")
    elif text == "/alerts":
        alerts = load_alerts()
        if not alerts:
            send_message(chat_id, "No active alerts.")
        else:
            lines = ["📋 Your alerts:"]
            for a in alerts:
                when = "above" if a["direction"] == "above" else "below"
                lines.append(f"• {when} ${a['price']:,.2f} (since {a['created']})")
            send_message(chat_id, "\n".join(lines))
    elif text == "/clear":
        save_alerts([])
        send_message(chat_id, "🗑️ All alerts cleared.")
    else:
        send_message(chat_id, "Unknown command. Use `/start` to see available commands.")


def poll_updates():
    offset = None
    while True:
        try:
            params = {"timeout": 30}
            if offset is not None:
                params["offset"] = offset
            resp = requests.get(f"{BASE_URL}/getUpdates", params=params, timeout=35)
            data = resp.json()
            if data.get("ok"):
                updates = data.get("result", [])
                for up in updates:
                    handle_update(up)
                    offset = up["update_id"] + 1
        except Exception as e:
            print("Poll error:", e)
        time.sleep(1)


if __name__ == "__main__":
    t = threading.Thread(target=poll_updates, daemon=True)
    t.start()
    # keep the process alive
    try:
        while True:
            time.sleep(60)
    except KeyboardInterrupt:
        pass