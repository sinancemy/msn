from flask_sqlalchemy import SQLAlchemy
import os

config_path = os.path.dirname(__file__)
data_db_uri = "sqlite:///" + config_path + "/data.db"

SQLALCHEMY_DATABASE_URI = data_db_uri
SQLALCHEMY_BINDS = {
    "data": data_db_uri,
}

def config_app_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_BINDS"] = SQLALCHEMY_BINDS
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy()