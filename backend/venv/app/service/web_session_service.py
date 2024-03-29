from uuid import UUID, uuid4
from repository.web_session_repository import WebSessionRepositorty
from domain.schema.web_session import WebSession, WebSessionWithDate
from exception.exception import LoginSessionException


class WebSessionService:
    @classmethod
    def register_web_session(cls,user_id: str) -> UUID | None:
        new_web_session_uuid = uuid4()
        new_web_session = WebSession(uuid=new_web_session_uuid, user_id=user_id)
        create_result = WebSessionRepositorty.create(new_web_session)
        if create_result:
            return new_web_session_uuid
        return None
    
    @classmethod
    def refresh_web_session(cls, uuid:UUID) -> UUID:
        try:
            read_result = WebSessionRepositorty.read(uuid)
            old_web_session  = WebSessionWithDate(**read_result[0].__dict__)
            WebSessionRepositorty.delete(old_web_session.uuid)
            new_uuid = cls.register_web_session(old_web_session.user_id)
        except Exception as e:
            raise e
        return new_uuid

    
    @classmethod
    def find_user_id(cls, uuid: UUID) -> str :
        read_result = WebSessionRepositorty.read(uuid)
        if read_result is None:
            raise LoginSessionException("Unknown_session")
        web_session = WebSessionWithDate(**read_result[0].__dict__)
        if web_session.isOld():
            WebSessionRepositorty.delete(web_session.uuid)
            raise LoginSessionException("expired_session")
        return web_session.user_id
