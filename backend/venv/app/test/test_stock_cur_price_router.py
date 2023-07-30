from fastapi.testclient import TestClient
from main import app
from domain.schema.stock import StockPriceListOutPut,StockPrice
client = TestClient(app)

def test_read_stock():
    response = client.get("/stock/current-price?code=293490&market=KRX")
    print(response.json())
    assert response.status_code == 200
    assert response.json() == StockPriceListOutPut(output=[
        StockPrice(code="293490",market="KRX",price=29900)
    ],
    fail_input=[])