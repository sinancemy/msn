
import os

from flask import Flask, send_from_directory
from flask_cors import CORS

from ..data.database import config_app_db, db

NPM_OUT = "..//web/out"

def create_app():
    app = Flask(__name__, static_folder=NPM_OUT, static_url_path="/static")
    app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)
    app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
    CORS(app)
    config_app_db(app)

    @app.route("/app")
    @app.route("/app/")
    @app.route("/app/<page>")
    def web_app(page: str = "index"):
        page += ".html"
        return send_from_directory(NPM_OUT, page)

    db.init_app(app)
    with app.app_context():
        db.create_all()
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)