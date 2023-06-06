from flask import Flask
from backend.extensions import s3,mail
from .middleware import check_csrf_token
from flask_jwt_extended import JWTManager
from .config import config
from celery import Celery
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from .extensions import db
from celery import Celery, Task
from sqlalchemy.orm import scoped_session, sessionmaker



def celery_init_app(app: Flask) -> Celery:
    class FlaskTask(Task):
        def __call__(self, *args: object, **kwargs: object) -> object:
            with app.app_context():
                return self.run(*args, **kwargs)

    celery_app = Celery(app.name, task_cls=FlaskTask)
    celery_app.config_from_object(app.config, namespace='CELERY')
    celery_app.set_default()
    app.extensions["celery"] = celery_app
    return celery_app


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

    from backend.stream import stream
    app.register_blueprint(stream)
    from backend.websites import websites
    app.register_blueprint(websites)
    from backend.authentification import authentification
    app.register_blueprint(authentification)




    return app
