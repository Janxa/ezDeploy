from argon2 import PasswordHasher
from ..models import db,User
from flask_mail  import Message
from backend import mail
from flask import current_app
ph = PasswordHasher()
def hash_password(password):
    hash = ph.hash(password)
    try:
      ph.verify(hash, password)
    except: raise
    return hash

def login(email, password):
    user= FindUser(email)
    hash=user.password
    ph.verify(hash, password)
    return user
    # if ph.check_needs_rehash(hash):
    #      db.set_password_hash_for_user(user, ph.hash(password))


def FindUser(email):
    user = User.query.filter_by(email=email).first()
    return user

def CreateUser(username,email,password):
    user=User(username=username,email=email,password=password)
    db.session.add(user)
    db.session.commit()

def send__confirmation_email(username,email):

    msg = Message(sender=current_app.config["MAIL_DEFAULT_SENDER"],recipients = [email])
    msg.subject = "Confirmation email"
    msg.body = f"""Please Confirm Your Password Using This Link :
                    Link"""
    mail.send(msg)
    # return  make_response("Email Successfully Sent",200)
    # except Exception as  error:
    #     return make_response(str(error),400)