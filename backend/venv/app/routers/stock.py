
from typing import Annotated
from fastapi import APIRouter, Query

from service.stock_service import StockService
from domain.schema.stock import StockPriceListOutPut, Market

router = APIRouter(
    prefix="/stock"
)


@router.get("/current-price", response_model=StockPriceListOutPut)
def stock_current_price(code: str, market : Market):

    stock_codes = code.split(",")
    result  = StockService.current_price(stock_codes,market)
    return result

@router.get("/test2")
def test_get(code:str, add_code:str):
    type1 = str(type(code))
    type2 = str(type(add_code))
    new_one = code.split(",")
    return{
        "msg" : code,
        "type" : type1,
        "add_code" : add_code,
        "add_code_type": type2,
        "new_one" : new_one
    }