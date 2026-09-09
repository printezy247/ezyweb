"""PropRank smoke tests."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))

os.environ.setdefault("DATABASE_URL", "sqlite:///./test_proprank.db")

from suites.scoutops.proprank.seed import seed
from suites.scoutops.proprank.services import get_firm, list_firms, search_firms
from suites.scoutops.proprank.web import create_app


def test_seed_and_list():
    count = seed()
    assert count >= 0
    firms = list_firms()
    assert len(firms) >= 1


def test_get_firm():
    firm = get_firm("ftmo")
    assert firm is not None
    assert firm.name == "FTMO"


def test_search():
    results = search_firms("funded")
    assert len(results) >= 1


def test_web_index():
    app = create_app()
    with app.test_client() as client:
        r = client.get("/scoutops/proprank/")
        assert r.status_code == 200
        assert b"PropRank" in r.data


def test_web_detail():
    app = create_app()
    with app.test_client() as client:
        r = client.get("/scoutops/proprank/firm/ftmo")
        assert r.status_code == 200
        assert b"FTMO" in r.data


def test_web_not_found():
    app = create_app()
    with app.test_client() as client:
        r = client.get("/scoutops/proprank/firm/not-a-firm")
        assert r.status_code == 404
