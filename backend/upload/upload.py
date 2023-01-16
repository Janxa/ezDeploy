from flask import Blueprint,request
from pathlib import Path
from backend.services import file_is_valid
import mimetypes
import os
from backend.extensions import s3 
import pathlib 
import io
upload=Blueprint('upload',__name__, url_prefix="/upload")

@upload.route("/",methods=['POST'])
def uploading():
    files=request.files
    for file in files.getlist("files"):
        print(file)
        file_bytes = file.read()
        file_like_object = io.BytesIO(file_bytes)
        s3.Bucket('ezdeploy').upload_fileobj(file_like_object, filename)
    return os.path.abspath(__file__)
   