
from sqlalchemy.orm import  Mapped, mapped_column
from sqlalchemy import String
from sqlalchemy.dialects.mysql import DECIMAL,TINYINT
from database import Base


class MyRatioModel(Base):
    __tablename__ = "my_ratio"
    user_id :Mapped[str] = mapped_column(String(10) ,primary_key=True)
    asset_code: Mapped[int] = mapped_column(TINYINT,primary_key=True)
    ratio_name : Mapped[str] = mapped_column(String(16),primary_key=True)
    ratio: Mapped[DECIMAL] = mapped_column(DECIMAL(precision=17,scale=8))

