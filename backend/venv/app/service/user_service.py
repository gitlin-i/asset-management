
from abc import ABCMeta, abstractmethod,  abstractstaticmethod
from domain.schema.user import UserIn, UserOut
from sqlalchemy.orm import Session
from bcrypt import gensalt, hashpw, checkpw
from repository.user_repository import UserRepositorty
from fastapi import HTTPException
from domain.model.user import User
class UserBase(metaclass= ABCMeta):

    @abstractstaticmethod
    def register_user():
        pass
    @abstractstaticmethod
    def find_user():
        pass


class UserService(UserBase):

    @staticmethod
    def hash_password(password: str) -> bytes:
        encoded_password = password.encode("utf-8")
        salt = gensalt()
        hashed_passowrd = hashpw(encoded_password, salt)
        return hashed_passowrd
    @staticmethod
    def verify_password(plain_password:str, hashed_password: bytes) -> bool:
        return checkpw(plain_password.encode(encoding="utf-8"),hashed_password)
    
    @staticmethod
    def find_user(db : Session ,id : str) -> User:
        try:
            user = UserRepositorty(session=db).read_user_by_id(id)
        except:
            raise RuntimeError(user)
        
        return user

    @staticmethod
    def register_user( db: Session, user:UserIn) -> UserOut:
        repo = UserRepositorty(session=db)
        already_exist = repo.read_user_by_id(user.id)
        if (already_exist):
            raise HTTPException(status_code=400, detail="이미 존재하는 아이디입니다.")
        user.password = UserService.hash_password(user.password)
        result = repo.create_user(user=user)
        return result
    
    
    
    