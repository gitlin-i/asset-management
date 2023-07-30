from datetime import datetime
from enum import Enum, auto
from pydantic import BaseModel, Field
from typing import Literal, Optional,List

def getCurrency(market):
    market_currency_map = {
        Market.NAS.name: "USD" ,
        Market.NYS.name : "USD",
        Market.KRX.name : "KRW",
    }

    return market_currency_map[market]

class StockBase(BaseModel):
    code: str 
    market : str 
    class Config:
        orm_mode = True

    

class StockInfo(StockBase):
    name: str

class StockPrice(StockBase):
    price: int
    def currency(self) -> str:
        return getCurrency(self.market)
    


class StockPriceListOutPut(BaseModel):
    output : List[StockPrice] | List[None]
    fail_input : List[str] | List[None]

class AutoName(Enum):
    def _generate_next_value_(name, start, count, last_values):
        return name
class Market(AutoName):

    HKS = auto() #"홍콩"
    NYS = auto() #"뉴욕"
    NAS = auto()#"나스닥"
    AMS = auto()#"아멕스"
    TSE = auto()#"도쿄"
    SHS = auto()#"상해"
    SZS = auto()#"심천"
    SHI = auto()#"상해지수"
    SZI = auto()#"심천지수"
    HSX = auto()#"호치민"
    HNX = auto()#"하노이"
    BAY = auto()#"뉴욕(주간)"
    BAQ = auto()#"나스닥(주간)"
    BAA = auto()#"아멕스(주간)"
    KRX = auto() #"한국"
    # KOSPI = auto()#"코스피"
    # KOSPI200 = auto()#"코스피200"
    # KOSDAQ = auto()#"코스닥"
class DomesticStockPriceResponseDetail(BaseModel):
    # market: str = Field(alias="rprs_mrkt_kor_name")
    price: str = Field(alias="stck_prpr")

class StockPriceResponseOfKorInvAPI(BaseModel):
    output: Optional[DomesticStockPriceResponseDetail]
    rt_cd : str #0은 성공 그 외 실패
    msg_cd: str
    msg1: str


