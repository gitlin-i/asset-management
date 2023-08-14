
import requests
from domain.schema.stock import Market
from pydantic import validate_arguments

baseUrl = "https://api.upbit.com/v1"
headers = {"accept": "application/json"}

def get_coin_current_price():
    url = "/ticker"
    