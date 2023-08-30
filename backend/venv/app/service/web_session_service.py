from uuid import UUID, uuid4
from repository.web_session_repository import WebSessionRepositorty
from database import SessionLocal
from sqlalchemy.orm import Session
from domain.schema.web_session import WebSession
from fastapi import Depends


class WebSessionService:
    @classmethod
    def register_web_session(user_id: str) -> bool:
        new_web_session_value = uuid4()
        new_web_session = WebSession(uuid=new_web_session_value, user_id=user_id)
        result = WebSessionRepositorty.create(new_web_session)
        return result
        
    
    @classmethod
    def read_current_user_id(cls, uuid: UUID) -> str :
        read_result = WebSessionRepositorty.read(uuid)
        user_id = read_result[0].user_id
        return user_id