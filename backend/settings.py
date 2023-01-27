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
    JWT_SECRET_KEY=os.getenv('JWT_SECRET_KEY')

class FLask_Mail_Config():
    SMTP_SERVER=os.getenv('SMTP_SERVER')
    PORT=os.getenv('PORT')
    SMTP_ID=os.getenv('SMTP_ID')
    SMTP_PASSWORD=os.getenv('SMTP_PASSWORD')