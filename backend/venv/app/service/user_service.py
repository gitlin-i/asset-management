
from uuid import UUID
from domain.schema.user import UserIn,User
from bcrypt import gensalt, hashpw, checkpw
from repository.user_repository import UserRepositorty
from service.web_session_service import WebSessionService
from fastapi import HTTPException


class UserService:

    @classmethod
    def hash_password(password: str) -> bytes:
        encoded_password = password.encode("utf-8")
        salt = gensalt()
        hashed_passowrd = hashpw(encoded_password, salt)
        return hashed_passowrd
    @classmethod
    def verify_password(cls,plain_password:str, hashed_password: bytes) -> bool:
        if isinstance(plain_password, str):
            return checkpw(plain_password.encode(encoding="utf-8"),hashed_password)
        return checkpw(plain_password,hashed_password)
    
    @classmethod
    def login(cls, user:UserIn) -> UUID:
        user_secret = UserRepositorty.read(user.id)
        if not user_secret:
            raise ValueError("id가 존재하지 않습니다.")
        is_verified = cls.verify_password(user.password, user_secret.password.get_secret_value())
        if not is_verified:
            raise ValueError("비밀번호가 일치하지 않습니다.")
        

        created_session_uuid = WebSessionService.register_web_session(user.id)
        return created_session_uuid
        
    @classmethod
    def info(cls, session_id : UUID):
        user_id = WebSessionService.find_user_id(session_id)
        user_info = UserRepositorty.read(user_id)
        return User(**user_info.dict())


    @classmethod
    def register_user(cls,user:UserIn) -> bool:
        already_exist = UserRepositorty.read(user.id)
        if already_exist:
            raise HTTPException(status_code=400, detail="이미 존재하는 아이디입니다.")
        
        create_result = UserRepositorty.create(user)
        return create_result
    
    
    
    