from .revoke import revoke_task
from ..config import Config
from ..database.database import UpdateWebsiteStatus,FindWebsiteByTask,UpdateWebsiteTask,UpdateWebsiteLink
from werkzeug.datastructures import FileStorage
from backend.extensions.aws_s3 import s3
import time
from ..errors import WebsiteNotFoundError
from ..models import Websites
from sqlalchemy.exc import PendingRollbackError
from .. import db
from flask import current_app
# from sqlalchemy.orm import scoped_session, sessionmaker
from celery import shared_task


# @celery.signals.worker_init.connect
# def initialize_session():
#     some_engine = create_engine('database_url')
#     Session.configure(bind=some_engine)



# @celery.task
# def upload_to_s3(user_id, name, files):

#     bucket_name = Config.bucket_name
#     index = None
#     for file_data in files:
#         file_content, file_name = file_data["file_content"], file_data["filename"]
#         file_name = f"{user_id}/{name}/{file_name}"
#         print('processing', file_name)
#         if file_name.endswith("/index.html"):
#             index = f"https://{bucket_name}.s3.amazonaws.com/{file_name}"
#         s3.Bucket(bucket_name).put_object(Key=file_name, Body=file_content)
#     if index:
#         s3.Bucket(bucket_name).put_object(Key=f"{user_id}/{name}/index", Body=index)

# @worker_process_init.connect
# def init_worker(**kwargs):
#     db_session.configure(bind=db.engine)
# @worker_process_shutdown.connect
# def shutdown_worker(**kwargs):
#     db_session.remove()
#Debuggin version

@shared_task(bind=True)
def upload_to_s3_demo(self,user_id, name, files):
    with current_app.app_context():
        Session=current_app.extensions["Session"]
        session = Session()
        print("session", session)
        print("task recieved")
        print(self.request.id)

        website = session.query(Websites).filter_by(task=self.request.id).first()
        if website is None:
             raise WebsiteNotFoundError(f"Website with ID {self.request.id} not found.")
        print(website)
        try:
            bucket_name = Config.bucket_name
            index = None
            i=0
            for file_data in files:
                if website.cancelled:
                    break
                time.sleep(0.4)
                i+=1
                file_content, file_name = file_data["file_content"], file_data["filename"]
                file_name = f"{user_id}/{name}/{file_name}"
                self.update_state(state='PROGRESS',
                                    meta={'current': file_name,
                                        'index': i,
                                        'total':len(files),
                                        'current_status': f'uploading {file_name} ({i}/{len(files)})' })
                print('finished processing', file_name)

                if file_name.endswith("/index.html"):
                    print("index found")
                    index_link = f"https://{bucket_name}.s3.amazonaws.com/{file_name}"
            if not website.cancelled:
                try:
                    print("website => ", website)
                    UpdateWebsiteTask(website, None, session=session)
                    UpdateWebsiteLink(website, index_link, session=session)
                    UpdateWebsiteStatus(website, "success", session=session)

                except PendingRollbackError:
                    db.session.rollback()
                    raise
            else:
                revoke_task(self.request.id,website.id)
        except:
            try:
                if not website.cancelled:
                    UpdateWebsiteStatus(website.id,"failure")
                else:
                    revoke_task(self.request.id,website.id)
            except PendingRollbackError:
                    db.session.rollback()
                    raise
