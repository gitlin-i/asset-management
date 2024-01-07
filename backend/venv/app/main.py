from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routers import stock, exchange,user, my_asset, my_ratio

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime

from domain.model.user import Base as UserBase
from domain.model.web_session import Base as WebSessionBase

from service.exchange_service import ExchangeService
from service.stock_service import StockService, get_index
from database import Base
from database import engine
from korea_investment_token import read_token, write_access_token
from setting import CURRENT_FLAG,Flag 
from exception.exception import LoginSessionException

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
    def index_refresh_job():
        StockService.KOSPI = get_index(StockService.access_token,"KOSPI")
        StockService.KOSDAQ = get_index(StockService.access_token,"KOSDAQ")
    scheduler.add_job(exchange_update_job,'interval', hours= 6,misfire_grace_time=10)
    scheduler.add_job(access_token_refresh_job,'interval', hours= 12)
    scheduler.add_job(session_refresh_job,trigger=CronTrigger(hour=23,minute=10))
    scheduler.add_job(index_refresh_job, 'interval', hours= 2)
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
]
origin_aws = [
    "http://my-asset.info",
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
    app.include_router(router,prefix='/api')

@app.exception_handler(LoginSessionException)
async def login_exception_handler(request: Request, e: LoginSessionException):
    response = JSONResponse(content="Session is wrong...",status_code=401)
    response.delete_cookie("session_id")
    return response
    