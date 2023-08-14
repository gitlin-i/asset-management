from datetime import timedelta
from fastapi.testclient import TestClient
from main import app
from repository.stock_repository import StockCurPriceRepository
from domain.model.stock_current_price import StockCurrentPriceModel
from domain.schema.stock import StockPrice,StockPriceWithDate
from domain.schema.market import Market
from sqlalchemy.orm.exc import StaleDataError
from pytest import raises
from pydantic.error_wrappers import ValidationError
def test_stock_current_price_repository():
    #read
    market = Market.KRX
    result = StockCurPriceRepository.read("TEST",market)

    assert result[0] == StockCurrentPriceModel(**{
        "code" : "TEST",
        "market" : "KRX",
        "price": 1234,

    })

    #create
    new_stock_price = StockPrice(code="TEST2",market="KRX",price=1111)
    result2 = StockCurPriceRepository.create(new_stock_price) 
    
    result3 = StockCurPriceRepository.read("TEST2",market)
    assert result2 == True
    assert result3[0] == StockCurrentPriceModel(**{
        "code": "TEST2",
        "market" : "KRX",
        "price" : 1111,

    })

    #update
    update_stock_price = StockPrice(code="TEST2",market="KRX", price=1222)
    result4 = StockCurPriceRepository.update(update_stock_price)
    assert result4 == True

    result5 = StockCurPriceRepository.read("TEST2",market)
    assert result5[0] == StockCurrentPriceModel(**{
        "code": "TEST2",
        "market" : "KRX",
        "price" : 1222,

    })
    assert result3 != result5

    #delete
    result6 = StockCurPriceRepository.delete("TEST2",market)
    result7 =StockCurPriceRepository.read("TEST2",market)
    assert result6 == True
    assert result7 is None

    stock = StockCurPriceRepository.read("TEST","KRX")
    stock_price = StockPriceWithDate(**stock[0].__dict__)

    assert stock_price.isOld(timedelta(seconds=1)) == True

def test_stock_info_repository_expect_error():
    #error
    with raises(ValidationError):
        result8 = StockCurPriceRepository.delete("12312313","adshjaskdh")
        assert result8 == False
        result9 = StockCurPriceRepository.read("123123132","11221")
        assert result9 is None
        result10 = StockCurPriceRepository.create("122")
        assert result10 == False# AttributeError 입력값
    with raises(StaleDataError):
        result11= StockCurPriceRepository.update(StockPrice(code= "asddas",market="KRX", price=1111))
        assert result11 == False # 0 matched


    # assert 0 == 1