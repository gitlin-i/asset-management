from uuid import UUID, uuid4
from repository.web_session_repository import WebSessionRepositorty
from database import SessionLocal
from sqlalchemy.orm import Session
from domain.schema.web_session import WebSession
from fastapi import Depends


class WebSessionService:
    @staticmethod
    def register_web_session(userId: str) -> UUID:
        new_web_session_value = uuid4()

        new_web_session = WebSession(uuid=new_web_session_value, user_id=userId)
        with SessionLocal() as db:
            WebSessionRepositorty(db).create_web_session(new_web_session)
        return new_web_session_value
    
    @staticmethod
    def read_current_user_id(uuid: UUID) -> str :
        with SessionLocal() as db:
            web_session_model = WebSessionRepositorty(db).read_web_session(uuid)
        return web_session_model.user_id