from uuid import UUID
from repository.my_coin_repository import MyCoinRepository
from repository.my_cash_repository import MyCashRepository
from repository.my_stock_repository import MyStockRepository
from domain.schema.cash import MyCash
from domain.schema.coin import MyCoin
from domain.schema.stock import MyStock
from service.web_session_service import WebSessionService

assets_repo = {
        "coin": MyCoinRepository,
        "stock" : MyStockRepository,
        "cash" : MyCashRepository
}


def assets(asset):
    assets = {
        "coin": MyCoin,
        "stock":MyStock,
        "cash": MyCash,
    }
    return assets[asset]

class MyAssetService:
    
    def __init__(self,asset : str , session_id : UUID) -> None:
        self.asset = asset
        self.repo = assets_repo[asset]
        self.user_id = WebSessionService.find_user_id(session_id)
        self.schema = assets(asset)

    def find_my_asset(self):
        my_assets = self.repo.read(self.user_id)
        my_assets2 = [ self.schema(**asset[0].__dict__) for asset in my_assets]
        print(my_assets2)
        return my_assets2
