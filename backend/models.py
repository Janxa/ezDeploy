from flask_sqlalchemy import SQLAlchemy
import sqlalchemy as sa
import uuid

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    uuid=db.Column(db.CHAR(36),nullable=False,default=str(uuid.uuid4()))
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255),unique=True, nullable=False)
    password=db.Column(db.String(255), nullable=False)
    validated =db.Column(db.Boolean,unique=False,nullable=False,default=False)

    verification_token = db.relationship('VerificationToken', uselist=False, back_populates='user')

    def __repr__(self):
        return f"<User(id={self.id},username={self.username}, email={self.email}, verification_token={self.verification_token}, password={self.password}, validated= {self.validated})>"

class VerificationToken(db.Model):
    __tablename__ = 'verification_tokens'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    token = db.Column(db.String(255), unique=True)
    expiration_date = db.Column(db.DateTime)

    user = db.relationship('User', back_populates='verification_token')

    def __repr__(self):
        return f"<VerificationToken(user_id={self.user_id}, token={self.token}, expiration_date={self.expiration_date})>"
