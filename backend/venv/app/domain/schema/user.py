from pydantic import BaseModel

#test
class User1(BaseModel):
    username: str
    name: str | None = None
    email: str | None = None
    disable: bool | None = None

class User(BaseModel):
    id: str
    name: str
    
    def __repr__(self):
        print("id: {}, name: {}".format(self.id, self.name))

class UserIn(User):
    password: str 
    pass
class UserOut(User):
    pass