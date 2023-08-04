from flask import Blueprint,request,make_response,jsonify,abort,current_app
from flask_jwt_extended import jwt_required,get_jwt_identity
from app.config import Config
from app.extensions import flask_firestore as db
from .services import validate_all_files,create_error_json,extract_files_from_zip
from operator import itemgetter
from app.tasks.upload import upload_to_s3
from app.tasks.revoke import revoke_task
from app.tasks.delete import delete_from_s3
from app.extensions.aws_s3 import s3
from .errors import ErrorList
import base64

websites=Blueprint('websites',__name__, url_prefix="/api/websites")

@websites.route("/upload",methods=['POST'])
@jwt_required()
def uploading():
        user_id = get_jwt_identity()
        user_ref=db.get_document("users",user_id,True)
        if user_ref == None:
                return make_response({"error":"UserNotFound"},404)
        user_websites=user_ref.collection('websites')
        user_snapshot = user_ref.get()
        user_data = user_snapshot.to_dict()

        new_website_name = str(request.form["website_name"])

        if new_website_name==None or new_website_name=="":
                return make_response({"error":"Website name can't be empty"},422)
        if len(new_website_name)<4:
                return make_response({"error":"Website name too short"},422)

        count_query=user_websites.count()
        query_result=count_query.get()

        if query_result[0][0].value>=3:
                return make_response({"error":"Can not upload more than 3 websites"},422)




        zipfile = request.files['file']
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




        new_website=user_websites.document()
        new_website.set({"name":new_website_name})
        new_website_id=new_website.get().id
        user_is_premium=user_data.get('premium')
        print(new_website_id,user_is_premium)
        task = upload_to_s3.delay(user_id, new_website_id, new_website_name,encoded_files,user_is_premium)
        new_website.update({"task":task.id})
        return make_response({"task_id":task.id,"website_name":new_website_name},200)

@websites.route("/cancel",methods=['DELETE'])
@jwt_required()
def canceling():
        user_id = get_jwt_identity()

        if not request.is_json:
                abort(400, {"message":'Invalid request data: expected JSON',"error":"data is not json"})

        website_id = request.get_json()["website_id"]

        if not website_id:
                abort(400, {"message":'Missing website id',"error":"no website id"})

        if not isinstance(website_id,str):
                abort(400, {"message":'Id must be a string',"error":"website id is not a string"})

        user_ref=db.get_document("users",user_id,ref=True)
        website_doc=user_ref.collection("websites").document(website_id).get()
        if not website_doc.exists:
                abort(404, {"message":"Website does not exist or is already deleted","error":"Website not found"})

        website = website_doc.to_dict()
        website_id=website_doc.id
        bucket =  s3.Bucket(Config.bucket_name)
        website_name=website["name"]
        revoke_task(website['task'],website_id,website_name,user_id)

        return make_response({"website_id":website_id,"website_name":website_name},200)


@websites.route("/delete",methods=['DELETE'])
@jwt_required()
def deleting():

        if not request.is_json:
                abort(400, {"message":'Invalid request data: expected JSON',"error":"data is not json"})
        data = request.get_json()

        if "website_id" not in data:
                abort(400, {"message":'Missing website id',"error":"no website id"})

        if not isinstance(data["website_id"],str):
                abort(400, {"message":'Id must be a string',"error":"website id is not a string"})

        user_id = get_jwt_identity()
        user_ref=db.get_document("users",user_id,ref=True)
        website_id = request.get_json()["website_id"]
        website_doc=user_ref.collection("websites").document(website_id).get()
        website = website_doc.to_dict()
        website_id=website_doc.id
        bucket =  s3.Bucket(Config.bucket_name)


        delete_from_s3.delay(user_id,website["name"],website_id,delete_from_db=True)

        return make_response(f"{website['name']} deleted",200)


@websites.route("/show",methods=['GET'])
@jwt_required()
def show():
        user_id = get_jwt_identity()
        user_ref=db.get_document("users",user_id,ref=True)
        user_websites_snapshot=user_ref.collection("websites").get()
        websites=[]
        for user_website_doc in user_websites_snapshot:
                # Get the data from the DocumentSnapshot for each individual document
                user_website_data = user_website_doc.to_dict()
                user_website_data['id']=user_website_doc.id
                websites.append(user_website_data,)
                # Now you can work with the data in the 'user_website_data' dictionary
                print(user_website_data)
        return make_response(jsonify(websites),200)

@websites.route("/getById/<website_id>",methods=['GET'])
@jwt_required()
def getById(website_id):
        user_id = get_jwt_identity()
        user_ref=db.get_document("users",user_id,True)
        if user_ref == None:
                return make_response({"error":"UserNotFound"},404)
        website=user_ref.collection('websites').document(website_id).get().to_dict()

        return make_response(jsonify(website),200)








