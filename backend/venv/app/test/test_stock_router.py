from fastapi.testclient import TestClient
from main import app
from domain.schema.stock import StockPriceListOutPut,StockPrice
from pytest import mark
client = TestClient(app)


@mark.parametrize("code,market,price",[
    ("TEST","KRX",1234),
    ("TESt","KRX",1234)
])
def test_stock_cur_price(code:str, market:str ,price):
    
    response = client.get("/stock/current-price?code="+ code +"&market="+ market)
    assert response.status_code == 200
    assert response.json() == StockPriceListOutPut(output=[
        StockPrice(code= code,market= market,price= price)
    ],
    fail_input=[])


@mark.parametrize("code,market",[
    ("qw","KRX")
])
def test_stock_cur_price_expect_error(code:str, market:str):
    response = client.get("/stock/current-price?code="+ code +"&market="+ market)
    msg = "some stock code not exists. check fail input."
    error_result = {
        "msg" : msg,
        "result" : StockPriceListOutPut(output=[],fail_input=[code]).dict()
    }
    expect_result = {
        "detail": error_result
    }
    assert response.status_code == 404
    assert response.json() == expect_result