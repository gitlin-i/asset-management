from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import DeclarativeBase as Base


class Stock(Base):
    __tablename__ = "STOCK"

    code : Mapped[str] = mapped_column(String, primary_key=True)
    name : Mapped[str] = mapped_column(String,index=True)
    market : Mapped[str] = mapped_column(String)

class StockCurrentPrice(Base):
    __tablename__ = "STOCK_CURRENT_PRICE"

    code = mapped_column(String,primary_key=True)
    cur_price = Column(Integer)

    