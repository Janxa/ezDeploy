from ..config import Config
from ..database.database import DeleteWebsiteById
from backend.extensions.aws_s3 import s3
from ..models import Websites
from sqlalchemy.exc import PendingRollbackError
from .. import db
from flask import current_app
from celery import shared_task

@shared_task(bind=True, max_retries=3, default_retry_delay=10)
def delete_from_s3(self, user_id, website_name, website_id):
    try:
            with current_app.app_context():
                bucket = s3.Bucket(Config.bucket_name)
                to_delete = f"{user_id}/{website_name}/"

                if any(bucket.objects.filter(Prefix=to_delete)):
                    [file.delete() and print(f"Deleted file: {file.key}")for file in bucket.objects.filter(Prefix=to_delete)]


                DeleteWebsiteById(website_id)

    except Exception as e:
        self.retry()