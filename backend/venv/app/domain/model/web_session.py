from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String
from sqlalchemy import func
from datetime import datetime

class Base(DeclarativeBase):
    created_date : Mapped[datetime] = mapped_column(insert_default=func.now())
    last_used_date : Mapped[datetime] = mapped_column(insert_default=func.now())
    pass

class WebSession(Base):
    __tablename__ = "web_session"
    
    uuid : Mapped[str] = mapped_column(String(36),primary_key=True)
    user_id: Mapped[str] = mapped_column(String(10))
    
    
