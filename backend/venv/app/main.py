import json
from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

from database import engine,SessionLocal
from routers import user,login3, login2, login4, login, stock

from domain.model.user import Base as Base2
from domain.model.web_session import Base as Base3
from domain.model.stock_info import Base as Base4
from domain.model.stock_current_price import Base as Base5


Base2.metadata.create_all(engine)
Base3.metadata.create_all(engine)
Base4.metadata.create_all(engine)
Base5.metadata.create_all(engine)
app = FastAPI()

def get_db() :
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

origin =  [
    "http://localhost:3000",
    "http://localhost",
]

def getTokenDict():
    file_path = "./temp/AT.txt"
    with open(file_path,"r") as f:
        tokenDict = json.load(f)

    return tokenDict

tokenDict : dict = getTokenDict()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app.include_router(test.router)

# app.include_router(user.router)
# app.include_router(login.router)
# app.include_router(login2.router)
# app.include_router(login3.router)
# app.include_router(login4.router)
app.include_router(stock.router)
# dummy_db = {
#     "BYND" : 123456,
#     "293490": 987,
# }
@app.get("/")
async def root():
    return {
        "output" : [
            {
                "code" : "BYND",
                "name" : "비욘드미트",
                "market" : "NASDAQ",
                "price" : "15.17",
                "currency" : "USD"
            },
            {
                "code" : "228670",
                "name" : "레이",
                "market" : "KOSDAQ",
                "price" : "39250",
                "currency" : "KRW"
            }
        ],
        "fail_input" : []
    }



