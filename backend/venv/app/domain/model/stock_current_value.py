from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String
from sqlalchemy import func
from datetime import datetime

class Base(DeclarativeBase):
    pass

class StockCurrentValue(Base):
    __tablename__ = "stock_current_value"
    market: Mapped[str] = mapped_column(String(6),primary_key=True)
    code : Mapped[str] = mapped_column(String(10),primary_key=True)
    value : Mapped[str] = mapped_column(int)


    
    def __repr__(self) -> str:
        return "StockInfo(market = {}, code = {}, name = {})".format(self.market, self.code, self.name)
    