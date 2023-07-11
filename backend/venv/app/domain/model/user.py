from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String
from sqlalchemy import func
from datetime import datetime

class Base(DeclarativeBase):
    created_date : Mapped[datetime] = mapped_column(insert_default=func.now())
    updated_date : Mapped[datetime] = mapped_column(insert_default=func.now())
    pass

class User(Base):
    __tablename__ = "user"
    

    id : Mapped[str] = mapped_column(String(10),primary_key=True)
    name : Mapped[str] = mapped_column(String(30))
    password: Mapped[str] = mapped_column(String(64))
    
    def __repr__(self) -> str:
        return "UserModel(id = {}, name = {}, password = {})".format(self.id, self.name, self.password)
    