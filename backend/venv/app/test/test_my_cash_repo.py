from repository.my_cash_repository import MyCashRepository
from domain.schema.cash import MyCash
from sqlalchemy.exc import DataError
from pydantic.error_wrappers import ValidationError
from pytest import raises
from pytest import mark


def test_my_cash_repo():
    user_id = "test"

    data = {
        "currency": "KRW",
        "balance" : 1231231.0,
    }
    data2 = {
        "currency": "USD",
        "balance" : 123.32,
    }
    data3 = {
        "currency": "KRW",
        "balance" : 200
    } 
    data4 = {
        "currency": "JPY",
        "balance" : 9999999999.32,#Decimal(12,2) 10.2  
    }

    test_my_cash = MyCash(**data)
    test_my_cash2 = MyCash(**data2)
    test_my_cash3 = MyCash(**data3)
    test_my_cash4 = MyCash(**data4)

    #create
    result = MyCashRepository.create(user_id=user_id, my_cash=test_my_cash )
    result2 = MyCashRepository.create(user_id=user_id, my_cash=test_my_cash2 )
    result3 = MyCashRepository.create(user_id=user_id, my_cash=test_my_cash4)
    
    assert result == True
    assert result2 == True
    assert result3 == True

    #read
    result = MyCashRepository.read(user_id=user_id)
    mapping_1 = [MyCash(**my_cash[0].__dict__) for my_cash in result] 
    
    expected_result = sorted([
        MyCash(**data),
        MyCash(**data2),
        MyCash(**data4),
    ],key= lambda my_cash : my_cash.currency)
    assert mapping_1 == expected_result
    #update


    result = MyCashRepository.update(user_id=user_id,my_cash=test_my_cash3)
    result2 = MyCashRepository.read(user_id=user_id)
    mapping_2 = [MyCash(**my_cash[0].__dict__) for my_cash in result2] 
    expected_result2 = sorted([
        MyCash(**data3),
        MyCash(**data2),
        MyCash(**data4),
    ],key= lambda my_cash : my_cash.currency)
    assert result == True
    assert mapping_2 == expected_result2
    
    #delete
    result = MyCashRepository.delete(user_id=user_id,my_cash= test_my_cash3)
    result2 = MyCashRepository.delete(user_id=user_id,my_cash= test_my_cash2)
    result3 = MyCashRepository.delete(user_id=user_id,my_cash= test_my_cash4)
    assert result == True
    assert result2 == True
    assert result3 == True

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


    