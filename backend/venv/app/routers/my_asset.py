
from fastapi import APIRouter, Body, Cookie, HTTPException, Depends, Request
from service.my_asset_service import MyAssetService
from domain.schema.stock import MyStock,MyStockForUpdate ,StockBase
from domain.schema.coin import MyCoin, MyCoinForUpdate, CoinBase
from domain.schema.cash import MyCash, MyCashForUpdate, CashBase
from domain.schema.market import Market
from typing import Annotated, Literal, Union

router = APIRouter(
    prefix="/my-asset"
)

def is_in_session( session_id : Annotated[str| None, Cookie()] = None):
    if not session_id:
        raise HTTPException(401,detail="login을 해주세요.")
    return session_id
CommonSession = Annotated[str, Depends(is_in_session)]

def asset_service(asset:Literal["stock","coin","cash"] , session: CommonSession) -> MyAssetService:
    return MyAssetService(asset,session)
CommonService = Annotated[ MyAssetService , Depends(asset_service)]

def my_coin_cash_instance(asset:Literal["coin","cash"], code: str,update_data: Annotated[MyCashForUpdate | MyCoinForUpdate, Body()]):
    if asset =='coin':
        return MyCoin(code=code,quantity=update_data.quantity,average_purchase_price=update_data.average_purchase_price)
    else:
        return MyCash(currency=code,balance=update_data.balance)

def my_stock_instance(asset:Literal["stock"],code:str,market:Market,update_data : MyStockForUpdate):
    if asset =='stock':
        return MyStock(code=code,market=market,quantity=update_data.quantity,average_purchase_price=update_data.average_purchase_price)
    

MyCoinOrMyCash = Annotated[MyCash | MyCoin , Depends(my_coin_cash_instance)]
MyAssetStock = Annotated[MyStock,Depends(my_stock_instance)]

#get
@router.get("/{asset}",tags=["my-asset"])
def get_my_asset(service : CommonService):
    assets = service.find_my_asset()
    return {"output": assets}

#post
 
#multi body순서때문에 필드가 유실되는 버그
@router.post("/{asset}",tags=["my-asset"])
def post_my_asset(my_asset: MyStock | MyCash | MyCoin ,service: CommonService):
    result = service.enter_my_asset(my_asset)
    return {"output": result}

# put
@router.put("/{asset}/{code}",tags=["my-asset"])
def put_my_asset_cash_coin(my_asset: MyCoinOrMyCash, service:CommonService):
    result = service.update_my_asset(my_asset)
    return {"output":result}

@router.put("/{asset}/{code}/{market}",tags=["my-asset"])
def put_my_asset_stock(my_asset: MyAssetStock, service:CommonService):
    result = service.update_my_asset(my_asset)  
    return {"output":result}




#delete

def coin_cash_base(asset:Literal["coin","cash"],code: str):
    if asset =='cash':
        return CashBase(currency=code)
    else:
        return CoinBase(code=code)
def stock_base(asset:Literal["stock"],code: str,market:Market):
    if asset == "stock":
        return StockBase(code=code,market=market)

@router.delete("/{asset}/{code}",tags=["my-asset"])
def delete_my_asset_cash_coin(my_asset : Annotated[CashBase | CoinBase, Depends(coin_cash_base)], service:CommonService):
    result = service.remove_my_asset(my_asset)
    return {"output": result}

@router.delete("/{asset}/{code}/{market}",tags=["my-asset"])
def delete_my_asset_stock(my_asset : Annotated[StockBase, Depends(stock_base)], service:CommonService):
    result = service.remove_my_asset(my_asset)
    return {"output": result}
