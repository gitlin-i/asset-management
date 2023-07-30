from pydantic import BaseModel
from typing import Optional
class TestBase(BaseModel):
    name: str
    id: int | None = None

class TestCreate(TestBase):
    pass

class Test(TestBase):

    class Config:
        orm_mode = True
