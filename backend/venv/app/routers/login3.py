from typing import Annotated
from fastapi import APIRouter, Depends, Form, Response, HTTPException,status, Cookie
from fastapi.security import HTTPBasicCredentials, HTTPBasic
from service.user_service import UserService
from sqlalchemy.orm import Session
from database import SessionLocal
from service.web_session_service import WebSessionService
import secrets


router = APIRouter(
    prefix="/login3"
)
def get_db() -> Session :
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("")
async def login_session(userId : Annotated[str, Form()], userPassword : Annotated[str, Form()], response: Response,
                        db : Session = Depends(get_db)
                        ):

    user = UserService.find_user(db, userId)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="없는 유저"
        )
    is_login_succeed = UserService.verify_password(userPassword, user.password.encode("utf-8"))

    if not is_login_succeed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="비번 틀림"
        )
    
    user_session = WebSessionService.register_web_session(userId)
    

    response.set_cookie(key="user_session", value=user_session)
    return {
        "message": "쿠키 안을 봐봐.",
        "userSession" : "user_session"
    } 

@router.get("/cookie")
async def get_username_by_cookie(user_session : Annotated[str, Cookie()] = None):
    current_user_id = WebSessionService.read_current_user_id(user_session)
    return {
        "userId" : current_user_id
    }

############################# HTTP

security = HTTPBasic()

def get_current_user(credentials: Annotated[HTTPBasicCredentials, Depends(security)]):
    current_username_bytes = credentials.username.encode("utf8")
    correct_username_bytes = b"test"
    is_correct_username = secrets.compare_digest(
        current_username_bytes, correct_username_bytes
    )
    current_password_bytes = credentials.password.encode("utf8")
    correct_password_bytes = b"qwe"
    is_correct_password = secrets.compare_digest(
        current_password_bytes, correct_password_bytes
    )
    if not (is_correct_username and is_correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

@router.get("")
async def login_http_header(username : Annotated[str, Depends(get_current_user)]):
    return{
        "say" : "hi",
        "username": username,
    }