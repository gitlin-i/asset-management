
from typing import List, Literal
from domain.schema.stock import StockPrice, StockPriceResponseOfKorInvAPI,StockInfo, StockInfo,StockInfoReponseOfKorInvAPI,StockPriceWithDate,IndexPriceWithDate
from domain.schema.market import Market
from datetime import datetime, timedelta
from repository.stock_repository import StockCurPriceRepository, StockInfoRepository
from domain.model.stock_info import StockInfoModel
from external_api.korea_investment_api import get_stock_current_price, get_stock_info,get_domestic_index
from pydantic import validate_arguments
from korea_investment_token import read_token, write_access_token
from setting import CURRENT_FLAG, Flag

def get_index(tokenDict,market: Literal['KOSPI','KOSDAQ']):
    today = datetime.now()
    a_week_ago_from_today = today - timedelta(days=7)
    index_price_date = get_domestic_index(tokenDict, market, a_week_ago_from_today.strftime("%Y%m%d"), today.strftime("%Y%m%d"))
    index_price_for_a_week = [IndexPriceWithDate(**price_date) for price_date in index_price_date]
    return index_price_for_a_week

def init_token():
    if CURRENT_FLAG == Flag.OPERATION:
        write_access_token()
    token = read_token()

    return token
class StockService:
    access_token = init_token()
    KOSPI = get_index(access_token,"KOSPI")
    KOSDAQ = get_index(access_token,"KOSDAQ")
    STANDARD_TIMEDELTA_FOR_OLD_DATA = timedelta(days=1)

    @classmethod
    @validate_arguments
    def price_read_from_db(cls,stock_code: str,market: Market) -> StockPriceWithDate | None :
        stock_current_price = StockCurPriceRepository.read(stock_code, market)
        return StockPriceWithDate(**stock_current_price[0].__dict__) if stock_current_price is not None else None
    
    @classmethod
    @validate_arguments
    def price_read_from_api(cls, stock_code:str, market:Market ) -> StockPrice:

        json_response = get_stock_current_price(cls.access_token,stock_code,market)
        api_response = StockPriceResponseOfKorInvAPI(**json_response)
        
        if api_response.rt_cd != '0': #read_fail (api가 정상처리되지 못한 경우)
            raise RuntimeError("주식 api 정상처리 실패",api_response.msg1)
        if api_response.output.price == "0" or not api_response.output.price :  # (api가 정상처리 되었다고 하나 값이 "0" 이거나 Falsy값인 경우)
            raise ValueError("Falsy값 입력")
        stock_price = StockPrice(code=stock_code, market=market.value,price= api_response.output.price)
        return stock_price
    
    @classmethod
    @validate_arguments
    def current_price(cls,stock_code:str, market:Market) -> StockPrice :

        stock_price_from_db : StockPrice = cls.price_read_from_db(stock_code,market)

        if isinstance(stock_price_from_db,StockPriceWithDate) and not stock_price_from_db.isOld(cls.STANDARD_TIMEDELTA_FOR_OLD_DATA):
            return StockPrice(**stock_price_from_db.dict())
        
        try:
            stock_price_from_api : StockPrice = cls.price_read_from_api(stock_code,market)
        except Exception as e:
            raise e
        

        if stock_price_from_db is None:
            StockCurPriceRepository.create(stock_price_from_api)
        else:
            StockCurPriceRepository.update(stock_price_from_api)

        return stock_price_from_api
    
    @classmethod
    @validate_arguments
    def current_price_list(cls, stock_codes : List[str], market : Market) -> tuple[list[StockPrice],list[str]]:
        def price_or_none(stock_code,market):
            try:
                stock_price = cls.current_price(stock_code,market)
                return stock_price
            except RuntimeError as e:
                return None
            except ValueError as e:
                return None
        stock_price_with_none = [price_or_none(stock_code,market) for stock_code in stock_codes]    
        fail_codes = [ stock_codes[i] for i, stock_price in enumerate(stock_price_with_none) if stock_price is None]
        
        return ([ stock_price for stock_price in stock_price_with_none if stock_price is not None],
                fail_codes)
    

    @classmethod
    @validate_arguments
    def info_read_from_db(cls,stock_code: str,market: Market) -> StockInfo | None :
        stock_info_model : StockInfoModel = StockInfoRepository.read(stock_code, market)
        return StockInfo(**stock_info_model[0].__dict__) if stock_info_model is not None else None
    
    @classmethod
    @validate_arguments
    def info_read_from_api(cls, stock_code:str, market:Market ) -> StockInfo | None:

        json_response = get_stock_info(cls.access_token,stock_code,market)
        api_response = StockInfoReponseOfKorInvAPI(**json_response)
        
        if api_response.rt_cd != '0': #read_fail (api가 정상처리되지 못한 경우)
            return None
        if not api_response.output.name :  # (api가 정상처리 되었다고 하나 이름이 없는 경우)
            return None
        stock_info = StockInfo(code=stock_code,market=market.value,name=api_response.output.name)
        return stock_info
    @classmethod
    @validate_arguments
    def info(cls,stock_code:str, market:Market) -> StockInfo | None:

        stock_info_from_db : StockInfo = cls.info_read_from_db(stock_code,market)

        if isinstance(stock_info_from_db,StockInfo):
            return stock_info_from_db

        stock_info_from_api : StockInfo = cls.info_read_from_api(stock_code,market)

        if stock_info_from_api is None:
            return None
        else:
            StockInfoRepository.create(stock_info_from_api)
        return stock_info_from_api

    @classmethod
    @validate_arguments
    def info_list(cls, stock_codes : List[str], market : Market) -> tuple[list[StockInfo],list[str]]:
        
        stock_info_with_none = [cls.info(stock_code,market) for stock_code in stock_codes]
        fail_codes = [ stock_codes[i] for i, stock_info in enumerate(stock_info_with_none) if stock_info is None]
        
        return ([ stock_info for stock_info in stock_info_with_none if stock_info is not None],
                fail_codes)

    @classmethod
    def index_value(cls,market : Literal['KOSPI','KOSDAQ']):
        if market == 'KOSPI':
            return cls.KOSPI
        elif market == "KOSDAQ":
            return cls.KOSDAQ
    @classmethod
    def refresh_index(cls):
        cls.KOSDAQ = get_index(cls.access_token,"KOSDAQ")
        cls.KOSPI = get_index(cls.access_token,"KOSPI")

    