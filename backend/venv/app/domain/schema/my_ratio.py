from decimal import Decimal
from typing import Literal
from pydantic import BaseModel, Field, validator

Category = Literal["assets","stock", "coin","cash"]
asset_to_int_mapper = {
    "assets":0,
    "stock":1,
    "coin":2,
    "cash":3,
}
int_to_asset_mapper = {v: k for k, v in asset_to_int_mapper.items()}

class MyRatioBase(BaseModel):
    ratio_name : str
    ratio : Decimal
    @validator("ratio_name")
    def ratio_name_length_lt_eq_16(v:str):
        if len(v) > 16:
            raise ValueError("ratio_name 문자열 길이가 너무 깁니다.")
        return v

    @validator('ratio')
    def ratio_gt_0_and_lt_100(v:Decimal):
        if v <= 0 :
            raise ValueError("ratio가 0보다 작습니다.")
        if v > 100 :
            raise ValueError("ratio가 100보다 큽니다.")
        return v

    class Config:
        orm_mode = True
        allow_mutation :False


class MyRatioIn(MyRatioBase):

    asset_code: Literal["assets","stock","coin","cash"] | int 

    @validator("asset_code")
    def asset_mapping(v: str):
        if isinstance(v,int):
            return v
        
        return asset_to_int_mapper[v]
    
class MyRatioOut(MyRatioBase):
    asset_code: Literal["assets","stock","coin","cash"] | int 
    
    @validator("asset_code")
    def asset_mapping(v: int):
        if isinstance(v,str):
            return v
        return int_to_asset_mapper[v]
        
class MyRatioForUpdate(BaseModel):
    ratio : Decimal

    @validator('ratio')
    def is_ratio_decimal(v:Decimal):
        if not isinstance(v,Decimal):
            raise ValueError("잘못된 ratio 값입니다.")
        return v

    @validator('ratio')
    def ratio_gt_0_and_lt_100(v:Decimal):
        if v <= 0 :
            raise ValueError("ratio가 0보다 작습니다.")
        if v > 100 :
            raise ValueError("ratio가 100보다 큽니다.")
        return v
