

from typing import Annotated
from fastapi import APIRouter, Cookie,  HTTPException, Response

from service.user_service import UserService
from domain.schema.user import UserIn, LoginUser,User
router = APIRouter(
    prefix="/user"
)

@router.post("/register")
def  register_user(user: UserIn):
    try:
        create_result = UserService.register_user(user)
    except:
        raise HTTPException(400,detail="wrong request.")
    return {"create_result" : create_result}


@router.post("/login")
def login_user(user: LoginUser, response:Response):
    try:
        uuid = UserService.login(user)
    except ValueError as e:
        raise HTTPException(400,detail=e.args) from e
    response.set_cookie(key="session_id",value=uuid)
    return {"output": "success!"}


@router.get("/info", response_model=User)
def user_info(session_id : Annotated[str| None, Cookie()] = None):
    info = UserService.info(session_id)
    return info
    


    