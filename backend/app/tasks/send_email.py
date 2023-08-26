from celery.result import AsyncResult
from celery import shared_task
from flask import current_app
from flask_mail  import Message


@shared_task(autoretry_for=(Exception,),retry_backoff=True, max_retries=5, default_retry_delay=10)
def send_email(subject,body,email_adress):
    print("recieved")

    try:
            with current_app.app_context():
                print("recieved")
                mail=current_app.extensions["mail"]
                msg = Message(sender=current_app.config["MAIL_DEFAULT_SENDER"],recipients = [email_adress])
                msg.subject = subject
                msg.body=body
                mail.send(msg)
    except Exception as e :
        print(e)
        raise e
