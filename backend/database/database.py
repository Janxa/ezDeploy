from ..models import db,User,VerificationToken
import secrets
import hashlib
from datetime import datetime,timedelta

def FindUser(email):
    user = User.query.filter_by(email=email).first()
    return user
def ValidateToken(token):
    try:
        token = VerificationToken.query.filter_by(token=token).first()
        user=token.user
        user.validated=True
        db.session.commit()
    except Exception as e:
        raise e
    return user


def CreateUser(username,email,password):
    try:
        user=User(username=username,email=email,password=password)
        db.session.add(user)
        db.session.commit()

    except Exception as e:
        raise e

    return user

def GenerateVerificationToken(user):
    if not user:
        return None
    token = secrets.token_hex(16)
    hashed_token = hashlib.sha256(token.encode()).hexdigest()
    expiration_date = datetime.now() + timedelta(hours=24)
    verification_token = VerificationToken(user_id=user.id, token=hashed_token,expiration_date=expiration_date)
    db.session.add(verification_token)
    db.session.commit()
    print("hashed token",hashed_token)
    return hashed_token
