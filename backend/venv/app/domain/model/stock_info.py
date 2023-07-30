from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String


class Base(DeclarativeBase):
    pass

class StockInfoModel(Base):
    __tablename__ = "stock_info"
    code : Mapped[str] = mapped_column(String(16),primary_key=True)
    market: Mapped[str] = mapped_column(String(10),primary_key=True)
    name : Mapped[str] = mapped_column(String(64))

    
    
    def __eq__(self, other):
        if isinstance(other, StockInfoModel):
            return (
                self.market == other.market
                and self.code == other.code
                and self.name == other.name
            )
        return False