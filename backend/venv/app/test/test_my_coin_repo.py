from decimal import Decimal
from pydantic import ValidationError
from pytest import mark, raises
from repository.my_coin_repository import MyCoinRepository
from domain.schema.coin import MyCoin

def test_my_coin_repo():
    user_id = "test1"
    data = {
        "code": "TEST-test",
        "quantity": "1",
        "average_purchase_price" : 123.456
    }
    data2 = {
        "code": "test-TEST1",
        "market": "KRX",
        "name" : "테스트1234",
        "quantity": "1.1",
        "average_purchase_price" : 789.123
    }
    test_my_coin = MyCoin(**data)
    test_my_coin2 = MyCoin(**data2)


    #create
    result = MyCoinRepository.create(user_id=user_id, my_coin=test_my_coin )
    result2 = MyCoinRepository.create(user_id=user_id, my_coin=test_my_coin2 )
    assert result == True
    assert result2 == True

    #read
    result3 = MyCoinRepository.read(user_id=user_id)
    
    mapping_1 = [MyCoin(**my_coin[0].__dict__) for my_coin in result3] 
    print(mapping_1)
    expected_result = [
        MyCoin(**data),
        MyCoin(**data2)
    ]
    assert mapping_1 == expected_result
    #update
    data3 = {
        "code": "test-TEST1",
        "market": "KRX",
        "name" : "테스트1234!@",
        "quantity": "1.123",
        "average_purchase_price" : 789.1
    }
    test_my_coin3 = MyCoin(**data3)
    result4 = MyCoinRepository.update(user_id=user_id,my_coin=test_my_coin3)
    result5 = MyCoinRepository.read(user_id=user_id)
    mapping_2 = [MyCoin(**my_coin[0].__dict__) for my_coin in result5] 
    expected_result2 = [
        MyCoin(**data),
        MyCoin(**data3)
    ]
    assert result4 == True
    assert mapping_2 == expected_result2
    
    #delete
    result6 = MyCoinRepository.delete(user_id=user_id,my_coin= test_my_coin)
    result7 = MyCoinRepository.delete(user_id=user_id,my_coin= test_my_coin3)
    assert result6 == True
    assert result7 == True


@mark.parametrize("code,quantity,average_purchase_price",[
    ("TEST-test", "1.21213535", 1231231.0),
    ("TEST-test","99999999.99999999",123456.7894),#9.8 10억미만
    ("TEST-test","1.0",123456.7894), 
])
def test_my_coin_repo_one_obj(code,quantity,average_purchase_price):
    user_id = "test2"
    data = {
        "code": code, 
        "quantity": quantity,
        "average_purchase_price" : average_purchase_price
    }
    test_my_coin = MyCoin(**data)

    #create
    result = MyCoinRepository.create(user_id=user_id,my_coin=test_my_coin)
    assert result == True
    #read
    result = MyCoinRepository.read(user_id=user_id)
    assert result is not None

    mapping_1 = [MyCoin(**my_coin[0].__dict__) for my_coin in result] 
    
    expected_result = [
        MyCoin(**data)
    ]
    assert mapping_1 == expected_result
    #update
    new_quantity = "123456789.12345678"
    update_data = {
        "code" : code,
        "quantity": new_quantity ,
        "average_purchase_price" : average_purchase_price -1
    }
    
    update_my_coin = MyCoin(**update_data)
    result = MyCoinRepository.update(user_id=user_id,my_coin=update_my_coin)
    result2 = MyCoinRepository.read(user_id=user_id)
    mapping_2 = [MyCoin(**my_coin[0].__dict__) for my_coin in result2] 
    expected_result2 = [
        MyCoin(**update_data),
    ]
    assert result == True
    assert mapping_2 == expected_result2
    
    #delete
    result = MyCoinRepository.delete(user_id=user_id, my_coin= update_my_coin)
    assert result == True




@mark.parametrize("code,quantity,average_purchase_price",[
    ("test-test2",99999999999.9, 1.1),# 11.1 ,1.1
    ("test-test2",0.999999999, 1.1),# 1.9, 1.1
    ("test-test2",0.9, 0.999999999), # 1.1, 1.9
])
def test_my_coin_repo_expect_error(code,quantity,average_purchase_price):
    
    user_id = "test3"
    data = {
        "code" : code,
        "quantity" : quantity,
        "average_purchase_price" : average_purchase_price
    }
    
    with raises(ValidationError): #DataError
        test_my_coin = MyCoin(**data)
        result = MyCoinRepository.create(user_id=user_id,my_coin=test_my_coin)
        assert result == False