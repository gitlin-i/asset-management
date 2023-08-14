
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String
from sqlalchemy.dialects.mysql import DECIMAL
from database import Base


class MyCoinModel(Base):
    __tablename__ = "my_coin"
    user_id :Mapped[str] = mapped_column(String(10) ,primary_key=True)
    code : Mapped[str] = mapped_column(String(16),primary_key=True)

    quantity: Mapped[DECIMAL] = mapped_column(DECIMAL(precision=17,scale=8))
    average_purchase_price : Mapped[DECIMAL] = mapped_column(DECIMAL(precision=14,scale=4))