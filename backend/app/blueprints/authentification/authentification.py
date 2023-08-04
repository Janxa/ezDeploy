from flask import (Blueprint,
                   request,
                   make_response,
                   current_app,
                   jsonify)
from operator import itemgetter
import secrets
from datetime import datetime
from .services import register_user,verify_password,login,generate_dated_token,hash_password,send_password_reset_email,refresh_account_validation_token,ValidateValidationToken,ValidatePasswordResetToken,send__confirmation_email
from flask_jwt_extended import (create_access_token,set_access_cookies)
from .errors import LoginError, TokenExpiredError,VerificationError
from app import flask_firestore as db
from hashlib import sha256
authentification=Blueprint('authentification',__name__, url_prefix="/api/authentification")

@authentification.route("/register",methods=['POST'])
def register():
    username,email,password=itemgetter('username','email','password')(request.get_json())
    try:
        register_user(username,email,password)
    except Exception as e:
        print(e)
        error = e.args[0]
        print(error)
        return make_response(jsonify({"error":error["message"]}),error["code"])
    return make_response(jsonify({'Success':'User successfully registered'}),200)




@authentification.route("/resend",methods=['POST'])
def resend():
    data=(request.get_json())
    print("data",data)
    if data.get("email"):
        user_doc=db.find_single_document("users","email",data.get("email"))
        user_id=user_doc["id"]
        user=user_doc["doc"]
    elif data.get("user_id"):
        user_id=data.get("user_id")
        user=db.get_document("users",user_id)
    else: make_response(jsonify({"error":"Something went wrong"}))
    try:
        token=generate_dated_token()
        refresh_account_validation_token(user_id,token)
        send__confirmation_email(user["username"],user["email"],token["token"])

    except Exception as e:
        error = e.args[0]
        return make_response(jsonify({"error":error["message"]}),error["code"])
    return make_response("New e-mail sent ",200)




@authentification.route("/verify/<token>",methods=["GET"])
def verify_user(token):
    try:
        validated_user = ValidateValidationToken(token)
    except TokenExpiredError as e:
        return make_response(jsonify({'error':str(e),"user_id":e.user_id}),401)

    except Exception as e:
        print(e)
        return make_response(jsonify({'error':"The verification code is incorrect."}),400)
    if validated_user == False:
        return make_response({"error":"Invalid token or email already validated, try to log in."},404)
    return make_response("Email successfully validated",200)

@authentification.route("/login",methods=['POST'])
def login_user():
    email,password=itemgetter('email','password')(request.get_json())
    try:
        user,user_id=login(email,password)
        if user.get('validated')==False:
            return make_response(jsonify({"error":"User not validated"}),403)
        csrf_token=secrets.token_hex(16)
        access_token = create_access_token(identity=user_id, additional_claims={'csrf':csrf_token})

    except LoginError as e :
        return make_response(jsonify({"error":"Wrong Email or Password"}),401)

    except Exception as e:
        print("error",e)
        return make_response(jsonify({"error":"Unexpected Error"}),500)
    print(user)
    response=make_response(jsonify({'username':user["username"]}),200)
    set_access_cookies(response,access_token)
    expiration_time=datetime.utcnow() + current_app.config['JWT_ACCESS_TOKEN_EXPIRES']
    response.set_cookie('csrf_access_token', value=csrf_token, httponly=False,expires=expiration_time)


    return response






@authentification.route("/password/resend",methods=['POST'])
def resend_password():
    email=itemgetter('email')(request.get_json())
    try:
        user_doc=db.find_single_document('users',"email",email)

        if user_doc:
            user_id=user_doc['id']
            user=user_doc['doc']
        else: return make_response("done",200)

        tokens=generate_dated_token()
        db.update_document('users',user_id,{"change_password_token":tokens["hashed_token"],"change_password_token_exp_date":tokens["expiration_date"]})
        send_password_reset_email(user['username'],user['email'],tokens['token'])

    except Exception as e :
        print(e)
        return make_response(jsonify({"error":"Something went wrong"}),401)

    return make_response("done",200)

@authentification.route("/password/reset/<token>",methods=['POST'])
def reset_password(token):
    password=itemgetter('password')(request.get_json())

    try:
        user_id=ValidatePasswordResetToken(token)
    except TokenExpiredError as e:
        return make_response(jsonify({'error':str(e),"user_id":e.user_id}),401)

    except Exception as e:
        print(e)
        return make_response(jsonify({'error':"Something went wrong,try again later."}),400)

    if not user_id:
        return make_response("Token not found",404)
    try:
        verify_password(password)
    except VerificationError as e:
        error=e.args[0]
        return make_response(error["message"],error["code"])
    except Exception as e:
        return make_response('Something went wrong',400)
    hashed_password=hash_password(password)

    db.update_document("users",user_id,{"hashed_password":hashed_password,"change_password_token_exp_date":db.delete_field(),"change_password_token":db.delete_field()})

    return make_response("done",200)