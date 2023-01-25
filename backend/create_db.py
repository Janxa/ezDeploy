from .settings import mySql_config
import mysql.connector

def create_db():
    try:
        mydb = mysql.connector.connect(
        host=mySql_config.host,
        user=mySql_config.user,
        password=mySql_config.password
        )
        mycursor = mydb.cursor()
        mycursor.execute(f"CREATE DATABASE {mySql_config.db_name}")
    except Exception as e:
        if e.errno==1007:
            print('database already created')