from typing import Annotated
from pydantic import BaseModel, Field, validator
from decimal import Decimal
from domain.schema.currency import Currency
from domain.schema.util import is_in_db_decimal_range
class CashBase(BaseModel):
    currency: str

    @validator('currency')
    def currency_in_real_currency_code(cls, v:str) -> str:
        if v in ["JPY","IDR"]:
            return v + "(100)"

        if v not in [currency.value for currency in Currency]:
            raise ValueError
        return v
    class Config:
        orm_mode = True
        allow_mutation :False


class MyCashForUpdate(BaseModel):
    balance: Decimal
    _is_in_db_decimal_range_balance = validator("balance",allow_reuse=True)(is_in_db_decimal_range(integer_range=10,decimal_digits_range=2))

class MyCash(CashBase, MyCashForUpdate):
    
    def exchange(self, rate: float) -> float:
        return self.balance * rate