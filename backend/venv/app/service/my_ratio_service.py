from uuid import UUID
from repository.my_ratio_repository import MyRatioRepository
from service.web_session_service import WebSessionService
from domain.schema.my_ratio import MyRatioIn, MyRatioOut,asset_to_int_mapper
class MyRatioService:

    def __init__(self, session_id : UUID) -> None:
        self.user_id = WebSessionService.find_user_id(session_id)
    
    def enter_my_ratio(self,my_ratio:MyRatioIn):
        create = MyRatioRepository.create(self.user_id,my_ratio)
        return create
    
    def find_my_ratio(self) -> list[MyRatioOut]:
        read = MyRatioRepository.read_by_user_id(self.user_id)
        result = [ MyRatioOut(**r[0].__dict__) for r in read]
        return result
    
    def edit_my_ratio(self, my_ratio : MyRatioIn) -> bool:
        update = MyRatioRepository.update(self.user_id,my_ratio)
        return update
    
    def remove_my_ratio(self,asset, ratio_name: str):
        asset_code = asset_to_int_mapper[asset]
        delete = MyRatioRepository.delete(self.user_id,asset_code, ratio_name)
        return delete