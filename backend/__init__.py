from flask import Flask
from backend.extensions import s3,mail
from .middleware import check_csrf_token
from flask_jwt_extended import JWTManager
from .config import config
from celery import Celery
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from .database.create_db import create_db
celery = Celery(__name__,backend=config.RESULT_BACKEND ,broker=config.REDIS_URL)
db = SQLAlchemy()



def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    celery.conf.update(app.config)
    migrate = Migrate(app, db)

    jwt = JWTManager(app)

    app.before_request(check_csrf_token)
    db.init_app(app)
    mail.init_app(app)
    with app.app_context():
        db.create_all()

    from backend.stream import stream
    app.register_blueprint(stream)
    from backend.websites import websites
    app.register_blueprint(websites)
    from backend.authentification import authentification
    app.register_blueprint(authentification)


    if app.debug:
        @app.route("/")
        def hello_world():

                return (f""" <html>
                            <head>
                            <title></title>
                            </head>
                            <body>
                            <form action="/websites/upload/" method="post" enctype="multipart/form-data">
                            Type Folder Name:<input type="text" name="foldername" /><br/><br/>
                            Select Folder to Upload: <input type="file" name="files" id="files" multiple directory="" webkitdirectory="" moxdirectory="" /><br/><br/>
                            <input type="Submit" value="Upload" name="upload" />
                            </form>
                            </body>
                            </html>""")


    return app
