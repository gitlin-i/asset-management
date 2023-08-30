from repository.my_coin_repository import MyCoinRepository
from repository.my_cash_repository import MyCashRepository
from repository.my_stock_repository import MyStockRepository
from repository.web_session_repository import WebSessionRepositorty

class MyAssetService:
    assets = {
        "coin": MyCoinRepository,
        "stock" : MyStockRepository,
        "cash" : MyCashRepository
    }

    @classmethod
    def read_my_asset(cls, session_id: str ,assets: str ):
        user_id = WebSessionRepositorty.read()