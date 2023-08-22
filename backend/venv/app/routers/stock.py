
import json
from fastapi import APIRouter, Query
from fastapi.exceptions import HTTPException
from service.stock_service import StockService
from domain.schema.stock import StockPriceListOutPut
from domain.schema.market import Market
router = APIRouter(
    prefix="/stock"
)


@router.get("/current-price", response_model=StockPriceListOutPut)
def stock_current_price(code: str, market : Market):

    stock_codes = code.split(",")
    result  = StockService.current_price_list(stock_codes,market)
    if len(result.fail_input) > 0:
        msg = "some stock code not exists. check fail input."
        error_result : dict = {
            "msg" : msg,
            "result" : result.dict()
        }
        raise HTTPException(status_code=404, detail=error_result)
    
    return result

