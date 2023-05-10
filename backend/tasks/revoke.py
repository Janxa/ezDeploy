from celery.result import AsyncResult
from celery.exceptions import Terminated
from ..database.database import DeleteWebsiteById
from celery import shared_task

@shared_task()
def revoke_task(task_id,website_id):
# Revoke a task by its task ID
    result = AsyncResult(task_id)
    print("---------------------------------revoking-------------------------",result)
    result.revoke(terminate=True)
    DeleteWebsiteById(website_id)
