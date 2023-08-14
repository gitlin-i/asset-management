from typing import Annotated
from pydantic import BaseModel, Field, validator
from decimal import Decimal
from domain.schema.currency import Currency
from domain.schema.util import is_in_db_decimal_range
class CashBase(BaseModel):
    currency: str

    @validator('currency')
    def currency_in_real_currency_code(cls, v:str) -> str:
        if v not in [currency.value for currency in Currency]:
            raise ValueError
        return v
    class Config:
        orm_mode = True
        allow_mutation :False



def count_decimal_places(target_number: int | float)-> bool:
    if isinstance(target_number, (int, float)):
        parse_number = str(target_number).split('.')
        if len(parse_number) == 1 :
            return 0
        return len(parse_number[-1])
    else:
        raise TypeError
    
class MyCash(CashBase):
    balance: Decimal

    _is_in_db_decimal_range_balance = validator("balance",allow_reuse=True)(is_in_db_decimal_range(integer_range=10,decimal_digits_range=2))

    
    def exchange(self, rate: float) -> float:
        return self.balance * rate
    
