from flask import Flask
from backend.upload import upload
from backend.extensions import s3
from backend.authentification import authentification
def create_app():
    app = Flask(__name__)
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


    return app