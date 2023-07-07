
from abc import ABCMeta, abstractmethod
from domain.schema.user import UserIn, UserOut
from sqlalchemy.orm import Session
from bcrypt import gensalt, hashpw, checkpw
from repository.user_repository import UserRepositorty
class UserBase(metaclass= ABCMeta):

    @abstractmethod
    def register_user():
        pass
    @abstractmethod
    def find_user():
        pass

class UserService(UserBase):

    def hash_password(self, password: str) -> bytes:
        encoded_password = password.encode("utf-8")
        salt = gensalt()
        hashed_passowrd = hashpw(encoded_password, salt)
        return hashed_passowrd
    def verify_password(self, password:str, hashed_password: bytes):
        return checkpw(password.encode(encoding="utf-8"),hashed_password)
    
    def find_user(self, db : Session ,id : str):
        try:
            user = UserRepositorty(session=db).read_user_by_id(id)
            print("#####")
            print(user)
            print(type(user))
        except:
            raise RuntimeError(user)
        return user

    def register_user(self, db: Session, user:UserIn):
        repo = UserRepositorty(session=db)
        already_exist = repo.read_user_by_id(user.id)
        if (already_exist):
            raise RuntimeError("이미 존재하는 아이디")
        user.password = self.hash_password(user.password)
        result = repo.create_user(user=user)
        return result
    
    