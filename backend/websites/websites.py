from flask import Blueprint,request,make_response,jsonify,abort
from flask_jwt_extended import jwt_required,get_jwt_identity
from ..config import Config
from .services import validate_all_files,create_error_json,extract_files_from_zip
from operator import itemgetter
from ..database.database import UpdateWebsiteTask,FindUser, CreateWebsite, GetAllWebsites,FindWebsiteById,UpdateWebsiteCancelled, DeleteWebsiteById
from ..database.errors import UserNotFoundError
from ..tasks.upload import upload_to_s3
from ..tasks.revoke import revoke_task
from ..tasks.delete import delete_from_s3
from backend.extensions.aws_s3 import s3
from .errors import ErrorList
import base64

websites=Blueprint('websites',__name__, url_prefix="/api/websites")

@websites.route("/upload",methods=['POST'])
@jwt_required()
def uploading():
        user_id = get_jwt_identity()

        try:
                user=FindUser(user_id=user_id)
        except UserNotFoundError as e:
                err=str(e)
                return make_response({"error":err},404)
        name = str(request.form["website_name"])
        if name==None or name=="":
                return make_response({"error":"Website name can't be empty"},422)
        if len(name)<4:
                return make_response({"error":"Website name too short"},422)
        zipfile = request.files['file']
        print(zipfile, type(zipfile))
        files=extract_files_from_zip(zipfile)
        try: validate_all_files(files)
        except ErrorList as errors:
                error_json=create_error_json(errors.get_list())
                return make_response(error_json,422)
        encoded_files = []
        for f in files:
                file_content = base64.b64encode(f.read()).decode('utf-8')
                filename = f.filename
                content_type = f.content_type

                encoded_files.append({
                        'filename': filename,
                        'file_content': file_content,
                        'content_type': content_type
                })

        website=CreateWebsite(user_id,name)
        print("website created in db", website.name)
        print(f"User {user.username} is {'not ' if not user.premium else ''}premium")
        task = upload_to_s3.delay(user_id, name, encoded_files,user.premium)
        print("task created", task.id)

        UpdateWebsiteTask(website,task.id)
        print("task",task.id, "added to ",website.name,"'s task_id column")
        return make_response({"task_id":task.id,"website_name":name},200)

@websites.route("/cancel",methods=['DELETE'])
@jwt_required()
def canceling():
        user_id = get_jwt_identity()

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
        website_name=website.name
        website.cancelled = True
        try:
                UpdateWebsiteCancelled(website_id)
        except Exception as e:
                error=str(e)
                abort(404, {"message":"Website Already Cancelled","error":error})
        revoke_task(website.task,website_id,website_name,user_id)
        return make_response({"website_id":website_id,"website_name":website_name},200)


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

        website = FindWebsiteById(website_id)

        delete_from_s3.delay(user_id,website.name,website.id,delete_from_db=True)

        return make_response(f"{website.name} deleted",200)


@websites.route("/show",methods=['GET'])
@jwt_required()
def show():
        user_id = get_jwt_identity()
        websites=GetAllWebsites(user_id)
        return make_response(jsonify(websites),200)

@websites.route("/getById/<website_id>",methods=['GET'])
@jwt_required()
def getById(website_id):
        website=FindWebsiteById(website_id)
        website=website.as_dict()

        return make_response(jsonify(website),200)








