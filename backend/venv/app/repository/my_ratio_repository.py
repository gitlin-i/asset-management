
from sqlalchemy import Row, delete,select, update
from repository.repository import Repository
from pydantic import validate_arguments
from domain.schema.my_ratio import MyRatioIn,asset_to_int_mapper
from domain.model.my_ratio import MyRatioModel

from database import SessionLocal
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import StaleDataError,UnmappedInstanceError


class MyRatioRepository(Repository):
    @classmethod
    @validate_arguments
    def read_by_user_id(cls, user_id : str ) -> list[Row[MyRatioModel]]:
        with SessionLocal() as session:
            stmt = select(MyRatioModel).where(MyRatioModel.user_id == user_id)
            result = session.execute(stmt)
            return list(result.all())
        
    @classmethod
    @validate_arguments
    def read_by_user_id_asset(cls, user_id : str, asset : str ) -> Row[MyRatioModel] :
        asset_code = asset_to_int_mapper[asset]
        with SessionLocal() as session:
            stmt = select(MyRatioModel).where(MyRatioModel.user_id == user_id).where(MyRatioModel.asset_code == asset_code)
            result = session.execute(stmt)
            return list(result.all())
        
    @classmethod
    @validate_arguments
    def read_by_user_id_asset_ratio_name(cls, user_id : str, asset : str, ratio_name : str ) -> Row[MyRatioModel] :
        asset_code = asset_to_int_mapper[asset]
        with SessionLocal() as session:
            stmt = select(MyRatioModel).where(MyRatioModel.user_id == user_id).where(MyRatioModel.asset_code == asset_code).where(MyRatioModel.ratio_name == ratio_name)
            result = session.execute(stmt)
            return result.one()

        
    @classmethod
    @validate_arguments
    def create(cls, user_id : str, my_ratio : MyRatioIn) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin(): 
                    mapped_model = MyRatioModel(**my_ratio.dict(), user_id= user_id)
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
    def update(cls,user_id :str, my_ratio :MyRatioIn) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin():
                    stmt = update(MyRatioModel)
                    data = my_ratio.dict()
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
    def delete(cls, user_id : str,asset_code: int, ratio_name:str) -> bool: 
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    target = session.get(MyRatioModel,(user_id,asset_code,ratio_name))
                    session.delete(target)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
            raise e
        else:
            result = True
        return result
    
    @classmethod
    @validate_arguments
    def delete_by_user_id(cls, user_id : str) -> bool: 
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    stmt = delete(MyRatioModel).where(MyRatioModel.user_id == user_id)
                    session.execute(stmt)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
            raise e
        else:
            result = True
        return result


