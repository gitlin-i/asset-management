
from fastapi import APIRouter, Cookie, HTTPException
from service.my_asset_service import MyAssetService
from domain.schema.stock import MyStock,MyStockForUpdate ,StockBase
from domain.schema.coin import MyCoin, MyCoinForUpdate, CoinBase
from domain.schema.cash import MyCash, MyCashForUpdate, CashBase
from typing import Annotated
router = APIRouter(
    prefix="/my-asset"
)
#get
def get_my_asset(end_point:str):
    def decorator(func):
        def wrapper(session_id : Annotated[str| None, Cookie()] = None ):
            if not session_id:
                raise HTTPException(400,detail="login을 해주세요.")
            service = MyAssetService(end_point,session_id)
            assets = service.find_my_asset()
            return {"output": assets}
        return wrapper
    return decorator

@router.get("/stock",tags=["my-asset"])
@get_my_asset("stock")
def my_stock():
    pass

@router.get("/coin",tags=["my-asset"])
@get_my_asset("coin")
def my_coin():
    pass

@router.get("/cash",tags=["my-asset"])
@get_my_asset("cash")
def my_cash():
    pass

#post

assets = {
    "coin": MyCoin,
    "stock":MyStock,
    "cash": MyCash,
}

def post_my_asset(end_point :str):
    def decorator(func):
        def wrapper(my_asset: assets[end_point] , session_id : Annotated[str| None, Cookie()] = None,  ):
            if not session_id:
                raise HTTPException(400,detail="login을 해주세요.")
            service = MyAssetService(end_point,session_id)
            result = service.enter_my_asset(my_asset)
            return {"output": result }
        return wrapper
    return decorator

@router.post("/stock",tags=["my-asset"])
@post_my_asset("stock")
def my_stock():
    pass

@router.post("/coin",tags=["my-asset"])
@post_my_asset("coin")
def my_coin():
    pass

@router.post("/cash",tags=["my-asset"])
@post_my_asset("cash")
def my_cash():
    pass

#put
@router.put("/stock/{market}/{stock_code}",tags=["my-asset"])
def my_stock(stock_code : str,market :str, update_data : MyStockForUpdate  , session_id : Annotated[str| None, Cookie()] = None, ):
    if not session_id:
        raise HTTPException(400,detail="login을 해주세요.")
    service = MyAssetService("stock",session_id)
    update_asset = MyStock(code=stock_code, market=market, quantity=update_data.quantity, average_purchase_price=update_data.average_purchase_price)
    result = service.update_my_asset(update_asset)
    return {"output": result}

@router.put("/coin/{code}",tags=["my-asset"])
def my_coin(code : str, update_data : MyCoinForUpdate  , session_id : Annotated[str| None, Cookie()] = None, ):
    if not session_id:
        raise HTTPException(400,detail="login을 해주세요.")
    service = MyAssetService("coin",session_id)
    update_asset = MyCoin(code=code, quantity=update_data.quantity, average_purchase_price=update_data.average_purchase_price)
    result = service.update_my_asset(update_asset)
    return {"output": result}

@router.put("/cash/{currency}",tags=["my-asset"])
def my_cash(currency : str, update_data : MyCashForUpdate  , session_id : Annotated[str| None, Cookie()] = None, ):
    if not session_id:
        raise HTTPException(400,detail="login을 해주세요.")
    service = MyAssetService("cash",session_id)
    update_asset = MyCash(currency=currency, balance=update_data.balance)
    result = service.update_my_asset(update_asset)
    return {"output": result}

#delete
@router.delete("/stock/{market}/{stock_code}",tags=["my-asset"])
def my_stock( market:str , stock_code:str ,session_id : Annotated[str| None, Cookie()] = None):
    service = MyAssetService("stock",session_id)
    target = StockBase(market=market, code=stock_code )
    result = service.remove_my_asset(target)
    return {"output": result}

@router.delete("/coin/{code}",tags=["my-asset"])
def my_coin(  code:str ,session_id : Annotated[str| None, Cookie()] = None):
    service = MyAssetService("coin",session_id)
    target = CoinBase( code=code )
    result = service.remove_my_asset(target)
    return {"output": result}


@router.delete("/cash/{currency}",tags=["my-asset"])
def my_cash( currency:str ,session_id : Annotated[str| None, Cookie()] = None):
    service = MyAssetService("cash",session_id)
    target = CashBase( currency=currency )
    result = service.remove_my_asset(target)
    return {"output": result}