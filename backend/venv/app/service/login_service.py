from abc import ABCMeta, abstractmethod

class LoginBase(metaclass= ABCMeta):

    @abstractmethod
    def login():
        pass
    @abstractmethod
    def logout():
        pass


class LoginService(LoginBase):

    @staticmethod
    def login():
        pass