from contextlib import asynccontextmanager
import json
import asyncio
import os
from fastapi import FastAPI,BackgroundTasks

from fastapi.middleware.cors import CORSMiddleware


from database import engine,SessionLocal
from routers import stock, coin, exchange,user, my_asset

from domain.model.my_cash import Base as MyCashBase
from domain.model.my_stock import Base as MyStockBase
from domain.model.my_coin import Base as MyCoinBase
from domain.model.stock_current_price import Base as StockCurrentPriceBase
from domain.model.user import Base as UserBase
from domain.model.web_session import Base as WebSessionBase
from domain.model.stock_info import Base as StockInfoBase
from domain.model.exchange_rate import Base as CurrentExchangeRateBase
from service.exchange_service import ExchangeService

from database import Base

model_base_list :list[Base] = [MyCashBase, MyCoinBase, MyStockBase, StockCurrentPriceBase, UserBase, WebSessionBase,StockInfoBase,CurrentExchangeRateBase]

for model_base in model_base_list:
    model_base.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app : FastAPI):
    ExchangeService.init_exchange_rate()
    yield


app = FastAPI(lifespan=lifespan)

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

app.include_router(stock.router)
app.include_router(coin.router)
app.include_router(exchange.router)
app.include_router(user.router )
app.include_router(my_asset.router)