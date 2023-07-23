from abc import ABCMeta, abstractmethod
from database import SessionLocal
from sqlalchemy import select
class Repository(metaClass= ABCMeta):
    @abstractmethod
    def read():
        pass
    @abstractmethod
    def update():
        pass
    @abstractmethod
    def create():
        pass
    @abstractmethod
    def delete():
        pass

class StockRepository(Repository):
    def read(market, stock_code):
        with SessionLocal() as session:
            stmt = select()
            session.begin()