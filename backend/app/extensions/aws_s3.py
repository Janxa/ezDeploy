import boto3
from ..config import Config
s3 = boto3.resource('s3',
aws_access_key_id=Config.aws_access_key_id,
aws_secret_access_key=Config.aws_secret_access_key)
