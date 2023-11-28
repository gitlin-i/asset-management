from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import stock, exchange,user, my_asset, my_ratio

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime

from domain.model.user import Base as UserBase
from domain.model.web_session import Base as WebSessionBase

from service.exchange_service import ExchangeService
from service.stock_service import StockService
from database import Base
from database import engine
from korea_investment_token import read_token, write_access_token
from setting import CURRENT_FLAG,Flag


# create database model
Base.metadata.create_all(engine)
model_base_list :list[Base] = [
    UserBase, WebSessionBase
]
for model_base in model_base_list:
    model_base.metadata.create_all(engine)

#managing schedule
scheduler = AsyncIOScheduler()

if CURRENT_FLAG == Flag.OPERATION:
    def exchange_update_job():
        try:
            ExchangeService.update_exchange_rate()
        except ValueError as e:
            print("empty list")

    def access_token_refresh_job():
        write_access_token()
        StockService.access_token = read_token()

    def session_refresh_job():
        WebSessionBase.metadata.drop_all(engine)
        WebSessionBase.metadata.create_all(engine)

    scheduler.add_job(exchange_update_job,'interval', hours= 6)
    scheduler.add_job(access_token_refresh_job,'interval', hours= 12)
    scheduler.add_job(session_refresh_job,trigger=CronTrigger(hour=23,minute=10))
elif CURRENT_FLAG == Flag.DEV:
    def test_job():
        print("!!!!!호출",datetime.now())
        print(__name__)
    def test_table_drop_job():
        # Base.metadata.drop_all(engine)
        print("drop")
    # scheduler.add_job(test_table_drop_job,'interval',seconds= 20)
    # scheduler.add_job(test_job,trigger=CronTrigger(second=5))

@asynccontextmanager
async def lifespan(app : FastAPI):
    # 최초 실행 작업
    ExchangeService.init_exchange_rate()
    scheduler.start()
    yield
    # 정리
    scheduler.shutdown()


tag_metadata = [
    {
        "name": "my-asset" ,
        "description" : "CRUD my-asset"
    }
]
app = FastAPI(lifespan=lifespan, openapi_tags=tag_metadata)

origin_dev =  [
    "http://localhost:3000",
    "http://localhost",
]
origin_aws = [
    "http://ec2-13-125-237-137.ap-northeast-2.compute.amazonaws.com",
    "http://ec2-13-125-237-137.ap-northeast-2.compute.amazonaws.com:8000"
]

origin = origin_aws if CURRENT_FLAG == Flag.OPERATION else origin_dev
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

routers = [
    stock.router,
    
    exchange.router,
    user.router,
    my_asset.router,
    my_ratio.router,
]

for router in routers:
    app.include_router(router)
