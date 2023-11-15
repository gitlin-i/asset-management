from pytest import fixture,raises
from domain.schema.my_ratio import MyRatioIn, MyRatioOut
from repository.my_ratio_repository import MyRatioRepository

@fixture
def my_ratio_row_multi():
    user_id = "test"
    
    test_data = MyRatioIn(ratio_name="테스트입니다",ratio=22.0,asset_code="assets") 
    test_data2 = MyRatioIn(ratio_name="문자열 길이가 충분한가",ratio=2.001,asset_code=1) 
    test_data3 = MyRatioIn(ratio_name="부호?~!+-*.",ratio=12,asset_code="coin") 
    
    my_ratio_list = [test_data,test_data2,test_data3]
    my_ratio_list.sort(key= lambda data : (data.asset_code,data.ratio_name))

    my_ratio_out_list = []
    for test in my_ratio_list:
        create = MyRatioRepository.create(user_id,test)
        ratio_out = MyRatioOut(**test.dict())
        my_ratio_out_list.append(ratio_out)
        assert create == True
        
    yield user_id, my_ratio_out_list
    
    delete = MyRatioRepository.delete_by_user_id(user_id)
    assert delete == True


def test_my_ratio_repo(my_ratio_row_multi):
    #read
    user_id , my_ratio_out_list = my_ratio_row_multi
    read_result = MyRatioRepository.read_by_user_id(user_id)
    mapping = [ MyRatioOut(**read[0].__dict__) for read in read_result]
    assert mapping == my_ratio_out_list

    #update
    update_ratio = MyRatioIn(ratio_name="문자열 길이가 충분한가",ratio=77,asset_code=1) 
    update = MyRatioRepository.update(user_id=user_id,my_ratio=update_ratio)
    assert update == True

    updated = MyRatioRepository.read_by_user_id_asset_ratio_name(user_id=user_id,asset="stock",ratio_name="문자열 길이가 충분한가")
    updated_result =  MyRatioOut(**updated[0].__dict__)
    expected_ratio = MyRatioOut(ratio_name="문자열 길이가 충분한가",ratio=77,asset_code=1)
    assert updated_result== expected_ratio
