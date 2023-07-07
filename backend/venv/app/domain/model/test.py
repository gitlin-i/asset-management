from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String


class Base(DeclarativeBase):
    pass

class Test(Base):
    __tablename__ = "TEST"

    id : Mapped[int] = mapped_column(primary_key=True)
    name : Mapped[str] = mapped_column(String(10))
    
    def __repr__(self) -> str:
        return "Test(id = {}, name = {})".format(self.id, self.name)