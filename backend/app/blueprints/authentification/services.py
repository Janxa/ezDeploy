from argon2 import PasswordHasher,exceptions
from flask_mail  import Message
from app import mail
from .errors import LoginError,UserNotFoundError
from app.extensions import flask_firestore as db
from flask import current_app,make_response
import re

ph = PasswordHasher()

def register_user(username,email,password,):

    user = db.get_document()
    if user:
        raise Exception({"message": "Email already used", "code": 409})
    pattern = re.compile("^[ a-zA-Z0-9!@#$%^&*()_+\-=\[\\]'\"{};:,.<>\/?]+$")
    if not pattern.match(password):
        raise Exception({"message": "Password contains forbidden characters", "code": 400})

    hashed_password = hash_password(password)
    user=db.CreateUser(username,email,hashed_password)
    generate_email_validation_token(user)

def generate_email_validation_token(user):
    if user.validated:
        raise Exception({"message": "Email already validated", "code": 409})
    token = db.GenerateVerificationToken(user)
    send__confirmation_email(user.username,user.email,token)


def hash_password(password):
    hash = ph.hash(password)
    try:
      ph.verify(hash, password)
    except: raise
    return hash

def login(email, password):
    try:
        user = db.find_single_document("user","email",email)
        if user == None:
            raise UserNotFoundError
        hash = user.password
        ph.verify(hash, password)
    except (UserNotFoundError , exceptions.VerifyMismatchError)  as e :
            raise LoginError()
    return user
    # if ph.check_needs_rehash(hash):
    #      db.set_password_hash_for_user(user, ph.hash(password))

def send__confirmation_email(username,email,token):
    print(token)
    try:
        msg = Message(sender=current_app.config["MAIL_DEFAULT_SENDER"],recipients = [email])
        msg.subject = "Confirmation email"
        msg.body = f"""Please Confirm Your Password Using This Link :
                        Link {token}"""
        mail.send(msg)
        return  make_response("Email Successfully Sent",200)
    except Exception as  error:
        return make_response(str(error),400)