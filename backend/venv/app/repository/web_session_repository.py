from sqlalchemy.orm import Session
from sqlalchemy import select
from domain.model.web_session import WebSession as model
from domain.schema.web_session import WebSession as schema
from uuid import UUID
class WebSessionRepositorty:
    def __init__(self, session :Session) -> None:
        self.store = session

    def create_web_session(self, web_session: schema):
        try:
            mapped_web_session = model(**web_session.dict())
            self.store.add(mapped_web_session)
            self.store.commit()
            result = mapped_web_session
        except:
            result = None
            raise RuntimeError("생성 실패")
        return result


    def read_web_session(self, web_session_uuid : UUID):
        stmt = select(model).where(model.uuid == web_session_uuid)
        web_session = self.store.scalar(stmt)
        return web_session


    def delete_web_session(self, web_session_uuid : UUID):
        try:

            target_session = self.store.get(model,web_session_uuid)
            self.store.delete(target_session)
            self.store.commit()
            result = target_session
        except:
            result = None
            raise RuntimeError("삭제 실패")
        return result
    

