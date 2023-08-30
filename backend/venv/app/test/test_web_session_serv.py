from uuid import uuid4
from pytest import fixture, mark
from repository.web_session_repository import WebSessionRepositorty
from domain.schema.web_session import WebSession
@fixture
def set_web_session():
    new_uuid = uuid4()
    test_id = "test"
    test_session = WebSession(uuid=new_uuid, user_id=test_id)
    create_result = WebSessionRepositorty.create(test_session)
    assert create_result == True
    yield create_result
    delete_result = WebSessionRepositorty.delete(new_uuid)
    assert delete_result == True


