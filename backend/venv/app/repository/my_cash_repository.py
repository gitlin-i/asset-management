from sqlalchemy import Row, Sequence,select, update
from repository.repository import Repository
from pydantic import validate_arguments
from domain.schema.cash import MyCash
from domain.model.my_cash import MyCashModel
from database import SessionLocal
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import StaleDataError,UnmappedInstanceError


class MyCashRepository(Repository):
    @classmethod
    @validate_arguments
    def read(cls, user_id : str ) -> list[Row[MyCashModel]] | None:
        with SessionLocal() as session:
            stmt = select(MyCashModel).where(MyCashModel.user_id == user_id)
            result = session.execute(stmt)
            return list(result.all())
        
    @classmethod
    @validate_arguments
    def create(cls,user_id : str, my_cash: MyCash) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin(): 
                    mapped_model = MyCashModel(**my_cash.dict(), user_id= user_id)
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
    def update(cls,user_id :str, my_cash :MyCash) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin():
                    stmt = update(MyCashModel)
                    data = my_cash.dict()
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
    def delete(cls, user_id : str, my_cash: MyCash) -> bool: 
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    target = session.get(MyCashModel,(user_id, my_cash.currency))
                    session.delete(target)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
            raise e
        else:
            result = True
        return result

