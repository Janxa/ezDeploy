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

def drop_db():
    try:
        mydb = mysql.connector.connect(
            host=config.host,
            user=config.user,
            password=config.password
        )
        mycursor = mydb.cursor()
        mycursor.execute(f"DROP DATABASE {config.db_name}")
        mydb.commit()
    except mysql.connector.Error as e:
        if e.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist.")
        else:
            print(e)
    finally:
        mycursor.close()
        mydb.close()