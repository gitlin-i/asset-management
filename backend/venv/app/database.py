from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker,DeclarativeBase
from setting import CURRENT_FLAG,Flag

aws_endpoint ="database-2.ctosw2gysd24.ap-northeast-2.rds.amazonaws.com"
def database_url_generator(dbms, port, db ,user_name, password, host_name):
    return dbms + "://" + user_name + ":" + password +"@" + host_name + ":" + port + "/" + db


local_dev_database_url = database_url_generator("mysql+mysqldb","3306", "test","test","test","localhost")

operation_database_url = database_url_generator("mysql+mysqldb","3306","operation","app_server1","appserverqhdks123",aws_endpoint)
test_database_url = database_url_generator("mysql+mysqldb","3306","test","app_server1","appserverqhdks123",aws_endpoint)

url = operation_database_url if CURRENT_FLAG == Flag.OPERATION else local_dev_database_url
engine = create_engine(url,echo=True,pool_pre_ping=True)

SessionLocal = sessionmaker(engine,autoflush=False,autocommit=False)

class Base(DeclarativeBase):
    pass

