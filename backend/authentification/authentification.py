from flask import (Blueprint,
                   request,
                   make_response,
                   current_app,
                   jsonify)
from operator import itemgetter
import secrets
from datetime import datetime
from backend.database.database import ValidateToken, FindUser
from .services import register_user,login,generate_email_validation_token
from flask_jwt_extended import (create_access_token,set_access_cookies)
from .errors import LoginError
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
    email=itemgetter('email')(request.get_json())
    print(email)
    user=FindUser(email=email)
    try:
        generate_email_validation_token(user)
    except Exception as e:
        error = e.args[0]
        return make_response(jsonify({"error":error["message"]}),error["code"])
    return make_response("New e-mail sent ",200)

@authentification.route("/verify/<token>",methods=["GET"])
def verify_user(token):
    try:
        user = ValidateToken(token)
    except Exception as e:
        print(e)
        return make_response(jsonify({'Error':"The verification code is incorrect."}),400)
    if user == False:
        return make_response("Email has already been validated",200)
    return make_response("Email successfully validated",200)

@authentification.route("/login",methods=['POST'])
def login_user():
    email,password=itemgetter('email','password')(request.get_json())
    try:
        user=login(email,password)
        print(user)
        if user.validated==False:
            return make_response(jsonify({"error":"user not validated"}),401)
        csrf_token=secrets.token_hex(16)
        access_token = create_access_token(identity=user.id, additional_claims={'csrf':csrf_token})

    except LoginError as e :
        return make_response(jsonify({"error":"Wrong Email or Password"}),401)

    except Exception as e:
        print("error",e)
        return make_response(jsonify({"error":"Unexpected Error"}),500)

    response=make_response(jsonify({'username':user.username}),200)
    set_access_cookies(response,access_token)
    expiration_time=datetime.utcnow() + current_app.config['JWT_ACCESS_TOKEN_EXPIRES']
    response.set_cookie('csrf_access_token', value=csrf_token, httponly=False,expires=expiration_time)


    return response





