from flask import Flask,g
from backend.upload import upload
from backend.extensions import s3
from backend.authentification import authentification
from flask_sqlalchemy import SQLAlchemy

def create_app():
    app = Flask(__name__)
    db = SQLAlchemy()
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://maxime:booster54310@localhost:3306/ezdeploy_db"
    db.init_app(app)
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
    #     g.connection=app.db.connect()
    # @app.teardown_request
    # def teardown_request(exception):
    #     app.db.close(g.connection)

    return app
