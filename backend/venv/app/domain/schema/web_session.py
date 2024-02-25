from datetime import datetime, timedelta
from pydantic import BaseModel
from uuid import UUID
class WebSession(BaseModel):
    uuid : UUID
    user_id : str

    #orm_mode 필수
    class Config:
        orm_mode = True

class WebSessionWithDate(WebSession):
    created_date: datetime

    
    def isOld(self, timedelta: timedelta = timedelta(hours=12) ) -> bool:
        return self.created_date <= datetime.now() - timedelta
