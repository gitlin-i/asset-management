from domain.model.test import Test as model
from domain.schema.test import Test 
from repository.test_repository import TestRepository
from sqlalchemy.orm import Session
from abc import ABCMeta, abstractmethod
class TestBase(metaclass= ABCMeta):

    @abstractmethod
    def create():
        pass
    @abstractmethod
    def read():
        pass
    @abstractmethod
    def update():
        pass
    @abstractmethod
    def delete():
        pass
    
class TestService(TestBase):

    def create(self,db :Session, test: Test):
        result = TestRepository.create_test(db, test)
        return result
    
    def read(self,db:Session, id: int):
        result = TestRepository.read_test(db, id)
        print(result)
        return result
    
    def update(self,db:Session,testId : int, test:Test):
        result = TestRepository.update_test(db,test, testId)
        return result

    def delete(self,db:Session, id: int):
        result = TestRepository.delete_test(db,id)
        return result