from fastapi.testclient import TestClient
from main import app, get_db
from database import SQL_ALCHEMY_DATABASE_URL
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from domain.model.test import Base

# DBMS = "mysql+mysqldb"
# USER_NAME = "test"
# PASSWORD = "test"
# HOST_NAME = "localhost"
# PORT = "3306"
# SQL_ALCHEMY_DATABASE_URL = DBMS + "://" + USER_NAME + ":" + PASSWORD +"@" + HOST_NAME + ":" + PORT + "/test_db"

# engine = create_engine(SQL_ALCHEMY_DATABASE_URL,echo=True)
# Base.metadata.create_all(engine)

# TestingSessionLocal = sessionmaker(engine,autoflush=False,autocommit=False)
# def override_get_db():
#     try:
#         db = TestingSessionLocal()
#         yield db
#     finally:
#         db.close()
# app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


# def test_TEST():
#     response = client.get("/test?someId=23")

#     assert response.status_code == 200
#     assert response.json() == {
#         "id" : 23,
#         "name" : "qwe"
#     }


def test_stock():
    response = client.get("/stock/current-price?code=test&market=kosdaq")
    assert response.status_code == 200
    assert response.json() == {
        "output" : [{
            "code": "TEST",
            "market":"KOSDAQ",
            "name":"테스트",

        },],
        "fail" : []
    }

#  def test_stock_not_in_db():
#     response = client.get("/stock/current-price?code=1320&market=kosdaq")
#     assert response.status_code == 404
# def test_login():
#     response = client.post("/login",data={"login": "안녕~", "password" : "test중" })

#     assert response.status_code == 200

