

from decimal import Decimal
from pydantic import BaseModel


class ExchangeRateBase(BaseModel):

    currency: str
    class Config:
        orm_mode = True
        allow_mutation :False

class ExchangeRate(ExchangeRateBase):
    base_rate : Decimal

class ExchageRateOutput(BaseModel):
    output: list[ExchangeRate | None]  = []
    fail_input: list[str | None] = []
