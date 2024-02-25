
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import  String, Numeric
from database import Base,engine
from sqlalchemy.dialects.mysql import DECIMAL


class MyCashModel(Base):
    __tablename__ = "my_cash"
    user_id :Mapped[str] = mapped_column(String(10) ,primary_key=True)
    currency : Mapped[str] = mapped_column(String(8),primary_key=True)
    balance : Mapped[DECIMAL] = mapped_column(DECIMAL(precision=12,scale=2))
