from flask import (Blueprint,
                   request,
                   make_response,
                   jsonify)
from operator import itemgetter
import secrets
from backend.authentification.errors import UserNotFoundError,VerificationError
from backend.database.database import ValidateToken, FindUser
from .services import register_user,login,generate_email_validation_token
from flask_jwt_extended import (create_access_token,
                                jwt_required,
                                set_access_cookies)


authentification=Blueprint('authentification',__name__, url_prefix="/api/authentification")

@authentification.route("/register",methods=['POST'])
def register():
    username,email,password=itemgetter('username','email','password')(request.get_json())
    try:
        register_user(username,email,password)
    except Exception as e:
        error = e.args[0]
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
        return make_response(jsonify({'Error':"The verification code is incorrect."}),401)
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

    except UserNotFoundError as e :
        return make_response(jsonify({"error":"Wrong Email or Password"}),401)
    except VerificationError as e:
        return make_response(jsonify({"error":"Wrong Email or Password"}),401)
    except Exception as e:
        print("error",e)
        return make_response(jsonify({"error":"Unexpected Error"}),500)

    response=make_response(jsonify({'username':user.username}),200)
    set_access_cookies(response,access_token)
    response.set_cookie('csrf_access_token', value=csrf_token,httponly=False)
    return response
