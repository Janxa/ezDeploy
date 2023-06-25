from celery.result import AsyncResult
from celery import shared_task
from .delete import delete_from_s3
@shared_task()
def revoke_task(task_id,website_id,website_name,user_id):
# Revoke a task by its task ID
    result = AsyncResult(task_id)
    print("---------------------------------revoking-------------------------",result)
    result.revoke(terminate=True)
    delete_from_s3.delay( user_id, website_name, website_id, delete_from_db=True)
