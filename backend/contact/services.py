from flask_mail import Mail, Message
from flask import current_app, make_response
from ..extensions import mail
from ..config import config
def send_email(mail_content,object,mail_sender):
    email_object = f"New e-mail from {config.DOMAIN_NAME}'s contact form !"
    try:
        if len(mail_content) > 10000:
           raise Exception("Mail too long")

        msg = Message(email_object,sender =current_app.config["MAIL_DEFAULT_SENDER"],recipients = [current_app.config["MAIL_DEFAULT_SENDER"]])
        msg.body = f"""message sent by {mail_sender}
                        {mail_content}"""
        mail.send(msg)
        return  make_response("Email Successfully Sent",200)
    except Exception as  error:
        return make_response(str(error),400)