# 💼 PropRank — ScoutOps Product #1

Telegram bot + web dashboard for comparing proprietary trading firms.

## Commands (Telegram)

| Command | Description |
|---|---|
| `/start` | Welcome + command list |
| `/top` | Top 5 ranked prop firms |
| `/firm NAME` | Detailed firm card |
| `/search TEXT` | Search firms |
| `/compare A vs B` | Side-by-side comparison |

## Web dashboard

- `/scoutops/proprank` — directory with filters
- `/scoutops/proprank/firm/<slug>` — firm detail page
- `/scoutops/proprank/search?q=...` — search

## Tech stack

- Flask + Jinja2
- SQLAlchemy + PostgreSQL (Railway) / SQLite (local)
- python-telegram-bot
- Shared `shared/` backend utilities

## Monetization

- Prop-firm affiliate CPA links
- Sponsored listings
- Web ads once traffic grows

---
*Not financial advice. Verify firm rules and regulatory status before funding.*
