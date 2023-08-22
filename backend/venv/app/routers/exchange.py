

from fastapi import APIRouter, Query
from fastapi.exceptions import HTTPException
from service.exchange_service import ExchangeService
from domain.schema.exchange_rate import ExchageRateOutput

router = APIRouter(
    prefix="/exchange"
)


@router.get("/current-rate", response_model=ExchageRateOutput)
def current_exchange_rate(currency: str):

    currency_codes = currency.split(",")

    if not currency_codes:
        result = ExchangeService.current_rate_all()
        return result
    
    result  = ExchangeService.current_rate_list(currency_codes)

    if len(result.fail_input) > 0:
        msg = "some code not exists. check fail input."
        error_result : dict = {
            "msg" : msg,
            "result" : result.dict()
        }
        raise HTTPException(status_code=404, detail=error_result)
    return result



