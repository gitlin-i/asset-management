from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, TIMESTAMP
from sqlalchemy import func
from datetime import datetime
from domain.schema.stock import getCurrency
class Base(DeclarativeBase):
    pass

class StockCurrentPriceModel(Base):
    __tablename__ = "stock_current_price"
    code : Mapped[str] = mapped_column(String(16),primary_key=True)
    market: Mapped[str] = mapped_column(String(10),primary_key=True)
    price : Mapped[int]  = mapped_column(default=0)
    updated_date : Mapped[datetime] = mapped_column(TIMESTAMP,insert_default=func.now(),onupdate=func.now())
    
    
    def __eq__(self, other):
        if isinstance(other, StockCurrentPriceModel):
            return (
                getCurrency(self.market) == getCurrency(other.market)
                and self.code == other.code
                and self.price == other.price
            )
        return False