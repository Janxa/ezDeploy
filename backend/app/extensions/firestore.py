from firebase_admin import credentials, firestore, initialize_app
from google.cloud.firestore_v1.base_query import FieldFilter
from flask import Flask,has_app_context,current_app

class FlaskFirestore:
    def __init__(self ,app: Flask or None = None):
        if app is not None:
            self.init_firestore(app)

    def __repr__(self)-> str:
        if not has_app_context():
            return f"<{type(self).__name__}>"

        message = f"{type(self).__name__} {self.firebase_app} {self.firestore_db}"
        return f"<{message}>"
    @staticmethod
    def delete_field():
        return firestore.DELETE_FIELD

    def init_firestore(self,app) -> firestore.client:
        if "firestore" in app.extensions:
            raise RuntimeError( "A 'Firestore' instance has already been registered on this Flask app.")

        creds=credentials.Certificate(app.config["FIRESTORE_KEY"])
        self.firebase_app = initialize_app(creds)
        self.firestore_client = firestore.client()
        app.extensions["firestore"]=self.firestore_client

        return self.firestore_client

    def get_document(self, collection, document_id, ref=False):
            doc_ref = self.firestore_client.collection(collection).document(document_id)
            doc = doc_ref.get()
            if doc.exists and not ref:
                return doc.to_dict()
            elif doc.exists and ref:
                return doc_ref
            return None

    def find_single_document(self, collection, key,value):
            docs = self.firestore_client.collection(collection).where(filter=FieldFilter(str(key),"==",str(value))).limit(1).stream()
            try:
                doc = next(docs)
                return {"id":doc.id,"doc": doc.to_dict()}
            except StopIteration:
                return None
    def add_document(self,  collection, data) :
            doc_ref = self.firestore_client.collection(collection).document()
            doc_ref.set(data)
            return doc_ref.id

    def update_document(self,  collection, document_id, data):
            doc_ref = self.firestore_client.collection(collection).document(document_id)
            doc_ref.update(data)

    def delete_document(self,  collection, document_id):
            doc_ref = self.firestore_client.collection(collection).document(document_id)
            doc_ref.delete()

flask_firestore=FlaskFirestore()
