from sqlalchemy.orm import Session
from sqlalchemy import select
from domain.model.user import User as model
from domain.schema.user import UserIn as schema
class UserRepositorty():
    def __init__(self,session :Session) -> None:
        self.db = session

    def read_user_by_id(self,id) -> model | None:
        stmt = select(model).where(model.id == id)
        try:
            user = self.db.scalar(stmt)
        except :
            raise RuntimeError("something wrong.")

        return user
    
    def create_user(self,user:schema) -> schema | None:
        try:
            mapped_user = model(**user.dict())
            self.db.add(mapped_user)
            self.db.commit()
        except:
            user.result = "something wrong."

        return user 
    