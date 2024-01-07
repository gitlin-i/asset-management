from pydantic import BaseModel, validator
from decimal import Decimal
from domain.schema.util import is_in_db_decimal_range
class CoinBase(BaseModel):
    code: str # upbit market field
    
    class Config:
        orm_mode = True
        allow_mutation :False


class CoinPrice(CoinBase):
    price: float

class MyCoinForUpdate(BaseModel):
    quantity: Decimal
    average_purchase_price :Decimal | None

    @validator("average_purchase_price")
    def is_none_value(v: Decimal | None):
        if v is None:
            return Decimal(0)
        return v


    #validator
    _is_in_db_decimal_range_quantity = validator('quantity', allow_reuse= True)(is_in_db_decimal_range(integer_range=9,decimal_digits_range=8))
    _is_in_db_decimal_range_average_purchase_price = validator('average_purchase_price', allow_reuse= True)(is_in_db_decimal_range(integer_range=10,decimal_digits_range=4))
class MyCoin(CoinBase, MyCoinForUpdate):
    pass
class CoinPriceListOutPut(BaseModel):
    output : list[CoinPrice] | list[None]
    fail_input : list[str] | list[None]

