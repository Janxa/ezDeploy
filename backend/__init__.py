from flask import Flask
from backend.upload.upload import upload
from .extensions import s3

def create_app():
    app = Flask(__name__)
    app.register_blueprint(upload)

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

