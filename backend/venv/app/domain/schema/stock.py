from enum import Enum
from pydantic import BaseModel
from typing import Literal, Optional,List


class StockBase(BaseModel):
    code: str
    market : str
    name: str
    class Config:
        orm_mode = True


class StockWithPrice(StockBase):
    price: int
    currency : str

class ListOutPutStock(BaseModel):
    status : Literal['success', 'fail', 'partial_fail']
    output : List[StockWithPrice] | List[None]
    fail_input : List[str] | List[None]

class Market(str, Enum):
    HKS = "홍콩"
    NYS = "뉴욕"
    NAS = "나스닥"
    AMS = "아멕스"
    TSE = "도쿄"
    SHS = "상해"
    SZS = "심천"
    SHI = "상해지수"
    SZI = "심천지수"
    HSX = "호치민"
    HNX = "하노이"
    BAY = "뉴욕(주간)"
    BAQ = "나스닥(주간)"
    BAA = "아멕스(주간)"
    KRX = "한국"
    KOSPI = "코스피"
    KOSDAQ = "코스닥"
