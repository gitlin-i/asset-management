
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from domain.schema.user import UserIn, UserOut
from database import SessionLocal
from service.stock_service import StockService
from domain.schema.stock import ListOutPutStock, Market

router = APIRouter(
    prefix="/stock"
)


@router.get("", response_model=ListOutPutStock)
async def stock_current_price(code: str, market : Market):

    stock_codes = code.split(",")
    # stockPrice = { "code" : code , "price": price, }
    result : ListOutPutStock = StockService.current_price(market, stock_codes)
    
    return result
