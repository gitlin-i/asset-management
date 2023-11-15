
from decimal import Decimal
from fastapi import APIRouter, Cookie, HTTPException
from service.my_ratio_service import MyRatioService
from domain.schema.my_ratio import MyRatioIn, asset_to_int_mapper, MyRatioForUpdate,Category
from typing import Annotated
router = APIRouter(
    prefix="/my-ratio"
)
#get
@router.get("",tags=["my-ratio"])
def my_ratio(session_id : Annotated[str| None, Cookie()] = None ):
    if not session_id:
        raise HTTPException(400,detail="login을 해주세요.")
    service = MyRatioService(session_id)
    ratios = service.find_my_ratio()
    return {"output": ratios}


#post

@router.post("",tags=["my-ratio"])
def my_ratio(my_ratio : MyRatioIn, session_id : Annotated[str| None, Cookie()] = None ):
    if not session_id:
        raise HTTPException(400,detail="login을 해주세요.")
    result = MyRatioService(session_id).enter_my_ratio(my_ratio)
    return {"output" : result}


#put
@router.put("/{asset}/{ratio_name}",tags=["my-ratio"])
def my_ratio( asset: Category,ratio_name: str,ratio : MyRatioForUpdate,session_id : Annotated[str| None, Cookie()] = None, ):
    if not session_id:
        raise HTTPException(400,detail="login을 해주세요.")
    try:
        asset_code = asset_to_int_mapper[asset]
    except:
        raise HTTPException(404,detail="찾을 수 없는 asset_code입니다.")
    service = MyRatioService(session_id)
    my_ratio = MyRatioIn(asset_code=asset_code,ratio_name=ratio_name,ratio=ratio.ratio)
    result = service.edit_my_ratio(my_ratio)
    return {"output": result}

#delete
@router.delete("/{asset}/{ratio_name}",tags=["my-ratio"])
def my_ratio( asset: Category ,ratio_name: str, session_id : Annotated[str| None, Cookie()] = None, ):
    if not session_id:
        raise HTTPException(400,detail="login을 해주세요.")

    service = MyRatioService(session_id)
    result = service.remove_my_ratio(asset,ratio_name)
    return {"output": result}
