from flask import (Blueprint,
                   request,
                   make_response,
                   jsonify)
from operator import itemgetter
from backend.authentification.errors import UserNotFoundError,VerificationError
from backend.database.database import ValidateToken
from .services import register_user,login
from flask_jwt_extended import (create_access_token,
                                jwt_required)


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


@authentification.route("/verify/<token>",methods=["GET"])
def verify_user(token):
    try:
        user = ValidateToken(token)
    except Exception as e:
        print(e)
        return make_response(jsonify({'Error':"invalid token"}),401)
    if user == False:
        return make_response(jsonify({"Error":"Email already validated"}))
    return make_response(jsonify({"Success": "Email successfully valiated"}),200)

@authentification.route("/login",methods=['POST'])
def login_user():
    email,password=itemgetter('email','password')(request.get_json())
    try:
        user=login(email,password)
        print(user)
        if user.validated==False:
            return make_response(jsonify({"Error":"Email has not been validated"}))
        access_token = create_access_token(identity=user.id)
    except UserNotFoundError as e :
        return make_response(jsonify({"error":"Wrong Email or Password"}),401)
    except VerificationError as e:
        return make_response(jsonify({"error":"Wrong Email or Password"}),401)
    except Exception as e:
        print("error",e)
        return make_response(jsonify({"error":"Unexpected Error"}),500)

    return  make_response(jsonify({'Success':"User authentified","jwt":access_token}),200)
