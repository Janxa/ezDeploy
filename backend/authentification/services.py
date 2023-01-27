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
