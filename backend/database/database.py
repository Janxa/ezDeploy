from ..models import db,User,VerificationToken
import secrets
import hashlib
from datetime import datetime,timedelta
import os
import base64



def FindUser(email):
    user = User.query.filter_by(email=email).first()
    return user

def UserHasToken(user):
    token = VerificationToken.query.filter_by(user=user).first()
    print(token)
    return token

def DeleteToken(token):
    try:
        print('deleting',token)
        db.session.delete(token)
        db.session.commit()
    except Exception as e:
        raise e

def ValidateToken(token):
    try:
        hashed_token = hashlib.sha256(token.encode()).hexdigest()
        token = VerificationToken.query.filter_by(token=hashed_token).first()
        user=token.user
        if user.validated == False:
            user.validated=True
            db.session.commit()
        else: return False
    except Exception as e:
        raise e
    return user


def CreateUser(username,email,password):
    while True:
        user_id=generate_id()
        user= User.query.filter_by(id=user_id).first()
        if not user:
            break
    try:
        user=User(username=username,email=email,password=password,id=user_id)
        db.session.add(user)
        db.session.commit()

    except Exception as e:
        raise e

    return user

def generate_id():
    random_bytes = os.urandom(6)
    return base64.urlsafe_b64encode(random_bytes).rstrip(b'=').decode('utf-8')


def GenerateVerificationToken(user):
    if not user:
        return None
    token=UserHasToken(user)
    if token !=None:
        DeleteToken(token)

    token = secrets.token_hex(16)
    hashed_token = hashlib.sha256(token.encode()).hexdigest()
    expiration_date = datetime.now() + timedelta(hours=24)
    verification_token = VerificationToken(user_id=user.id, token=hashed_token,expiration_date=expiration_date)
    db.session.add(verification_token)
    db.session.commit()
    print("hashed token",hashed_token)
    return token
