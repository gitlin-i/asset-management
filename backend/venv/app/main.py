import json
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from database import engine,SessionLocal
from routers import user,login3, login2, login4, login, stock

from domain.model.my_cash import Base as MyCashBase
from domain.model.my_stock import Base as MyStockBase
from domain.model.my_coin import Base as MyCoinBase
from domain.model.stock_current_price import Base as StockCurrentPriceBase
from domain.model.user import Base as UserBase
from domain.model.web_session import Base as WebSessionBase
from domain.model.stock_info import Base as StockInfoBase
from sqlalchemy.orm import DeclarativeBase
from database import Base

model_base_list :list[Base] = [MyCashBase, MyCoinBase, MyStockBase, StockCurrentPriceBase, UserBase, WebSessionBase,StockInfoBase]

for model_base in model_base_list:
    model_base.metadata.create_all(engine)



def getTokenDict():
    file_path = "./temp/AT.txt"
    with open(file_path,"r") as f:
        tokenDict = json.load(f)

    return tokenDict

tokenDict : dict = getTokenDict()

app = FastAPI()

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
# app.include_router(test.router)

# app.include_router(user.router)
# app.include_router(login.router)
# app.include_router(login2.router)
# app.include_router(login3.router)
# app.include_router(login4.router)
app.include_router(stock.router)




