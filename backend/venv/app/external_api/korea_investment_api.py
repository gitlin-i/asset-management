
from typing import Literal
import requests
from domain.schema.stock import Market
from pydantic import validate_arguments
from datetime import datetime, timedelta
from temp.appkey import KOREA_INVESTMENT

baseUrl_real = "https://openapi.koreainvestment.com:9443"
baseUrl = "https://openapivts.koreainvestment.com:29443"
appkey = KOREA_INVESTMENT["appkey"]
appsecret = KOREA_INVESTMENT["appsecret"]
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
    print(response.text)
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
    def market_to_PRDT_TYPE_CD(market:Market):
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
        mapping = {
            Market.AMS: "529",
            Market.NAS: "512",
            Market.NYS: "513",
            Market.TSE: "515",
            Market.HKS: "501",
            Market.HNX: "507",
            Market.HSX: "508",
            Market.SHS: "551",
            Market.SZS: "552",
            Market.KRX: "300",
        }
        return mapping[market]
    params = {
        "PDNO" : stock_code , #상품번호, 코드
        "PRDT_TYPE_CD": market_to_PRDT_TYPE_CD(market) ,#상품타입 
    }

    
    url = "/uapi/domestic-stock/v1/quotations/search-info"
    response = requests.get(baseUrl_real + url,headers=header , params=params)
    return response.json()

def get_domestic_index(tokenDict, market:Literal["KOSPI", "KOSDAQ"],start_date,end_date):
    #start,end_date format : yyyymmdd
    mapping = {
        "KOSPI": "0001",
        "KOSDAQ" : "1001",
    #0001 : KOSPI 종합
    #1001 : KOSDAQ 종합
    }
    header = {
        "content-type" : "application/json; charset=utf-8",
        "authorization" : tokenDict["token_type"] + ' ' + tokenDict["access_token"],
        "appkey" : appkey,
        "appsecret" : appsecret,
        "tr_id" : "FHKUP03500100",
    }
    params = {
    "FID_COND_MRKT_DIV_CODE" : "U" ,
    "FID_INPUT_ISCD": mapping[market], 
    "FID_INPUT_DATE_1": start_date,
    "FID_INPUT_DATE_2": end_date,
    "FID_PERIOD_DIV_CODE":"D",
    }
    url = "/uapi/domestic-stock/v1/quotations/inquire-daily-indexchartprice"

    response = requests.get(baseUrl_real + url,headers=header , params=params)
    
    json_response : dict = response.json()
    return  json_response["output2"]

