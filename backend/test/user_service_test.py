from fastapi import Depends
from sqlalchemy import create_engine
from service.user_service import UserService
from domain.schema.user import User
from domain.model.user import User as Base
from sqlalchemy.orm import sessionmaker
from main import app, get_db
from fastapi.testclient import TestClient
from database import engine

# DBMS = "mysql+mysqldb"
# USER_NAME = "test_user"
# PASSWORD = "qwer"
# HOST_NAME = "localhost"
# PORT = "3306"
# SQL_ALCHEMY_DATABASE_URL = DBMS + "://" + USER_NAME + ":" + PASSWORD +"@" + HOST_NAME + ":" + PORT + "/test_db"

# engine = create_engine(SQL_ALCHEMY_DATABASE_URL,echo=True)
Base.metadata.create_all(engine)

TestingSessionLocal = sessionmaker(engine,autoflush=False,autocommit=False)
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()
app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def test_password():
    aUser = User(user_id="유저1", user_name="김씨",user_password="testpassword")

    hashed_password = UserService().hash_password(aUser.user_password)
    hashed_password2 = UserService().hash_password(aUser.user_password)
    
    print(hashed_password)
    print(hashed_password2)
    assert hashed_password == hashed_password2

# def test_create_user():
#     aUser = User(user_id="유저1", user_name="김씨",user_password="testpassword")
#     UserService().find_user()

    
def test_read_user():
    response = client.get("/test?someId=23")

    assert response.status_code == 200
    assert response.json() == {
        "id" : 23,
        "name" : "qwe"
    }
