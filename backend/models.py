from .extensions import db



class Users(db.Model):

    id = db.Column(db.String(8), primary_key=True ,nullable=False)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255),unique=True, nullable=False)
    password=db.Column(db.String(255), nullable=False)
    validated =db.Column(db.Boolean,unique=False,nullable=False,default=False)
    premium=db.Column(db.Boolean,unique=False,nullable=False,default=False)
    verification_token = db.relationship('VerificationTokens', uselist=False, back_populates='user')
    websites=db.relationship('Websites',uselist=False, back_populates='user')

    def __repr__(self):
        return f"<User(id={self.id},username={self.username}, email={self.email}, verification_token={self.verification_token}, password={self.password}, validated= {self.validated})>"

class VerificationTokens(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(8),db.ForeignKey('users.id'))
    token = db.Column(db.String(255), unique=True)
    expiration_date = db.Column(db.DateTime)

    user = db.relationship('Users', back_populates='verification_token')

    def __repr__(self):
        return f"<VerificationToken(user_id={self.user_id}, token={self.token}, expiration_date={self.expiration_date})>"

class Websites(db.Model):

    id = db.Column(db.String(8), primary_key=True ,nullable=False)
    user_id = db.Column(db.String(8),db.ForeignKey('users.id'))
    name=db.Column(db.String(255),nullable=False)
    link=db.Column(db.String(255),nullable=True)
    status=db.Column(db.String(8),unique=False,default="pending")
    task=db.Column(db.String(255),nullable=True)
    cancelled=db.Column(db.Boolean,nullable=False,default=False)

    user = db.relationship('Users', uselist=False, back_populates='websites')
    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}