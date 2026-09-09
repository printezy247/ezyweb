"""Shared Flask app factory."""
import os

from flask import Flask
from jinja2 import FileSystemLoader

from shared.config import Config
from shared.db import db_session


def create_app(
    name: str = "ezyweb",
    template_folders: list[str] | None = None,
    static_folder: str | None = None,
) -> Flask:
    """Create a Flask app with shared config, teardown, and optional template folders.

    Args:
        name: Flask app name.
        template_folders: Additional template folders (shared/templates is always included).
        static_folder: Override static folder path.
    """
    shared_dir = os.path.dirname(os.path.abspath(__file__))
    default_static = os.path.join(shared_dir, "static")

    app = Flask(name, static_folder=static_folder or default_static)
    app.config.from_object(Config)

    # Always include shared templates, plus any product-specific folders
    folders = [os.path.join(shared_dir, "templates")]
    if template_folders:
        folders.extend(template_folders)
    app.jinja_loader = FileSystemLoader(folders)

    @app.teardown_appcontext
    def remove_db_session(exception=None) -> None:
        db_session.remove()

    return app
