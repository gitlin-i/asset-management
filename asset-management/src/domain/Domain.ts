import { Currency } from "./currency";
import { ExchangeRate } from "./exchangeRate";
//매수평균가 (Average Purchase Price) 수동입력
//평가 금액 (Current Value) 
//보유 수량 (Quantity Held)
//매수 금액 (Purchase Amount)

export interface Ratio {
    [key: string] : number;
}

export interface Ratios {
    ratios : Ratio[];
    calcPercentage : ()=> number;
}


export const  MarketToCurrency : {[key: string] : Currency} = {
    KOSDAQ : Currency.KRW,
    KOSPI : Currency.KRW,
    NASDAQ : Currency.USD,
    NAS : Currency.USD,
    KRX : Currency.KRW,
    TSE : Currency.JPY,
    AMS : Currency.USD,

}

export const mappingText = (category : string | undefined) => {
    let text
    switch(category){
        case "stocks":
            text = "주식"
            break
        case "coins":
            text = "코인"
            break
        case "cash":
            text = "현금"
            break
        default:
            text = "자산"
    }
    return text
}

//환전
export const exchangeValue = (targetValue : number, exchangeRate?: number | ExchangeRate , digit=0) => {
    // return Math.round((targetValue * exchangeRate) * (10 ** digit)) / (10 ** digit)
    if (exchangeRate === 0 || typeof exchangeRate === 'undefined'){
        console.log("환율이 0 또는 존재하지 않습니다. 입력 값을 반환합니다.")
        return roundNumber(targetValue,digit)
    }
    if ( typeof exchangeRate === 'number') {
        return roundNumber(targetValue * exchangeRate, digit)
    }
    return roundNumber(targetValue * exchangeRate.rate, digit)
    
}
//소수점 
export const roundNumber = (x: number, digit = 0) => {
    return Math.round(x * (10 ** digit)) / (10 ** digit)
}
//비율
export const calcPercentage = (part :number, total: number , digit = 0) => {
    return roundNumber((part / total) * 100, digit)
}

