from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String
from sqlalchemy import func
from datetime import datetime

class Base(DeclarativeBase):
    pass

class StockCurrentPrice(Base):
    __tablename__ = "stock_current_price"
    code : Mapped[str] = mapped_column(String(10),primary_key=True)
    market: Mapped[str] = mapped_column(String(6),primary_key=True)
    price : Mapped[str] = mapped_column(int)


    
    def __repr__(self) -> str:
        return "StockPrice(market = {}, code = {}, name = {})".format(self.market, self.code)
    