from pydantic import BaseModel
from uuid import UUID
class WebSession(BaseModel):
    uuid : UUID
    user_id : str

    #orm_mode 필수
    class Config:
        orm_mode = True

