import mysql.connector
from ..settings import mysql_config

class db():
    def connect():
        connexion = mysql.connector.connect(
            host=mysql_config.host,
            user=mysql_config.user,
            password=mysql_config.password
            )
        return connexion

    def execute(connexion, query):
        cursor = connexion.cursor()
        cursor.execute(query)
        connexion.commit()
        cursor.close()

    def close(connexion):
        connexion.close()
