from flask import Blueprint,request,make_response
from flask_jwt_extended import jwt_required
from ..settings import aws_config
from backend.extensions.aws_s3 import s3
from .services import validate_all_files,create_error_json
import io
from backend.errors import ErrorList
upload=Blueprint('upload',__name__, url_prefix="/upload")

@upload.route("/",methods=['POST'])
@jwt_required()
def uploading():
        bucket_name=aws_config.bucket_name

        files=request.files
        index = None
        try: validate_all_files(files)
        except ErrorList as errors:
                error_json=create_error_json(errors.get_list())
                return make_response(error_json,400)
        for file in files.getlist("files"):
                print('\n',file.filename.rsplit("/")[-1])
                if file.filename.rsplit("/")[-1] == "index.html":
                        print('index found')
                        index=f"https://{bucket_name}.s3.amazonaws.com/{file.filename}"
                file_bytes = file.read()
                file_like_object = io.BytesIO(file_bytes)
                s3.Bucket(bucket_name).upload_fileobj(file_like_object, file.filename, ExtraArgs={'ContentType': file.content_type})
        return make_response(index,200)

