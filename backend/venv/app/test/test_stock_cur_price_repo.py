from datetime import timedelta
from fastapi.testclient import TestClient
from main import app
from repository.stock_repository import StockCurPriceRepository
from domain.model.stock_current_price import StockCurrentPriceModel
from domain.schema.stock import StockPrice,StockPriceWithDate
from domain.schema.market import Market
from sqlalchemy.orm.exc import StaleDataError
from pytest import mark, raises,fixture
from pydantic.error_wrappers import ValidationError

@fixture
def define_test_stock():
    test_stock = StockPrice(code="TEST",market="KRX",price=1234)
    
    create_result = StockCurPriceRepository.create(test_stock)
    assert create_result == True
    yield test_stock

    delete_result = StockCurPriceRepository.delete(test_stock.code,test_stock.market)
    assert delete_result ==True

def test_stock_current_price_repository(define_test_stock):
    #read
    stock = define_test_stock
    
    read_result = StockCurPriceRepository.read(stock.code,stock.market)

    assert read_result[0] == StockCurrentPriceModel(**stock.dict())


    #update
    update_stock_price = StockPrice(code="TEST",market="KRX", price=1222)
    update_result = StockCurPriceRepository.update(update_stock_price)
    assert update_result == True

    read_result2 = StockCurPriceRepository.read(update_stock_price.code ,update_stock_price.market)
    assert read_result2[0] == StockCurrentPriceModel(**{
        "code": "TEST",
        "market" : "KRX",
        "price" : 1222,

    })
    assert read_result != read_result2

    
    stock = StockCurPriceRepository.read(stock.code , stock.market)
    stock_price = StockPriceWithDate(**stock[0].__dict__)
    assert stock_price.isOld(timedelta(minutes=1)) == False
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