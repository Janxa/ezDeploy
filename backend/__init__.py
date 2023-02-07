from flask import Flask
from backend.websites import websites
from backend.extensions import s3,mail
from backend.authentification import authentification
from flask_jwt_extended import JWTManager
from .settings import sqlAlchemy_config,JWT_Config,FLask_Mail_Config
from .database.create_db import create_db
from .models import db


def create_app():
    app = Flask(__name__)

    create_db()
    jwt = JWTManager(app)
    app.config.from_object(JWT_Config)
    app.config.from_object(sqlAlchemy_config)
    app.config.from_object(FLask_Mail_Config)
    db.init_app(app)
    mail.init_app(app)
    with app.app_context():
     db.create_all()

    app.register_blueprint(websites)
    app.register_blueprint(authentification)


    if app.debug:
        @app.route("/")
        def hello_world():

                return (f""" <html>
                            <head>
                            <title></title>
                            </head>
                            <body>
                            <form action="/upload/" method="post" enctype="multipart/form-data">
                            Type Folder Name:<input type="text" name="foldername" /><br/><br/>
                            Select Folder to Upload: <input type="file" name="files" id="files" multiple directory="" webkitdirectory="" moxdirectory="" /><br/><br/>
                            <input type="Submit" value="Upload" name="upload" />
                            </form>
                            </body>
                            </html>""")

    # @app.before_request
    # def before_request():
    #     db.session.rollback()
    #     db.create_scoped_session()
    # @app.teardown_request
    # def shutdown_session(exception=None):
    #     db.session.remove()

    return app
