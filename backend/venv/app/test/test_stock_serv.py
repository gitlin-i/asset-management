from fastapi.testclient import TestClient
from main import app
from service.stock_service import StockService
from domain.schema.stock import StockPriceListOutPut, StockPrice,Market

client = TestClient(app)

def test_stock_service():

    input_data = ["TEST","ㅂㅈㄷㄱㅁㄴㅇ"]
    market = "KRX"
    input_data2 = ["228670"]

    test_stock_price1= StockPrice(**{
            "code": "228670",
            "market" : "KRX",
            "price": 40300,
            "currency":"KRW",
        })
    test_stock_price2 = StockPrice(**{
            "code": "228670",
            "market" : "KRX",
            "price": 1,
            "currency":"KRW",
        })
    
    assert test_stock_price1 == StockPrice(**{
            "code": "228670",
            "market" : "KRX",
            "price": 40300,
            "currency":"KRW",
        })

    assert test_stock_price1 != test_stock_price2


    result : StockPriceListOutPut = StockService.current_price(input_data,market)
    check_stock_price_list_output_model = {
        "output":[StockPrice(**{
            "code": "TEST",
            "market" : "KRX",
            "price": 1234,
            "currency":"KRW",
        })],
        "fail_input" : ["ㅂㅈㄷㄱㅁㄴㅇ"]
    }
    assert result == check_stock_price_list_output_model

    check_stock_price_list_output_model2 = {
        "output":[StockPrice(**{
            "code": "228670",
            "market" : "KRX",
            "price": 40300,
            "currency":"KRW",
        })],
        "fail_input" : []
    }
    result2 = StockService.current_price(input_data2,market)
    
    assert result2 == check_stock_price_list_output_model2

    result3 = StockService.current_price(["293490"],market)
    check_stock_price_list_output_model3 = {
        "output":[StockPrice(**{
            "code": "293490",
            "market" : "KRX",
            "price": 29900,
            "currency":"KRW",
        })],
        "fail_input" : []
    }
    assert result3 == check_stock_price_list_output_model3