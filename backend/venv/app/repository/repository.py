
from abc import ABCMeta, abstractmethod


class Repository(metaclass= ABCMeta):  
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