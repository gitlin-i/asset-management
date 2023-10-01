import { StockMarket } from "./market"


export enum Currency {
    KRW = "KRW",
    USD = "USD",
    JPY = "JPY",
    CNH = "CNY",
    CNY = "CNY",
    HKD = "HKD", //홍콩 달러
    VND = "VND", //베트남 동
    EUR = "EUR",
}
export const CurrencyMark  ={
    KRW: "₩",
    USD: "$",
    JPY: "￥",
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
