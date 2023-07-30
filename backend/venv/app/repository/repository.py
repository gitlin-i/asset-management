
from abc import ABCMeta, abstractstaticmethod


class Repository(metaclass= ABCMeta):
    @abstractstaticmethod
    def read():
        pass
    @abstractstaticmethod
    def update():
        pass
    @abstractstaticmethod
    def create():
        pass
    @abstractstaticmethod
    def delete():
        pass