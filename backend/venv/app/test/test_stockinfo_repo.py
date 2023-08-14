from fastapi.testclient import TestClient
from main import app
from repository.stock_repository import StockInfoRepository
from domain.model.stock_info import StockInfoModel
from domain.schema.stock import StockInfo
from domain.schema.market import Market
from sqlalchemy.orm.exc import StaleDataError
from pytest import raises
from pydantic.error_wrappers import ValidationError
def test_stock_info_repository():
    
    #read
    market = Market.KRX
    result = StockInfoRepository.read("TEST",market)
    assert result[0] == StockInfoModel(**{
        "code" : "TEST",
        "name" : "테스트",
        "market" : "KRX"
    })

    #create
    new_stock = StockInfo(code="TEST2",name="테스트2",market="KRX")
    result2 = StockInfoRepository.create(new_stock) 
    assert result2 == True

    result3 = StockInfoRepository.read("TEST2",market)

    assert result3[0] == StockInfoModel(**{
        "code": "TEST2",
        "name": "테스트2",
        "market" : "KRX"
    })

    #update
    update_stock = StockInfo(code="TEST2", name="테스트123",market="KRX")
    result4 = StockInfoRepository.update(update_stock)
    assert result4 == True

    result5 = StockInfoRepository.read("TEST2",market)
    assert result5[0] == StockInfoModel(**{
        "code": "TEST2",
        "name": "테스트123",
        "market" : "KRX"
    })

    #delete
    result6 = StockInfoRepository.delete("TEST2",market)
    result7 = StockInfoRepository.read("TEST2",market)
    assert result6 == True
    assert result7 is None

def test_stock_info_repository_expect_error():
    #error
    with raises(ValidationError):
        result8 = StockInfoRepository.delete("12312313","adshjaskdh")
        assert result8 == False
        result9 = StockInfoRepository.read("123123132","11221")
        assert result9 is None
        result10 = StockInfoRepository.create("122")
        assert result10 == False# AttributeError 입력값

    with raises(StaleDataError):
        result11= StockInfoRepository.update(StockInfo(code= "asddas",market="KRX", name="asdqq"))
        assert result11 == False # 0 matched

    # assert 0 == 1