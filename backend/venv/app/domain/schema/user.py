from bcrypt import gensalt, hashpw
from pydantic import BaseModel, SecretBytes, validator

class User(BaseModel):
    id: str
    name: str
    @validator('id')
    def field_check(v : str):
        if len(v) < 2:
            raise ValueError("id가 짧습니다.")
        if ' ' in v:
            raise ValueError("공백 불가")
    #orm_mode 필수
    class Config:
        orm_mode = True

class UserIn(User):
    password : str | bytes

    @validator('password')
    def hash_password(v):
        if isinstance(v, str):
            encoded_password = v.encode("utf-8")
            salt = gensalt()
            hashed_passowrd = hashpw(encoded_password, salt)
            return hashed_passowrd
        return v 
    
class UserSecret(User):
    password: SecretBytes


class LoginUser(BaseModel):
    id: str
    password : str | bytes

    class Config:
        orm_mode = True
        