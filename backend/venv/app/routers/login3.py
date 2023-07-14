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