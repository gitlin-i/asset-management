from sqlalchemy import Row, Sequence,select, update
from repository.repository import Repository
from pydantic import validate_arguments
from domain.schema.stock import MyStock,StockBase
from domain.model.my_stock import MyStockModel
from database import SessionLocal
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import StaleDataError,UnmappedInstanceError


class MyStockRepository(Repository):
    @classmethod
    @validate_arguments
    def read(cls, user_id : str ) -> list[Row[MyStockModel]] | None:
        with SessionLocal() as session:
            stmt = select(MyStockModel).where(MyStockModel.user_id == user_id)
            result = session.execute(stmt)
            return list(result.all())
        
    @classmethod
    @validate_arguments
    def create(cls,user_id : str, my_stock: MyStock) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin(): 
                    mapped_model = MyStockModel(**my_stock.dict(), user_id= user_id)
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
    def update(cls,user_id :str, my_stock :MyStock) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin():
                    stmt = update(MyStockModel)
                    data = my_stock.dict()
                    data.update({"user_id": user_id})
                    
                    result = session.execute(stmt,[data])    
        except StaleDataError as e:
            print("0 matched...",e)
            raise e
        else:
            result = True
        return result
    

    @classmethod
    @validate_arguments
    def delete(cls, user_id : str, my_stock: MyStock | StockBase) -> bool: 
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    target = session.get(MyStockModel,(user_id,my_stock.code,my_stock.market))
                    session.delete(target)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
            raise e
        else:
            result = True
        return result

