from flask import Blueprint,request,make_response
from ..settings import aws_config
from backend.extensions.aws_s3 import s3
from backend.utils.validations import validate_all_files,create_error_json
import io
from backend.errors import ErrorList
authentification=Blueprint('authentification',__name__, url_prefix="/authentification")

@authentification.route("/register",methods=['POST'])
def register():
    logs= request
    print(logs)
    return logs