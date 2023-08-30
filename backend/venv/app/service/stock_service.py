
import json
from typing import List
from domain.schema.stock import StockPrice, StockPriceResponseOfKorInvAPI,StockInfo, StockInfo,StockInfoReponseOfKorInvAPI,StockPriceWithDate
from domain.schema.market import Market
from datetime import timedelta
from repository.stock_repository import StockCurPriceRepository, StockInfoRepository
from domain.model.stock_info import StockInfoModel
from external_api.korea_investment_api import get_stock_current_price, get_stock_info
from pydantic import validate_arguments


def getTokenDict() -> dict:
    file_path = "./temp/AT.txt"
    with open(file_path,"r") as f:
        tokenDict = json.load(f)

    return tokenDict

class StockService:
    
    tokenDict = getTokenDict()
    STANDARD_TIMEDELTA_FOR_OLD_DATA = timedelta(days=1)

    @classmethod
    @validate_arguments
    def price_read_from_db(cls,stock_code: str,market: Market) -> StockPriceWithDate | None :
        stock_current_price = StockCurPriceRepository.read(stock_code, market)
        return StockPriceWithDate(**stock_current_price[0].__dict__) if stock_current_price is not None else None
    
    @classmethod
    @validate_arguments
    def price_read_from_api(cls, stock_code:str, market:Market ) -> StockPrice | None:

        json_response = get_stock_current_price(StockService.tokenDict,stock_code,market)
        api_response = StockPriceResponseOfKorInvAPI(**json_response)
        
        if api_response.rt_cd != '0': #read_fail (api가 정상처리되지 못한 경우)
            return None
        if api_response.output.price == "0" or not api_response.output.price :  # (api가 정상처리 되었다고 하나 값이 "0" 이거나 Falsy값인 경우)
            return None
        stock_price = StockPrice(code=stock_code, market=market.value,price= api_response.output.price)
        return stock_price
    
    @classmethod
    @validate_arguments
    def current_price(cls,stock_code:str, market:Market) -> StockPrice | None:

        stock_price_from_db : StockPrice = cls.price_read_from_db(stock_code,market)

        if isinstance(stock_price_from_db,StockPriceWithDate) and not stock_price_from_db.isOld(cls.STANDARD_TIMEDELTA_FOR_OLD_DATA):
            return StockPrice(**stock_price_from_db.dict())
        
        stock_price_from_api : StockPrice = cls.price_read_from_api(stock_code,market)

        if stock_price_from_api is None:
            return None
        elif stock_price_from_db is None:
            StockCurPriceRepository.create(stock_price_from_api)
        else:
            StockCurPriceRepository.update(stock_price_from_api)

        return stock_price_from_api
    
    @classmethod
    @validate_arguments
    def current_price_list(cls, stock_codes : List[str], market : Market) -> tuple[list[StockPrice],list[str]]:
        
        stock_price_with_none = [cls.current_price(stock_code,market) for stock_code in stock_codes]
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

        json_response = get_stock_info(StockService.tokenDict,stock_code,market)
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
