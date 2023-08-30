
from typing import Tuple
from pydantic import validate_arguments
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import UnmappedInstanceError,StaleDataError
from database import SessionLocal
from sqlalchemy import Row, select, update
from domain.model.user import UserModel
from domain.schema.user import UserIn,UserSecret
class UserRepositorty:



    @classmethod
    @validate_arguments
    def read(cls, user_id : str ) -> UserSecret | None:
        with SessionLocal() as session:
            stmt = select(UserModel).where(UserModel.id == user_id)
            result = session.execute(stmt)
            user_model = result.one_or_none()
            if user_model is None:
                return None
            user_secret = UserSecret(**user_model[0].__dict__)
            return user_secret
    @classmethod
    @validate_arguments
    def create(cls,user:UserIn) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin(): 
                    mapped_user = UserModel(**user.dict())
                    session.add(mapped_user)
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
    def update(cls, my_cash :UserIn) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin():
                    stmt = update(UserModel)
                    data = my_cash.dict()
                    
                    result = session.execute(stmt,[data])    
        except StaleDataError as e:
            print("0 matched...",e)
            raise e
        else:
            result = True
        return result
    @classmethod
    @validate_arguments
    def delete(cls, user_id : str) -> bool: 
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    target = session.get(UserModel,user_id)
                    session.delete(target)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
            raise e
        else:
            result = True
        return result