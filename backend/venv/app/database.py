from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker,DeclarativeBase

DBMS = "mysql+mysqldb"
USER_NAME = "test"
PASSWORD = "test"
HOST_NAME = "localhost"
PORT = "3306"
SQL_ALCHEMY_DATABASE_URL = DBMS + "://" + USER_NAME + ":" + PASSWORD +"@" + HOST_NAME + ":" + PORT + "/test"

engine = create_engine(SQL_ALCHEMY_DATABASE_URL,echo=True)

SessionLocal = sessionmaker(engine,autoflush=False,autocommit=False)

class Base(DeclarativeBase):
    pass
