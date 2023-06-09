from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

from database import engine,SessionLocal
from routers import test, login, user
from domain.model.test import Base
from domain.model.user import Base as Base2

Base.metadata.create_all(engine)
Base2.metadata.create_all(engine)
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(test.router)
app.include_router(login.router)
app.include_router(user.router)
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/stock/current_price")
async def stock(code : str):

    # price = StockService.getStockCurrentPrice(code)
    return {
        "stockCode" : code,
        "price" : 2000
    }

