from flask import Flask
from app.extensions import s3,mail
from .middleware import check_csrf_token
from flask_jwt_extended import JWTManager
from .config import config
from celery import Celery
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from .extensions import db,celery_init_app
from celery import Celery, Task
from sqlalchemy.orm import scoped_session, sessionmaker



def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    celery = celery_init_app(app)
    migrate = Migrate(app, db)

    jwt = JWTManager(app)


    app.before_request(check_csrf_token)
    db.init_app(app)
    mail.init_app(app)

    with app.app_context():
        db.create_all()
        Session = sessionmaker(bind=db.engine,autoflush=True)
        app.extensions["Session"] = Session

    from app.stream import stream
    app.register_blueprint(stream)
    from app.websites import websites
    app.register_blueprint(websites)
    from app.authentification import authentification
    app.register_blueprint(authentification)




    return app
