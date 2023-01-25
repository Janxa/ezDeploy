from flask import Flask,g
from backend.upload import upload
from backend.extensions import s3
from backend.authentification import authentification
from .settings import sqlAlchemy_config
from .create_db import create_db
from .models import db


def create_app():
    app = Flask(__name__)
    create_db()
    app.config["SQLALCHEMY_DATABASE_URI"] = sqlAlchemy_config.SQLALCHEMY_DATABASE_URI
    db.init_app(app)
    with app.app_context():
     db.create_all()

    app.register_blueprint(upload)
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
