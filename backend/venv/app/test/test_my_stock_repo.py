from repository.my_stock_repository import MyStockRepository
from domain.schema.stock import MyStock
from pytest import fixture

@fixture
def my_stock_test_list():
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
    create_result = MyStockRepository.create(user_id=user_id, my_stock=test_my_stock )
    create_result2 = MyStockRepository.create(user_id=user_id, my_stock=test_my_stock2 )

    assert create_result == True
    assert create_result2 == True

    yield user_id, [test_my_stock,test_my_stock2]

    delete_result = MyStockRepository.delete(user_id=user_id, my_stock=test_my_stock )
    delete_result2 = MyStockRepository.delete(user_id=user_id, my_stock=test_my_stock2 )
    assert delete_result == True
    assert delete_result2 == True

def test_my_stock_repo(my_stock_test_list):
    user_id , test_list = my_stock_test_list
    test_list.sort(key= lambda my_stock: my_stock.code)
    #read
    read_result = MyStockRepository.read(user_id=user_id)
    mapping_1 = [MyStock(**my_stock[0].__dict__) for my_stock in read_result] 
    
    assert mapping_1 == test_list
    #update
    update_data = {
        "code": "TEST1234",
        "market": "KRX",
        "name" : "테스트1234!@",
        "quantity": 1.123,
        "average_purchase_price" : 789.1
    }
    update_my_stock = MyStock(**update_data)
    update_result = MyStockRepository.update(user_id=user_id,my_stock=update_my_stock)
    read_result2 = MyStockRepository.read(user_id=user_id)
    mapping_2 = [MyStock(**my_stock[0].__dict__) for my_stock in read_result2] 

    update_test_list = [ my_stock for my_stock in test_list if update_my_stock.code != my_stock.code]
    update_test_list.append(update_my_stock)
    update_test_list.sort(key= lambda my_stock: my_stock.code)
    assert update_result == True
    assert mapping_2 == update_test_list
