
import requests
from domain.schema.stock import Market
from pydantic import validate_arguments
baseUrl_real = "https://openapi.koreainvestment.com:9443"
baseUrl = "https://openapivts.koreainvestment.com:29443"
appkey = "PS6Zg2UsvnFiyPh5YHkVMGTaZH2rnjLXSPeQ"
appsecret = "mbkv/Zc7bkUlBmC2cH5FweUqQCMl4VIROryRnRlv/53m0eJhr7/xmwvlrePQmY9mtusppo0iasTF+J6GxyNItRYy7IuDEE9oDro4ATiGbJviKlQckEyOk3z/W916mTio5EFuKvZEcDlCqu3u5/lcuQq9DI+Rc2E0ZClc6TEl7gKl092fCEc="

@validate_arguments
def get_domestic_stock_current_price(tokenDict , stock_code:str):
    header = {
        "authorization" : tokenDict["token_type"] + ' ' + tokenDict["access_token"],
        "appkey" : appkey,
        "appsecret" : appsecret,
        "tr_id" : "FHKST01010100"
    }
    params = {
        "FID_COND_MRKT_DIV_CODE" : "J" ,
        "FID_INPUT_ISCD": stock_code ,
    }
    url = "/uapi/domestic-stock/v1/quotations/inquire-price"
    response = requests.get(baseUrl + url,headers=header , params=params)
    return response.json()
@validate_arguments
def get_overseas_stock_current_price(tokenDict, stock_code:str,market: Market):

    header = {
        "authorization" : tokenDict["token_type"] + ' ' + tokenDict["access_token"],
        "appkey" : appkey,
        "appsecret" : appsecret,
        "tr_id" : "HHDFS00000300"
    }
    params = {
        "AUTH" : "",
        "EXCD": market.name,
        "SYMB" : stock_code,
    }
    url = "/uapi/overseas-price/v1/quotations/price"
    response = requests.get(baseUrl + url,headers=header, params=params)
    return response.json()

def get_stock_current_price(tokenDict, stock_code: str,market:Market):
    if not isinstance(stock_code, str) or not isinstance(market, Market):
        raise TypeError
    if(market in [Market.KRX]):
        return get_domestic_stock_current_price(tokenDict,stock_code)
    else:
        return get_overseas_stock_current_price(tokenDict,stock_code,market)


def get_stock_info(tokenDict, stock_code,market):
    
    header = {
        "content-type" : "application/json; charset=utf-8",
        "authorization" : tokenDict["token_type"] + ' ' + tokenDict["access_token"],
        "appkey" : appkey,
        "appsecret" : appsecret,
        "tr_id" : "CTPF1604R",
        "custtype" : "P",
    }
    params = {
        "PDNO" : stock_code , #상품번호, 코드
        "PRDT_TYPE_CD": "300" ,#상품타입 
    }
    """
    300 주식
    301 선물옵션
    302 채권
    512 미국 나스닥 / 513 미국 뉴욕 / 529 미국 아멕스
    515 일본
    501 홍콩 / 543 홍콩CNY / 558 홍콩USD
    507 베트남 하노이 / 508 베트남 호치민
    551 중국 상해A / 552 중국 심천A
    """

    url = "/uapi/domestic-stock/v1/quotations/search-info"
    response = requests.get(baseUrl_real + url,headers=header , params=params)
    return response.json()