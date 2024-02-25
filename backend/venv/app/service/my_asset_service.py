from uuid import UUID
from repository.my_coin_repository import MyCoinRepository
from repository.my_cash_repository import MyCashRepository
from repository.my_stock_repository import MyStockRepository
from domain.schema.cash import MyCash,CashBase
from domain.schema.coin import MyCoin, CoinBase
from domain.schema.stock import MyStock, StockBase
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
        self.repo : MyCashRepository | MyCoinRepository| MyStockRepository = assets_repo[asset]
        self.user_id = WebSessionService.find_user_id(session_id)
        self.schema = assets(asset)

    def find_my_asset(self):
        my_assets_model = self.repo.read(self.user_id)
        my_assets = [ self.schema(**asset[0].__dict__) for asset in my_assets_model]
        return my_assets
    
    def enter_my_asset(self, my_asset : MyStock | MyCash | MyCoin):
        result = self.repo.create(self.user_id,my_asset)
        return result
    
    def update_my_asset(self, my_asset : MyStock | MyCash | MyCoin):
        result = self.repo.update(self.user_id, my_asset)
        return result
    def remove_my_asset(self,my_asset: StockBase | CashBase | CoinBase ):
        result = self.repo.delete(self.user_id, my_asset)
        return result