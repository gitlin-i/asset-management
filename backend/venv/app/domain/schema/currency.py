
from enum import Enum, auto


class AutoName(Enum):
    def _generate_next_value_(name, start, count, last_values):
        return name

class Currency(AutoName):

    AED = auto()
    AUD = auto()
    BHD = auto()
    BND = auto()
    CAD = auto()
    CHF = auto()
    CNH = auto()
    DKK = auto()
    EUR = auto()
    GBP = auto()
    HKD = auto()
    IDR = "IDR(100)"
    JPY = "JPY(100)"
    KRW = auto()
    KWD = auto()
    MYR = auto()
    NOK = auto()
    NZD = auto()
    SAR = auto()
    SEK = auto()
    SGD = auto()
    THB = auto()
    USD = auto()


    