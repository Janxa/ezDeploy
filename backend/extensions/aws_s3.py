import boto3
from ..settings import aws_config
s3 = boto3.resource('s3',
aws_access_key_id=aws_config.aws_access_key_id,
aws_secret_access_key=aws_config.aws_secret_access_key)
