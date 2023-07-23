from abc import ABCMeta, abstractmethod
from typing import List
from domain.schema.stock import Market
class Service(metaClass= ABCMeta):
    
    @abstractmethod
    def current_price():
        pass


class StockService(Service):
    
    def current_price(market : Market  ,stock_codes : List[str]):
        #1.코드 스톡정보 읽기
        #1-1. 성공 , 실패 => 실패 
        
        def read():
            [sc] = StockRepo.read(stock_codes)
        status = "fail"
        StockRepo.read(market, stock_codes)
        return {
            "status" : status,
            "output": [

            ],
            "fail": [

            ]

        }
        