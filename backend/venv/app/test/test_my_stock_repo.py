from repository.my_stock_repository import MyStockRepository
from domain.schema.stock import MyStock

def test_my_stock_repo():
    user_id = "test1"
    data = {
        "code": "TEST",
        "market": "KRX",
        "name" : "테스트",
        "quantity": 1,
        "average_purchase_price" : 123.456
    }
    data2 = {
        "code": "TEST1234",
        "market": "KRX",
        "name" : "테스트1234",
        "quantity": 1.1,
        "average_purchase_price" : 789.123
    }
    test_my_stock = MyStock(**data)
    test_my_stock2 = MyStock(**data2)
    #create
    result = MyStockRepository.create(user_id=user_id, my_stock=test_my_stock )
    result2 = MyStockRepository.create(user_id=user_id, my_stock=test_my_stock2 )
    assert result == True
    assert result2 == True

    #read
    result3 = MyStockRepository.read(user_id=user_id)
    
    mapping_1 = [MyStock(**my_stock[0].__dict__) for my_stock in result3] 
    print(mapping_1)
    expected_result = [
        MyStock(**data),
        MyStock(**data2)
    ]
    assert mapping_1 == expected_result
    #update
    data3 = {
        "code": "TEST1234",
        "market": "KRX",
        "name" : "테스트1234!@",
        "quantity": 1.123,
        "average_purchase_price" : 789.1
    }
    test_my_stock3 = MyStock(**data3)
    result4 = MyStockRepository.update(user_id=user_id,my_stock=test_my_stock3)
    result5 = MyStockRepository.read(user_id=user_id)
    mapping_2 = [MyStock(**my_stock[0].__dict__) for my_stock in result5] 
    expected_result2 = [
        MyStock(**data),
        MyStock(**data3)
    ]
    assert result4 == True
    assert mapping_2 == expected_result2
    
    #delete
    result6 = MyStockRepository.delete(user_id=user_id,my_stock= test_my_stock)
    result7 = MyStockRepository.delete(user_id=user_id,my_stock= test_my_stock3)
    assert result6 == True
    assert result7 == True