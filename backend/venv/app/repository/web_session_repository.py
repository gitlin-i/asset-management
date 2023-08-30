from sqlalchemy.orm import Session
from sqlalchemy import Row, select
from domain.model.web_session import WebSession as model
from domain.schema.web_session import WebSession as schema
from uuid import UUID
from database import SessionLocal
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import UnmappedInstanceError

class WebSessionRepositorty:

    @classmethod
    def create(cls, web_session: schema):
        result = False
        try:
            with SessionLocal() as session:
                with session.begin(): 
                    mapped_model = model(**web_session.dict())
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
    def read(cls, uuid: UUID) -> Row[model] | None:
        with SessionLocal() as session:
            stmt = select(model).where(model.uuid == uuid)
            result = session.execute(stmt)
            return result.one_or_none()


    @classmethod
    def delete(cls, uuid: UUID) -> bool: 
        result = False
        try: 
            with SessionLocal() as session:
                with session.begin():
                    target = session.get(model,uuid)
                    session.delete(target)
        except UnmappedInstanceError as e:
            print("존재하지 않는 인스턴스: ", e)
            raise e
        else:
            result = True
        return result

