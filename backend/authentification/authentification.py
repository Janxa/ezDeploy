from flask import (Blueprint,
                   request,
                   make_response,
                   jsonify)
from operator import itemgetter
from backend.database.database import FindUser,ValidateToken
from .services import (hash_password,
                       CreateUser,
                       register_user,
                       login,
                       FindUser,
                       send__confirmation_email)
from flask_jwt_extended import (create_access_token,
                                jwt_required)


authentification=Blueprint('authentification',__name__, url_prefix="/authentification")

@authentification.route("/register",methods=['POST'])
def register():
    username,email,password=itemgetter('username','email','password')(request.get_json())
    try:
        register_user(username,email,password)
    except Exception as e:
        print(e)
        return make_response(jsonify({'Error':str(e)}),200)
    return make_response(jsonify({'Success':'User successfully registered'}),200)


@authentification.route("/verify/<token>",methods=["POST"])
def verify_user(token):
    try:
        ValidateToken(token)
    except Exception as e:
        print(e)
        return make_response(jsonify({'Error':"invalid token"}),401)
    return make_response(jsonify({"Success": "Email successfully valiated"}),200)

@authentification.route("/login",methods=['POST'])
def login_user():
    email,password=itemgetter('email','password')(request.get_json())
    try:
        user=login(email,password)
        print(user)
        access_token = create_access_token(identity=user)
    except Exception as e :
            print(e)
            return make_response(jsonify({"error":str(e)}),401)
    return  make_response(jsonify({'Success':"User authentified","jwt":access_token}),200)
