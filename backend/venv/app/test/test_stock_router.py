from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient
from main import app
from domain.schema.stock import StockPriceListOutPut,StockPrice
from repository.stock_repository import StockCurPriceRepository
from service.stock_service import StockService
from pytest import fixture, mark


client = TestClient(app)


@fixture
def input_stock():
    test_stock = StockPrice(code="TEST",market="KRX",price=1234)
    create_result = StockCurPriceRepository.create(test_stock)
    assert create_result == True
    yield test_stock

    delete_result = StockCurPriceRepository.delete(test_stock.code,test_stock.market)
    assert delete_result ==True


@mark.parametrize("code,market,price",[
    ("TEST","KRX",1234),
    ("TESt","KRX",1234)
])
def test_stock_cur_price(code:str, market:str ,price, input_stock):
    test_stock = input_stock
    response = client.get("/api/stock/current-price?code="+ code +"&market="+ market)

    expected_response = StockPriceListOutPut(output=[
        StockPrice(code= code,market= market,price= price)
    ],
    fail_input=[])
    assert response.status_code == 200
    assert response.json() == expected_response.dict()
    


@mark.parametrize("code,market",[
    ("qw","KRX"),
    
])
def test_stock_cur_price_expect_error(code:str, market:str):
    response = client.get("/api/stock/current-price?code="+ code +"&market="+ market)
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


@mark.parametrize("code,market",[
    ("qw,TSLA,","NAS"),
    
])
def test_stock_cur_price_expect_error_and_some_success(code:str, market:str):
    response = client.get("/api/stock/current-price?code="+ code +"&market="+ market)
    msg = "some stock code not exists. check fail input."
    codes = code.split(",")
    output, fail_input = StockService.current_price_list(codes,market)

    error_result = {
        "msg" : msg,
        "result" : StockPriceListOutPut(output=output,fail_input=fail_input).dict()
    }
    expected_result = {
        "detail": error_result
    }
    
    assert response.status_code == 404
    assert response.json() == jsonable_encoder(expected_result)