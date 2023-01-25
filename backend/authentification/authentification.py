from flask import Blueprint,request,make_response,jsonify
from operator import itemgetter
from .services import hash_password, CreateUser,login,FindUser
from flask_jwt_extended import create_access_token
authentification=Blueprint('authentification',__name__, url_prefix="/authentification")

@authentification.route("/register",methods=['POST'])
def register_user():
    name,email,password=itemgetter('name','email','password')(request.get_json())
    user = FindUser(email)
    if user:
        return make_response(jsonify({"error":"Email already used"},409))
    hashed_password= hash_password(password)
    CreateUser(name,email,hashed_password)
    return make_response(jsonify({'Success':'User successfully registered'}),200)

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
