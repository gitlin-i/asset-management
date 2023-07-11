
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from domain.schema.user import User1
router = APIRouter(
    prefix="/login"
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/token")
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
    "test1":{
        "username": "test1",
        "name": "테스트1",
        "email": "test1@example.com",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    }
}
class UserInDB(User1):
    hashed_password: str

def fake_hash_password(password: str):
    return "fakehashed" + password
def fake_decode_token(token):
    # This doesn't provide any security at all
    # Check the next version
    user = get_user(fake_users_db, token)
    return user


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
async def get_current_active_user(
    current_user: Annotated[User1, Depends(get_current_user)]
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.post("/token")
async def login_user(form_data : Annotated[OAuth2PasswordRequestForm, Depends()]):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)

    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    return {
        "access_token":user.username,
        "token_type" : "bearer"
    }

@router.get("/user/me")
async def read_user_me(current_user: Annotated[User1,Depends(get_current_user)]):
    return current_user

@router.get("/login_test")
async def read_login_test(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}


@router.post("")
async def login_session(userId : Annotated[str, Form()], password: Annotated[str,Form()]):
    return {
        userId: userId,
        password: password,
        "testfield": "1234"
    }


