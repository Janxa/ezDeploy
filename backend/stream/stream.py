from celery.result import AsyncResult
from flask import Blueprint, make_response,Response,current_app
import json,time


stream = Blueprint('stream', __name__, url_prefix='/api/stream')

@stream.route('/task/<task_id>', methods=['GET'])
def stream_task(task_id):
     print('stream openned')
     def get_data(celery):

               task = AsyncResult(task_id, app=celery)
               # while task.state=='PENDING':
               #           time.sleep(1)
               #           print("pending,",{task.state},{task})
               #           yield f'data: {{"state":{task.state},"current": {task.info},"index": none,"total":"calculating...","current_status": "pending" }}\n\n'
               time.sleep(1)
               print("not pending")
               print("task:",task)
               print("task state",task.state)
               print(task.ready())
               print(task.failed())
               print(task.successful)
               print(task.info)
               while not task.ready():
                    data = {'task_id': task.id, 'state': task.status, 'info': task.info}
                    response_data = json.dumps(data)
                    time.sleep(1)
                    yield f'data: {response_data} \n\n'
               if task.failed():
                    error= str(task.info)
                    data = {'task_id': task.id, 'state': task.status, 'info': error}
                    response_data = json.dumps(data)
                    yield f'data: {response_data} \n\n'
                    yield f'event: CLOSE\ndata: {response_data} \n\n'

               if task.successful():
                    data = {'task_id': task.id, 'state': task.status, 'info': task.info}
                    response_data = json.dumps(data)
                    yield f'data: {response_data} \n\n'
                    yield f'event: CLOSE\ndata: {response_data} \n\n'
     print(current_app)
     celery=current_app.extensions["celery"]

     response=Response(get_data(celery),mimetype='text/event-stream')
     response.headers['Cache-Control'] = 'no-cache'
     return response

