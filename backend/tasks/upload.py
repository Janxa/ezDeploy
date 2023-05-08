from .. import celery
from ..config import Config
from ..database.database import UpdateWebsiteStatus,FindWebsiteByTask,UpdateWebsiteTask,UpdateWebsiteLink
import io
from werkzeug.datastructures import FileStorage
import base64
from backend.extensions.aws_s3 import s3
import time
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


#Debuggin version
@celery.task(bind=True)
def upload_to_s3(self,user_id, name, files):
    print("task recieved")
    print(self.request.id)
    try:
        bucket_name = Config.bucket_name
        index = None
        i=0
        for file_data in files:
            time.sleep(0.4)
            i+=1
            file_content, file_name = file_data["file_content"], file_data["filename"]
            file_name = f"{user_id}/{name}/{file_name}"
            self.update_state(state='PROGRESS',
                                meta={'current': file_name,
                                    'index': i,
                                    'total':len(files),
                                    'current_status': f'uploading {file_name} ({i}/{len(file_data)})' })
            print('finished processing', file_name)

            if file_name.endswith("/index.html"):
                index_link = f"https://{bucket_name}.s3.amazonaws.com/{file_name}"
        website=FindWebsiteByTask(self.request.id)
        UpdateWebsiteLink(website,index_link)
        UpdateWebsiteTask(website,None)
        UpdateWebsiteStatus(website,"success")
    except:
        website=FindWebsiteByTask(self.request.id)
        UpdateWebsiteStatus(website.id,"failure")

