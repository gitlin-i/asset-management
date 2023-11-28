from datetime import datetime, timedelta
from decimal import Decimal

from pydantic import BaseModel, Field,validator
from typing import  Optional,List
from .market import Market
from domain.schema.util import is_in_db_decimal_range
market_currency_map = {
    Market.NAS.name: "USD" ,
    Market.NYS.name : "USD",
    Market.KRX.name : "KRW",
}
def getCurrency(market:str):    
    return market_currency_map[market]


class StockBase(BaseModel):
    code: str 
    market : str 
    class Config:
        orm_mode = True
        allow_mutation :False

    @validator("code","market",pre=True)
    def force_upper_case(cls, v:str):
        return v.upper()

class StockInfo(StockBase):
    name: str 

class StockPrice(StockBase):
    price: Decimal

    @validator("price")
    def price_gt_0(cls, v:Decimal):
        if v <= 0:
            raise ValueError("price is grater than 0. check this value.")
        return v

    _is_in_db_decimal_range_price = validator("price",allow_reuse=True)(is_in_db_decimal_range(integer_range=9,decimal_digits_range=4))

class StockPriceWithDate(StockPrice):
    updated_date: Optional[datetime] = None

    def isOld(self, timedelta: timedelta = timedelta(hours=6) ) -> bool:
        return self.updated_date <= datetime.now() - timedelta
    
class MyStockForUpdate(BaseModel):
    quantity: Decimal
    average_purchase_price: Decimal | None

    @validator("quantity")
    def valid_quantity(cls,v:Decimal):
        if v <= 0:
            raise ValueError("보유 수량은 0보다 커야합니다.")
        return v
    
    _is_in_db_decimal_range_quantity = validator("quantity",allow_reuse=True)(is_in_db_decimal_range(integer_range=9,decimal_digits_range=4))
    _is_in_db_decimal_range_average_purchase_price = validator("average_purchase_price",allow_reuse=True)(is_in_db_decimal_range(integer_range=9,decimal_digits_range=4))
    
class MyStock(StockBase, MyStockForUpdate):
    pass



class StockPriceListOutPut(BaseModel):
    output : List[StockPrice] | List[None]
    fail_input : List[str] | List[None]
class StockInfoListOutPut(BaseModel):
    output : List[StockInfo] | List[None]
    fail_input : List[str] | List[None]

class DomesticStockPriceResponseDetail(BaseModel):
    # market: str = Field(alias="rprs_mrkt_kor_name")
    price: str = Field(alias="stck_prpr")
class OverseasStockPriceResponseDetail(BaseModel):
    price: Optional[str] = Field(alias="last")

class StockPriceResponseOfKorInvAPI(BaseModel):
    output: Optional[DomesticStockPriceResponseDetail | OverseasStockPriceResponseDetail]
    rt_cd : str #0은 성공 그 외 실패
    msg_cd: str
    msg1: str
class StockInfoResponseDetail(BaseModel):
    name: str = Field(alias="prdt_name")
class StockInfoReponseOfKorInvAPI(BaseModel):
    output: Optional[StockInfoResponseDetail]
    rt_cd : str #0은 성공 그 외 실패
    msg_cd: str
    msg1: str

class IndexPriceWithDate(BaseModel):
    date: str = Field(...,alias="stck_bsop_date")
    price: Decimal = Field(...,alias="bstp_nmix_prpr")
    # stck_bsop_date: str = Field(alias="date")
    # bstp_nmix_prpr: Decimal = Field(alias="price")
    class Config:
        allow_mutation :False
