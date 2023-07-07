from abc import ABCMeta, abstractmethod

class Repository(metaClass= ABCMeta):
    @abstractmethod
    def read():
        pass
    @abstractmethod
    def update():
        pass
    @abstractmethod
    def create():
        pass
    @abstractmethod
    def delete():
        pass

class StockRepository(Repository):
    def read(code):
        return