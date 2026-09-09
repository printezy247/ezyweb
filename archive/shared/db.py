"""Shared SQLAlchemy database setup.

Works with PostgreSQL on Railway and SQLite for local dev.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, scoped_session, sessionmaker

from shared.config import Config

engine = create_engine(
    Config.SQLALCHEMY_DATABASE_URI,
    connect_args={} if "postgresql" in Config.SQLALCHEMY_DATABASE_URI else {"check_same_thread": False},
    pool_pre_ping=True,
)

db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()


def init_db() -> None:
    """Create all tables. Safe to call multiple times."""
    Base.metadata.create_all(bind=engine)


def shutdown_db() -> None:
    db_session.remove()
