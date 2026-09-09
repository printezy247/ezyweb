"""Shared Telegram bot utilities."""
from __future__ import annotations

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.constants import ParseMode
from telegram.ext import ContextTypes


def build_menu(buttons: list[list[InlineKeyboardButton]]) -> InlineKeyboardMarkup:
    """Build an inline keyboard from a 2D list of buttons."""
    return InlineKeyboardMarkup(buttons)


def affiliate_row(url: str, label: str) -> list[InlineKeyboardButton]:
    """Standard affiliate CTA button row."""
    return [InlineKeyboardButton(label, url=url)]


async def reply_html(update: Update, text: str, reply_markup: InlineKeyboardMarkup | None = None) -> None:
    """Reply to a message with HTML formatting."""
    await update.message.reply_html(text, reply_markup=reply_markup, disable_web_page_preview=True)


async def edit_message(
    update: Update, text: str, reply_markup: InlineKeyboardMarkup | None = None
) -> None:
    """Edit the current callback query message."""
    await update.callback_query.edit_message_text(
        text, parse_mode=ParseMode.HTML, reply_markup=reply_markup, disable_web_page_preview=True
    )
