
import json
from typing import Literal
from fastapi import APIRouter, Query
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import HTTPException
from service.stock_service import StockService
from domain.schema.stock import StockPriceListOutPut,StockInfoListOutPut,IndexPriceWithDate
from domain.schema.market import Market
from datetime import date
router = APIRouter(
    prefix="/stock"
)


@router.get("/current-price", response_model=StockPriceListOutPut)
def stock_current_price(code: str, market : Market):

    stock_codes = code.split(",")
    output , fail_input  = StockService.current_price_list(stock_codes,market)
    response = {
        "output" : output,
        "fail_input" : fail_input
    }
    json_response = jsonable_encoder(response)
    if len(fail_input) > 0:
        msg = "some stock code not exists. check fail input."
        error_result : dict = {
            "msg" : msg,
            "result" : json_response
        }
        raise HTTPException(status_code=404, detail=error_result)
    
    return json_response

@router.get("/info", response_model=StockInfoListOutPut)
def stock_info(code: str, market : Market):

    stock_codes = code.split(",")
    output , fail_input  = StockService.info_list(stock_codes,market)
    response = {
        "output" : output,
        "fail_input" : fail_input
    }
    
    json_response = jsonable_encoder(response)
    if len(fail_input) > 0:
        msg = "some stock code not exists. check fail input."
        error_result : dict = {
            "msg" : msg,
            "result" : json_response
        }
        raise HTTPException(status_code=404, detail=error_result)
    
    return json_response

@router.get("/index")
def market_index(market: Literal["KOSPI","KOSDAQ"] ):
    response = StockService.index_value(market)
    new_response = [res.dict() for res in response]
    return new_response
    