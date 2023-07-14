from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String


class Base(DeclarativeBase):
    pass

class StockInfo(Base):
    __tablename__ = "stock_info"
    market: Mapped[str] = mapped_column(String(6),primary_key=True)
    code : Mapped[str] = mapped_column(String(10),primary_key=True)
    name : Mapped[str] = mapped_column(String(64))

    
    def __repr__(self) -> str:
        return "StockInfo(market = {}, code = {}, name = {})".format(self.market, self.code, self.name)
    