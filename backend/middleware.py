from flask import request,make_response
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def check_csrf_token():
    if 'authentification' in request.path:
        return

    if request.method in ['POST', 'PUT', 'DELETE']:


        try:verify_jwt_in_request()
        except Exception as e:
            return make_response({'message':str(e)},400)
        jwt = get_jwt()
        print(jwt)
        double_submit_token = jwt.get('csrf')
        csrf_token = request.headers.get('X-CSRF-TOKEN')
        if not double_submit_token or double_submit_token != csrf_token:
            return make_response({'message': 'Invalid CSRF token'}, 400)
