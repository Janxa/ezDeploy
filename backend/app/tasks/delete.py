from ..config import Config
from app.extensions import flask_firestore as db
from app.extensions.aws_s3 import s3
from flask import current_app
from celery import shared_task

@shared_task(bind=True, max_retries=3, default_retry_delay=10)
def delete_from_s3(self, user_id, website_name, website_id, delete_from_db=False):
    try:
            with current_app.app_context():
                bucket = s3.Bucket(Config.bucket_name)
                to_delete = f"{user_id}/{website_name}/"

                if any(bucket.objects.filter(Prefix=to_delete)):
                    [file.delete() and print(f"Deleted file: {file.key}")for file in bucket.objects.filter(Prefix=to_delete)]

                if delete_from_db:
                    user_ref=db.get_document("users",user_id,ref=True)
                    website_ref=user_ref.collection("websites").document(website_id)
                    website_ref.delete()
    except Exception as e:

        self.retry()