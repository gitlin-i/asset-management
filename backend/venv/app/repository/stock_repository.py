

from database import SessionLocal
from sqlalchemy import select, update

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import UnmappedInstanceError,StaleDataError
from repository.repository import Repository


from domain.model.stock_info import StockInfoModel 
from domain.model.stock_current_price import StockCurrentPriceModel
from domain.schema.stock import Market,StockInfo,StockPrice

class StockInfoRepository(Repository):
    def read(stock_code : str ,market: Market) -> StockInfoModel | None:
        with SessionLocal() as session:
            stmt = select(StockInfoModel).where(StockInfoModel.code == stock_code).where(StockInfoModel.market == market)
            result = session.execute(stmt)
            return result.one_or_none()
            
    def create(stock: StockInfo) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin(): 
                    mapped_model = StockInfoModel(**stock.dict())
                    session.add(mapped_model)
                    result = True
        except AttributeError as e:
            print("속성 에러, 매개변수 타입 확인 : ", e)
        except IntegrityError as e:
            print("중복 키, 이미 키가 존재함.",e)
        else:
            result = True
        return result
        
    def update(stock: StockInfo) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin():
                    stmt = update(StockInfoModel)
                    result = session.execute(stmt,[stock.dict()])    
        except StaleDataError as e:
            print("0 matched...",e)
        else:
            result = True
        return result

    def delete(stock_code, market) -> bool: 
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    target = session.get(StockInfoModel,(stock_code,market))
                    session.delete(target)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
        else:
            result = True
        return result

class StockCurPriceRepository(Repository):
    def read(stock_code : str ,market: Market) -> StockCurrentPriceModel | None:
        with SessionLocal() as session:
            stmt = select(StockCurrentPriceModel).where(StockCurrentPriceModel.code == stock_code).where(StockCurrentPriceModel.market == market)
            result = session.execute(stmt)
            return result.one_or_none()
        
    def create(stock: StockPrice) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin(): 
                    mapped_model = StockCurrentPriceModel(**stock.dict())
                    session.add(mapped_model)
                    result = True
        except AttributeError as e:
            print("속성 에러, 매개변수 타입 확인 : ", e)
        except IntegrityError as e:
            print("중복 키, 이미 키가 존재함.",e)
        else:
            result = True
        return result
        
    def update(stock: StockPrice) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin():
                    stmt = update(StockCurrentPriceModel)
                    result = session.execute(stmt,[stock.dict()])    
        except StaleDataError as e:
            print("0 matched...",e)
        else:
            result = True
        return result

    def delete(stock_code, market) -> bool: 
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    target = session.get(StockCurrentPriceModel,(stock_code,market))
                    session.delete(target)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
        else:
            result = True
        return result
