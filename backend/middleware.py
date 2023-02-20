from flask import request
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def check_csrf_token():
    if 'authentification' in request.path:
        return

    if request.method in ['POST', 'PUT', 'DELETE']:
        verify_jwt_in_request()
        jwt = get_jwt()
        double_submit_token = jwt.get('csrf')
        csrf_token = request.headers.get('X-CSRF-TOKEN')
        if not double_submit_token or double_submit_token != csrf_token:
            return {'message': 'Invalid CSRF token'}, 400
