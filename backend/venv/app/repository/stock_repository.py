

from database import SessionLocal
from sqlalchemy import Row, select, update

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import UnmappedInstanceError,StaleDataError
from repository.repository import Repository
from pydantic import validate_arguments
from domain.model.stock_info import StockInfoModel 
from domain.model.stock_current_price import StockCurrentPriceModel
from domain.schema.stock import StockInfo,StockPrice
from domain.schema.market import Market

class StockInfoRepository(Repository):
    @classmethod
    @validate_arguments
    def read(cls, stock_code : str ,market: Market) -> StockInfoModel | None:
        with SessionLocal() as session:
            stmt = select(StockInfoModel).where(StockInfoModel.code == stock_code).where(StockInfoModel.market == market.value)
            result = session.execute(stmt)
            return result.one_or_none()
    @classmethod
    @validate_arguments
    def create(cls,stock_info: StockInfo) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin(): 
                    mapped_model = StockInfoModel(**stock_info.dict())
                    session.add(mapped_model)
        except AttributeError as e:
            print("속성 에러, 매개변수 타입 확인 : ", e)
            raise e
        except IntegrityError as e:
            print("중복 키, 이미 키가 존재함.",e)
            raise e
        else:
            result = True
        return result
    @classmethod
    @validate_arguments
    def update(cls,stock_info: StockInfo) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin():
                    stmt = update(StockInfoModel)
                    result = session.execute(stmt,[stock_info.dict()])    
        except StaleDataError as e:
            print("0 matched...",e)
            raise e
        else:
            result = True
        return result
    @classmethod
    @validate_arguments
    def delete(cls, stock_code, market:Market) -> bool: 
        if not isinstance(stock_code,str) or not isinstance(market, Market):
            raise TypeError
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    target = session.get(StockInfoModel,(stock_code,market.value))
                    session.delete(target)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
            raise e
        else:
            result = True
        return result

class StockCurPriceRepository(Repository):
    @classmethod
    @validate_arguments
    def read(cls,stock_code : str ,market: Market) -> StockCurrentPriceModel | None:
        with SessionLocal() as session:
            stmt = select(StockCurrentPriceModel).where(StockCurrentPriceModel.code == stock_code).where(StockCurrentPriceModel.market == market.value)
            result = session.execute(stmt)
            return result.one_or_none()
        
    @classmethod
    @validate_arguments    
    def create(cls,stock: StockPrice) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin(): 
                    mapped_model = StockCurrentPriceModel(**stock.dict())
                    session.add(mapped_model)
                    
        except AttributeError as e:
            print("속성 에러, 매개변수 타입 확인 : ", e)
            raise e
        except IntegrityError as e:
            print("중복 키, 이미 키가 존재함.",e)
            raise e
        else:
            result = True
        return result
    
    @classmethod
    @validate_arguments    
    def update(cls,stock: StockPrice) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin():
                    stmt = update(StockCurrentPriceModel)
                    result = session.execute(stmt,[stock.dict(exclude={"updated_date"})])    
        except StaleDataError as e:
            print("0 matched...",e)
            raise e
        else:
            result = True
        return result
    
    @classmethod
    @validate_arguments
    def delete(cls,stock_code, market:Market) -> bool: 
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    target = session.get(StockCurrentPriceModel,(stock_code,market.value))
                    session.delete(target)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
            raise e
        else:
            result = True
        return result
