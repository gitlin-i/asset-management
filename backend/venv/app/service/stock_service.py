
import json
from typing import List
from domain.schema.stock import StockPrice, StockPriceResponseOfKorInvAPI,StockPriceListOutPut,StockPriceWithDate
from domain.schema.market import Market
from datetime import timedelta
from repository.stock_repository import StockCurPriceRepository
from external_api.korea_investment_api import get_stock_current_price
from pydantic import validate_arguments,parse_obj_as


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

        mapped_json = StockPriceResponseOfKorInvAPI(**json_response)
        if (mapped_json.rt_cd != '0'): #read_fail
            return None
        target_stock_price = StockPrice(code=stock_code, market=market.value,price= mapped_json.output.price)
        return target_stock_price
    
    @classmethod
    @validate_arguments
    def current_price(cls,stockcode:str, market:Market) -> StockPrice | None:

        stock_price_from_db : StockPriceWithDate = cls.price_read_from_db(stockcode,market)

        if isinstance(stock_price_from_db,StockPriceWithDate) and not stock_price_from_db.isOld(cls.STANDARD_TIMEDELTA_FOR_OLD_DATA):
            return StockPrice(**stock_price_from_db.dict())
        
        stock_price_from_api : StockPrice = cls.price_read_from_api(stockcode,market)

        if stock_price_from_api is None:
            return None
        elif stock_price_from_db is None:
            StockCurPriceRepository.create(stock_price_from_api)
        else:
            StockCurPriceRepository.update(stock_price_from_api)

        return stock_price_from_api
    
    @classmethod
    @validate_arguments
    def current_price_list(cls, stock_codes : List[str], market : Market) ->StockPriceListOutPut:
        
        stock_price_with_none = [cls.current_price(stock_code,market) for stock_code in stock_codes]
        fail_codes = [ stock_codes[i] for i, stock_price in enumerate(stock_price_with_none) if stock_price is None]
        
        return {
            "output": [ stock_price for stock_price in stock_price_with_none if stock_price is not None],
            "fail_input": fail_codes
        }
    

    


