from ..models import db,Users,VerificationTokens,Websites
import secrets
import hashlib
from datetime import datetime,timedelta
import os
from ..errors import WebsiteNotFoundError
import base64



def FindUser(email=False,user_id=False):
    if email:
        user = Users.query.filter_by(email=email).first()
        return user
    if user_id:
        print("Finding :",user_id)
        user = Users.query.filter_by(id=user_id).first()
        print("user found :",user)
        return user


def UserHasToken(user):
    token = VerificationTokens.query.filter_by(user=user).first()
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
        token = VerificationTokens.query.filter_by(token=hashed_token).first()
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
        user= Users.query.filter_by(id=user_id).first()
        if not user:
            break
    try:
        user=Users(username=username,email=email,password=password,id=user_id)
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
    verification_token = VerificationTokens(user_id=user.id, token=hashed_token,expiration_date=expiration_date)
    db.session.add(verification_token)
    db.session.commit()
    print("hashed token",hashed_token)
    return token

def CreateWebsite(user_id,name,task_id):
    print(user_id)
    user=FindUser(user_id=user_id)
    if not user:
        raise Exception(({"message": "User not found", "code": 404}))
    website_id=generate_id()
    website=Websites(id=website_id,user_id=user_id, name=name,task=task_id)
    db.session.add(website)
    db.session.commit()
    print("Website added : ",website)
    return website

def UpdateWebsiteStatus(website, status ,session=None):
    website.status=status
    session.commit()
    return website

def UpdateWebsiteTask(website, task, session=None):
    if not session:
        session=db.session
    try:
        website.task = task
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    return website

def UpdateWebsiteLink(website, link, session=None):
    if not session:
        session=db.session
    try:
        website.link = link

        session.commit()

    except Exception as e:
        session.rollback()

        raise e
    return website

def GetAllWebsites(user_id):
    websites=Websites.query.filter_by(user_id=user_id).all()
    websites_list = [website.__dict__ for website in websites]
    for website_dict in websites_list:
        del website_dict['_sa_instance_state']
    return websites_list

def DeleteWebsiteById(website_id):
    website = Websites.query.get(website_id)
    if website is None:
        raise WebsiteNotFoundError(f"Website with ID {id} not found.")
    print("deleting",website.name)
    db.session.delete(website)
    print("deleted !")

    db.session.commit()
def FindWebsiteByTask(task_id):
    return Websites.query.filter_by(task=task_id).first()

def FindWebsiteById(id):
    website = Websites.query.filter_by(id=id).first()
    if website is None:
        raise WebsiteNotFoundError(f"Website with ID {id} not found.")
    print("website found", website.name )
    return website


def UpdateWebsiteCancelled(website_id, session=None):
    if session:
        website = session.query(Websites).filter_by(id=website_id).first()
    else:
        website = Websites.query.filter_by(id=website_id).first()

    if website:
        website.cancelled = True
        if session:
            session.commit()
        else:
            db.session.commit()