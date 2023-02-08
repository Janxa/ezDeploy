from flask import Blueprint,request,make_response,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity
from ..settings import aws_config
from backend.extensions.aws_s3 import s3
from .services import validate_all_files,create_error_json
import io
from operator import itemgetter

from backend.errors import ErrorList
websites=Blueprint('websites',__name__, url_prefix="/websites")

@websites.route("/upload",methods=['POST'])
@jwt_required()
def uploading():
        user_id = get_jwt_identity()
        bucket_name=aws_config.bucket_name
        name = str(request.form["website_name"])
        print(user_id,name)
        files=request.files
        index = None
        try: validate_all_files(files)
        except ErrorList as errors:
                error_json=create_error_json(errors.get_list())
                return make_response(error_json,400)
        for file in files.getlist("files"):
                file.filename=f"{user_id}/{name}/{file.filename}"
                print('\n',file.filename.rsplit("/")[-1])
                if file.filename.rsplit("/")[-1] == "index.html":
                        print('index found')
                        index=f"https://{bucket_name}.s3.amazonaws.com/{file.filename}"
                file_bytes = file.read()
                file_like_object = io.BytesIO(file_bytes)
                s3.Bucket(bucket_name).upload_fileobj(file_like_object, file.filename, ExtraArgs={'ContentType': file.content_type})
        return make_response(index,200)

@websites.route("/delete",methods=['POST'])
@jwt_required()

def deleting():
        user_id = get_jwt_identity()
        bucket =  s3.Bucket(aws_config.bucket_name)
        website_name = str(request.form["website_name"])
        to_delete=f"{user_id}/{website_name}/"
        file_found=False
        for _ in  bucket.objects.filter(Prefix=to_delete):
                print("file_found")
                file_found=True
                break

        if not file_found:
                return make_response(jsonify({"error":"website does not exist"}),404)
        for file in bucket.objects.filter(Prefix=to_delete):
             print("\n deleting",file)
             file.delete()
        return make_response(website_name,200)

@websites.route("/show",methods=['POST'])
@jwt_required()

def show():
        user_id = get_jwt_identity()
        bucket =  s3.Bucket(aws_config.bucket_name)
        websites = {}
        file_found=False
        for _ in  bucket.objects.filter(Prefix=user_id):
                print("file_found")
                file_found=True
                break
        if not file_found:
                return make_response(jsonify({"error":"No websites found"}),404)
        for file in bucket.objects.filter(Prefix=user_id):
                id,website_name,file_name=file.key.split('/',3)
                if not website_name in websites:
                        websites[website_name]=[]
                        websites[website_name].append(file_name)
                else : websites[website_name].append(file_name)
                print(id,website_name,file_name)
        return make_response(jsonify(websites),200)






