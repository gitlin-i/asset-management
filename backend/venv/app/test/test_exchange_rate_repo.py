
from repository.exchange_rate_repository import ExchangeRateRepository
from domain.schema.exchange_rate import ExchangeRate
from pytest import fixture

@fixture
def exchange_rate_repo_test_row():
    test_data = ExchangeRate(currency="TEST",base_rate="1.0")
    create_result = ExchangeRateRepository.create(test_data)
    assert create_result == True
    yield test_data
    delete_result = ExchangeRateRepository.delete(test_data.currency)
    assert delete_result == True
    
@fixture
def exchange_rate_repo_update_test_row(exchange_rate_repo_test_row : ExchangeRate):
    update_data = ExchangeRate(currency=exchange_rate_repo_test_row.currency ,base_rate="1.1")
    update_result = ExchangeRateRepository.update(update_data)
    assert update_result == True
    return update_data

@fixture
def exchange_rate_repo_test_row_multi():
    test_data1 = ExchangeRate(currency="TEST1",base_rate="1.0")
    test_data2 = ExchangeRate(currency="TEST2",base_rate="1.1")
    test_data3 = ExchangeRate(currency="TEST3",base_rate="1.2")
    test_data4 = ExchangeRate(currency="TEST4",base_rate="1.3")

    test_list = [test_data1,test_data2,test_data3,test_data4]
    create_result = ExchangeRateRepository.create_bulk(test_list)
    assert create_result == True
    yield test_list
    test_str_list = [exchange_rate.currency for exchange_rate in test_list]
    delete_result = ExchangeRateRepository.delete_bulk(test_str_list)
    assert delete_result == True
    
@fixture
def exchange_rate_repo_update_test_row_multi(exchange_rate_repo_test_row_multi):
    test_data1 = ExchangeRate(currency="TEST1",base_rate="2.0")
    test_data2 = ExchangeRate(currency="TEST2",base_rate="2.1")
    test_data3 = ExchangeRate(currency="TEST3",base_rate="2.2")
    test_data4 = ExchangeRate(currency="TEST4",base_rate="2.3")

    update_test_list = [test_data1,test_data2,test_data3,test_data4]
    update_result = ExchangeRateRepository.update_bulk(update_test_list)
    assert update_result == True
    return update_test_list

def test_exchange_rate_repo_read(exchange_rate_repo_test_row):
    read_result = ExchangeRateRepository.read("TEST")
    mapping_result = ExchangeRate(**read_result[0].__dict__)
    assert mapping_result == exchange_rate_repo_test_row
    assert 1 == 0

def test_exchange_rate_repo_update_read(exchange_rate_repo_update_test_row):
    read_result = ExchangeRateRepository.read("TEST")
    mapping_result = ExchangeRate(**read_result[0].__dict__)
    assert mapping_result == exchange_rate_repo_update_test_row

def test_exchange_rate_repo_read_bulk(exchange_rate_repo_test_row_multi : list[ExchangeRate]):
    curreny_codes = [exchange_rate.currency for exchange_rate in exchange_rate_repo_test_row_multi]
    read_result_list = ExchangeRateRepository.read_bulk(currency_codes=curreny_codes)
    mapped_read_result = [ ExchangeRate(**read_result[0].__dict__) for read_result in read_result_list]
    assert mapped_read_result == exchange_rate_repo_test_row_multi


def test_exchange_rate_repo_update_read_bulk(exchange_rate_repo_update_test_row_multi : list[ExchangeRate]):
    currency_codes = [ updated_exchange_rate.currency for updated_exchange_rate in  exchange_rate_repo_update_test_row_multi ]
    read_result_list = ExchangeRateRepository.read_bulk(currency_codes)
    mapping_result = [ ExchangeRate(**read_result[0].__dict__) for read_result in read_result_list]
    assert mapping_result == exchange_rate_repo_update_test_row_multi