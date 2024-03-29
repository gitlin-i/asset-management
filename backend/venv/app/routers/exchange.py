

from decimal import Decimal
import os

from fastapi import APIRouter, Query
from fastapi.exceptions import HTTPException

from service.exchange_service import ExchangeService
from domain.schema.exchange_rate import ExchangeRateOutput,ExchangeRate
from fastapi.encoders import jsonable_encoder

router = APIRouter(
    prefix="/exchange"
)

@router.get("/current-rate")
def current_exchange_rate(currency : str | None = None):

    if not currency:
        result = ExchangeService.current_rate_all()
        response = {"output" : result}
        return response
    
    currency_codes = currency.split(",")
    output, fail_input = ExchangeService.current_rate_list(currency_codes=currency_codes)

    response = {
        "output" : output,
        "fail_input" : fail_input
    }
    json_response = jsonable_encoder(response)
    

    if len(fail_input) > 0:
        msg = "some code not exists. check fail input."
        error_response : dict = {
            "msg" : msg,
            "result" : json_response
        }
        raise HTTPException(status_code=404, detail=error_response)

    return json_response



