from ..tasks import celery
from ..settings import aws_config
import io
from werkzeug.datastructures import FileStorage
import base64
from backend.extensions.aws_s3 import s3

@celery.task
def upload_to_s3(user_id, name, files):
    bucket_name = aws_config.bucket_name
    index = None
    for file_data in files:
        file_content, file_name = file_data["file_content"], file_data["filename"]
        file_name = f"{user_id}/{name}/{file_name}"
        print('processing', file_name)
        if file_name.endswith("/index.html"):
            index = f"https://{bucket_name}.s3.amazonaws.com/{file_name}"
        s3.Bucket(bucket_name).put_object(Key=file_name, Body=file_content)
    if index:
        s3.Bucket(bucket_name).put_object(Key=f"{user_id}/{name}/index", Body=index)
