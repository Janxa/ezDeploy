from .revoke import revoke_task
from .delete import delete_from_s3
from ..config import Config
from ..database.database import UpdateWebsiteStatus,FindWebsiteByTask,UpdateWebsiteTask,UpdateWebsiteLink
from .. database.errors import WebsiteNotFoundError
from ..extensions.aws_s3 import s3
import time
from ..models import Websites
from sqlalchemy.exc import PendingRollbackError
from .. import db
from flask import current_app
from celery import shared_task
import base64

@shared_task(bind=True, max_retries=3, default_retry_delay=10)
def upload_to_s3(self,user_id, name, files,premium):
    with current_app.app_context():

        try:
            bucket_name = Config.bucket_name
            i=0
            for file_data in files:
                    if not premium:
                        time.sleep(0.5)
                    i+=1
                    file_content_base64, file_name,content_type = file_data["file_content"], file_data["filename"],file_data["content_type"]
                    file_name = f"{user_id}/{name}/{file_name}"
                    print("processing",file_name)
                    self.update_state(state='PROGRESS',
                                        meta={'current': file_name,
                                            'index': i,
                                            'total':len(files),
                                            'current_status': f'uploading {file_name} ({i}/{len(files)})' })
                    file_content = base64.b64decode(file_content_base64)
                    if file_name.endswith("/index.html"):
                        print("index found")
                        if premium:
                            index_link = f"https://{bucket_name}.s3.amazonaws.com/{file_name}"
                            s3.Bucket(bucket_name).put_object(Key=file_name, Body=file_content, ContentType=content_type)
                        else:
                            index_link='restrained'
                    else:
                        if premium:
                            s3.Bucket(bucket_name).put_object(Key=file_name, Body=file_content,  ContentType=content_type or 'application/octet-stream')


            try:

                    website=FindWebsiteByTask(self.request.id)
                    print("website => ", website)
                    UpdateWebsiteTask(website, None)
                    UpdateWebsiteLink(website, index_link)
                    UpdateWebsiteStatus(website, "success")

            except PendingRollbackError:
                    db.session.rollback()
                    raise
        except:
            website=FindWebsiteByTask(self.request.id)
            UpdateWebsiteStatus(website,"failure")
            delete_from_s3(user_id, name, website.id)