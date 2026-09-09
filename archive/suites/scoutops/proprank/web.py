"""PropRank web dashboard."""
import os

from flask import Blueprint, render_template, request

from shared.config import Config
from shared.db import init_db
from suites.scoutops.proprank.services import format_firm_card, get_firm, list_firms, search_firms

bp = Blueprint(
    "proprank",
    __name__,
    template_folder=os.path.join(os.path.dirname(__file__), "templates", "proprank"),
    static_folder=os.path.join(os.path.dirname(__file__), "static"),
    url_prefix="/scoutops/proprank",
)


def _ensure_db() -> None:
    init_db()


@bp.route("/")
def index():
    _ensure_db()
    filters = {}
    if request.args.get("max_fee"):
        try:
            filters["max_fee"] = int(request.args.get("max_fee"))
        except ValueError:
            pass
    if request.args.get("allows_ea") == "1":
        filters["allows_ea"] = True
    if request.args.get("allows_news") == "1":
        filters["allows_news"] = True

    firms = list_firms(filters)
    return render_template(
        "index.html",
        firms=firms,
        filters=request.args,
        affiliate_url=Config.PROPRANK_AFFILIATE_URL,
        affiliate_label=Config.PROPRANK_AFFILIATE_LABEL,
    )


@bp.route("/firm/<slug>")
def detail(slug):
    _ensure_db()
    firm = get_firm(slug)
    if not firm:
        return render_template("detail.html", not_found=True, slug=slug), 404
    return render_template("detail.html", firm=firm.to_dict(), card=format_firm_card(firm))


@bp.route("/search")
def search():
    _ensure_db()
    q = request.args.get("q", "").strip()
    firms = search_firms(q) if q else []
    return render_template("index.html", firms=firms, search_query=q)


def create_app():
    """Factory used by Railway / gunicorn."""
    from shared.web import create_app as base_create_app

    app = base_create_app(
        name="proprank",
        template_folders=[os.path.join(os.path.dirname(__file__), "templates")],
        static_folder=os.path.join(os.path.dirname(__file__), "static"),
    )
    app.register_blueprint(bp)
    return app
