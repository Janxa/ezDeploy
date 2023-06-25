from flask import Flask
from .middleware import check_csrf_token
from flask_jwt_extended import JWTManager
from .config import config
from celery import Celery
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from .extensions import flask_firestore,celery_init_app,mail
from celery import Celery, Task
from sqlalchemy.orm import scoped_session, sessionmaker


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    celery = celery_init_app(app)
    jwt = JWTManager(app)
    firestore_client=flask_firestore.init_firestore(app)
    mail.init_app(app)


    app.before_request(check_csrf_token)
    from app.blueprints.stream import stream
    app.register_blueprint(stream)
    from app.blueprints.websites import websites
    app.register_blueprint(websites)
    from app.blueprints.authentification import authentification
    app.register_blueprint(authentification)




    return app
