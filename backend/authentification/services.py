from argon2 import PasswordHasher
from ..models import db,User
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

    # if ph.check_needs_rehash(hash):
    #      db.set_password_hash_for_user(user, ph.hash(password))
def GetUserPassword(user):
    user=FindUser(user)

def FindUser(email):
    user = User.query.filter_by(email=email).first()
    for key, value in user.__dict__.items():
        print(f"{key}: {value}")

    return user

def CreateUser(name,email,password):
    user=User(name=name,email=email,password=password)
    db.session.add(user)
    db.session.commit()
