from ..config import config
import mysql.connector

def create_db():
    try:
        mydb = mysql.connector.connect(
        host=config.host,
        user=config.user,
        password=config.password
        )
        mycursor = mydb.cursor()
        mycursor.execute(f"CREATE DATABASE {config.db_name}")
    except Exception as e:
        if e.errno==1007:
            print('database already created')
        else:print(e)