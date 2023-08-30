from bcrypt import gensalt, hashpw
from pydantic import BaseModel, SecretBytes, validator

class User(BaseModel):
    id: str
    name: str

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
