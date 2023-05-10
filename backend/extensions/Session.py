from .sql_alchemy import db
from sqlalchemy.orm import scoped_session, sessionmaker


Session = scoped_session(sessionmaker( autoflush=True))
db_session=Session