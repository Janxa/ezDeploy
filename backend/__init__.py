from flask import Flask
from .settings import aws_config
import mimetypes
from .extensions import s3
from .services import file_is_valid
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
            contentType=False
            try: 
                file_is_valid(extension)
                contentType=mimetypes.types_map.get(extension.lower())      
            except: 
                print(name, "is invalid file type")

            if extension and contentType:
                print(f' \n uploadging :  {name}  |  {extension} --{contentType} \n')
                try: 
                    s3.Bucket('ezdeploy').upload_file(os.path.join(root, name),
                    os.path.join(root, name),  ExtraArgs={"ContentType": contentType,})
                    print(f"{'-'*10} {name} uploaded {'-'*10}")
                except BaseException as e: print(f"error when uploading {name}: \n {str(e)}")
    return os.path.abspath(__file__)