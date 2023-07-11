from typing import Annotated

from fastapi import APIRouter, Depends, FastAPI, Form, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from domain.schema.user import UserIn,UserOut
from service.user_service import UserService
from database import SessionLocal
from sqlalchemy.orm import Session
from passlib.context import CryptContext

router = APIRouter(
    prefix="/login2"
)

SECRET_KEY = "19d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e8"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def get_db() -> Session :
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Token(BaseModel):
    access_token : str
    token_type : str

class TokenData(BaseModel):
    username: str | None = None

pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password,hashed_password)

def password_hash(plain_password):
    return pwd_context.hash(plain_password)



def fake_hash_password(password: str):
    return "fakehashed" + password


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login2/token")

def get_user(db : Session, username: str):
    user = UserService().find_user(db,username)
    return UserIn(user)

# def fake_decode_token(token):
#     # This doesn't provide any security at all
#     # Check the next version
#     user = get_user(fake_users_db, token)
#     return user


# async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
#     user = fake_decode_token(token)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid authentication credentials",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     return user


# async def get_current_active_user(
#     current_user: Annotated[User, Depends(get_current_user)]
# ):
#     if current_user.disabled:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user


@router.post("/token")
async def login(
                userId: Annotated[str, Form()],
                password: Annotated[str, Form()],
                db: Session = Depends(get_db)):
    user_service = UserService()
    user = user_service.find_user(db ,userId)

    if not user:
        raise HTTPException(status_code=400, detail="유저 아이디가 디비에 없다.")


    if not user_service.verify_password(password, user.password ):
        raise HTTPException(status_code=400, detail="비번 틀렸다.")

    return {"access_token": user.id, "token_type": "bearer"}


# @router.get("/users/me")
# async def read_users_me(
#     current_user: Annotated[User, Depends(get_current_active_user)]
# ):
#     return current_user

@router.get("/abcd")
async def say_hi(token : Annotated[str , Depends(oauth2_scheme)]):
    return{
        "say": "hi"
    }