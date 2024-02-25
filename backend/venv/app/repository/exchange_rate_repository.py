from sqlalchemy import Row, delete, insert,select, update
from repository.repository import Repository
from pydantic import validate_arguments
from domain.model.exchange_rate import ExchangeRateModel
from domain.schema.exchange_rate import ExchangeRate
from database import SessionLocal
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import StaleDataError,UnmappedInstanceError


class ExchangeRateRepository(Repository):

    @classmethod
    @validate_arguments
    def read(cls, currency_code: str) ->Row[ExchangeRateModel] | None:
        with SessionLocal() as session:
            stmt = select(ExchangeRateModel).where(ExchangeRateModel.currency == currency_code)
            result = session.execute(stmt)
            return result.one_or_none()
    
    @classmethod
    @validate_arguments
    def read_bulk(cls,currency_codes: list[str]) -> list[Row[ExchangeRateModel]] | None:
        with SessionLocal() as session:
            stmt = select(ExchangeRateModel).where(ExchangeRateModel.currency.in_(currency_codes))
            result = session.execute(stmt)
            return list(result.all())
    @classmethod
    @validate_arguments
    def read_all(cls) -> list[Row[ExchangeRateModel]] | None:
        with SessionLocal() as session:
            stmt = select(ExchangeRateModel)
            result = session.execute(stmt)
            return list(result.all())
    @classmethod
    @validate_arguments
    def create(cls, exchange_rate : ExchangeRate) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin(): 
                    mapped_model = ExchangeRateModel(**exchange_rate.dict())
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
    def create_bulk(cls,exchange_rate_list: list[ExchangeRate]) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin(): 
                    # mapped_models = [ ExchangeRate(**exchange_rate.dict()) for exchange_rate in exchange_rate_list]
                    stmt = insert(ExchangeRateModel)
                    session.execute(stmt,exchange_rate_list)

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
    def update(cls, exchange_rate: ExchangeRate) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin():
                    stmt = update(ExchangeRateModel)
                    result = session.execute(stmt,[exchange_rate.dict()])    
        except StaleDataError as e:
            print("0 matched...",e)
            raise e
        else:
            result = True
        return result
    
    @classmethod
    @validate_arguments
    def update_bulk(cls, exchange_rates: list[ExchangeRate]) -> bool:
        result = False
        try:
            with SessionLocal() as session:
                with session.begin():
                    stmt = update(ExchangeRateModel)
                    mapped_list = [ exchange_rate.dict() for exchange_rate in exchange_rates ]
                    result = session.execute(stmt,mapped_list)    
        except StaleDataError as e:
            print("0 matched...",e)
            raise e
        else:
            result = True
        return result

    @classmethod
    @validate_arguments
    def delete(cls, currency:str ) -> bool: 
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    target = session.get(ExchangeRateModel,currency)
                    session.delete(target)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
            raise e
        else:
            result = True
        return result
    @classmethod
    @validate_arguments
    def delete_bulk(cls, currency_list:list[str] ) -> bool: 
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    stmt = delete(ExchangeRateModel).where(ExchangeRateModel.currency.in_(currency_list))
                    session.execute(stmt)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
            raise e
        else:
            result = True
        return result

