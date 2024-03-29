import os
from dotenv import load_dotenv
from datetime import timedelta
load_dotenv()



class Config:

    #aws_config
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID')
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
    bucket_name=os.getenv('BUCKET_NAME')


    # mySql_config
    host=os.getenv('MYSQL_HOST')
    user=os.getenv('MYSQL_USERNAME')
    password=os.getenv('MYSQL_PASSWORD')
    db_name=os.getenv('MYSQL_DB_NAME')

    # sqlAlchemy_config
    SQLALCHEMY_DATABASE_URI=os.getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 3000,
    }
    # JWT_Config
    JWT_TOKEN_LOCATION = ['cookies','headers']
    JWT_ACCESS_COOKIE_NAME = 'access_token_cookie'
    JWT_ACCESS_CSRF_COOKIE_NAME='csrf_access_token'
    JWT_SECRET_KEY=os.getenv('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    # FLask_Mail_Config
    MAIL_SERVER=os.getenv('SMTP_SERVER')
    MAIL_PORT=os.getenv('PORT')
    MAIL_USERNAME=os.getenv('SMTP_ID')
    MAIL_DEFAULT_SENDER=os.getenv("MAIL_DEFAULT_SENDER")
    MAIL_PASSWORD=os.getenv('SMTP_PASSWORD')

    CELERY_BROKER_URL = os.environ.get('REDIS_URL') or 'redis://127.0.0.1:6379/0'

    DOMAIN_NAME =os.environ.get('DOMAIN_NAME')

    # Result backend settings
    CELERY_RESULT_BACKEND = 'redis://127.0.0.1:6379/0'




config = Config()