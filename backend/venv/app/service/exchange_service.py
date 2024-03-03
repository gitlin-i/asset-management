
from datetime import datetime, timedelta
from domain.schema.exchange_rate import ExchangeRate
from repository.exchange_rate_repository import ExchangeRateRepository
from external_api.koreaexim_api import get_exchange_rate
from pydantic import validate_arguments
class ExchangeService:

    @classmethod
    @validate_arguments
    def current_rate(cls, currency_code : str) -> ExchangeRate | str:
        read_result = ExchangeRateRepository.read(currency_code= currency_code)
        exchange_rate = ExchangeRate(**read_result[0].__dict__)

        if not read_result:
            return currency_code
        
        return exchange_rate
        
    
    @classmethod
    @validate_arguments
    def current_rate_list(cls,currency_codes : list[str]) -> tuple[list[ExchangeRate] , list[str]] :
        read_result = ExchangeRateRepository.read_bulk(currency_codes)
        exchange_rate_list = [ExchangeRate(**exchange_rate[0].__dict__) for exchange_rate in read_result]
        read_currency_codes = [ exchange_rate.currency for exchange_rate in exchange_rate_list]
        not_read_input = [currency_code for currency_code in currency_codes if currency_code not in read_currency_codes]
        return (exchange_rate_list,not_read_input)
        

    @classmethod
    @validate_arguments
    def current_rate_all(cls) -> list[ExchangeRate] :
        read_result = ExchangeRateRepository.read_all()
        exchange_rate_list = [ExchangeRate(**exchange_rate_model[0].__dict__) for exchange_rate_model in read_result]
        return exchange_rate_list


    @classmethod
    def init_exchange_rate(cls) -> bool:
        exchange_rate_in_db = ExchangeRateRepository.read("KRW")
        if not exchange_rate_in_db:
            exchange_rate_list = get_exchange_rate()
            
            if not exchange_rate_list:
                today = datetime.now().date()
                for i in range(1,10):
                    td = timedelta(days=i)
                    exchange_rate_list = get_exchange_rate(search_date= str(today - td))
                    if exchange_rate_list:
                        break
            def replace(target) :
                target['deal_bas_r'] = target['deal_bas_r'].replace(",","")
                return target
            exchange_rate_list = [replace(target=exchange_rate) for exchange_rate in exchange_rate_list]
            exchange_rates = [ExchangeRate(currency= exchange_rate["cur_unit"] , base_rate= exchange_rate["deal_bas_r"]) for exchange_rate in exchange_rate_list]
            create_result = ExchangeRateRepository.create_bulk(exchange_rates)
            return create_result
                
    @classmethod
    def update_exchange_rate(cls) -> bool:
        exchange_rate_list = get_exchange_rate()
        if not exchange_rate_list:
            # raise ValueError("empty list")
            print("업데이트할 환율 정보 없음.")
        def replace(target) :
            target['deal_bas_r'] = target['deal_bas_r'].replace(",","")
            return target
        exchange_rate_list = [replace(target=exchange_rate) for exchange_rate in exchange_rate_list]
        exchange_rates = [ExchangeRate(currency= exchange_rate["cur_unit"] , base_rate= exchange_rate["deal_bas_r"]) for exchange_rate in exchange_rate_list]
        update_result = ExchangeRateRepository.update_bulk(exchange_rates)
        return update_result