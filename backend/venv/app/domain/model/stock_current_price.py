from typing import Optional
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, TIMESTAMP
from sqlalchemy import func, text
from datetime import datetime
from domain.schema.stock import getCurrency
from database import Base
from sqlalchemy.dialects.mysql import DECIMAL

class StockCurrentPriceModel(Base):
    __tablename__ = "stock_current_price"
    code : Mapped[str] = mapped_column(String(16),primary_key=True)
    market: Mapped[str] = mapped_column(String(10),primary_key=True)
    price : Mapped[DECIMAL]  = mapped_column(DECIMAL(precision=13,scale=4))
    updated_date : Mapped[datetime] = mapped_column(TIMESTAMP,server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
    
    
    def __eq__(self, other):
        if isinstance(other, StockCurrentPriceModel):
            return (
                getCurrency(self.market) == getCurrency(other.market)
                and self.code == other.code
                and self.price == other.price
            )
        return False