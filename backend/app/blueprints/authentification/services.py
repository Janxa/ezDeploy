from argon2 import PasswordHasher,exceptions
from flask_mail  import Message
from app import mail
from .errors import LoginError,UserNotFoundError,VerificationError
from app import flask_firestore as db
from flask import current_app,make_response
import re
from hashlib import sha256
from secrets import token_urlsafe
from datetime import datetime,timedelta
from .errors import TokenExpiredError
from app.tasks.send_email import send_email
import pytz
ph = PasswordHasher()

def register_user(username,email,password,):

    user = db.find_single_document("users","email",email)
    if user:
        raise Exception({"message": "Email already used", "code": 409})
    try:
     verify_password(password)
    except Exception as e :
        raise e
    hashed_password = hash_password(password)
    validation_tokens = generate_dated_token()
    user={'username':username,
          "email":email,
          "hashed_password":hashed_password,
          "validated":False,
          "register_date":datetime.utcnow(),
          "validation_token":validation_tokens["hashed_token"],
          "validation_token_expiration":validation_tokens["expiration_date"]}
    db.add_document("users",user)
    send_confirmation_email(user["username"],user["email"],validation_tokens["token"])

def generate_dated_token():

    token = token_urlsafe(24)
    hashed_token = sha256(token.encode()).hexdigest()
    expiration_date = datetime.utcnow() + timedelta(hours=2)
    tokens={"token":token,"hashed_token":hashed_token,"expiration_date":expiration_date}
    return tokens

def refresh_account_validation_token(user_id,validation_tokens):
    user={"validation_token":validation_tokens["hashed_token"],
          "validation_token_expiration":validation_tokens["expiration_date"]}

    db.update_document("users",user_id,user)

def ValidateValidationToken(token):
    try:
        hashed_token = sha256(token.encode()).hexdigest()
        user_doc = db.find_single_document("users","validation_token",hashed_token)
        print(user_doc)
        if user_doc:
            user = user_doc['doc']
            user_id=user_doc['id']
            if user["validation_token_expiration"] < datetime.now(pytz.utc):
                raise TokenExpiredError("Token has expired.", user_id=user_id)
            db.update_document("users",user_id,{"validated":True,"validation_token":db.delete_field(),"validation_token_expiration":db.delete_field()})
        else: return False
    except Exception as e:
        print(e)
        raise e


def ValidatePasswordResetToken(token):
    try:
        hashed_token = sha256(token.encode()).hexdigest()
        user_doc = db.find_single_document("users","change_password_token",hashed_token)
        print(user_doc)
        if user_doc:
            user = user_doc['doc']
            user_id=user_doc['id']
            if user["change_password_token_exp_date"] < datetime.now(pytz.utc):
                raise TokenExpiredError("Token has expired.", user_id=user_id)
            return user_id
        else: return False
    except Exception as e:
        print(e)
        raise e


def send_confirmation_email(username,email,token):
    print(token)
    try:
        subject = "Confirmation email"
        body = f"""Hello {username}, please click this link to complete your registration:
                        Link {token}"""
        send_email.delay(subject=subject,body=body,email_adress=email)

        return  make_response("Email Successfully Sent",200)
    except Exception as  error:
        return make_response(str(error),400)

def send_password_reset_email(username,email,token):
    try:
        subject = "Password change request"
        body = f"""Hello {username}, please click this link to change your password:
                        Link {token}"""
        send_email.delay(subject=subject,body=body,email_adress=email)
        return  make_response("Email Successfully Sent",200)
    except Exception as  error:
        return make_response(str(error),400)

def hash_password(password):
    hash = ph.hash(password)
    try:
      ph.verify(hash, password)
    except: raise
    return hash

def verify_password(password):
    pattern = re.compile("^[ a-zA-Z0-9!@#$%^&*()_+\-=\[\\]'\"{};:,.<>\/?]+$")
    if not pattern.match(password):
        raise VerificationError({"message": "Password contains forbidden characters", "code": 400})

    if len(password)<8:
        raise VerificationError({"message": "Password too short", "code": 400})
    if len(password)>32:
        raise VerificationError({"message": "Password too long", "code": 400})

def login(email, password):
    try:
        user_doc = db.find_single_document("users","email",email)
        if user_doc == None:
            raise UserNotFoundError()
        user=user_doc['doc']
        user_id=user_doc['id']
        hashed_password = user.get("hashed_password")
        ph.verify(hashed_password, password)
    except (UserNotFoundError , exceptions.VerifyMismatchError):
            raise LoginError()
    return user,user_id
    # if ph.check_needs_rehash(hash):
    #      db.set_password_hash_for_user(user, ph.hash(password))