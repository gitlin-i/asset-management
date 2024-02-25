
from service.user_service import UserService
from repository.user_repository import UserRepositorty
from domain.schema.user import UserIn,UserSecret
from pytest import fixture


test_user = {
    "id" : "test",
    "name": "김테스트",
    "password" : "test1234",
}

@fixture
def set_user() -> UserIn:
    user = UserIn(**test_user)
    create_result = UserService.register_user(user)
    assert create_result == True
    yield user
    delete_result = UserRepositorty.delete(user.id)
    assert delete_result == True

def test_user_in_repo(set_user):
    user : UserIn = set_user
    read_result = UserRepositorty.read(user.id)

    assert read_result.name == user.name
    assert read_result.id == user.id
    assert read_result.password.get_secret_value() == user.password

def test_user_verify_password(set_user):
    user: UserIn = set_user
    user_secret = UserRepositorty.read(user.id)
    result = UserService.verify_password("test1234", user_secret.password.get_secret_value())
    assert result == True

def test_user_verify_expect_fail(set_user):
    user: UserIn = set_user
    user_secret = UserRepositorty.read(user.id)
    result = UserService.verify_password("test12345",user_secret.password.get_secret_value())
    assert result == False