from flask import Blueprint,request,make_response,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity
from ..settings import aws_config
from .services import validate_all_files,create_error_json,extract_files_from_zip
from operator import itemgetter
from ..tasks.upload import upload_to_s3
from backend.extensions.aws_s3 import s3
from backend.errors import ErrorList
import base64
websites=Blueprint('websites',__name__, url_prefix="/api/websites")

@websites.route("/upload",methods=['POST'])
@jwt_required()
def uploading():
        user_id = get_jwt_identity()

        name= str(request.form["website_name"])
        zipfile = request.files['file']
        print(zipfile, type(zipfile))
        files=extract_files_from_zip(zipfile)
        try: validate_all_files(files)
        except ErrorList as errors:
                error_json=create_error_json(errors.get_list())
                return make_response(error_json,400)
        decoded_files = []
        for f in files:
                  file_content = base64.b64encode(f.read()).decode('utf-8')
                  filename = f.filename
                  decoded_files.append({'filename': filename, 'file_content': file_content})
        task = upload_to_s3.delay(user_id, name, decoded_files)
        return make_response({"task_id":task.id,"website_name":name},200)

@websites.route("/delete",methods=['DELETE'])
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
                return make_response(jsonify("website does not exist"),404)
        for file in bucket.objects.filter(Prefix=to_delete):
             print("\n deleting",file)
             file.delete()
        return make_response(f"{website_name} deleted",200)

@websites.route("/show",methods=['GET'])
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
                return make_response('',204)
        for file in bucket.objects.filter(Prefix=user_id):
                print(file.key)
                print(file.key.split('/',1))
                id,full_file_name,=file.key.split('/',1)
                print(id,full_file_name)
                website_name,file_name=full_file_name.split('/',1)
                print(id,full_file_name, website_name,file_name)
                if not website_name in websites:
                        websites[website_name]=[]
                        websites[website_name].append(file_name)
                else : websites[website_name].append(file_name)
                print(id,website_name,file_name)
        print(websites)
        return make_response(jsonify(websites),200)






