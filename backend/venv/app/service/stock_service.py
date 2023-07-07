from abc import ABCMeta, abstractmethod

class Service(metaClass= ABCMeta):
    
    @abstractmethod
    def currentPrice():
        pass


# class StockService(Service):

    # def currentPrice(code):
    #     try:
    #         price = StockRepository.read_currentPrice(code)
    #     except NoneCurrentPriceError:
    #         flag = StockRepository.create_currentPrice(code)
    #         if flag:
    #             price = StockRepository.read_currentPrice(code)
    #         else:
    #             #some error

    #     return price