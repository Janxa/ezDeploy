import os
from dotenv import load_dotenv

load_dotenv()


class aws_config():
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID')
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
    bucket_name=os.getenv('BUCKET_NAME')


class mySql_config():
    host=os.getenv('MYSQL_HOST')
    user=os.getenv('MYSQL_USERNAME')
    password=os.getenv('MYSQL_PASSWORD')
    db_name=os.getenv('MYSQL_DB_NAME')


class sqlAlchemy_config():
    SQLALCHEMY_DATABASE_URI=os.getenv('SQLALCHEMY_DATABASE_URI')

class JWT_Config():
    JWT_TOKEN_LOCATION = ['cookies','headers']
    JWT_ACCESS_COOKIE_NAME = 'access_token_cookie'
    JWT_ACCESS_CSRF_COOKIE_NAME='csrf_access_token'
    JWT_SECRET_KEY=os.getenv('JWT_SECRET_KEY')

class FLask_Mail_Config():
    MAIL_SERVER=os.getenv('SMTP_SERVER')
    MAIL_PORT=os.getenv('PORT')
    MAIL_USERNAME=os.getenv('SMTP_ID')
    MAIL_DEFAULT_SENDER=os.getenv("MAIL_DEFAULT_SENDER")
    MAIL_PASSWORD=os.getenv('SMTP_PASSWORD')
