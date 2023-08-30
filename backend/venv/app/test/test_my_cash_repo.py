from repository.my_cash_repository import MyCashRepository
from domain.schema.cash import MyCash
from sqlalchemy.exc import DataError
from pydantic.error_wrappers import ValidationError
from pytest import raises,mark,fixture


@fixture
def my_cash_row_multi():
    user_id = "test"
    test_data1 = MyCash(currency="KRW",balance=1231231.0)
    test_data2 = MyCash(currency="USD",balance=123.32)
    test_data3 = MyCash(currency="JPY",balance=9999999999.32 )#Decimal(12,2) 10.2
    test_list : list[MyCash] = [test_data1,test_data2,test_data3]
    create_result = MyCashRepository.create_bulk(user_id,test_list)
    assert create_result == True
    yield user_id ,test_list

    test_str_list = [my_cash.currency for my_cash in test_list]
    delete_result = MyCashRepository.delete_bulk(user_id,test_str_list)
    assert delete_result == True

def test_my_cash_repo(my_cash_row_multi):
    user_id, test_list = my_cash_row_multi

    #read
    read_result = MyCashRepository.read(user_id=user_id)
    mapping_1 = [MyCash(**my_cash[0].__dict__) for my_cash in read_result] 
    
    expected_result = sorted(test_list ,key= lambda my_cash : my_cash.currency)
    assert mapping_1 == expected_result

    #update
    update_my_cash = MyCash(currency="KRW",balance="1.1")
    update_result = MyCashRepository.update(user_id=user_id,my_cash=update_my_cash)
    read_result2 = MyCashRepository.read(user_id=user_id)

    
    def delete_my_cash(currency, my_cash_list):
        for my_cash in test_list:
            if my_cash.currency == "KRW":
                test_list.remove(my_cash)

    delete_my_cash(update_my_cash.currency, test_list)
    test_list.append(update_my_cash)
    

    mapping_2 = [MyCash(**my_cash[0].__dict__) for my_cash in read_result2] 
    expected_result2 = sorted(test_list,key= lambda my_cash : my_cash.currency)
    assert update_result == True
    assert mapping_2 == expected_result2


@mark.parametrize("currency,balance",[
    ("KRW",1231231.0),
    ("USD", 123.32),
    ("JPY",9999999999.32),#Decimal(12,2) 10.2  
])
def test_my_cash_repo_one_obj(currency,balance):
    user_id = "test2"
    data = {
        "currency": currency,
        "balance" : balance,
    }
    
    update_data = {
        "currency": currency,
        "balance" : 200
    } 
    
    test_my_cash = MyCash(**data)
    test_update_my_cash = MyCash(**update_data)

    #create
    result = MyCashRepository.create(user_id=user_id, my_cash=test_my_cash )
    assert result == True

    #read
    result = MyCashRepository.read(user_id=user_id)
    mapping = [MyCash(**my_cash[0].__dict__) for my_cash in result] 
    
    expected_result = [
        MyCash(**data),
    ]
    assert mapping == expected_result

    #update
    result = MyCashRepository.update(user_id=user_id,my_cash=test_update_my_cash)
    result2 = MyCashRepository.read(user_id=user_id)

    mapping = [MyCash(**my_cash[0].__dict__) for my_cash in result2] 
    expected_result = [
        MyCash(**update_data)
    ]
    assert result == True
    assert mapping == expected_result
    
    #delete
    result = MyCashRepository.delete(user_id=user_id,my_cash= test_my_cash)
    assert result == True



@mark.parametrize("balance",[
    (99999999999.99),
    (999999999999),# 12
    (9999999999.999),
])
def test_my_cash_repo_expect_error(balance:float):
    
    user_id = "test3"
    data = {
    "currency": "JPY",
    "balance" : balance,#Decimal(12,2) 11.2  
    }
    
    with raises(ValidationError): #DataError
        test_my_cash = MyCash(**data)
        result = MyCashRepository.create(user_id=user_id,my_cash=test_my_cash)
        assert result == False


    