from pytest import fixture, mark
from service.exchange_service import ExchangeService
from domain.schema.exchange_rate import ExchangeRate

@fixture
def exchange_rate_all() :
    read_result = ExchangeService.current_rate_all()
    yield read_result

@mark.parametrize("currency",[
    ("USD"),("KRW")
])
def test_exchange_rate_current_rate(currency, exchange_rate_all: list):
    result = ExchangeService.current_rate( currency)

    find_one = [exchange_rate.base_rate for exchange_rate in exchange_rate_all if exchange_rate.currency == currency]
    target_exchange_rate = ExchangeRate(**{   
        "currency": currency,
        "base_rate": find_one[0]
    })
    assert result == target_exchange_rate
    

@mark.parametrize("currency_codes",[
    (["USD","JPY(100)","Q1W","NZD"]),
    (["1234567891011"])
])
def test_exchange_rate_current_rate_list(currency_codes, exchange_rate_all: list[ExchangeRate]):
    read_result = ExchangeService.current_rate_list(currency_codes)

    def mapping(currency_code) -> ExchangeRate | None:
        find_one = [ exchange_rate for exchange_rate in exchange_rate_all if exchange_rate.currency == currency_code]
        if not find_one:
            return None
        return ExchangeRate(currency=currency_code,base_rate= find_one[0].base_rate)
    
    expected_result = [mapping(currency_code) for currency_code in currency_codes]
    fail_input = [ currency_codes[i] for i, result in enumerate( expected_result) if result is None]
    expected_result.remove(None)
    expected_result.sort(key= lambda x: x.currency)

    
    assert read_result == (expected_result, fail_input)