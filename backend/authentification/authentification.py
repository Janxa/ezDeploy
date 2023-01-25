from flask import Blueprint,request,make_response,jsonify,current_app,g
from operator import itemgetter
from .services import hash_password, CreateUser,login
authentification=Blueprint('authentification',__name__, url_prefix="/authentification")

@authentification.route("/register",methods=['POST'])
def register_user():
    name,email,password=itemgetter('name','email','password')(request.get_json())

    user = g.db.session.execute(db.select(User).where(User.email==f"{email}")).fetchone()
    if user == None:
        hashed_password= hash_password(password)
        CreateUser(name,email,hashed_password)
    #insert user in db
    return make_response(jsonify(f'{email},{password}'))

@authentification.route("/login",methods=['POST'])
def login_user():
    email,password=itemgetter('email','password')(request.get_json())
    try:
        login(email,password)
    except Exception as e :
            print(e)
            return make_response(jsonify({"error":"invalid password"}),401)
    return (password)