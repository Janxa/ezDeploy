from flask import Blueprint,request,make_response,jsonify,abort
from flask_jwt_extended import jwt_required,get_jwt_identity
from ..config import Config
from .services import validate_all_files,create_error_json,extract_files_from_zip
from operator import itemgetter
from ..database.database import CreateWebsite, GetAllWebsites,FindWebsiteById, DeleteWebsiteById
from ..tasks.upload import upload_to_s3
from backend.extensions.aws_s3 import s3
from backend.errors import ErrorList
import base64
websites=Blueprint('websites',__name__, url_prefix="/api/websites")

@websites.route("/upload",methods=['POST'])
@jwt_required()
def uploading():
        user_id = get_jwt_identity()

        name = str(request.form["website_name"])
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
        CreateWebsite(user_id,name,task.id)
        return make_response({"task_id":task.id,"website_name":name},200)

@websites.route("/delete",methods=['DELETE'])
@jwt_required()

def deleting():
        user_id = get_jwt_identity()
        bucket =  s3.Bucket(Config.bucket_name)

        if not request.is_json:
                abort(400, {"message":'Invalid request data: expected JSON',"error":"data is not json"})
        data = request.get_json()

        if "website_id" not in data:
                abort(400, {"message":'Missing website id',"error":"no website id"})

        if not isinstance(data["website_id"],str):
                abort(400, {"message":'Id must be a string',"error":"website id is not a string"})
        website_id = request.get_json()["website_id"]

        try:
                website = FindWebsiteById(website_id)

        except Exception as e:
                error=str(e)
                abort(404, {"message":"Website does not exist or is already deleted","error":error})

        to_delete=f"{user_id}/{website.name}/"
        file_found=False

        try:
                for _ in  bucket.objects.filter(Prefix=to_delete):
                        print("file_found")
                        file_found=True
                        break
        except:
                abort(400,{"message":"Error while searching for the website","error":error})
        if not file_found:

                DeleteWebsiteById(website_id)
                abort(404, {"message": "Website has already been deleted"})
        try:
                for file in bucket.objects.filter(Prefix=to_delete):
                        print("\n deleting",file)
                        file.delete()
        except Exception as e :
                error=str(e)
                abort(400,{"message":"Error while deleting website from the server","error":error})
        try:
                DeleteWebsiteById(website_id)
        except Exception as e:
                error=str(e)
                abort(400,{"message":"Can't delete website from db error", "error":error})
        return make_response(f"{website.name} deleted",200)


@websites.route("/show",methods=['GET'])
@jwt_required()
def show():
        user_id = get_jwt_identity()
        websites=GetAllWebsites(user_id)
        # bucket =  s3.Bucket(aws_config.bucket_name)
        # websites = {}
        # file_found=False
        # for _ in  bucket.objects.filter(Prefix=user_id):
        #         print("file_found")
        #         file_found=True
        #         break
        # if not file_found:
        #         return make_response('',204)
        # for file in bucket.objects.filter(Prefix=user_id):
        #         print(file.key)
        #         print(file.key.split('/',1))
        #         id,full_file_name,=file.key.split('/',1)
        #         print(id,full_file_name)
        #         website_name,file_name=full_file_name.split('/',1)
        #         print(id,full_file_name, website_name,file_name)
        #         if not website_name in websites:
        #                 websites[website_name]=[]
        #                 websites[website_name].append(file_name)
        #         else : websites[website_name].append(file_name)
        #         print(id,website_name,file_name)
        return make_response(jsonify(websites),200)

@websites.route("/getById/<website_id>",methods=['GET'])
@jwt_required()
def getById(website_id):
        website=FindWebsiteById(website_id)
        website=website.as_dict()

        return make_response(jsonify(website),200)








