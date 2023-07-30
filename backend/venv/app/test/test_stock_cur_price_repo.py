from fastapi.testclient import TestClient
from main import app
from repository.stock_repository import StockCurPriceRepository
from domain.model.stock_current_price import StockCurrentPriceModel
from domain.schema.stock import StockPrice

def test_stock_current_price_repository():
    #read
    result = StockCurPriceRepository.read("TEST","KRX")

    assert result[0] == StockCurrentPriceModel(**{
        "code" : "TEST",
        "market" : "KRX",
        "price": 1234,

    })

    #create
    new_stock_price = StockPrice(code="TEST2",market="KRX",price=1111)
    result2 = StockCurPriceRepository.create(new_stock_price) 
    
    result3 = StockCurPriceRepository.read("TEST2","KRX")
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

    result5 = StockCurPriceRepository.read("TEST2","KRX")
    assert result5[0] == StockCurrentPriceModel(**{
        "code": "TEST2",
        "market" : "KRX",
        "price" : 1222,

    })

    #delete
    result6 = StockCurPriceRepository.delete("TEST2","KRX")
    result7 =StockCurPriceRepository.read("TEST2","KRX")
    assert result6 == True
    assert result7 is None

    #error
    result8 = StockCurPriceRepository.delete("12312313","adshjaskdh")
    assert result8 == False
    result9 = StockCurPriceRepository.read("123123132","11221")
    assert result9 is None
    result10 = StockCurPriceRepository.create("122")
    assert result10 == False# AttributeError 입력값

    result11= StockCurPriceRepository.update(StockPrice(code= "asddas",market="KRX", price=1111,currency="KRW"))
    assert result11 == False # 0 matched

    # assert 0 == 1