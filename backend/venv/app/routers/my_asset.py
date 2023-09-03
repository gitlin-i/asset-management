
from fastapi import APIRouter, Cookie, HTTPException
from service.my_asset_service import MyAssetService
from typing import Annotated
router = APIRouter(
    prefix="/my-asset"
)


#get
@router.get("/stock")
def my_stock(session_id : Annotated[str| None, Cookie()] = None):
    if not session_id:
        raise HTTPException(400,detail="login을 해주세요.")
    service = MyAssetService("stock",session_id)
    assets = service.find_my_asset()
    return {
        "res": assets
    }
    
@router.get("/coin")
def my_coin(session_id : Annotated[str| None, Cookie()] = None):
    if not session_id:
        raise HTTPException(400,detail="login을 해주세요.")
    service = MyAssetService("coin",session_id)
    assets = service.find_my_asset()
    return {
        "res": assets
    }
@router.get("/cash")
def my_cash(session_id : Annotated[str| None, Cookie()] = None):
    if not session_id:
        raise HTTPException(400,detail="login을 해주세요.")
    service = MyAssetService("cash",session_id)
    assets = service.find_my_asset()
    return {
        "res": assets
    }
# #post
# @router.post("/stock")
# def my_stock(session_id : Annotated[str| None, Cookie()] = None):
#     if not session_id:
#         raise HTTPException(400,detail="login을 해주세요.")
#     service = MyAssetService("stock",session_id)
#     assets = service.find_my_asset()
#     return {
#         "res": assets
#     }
    
# @router.post("/coin")
# def my_coin(session_id : Annotated[str| None, Cookie()] = None):
#     if not session_id:
#         raise HTTPException(400,detail="login을 해주세요.")
#     service = MyAssetService("coin",session_id)
#     assets = service.find_my_asset()
#     return {
#         "res": assets
#     }
# @router.post("/cash")
# def my_cash(session_id : Annotated[str| None, Cookie()] = None):
#     if not session_id:
#         raise HTTPException(400,detail="login을 해주세요.")
#     service = MyAssetService("cash",session_id)
#     assets = service.find_my_asset()
#     return {
#         "res": assets
#     }