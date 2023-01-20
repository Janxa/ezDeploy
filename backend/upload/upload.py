from flask import Blueprint,request,make_response,jsonify
from pathlib import Path
from backend.services import file_is_valid
import mimetypes
import os
from backend.extensions import s3
from backend.utils.validations import validate_all_files
import io
from werkzeug.utils import secure_filename
from backend.errors import UnsupportedExtensionError,ErrorList
upload=Blueprint('upload',__name__, url_prefix="/upload")

@upload.route("/",methods=['POST'])
def uploading():
        files=request.files

        try: validate_all_files(files)
        except ErrorList as errors:
                errorlist=errors.get_list()

        # for file in files.getlist("files"):

        #  print(file)
        #  file_bytes = file.read()
        #  file_like_object = io.BytesIO(file_bytes)
        #  s3.Bucket('ezdeploy').upload_fileobj(file_like_object, file.filename, ExtraArgs={'ContentType': file.content_type})
        return os.path.abspath(__file__)
