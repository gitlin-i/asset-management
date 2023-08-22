from pydantic import BaseModel, validator
from decimal import ROUND_DOWN, Decimal,getcontext
from domain.schema.util import is_in_db_decimal_range
class CoinBase(BaseModel):
    code: str # upbit market field
    
    class Config:
        orm_mode = True
        allow_mutation :False


class CoinPrice(CoinBase):
    price: float

class MyCoin(CoinBase):
    
    quantity: Decimal
    average_purchase_price :Decimal

    #validator
    _is_in_db_decimal_range_quantity = validator('quantity', allow_reuse= True)(is_in_db_decimal_range(integer_range=9,decimal_digits_range=8))
    _is_in_db_decimal_range_average_purchase_price = validator('average_purchase_price', allow_reuse= True)(is_in_db_decimal_range(integer_range=10,decimal_digits_range=4))


class CoinPriceListOutPut(BaseModel):
    output : list[CoinPrice] | list[None]
    fail_input : list[str] | list[None]

