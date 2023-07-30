from abc import ABCMeta, abstractmethod, abstractstaticmethod
import json
from typing import List
from domain.schema.stock import Market,StockPrice, StockPriceResponseOfKorInvAPI,StockPriceListOutPut
from domain.model.stock_info import StockInfoModel
from domain.model.stock_current_price import StockCurrentPriceModel
from datetime import datetime, timedelta
from repository.stock_repository import StockInfoRepository,StockCurPriceRepository
from functools import reduce
from api import get_domestic_stock_current_price


# class Service(metaclass= ABCMeta):
    
#     @abstractstaticmethod
#     def current_price():
#         pass

def getTokenDict() -> dict:
    file_path = "./temp/AT.txt"
    with open(file_path,"r") as f:
        tokenDict = json.load(f)

    return tokenDict


class StockService:
    
    tokenDict = getTokenDict()

    def current_price(stock_codes : List[str], market : Market) ->StockPriceListOutPut:
        if not isinstance(stock_codes, list):
            raise TypeError("current-price에 list입력")
        
        def price_read_from_db(stock_code: str) -> StockPrice | str :
            stock_current_price = StockCurPriceRepository.read(stock_code, market)
            return StockPrice(**stock_current_price[0].__dict__) if stock_current_price is not None else stock_code
        
        def price_read_from_api(stock_code:str | StockPrice) -> StockPrice | None:
            if isinstance(stock_code,StockPrice):
                return stock_code
            
            if(market in [Market.KRX]):
                
                json_response  = get_domestic_stock_current_price(StockService.tokenDict,stock_code)
                print("#12312",json_response)
                
                mapped_json = StockPriceResponseOfKorInvAPI(**json_response)
                print(mapped_json)
                if (mapped_json.rt_cd != '0'):
                    return None
                
                target_stock_price = StockPrice(code=stock_code, market=market.value,price= mapped_json.output.price)
                is_created = StockCurPriceRepository.create(target_stock_price)

                return target_stock_price
            return None
            
        stock_price_read_from_db = [price_read_from_db(stock_code) for stock_code in stock_codes]
        
        stock_price_read_from_db_api = [price_read_from_api(stock_price_or_stock_code) for stock_price_or_stock_code in stock_price_read_from_db ]
        
        fail_codes = [ stock_codes[i] for i, stock_price in enumerate(stock_price_read_from_db_api) if stock_price is None]
        
        return {
            "output": [ stock_price for stock_price in stock_price_read_from_db_api if stock_price is not None],
            "fail_input": fail_codes
        }
