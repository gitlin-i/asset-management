
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from domain.schema.user import UserIn, UserOut
from database import SessionLocal
from service.user_service import UserService
router = APIRouter(
    prefix="/user"
)

@router.post("",response_model= UserOut )
async def create_user(user : UserIn):
    result = UserService().register_user(user)
    return result

@router.get("", response_model= UserOut) 
async def read_user_by_id(id: str) :
    result = UserService().find_user(id)
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")
    return result




