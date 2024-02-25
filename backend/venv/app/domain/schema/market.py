
from enum import Enum, auto  

class AutoName(Enum):
    def _generate_next_value_(name, start, count, last_values):
        return name
class Market(str, AutoName):
    HKS = auto() #"홍콩"
    NYS = auto() #"뉴욕"
    NAS = auto()#"나스닥"
    AMS = auto()#"아멕스"
    TSE = auto()#"도쿄"
    SHS = auto()#"상해"
    SZS = auto()#"심천"
    SHI = auto()#"상해지수"
    SZI = auto()#"심천지수"
    HSX = auto()#"호치민"
    HNX = auto()#"하노이"
    BAY = auto()#"뉴욕(주간)"
    BAQ = auto()#"나스닥(주간)"
    BAA = auto()#"아멕스(주간)"
    KRX = auto() #"한국"
    # KOSPI = auto()#"코스피"
    # KOSPI200 = auto()#"코스피200"
    # KOSDAQ = auto()#"코스닥"
