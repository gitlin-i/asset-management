

from fastapi import APIRouter, HTTPException 

from service.stock_service import StockService
from domain.schema.coin import CoinPriceListOutPut
from domain.schema.market import Market

router = APIRouter(
    prefix="/coin"
)


