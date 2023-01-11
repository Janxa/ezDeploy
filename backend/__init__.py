from flask import Flask
from .settings import aws_config
from .extensions import s3
import os
from pathlib import Path

app = Flask(__name__)
print(s3)
@app.route("/")
def hello_world():
    for bucket in s3.buckets.all():
     print(bucket.name)
    return ("hello world")

@app.route("/upload")
def uploading():
    currentDir=Path(__file__).parent
    print(currentDir)
    for root, dirs, files in os.walk("backend/simplestyle_4"):
        print(files,root,dirs)
        for name in files:
            extension=Path(name).suffix
            if extension=='.gif' or extension=='.png':
                contentType='image/'+extension[1:]
                print(contentType)
            elif extension=='.jpeg' or extension=='.jpg':
                contentType="image/jpeg"
            elif extension=='.svg':
                contentType="image/svg+xml"
            elif extension==".mp3":
                contentType="audio/mpeg"
            elif extension==".aac":
                contentType="audio/aac"
            elif extension==".avi":
                contentType="audio/aac"
            elif extension == ".css":
                contentType="text/css"
            elif extension==".csv":
                contentType="text/csv"
            elif extension==".html":
                contentType="text/html"
            elif extension==".js":
                contentType="text/javascript"
            elif extension==".txt":
                contentType="text/plain"
            elif extension==".xml":
                contentType="text/xml"
            elif extension==".mpeg":
                contentType="video/mpeg"
            elif extension==".mp4":
                contentType="video/mp4"
            elif extension==".mov":
                contentType="video/quicktime"    
            elif extension==".flv":
                contentType="video/x-flv"
                
            else: print("error unknown type")
            print(name,"----", extension,"-----", contentType)
            s3.Bucket('ezdeploy').upload_file(os.path.join(root, name),
              os.path.join(root, name),  ExtraArgs={"ContentType": contentType,})
          

    return os.path.abspath(__file__)