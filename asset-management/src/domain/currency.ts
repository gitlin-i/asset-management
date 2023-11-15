import { StockMarket } from "./market"


export enum Currency {
    KRW = "KRW",
    USD = "USD",
    JPY = "JPY(100)",
    CNH = "CNY",
    CNY = "CNY",
    HKD = "HKD", //홍콩 달러
    VND = "VND", //베트남 동
    EUR = "EUR",
}
export const CurrencyMark  ={
    [Currency.KRW] : "₩",
    USD: "$",
    [Currency.JPY]: "￥",
    EUR:"€",
    CNY: "¥",
    CNH: "¥",
    HKD: "HK$",
    VND:"VND"
}
type StockMarketToCurrency = {
    [key in StockMarket] : Currency
}
export const MapperStockMarketToCurrency : StockMarketToCurrency = {
    KRX : Currency.KRW,
    NAS: Currency.USD,
    TSE: Currency.JPY,
    HKS: Currency.HKD,
    NYS: Currency.USD,
    AMS: Currency.USD,
    SHS: Currency.CNY,
    SZS: Currency.CNY,
    SHI: Currency.CNY,
    SZI: Currency.CNY,
    HNX: Currency.VND,
    HSX: Currency.VND,
    BAA: Currency.USD,
    BAQ: Currency.USD,
    BAY: Currency.USD,
}

export const CurrencyToKoreanName : {[name: string] : string}= {
    KRW : "원",
    USD : "달러",
    JPY : "엔",
    "JPY(100)" : "엔",
    CNH : "위안",
    CNY : "위안",
    HKD : "홍콩 달러", //홍콩 달러
    VND : "동", //베트남 동
    EUR : "유로",
}

export const POPULAR_CURRENCY = [
    Currency.KRW,
    Currency.JPY,
    Currency.EUR,
    Currency.CNY,
    Currency.USD
]