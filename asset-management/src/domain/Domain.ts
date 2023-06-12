//매수평균가 (Average Purchase Price) 수동입력
//평가 금액 (Current Value) 
//보유 수량 (Quantity Held)
//매수 금액 (Purchase Amount)

import { Cash } from "./cash";
import { Coin, MyCoin } from "./coin";
import { Price } from "./price";
import { MyStock, Stock, isStock } from "./stock";

export interface Assets {
    stocks ?: Array<MyStock>;
    cash?: Array<Cash>;
    coins?: Array<MyCoin>;
    [index : string] : Array<any> | undefined;
}

export enum Currency {
    KRW = "KRW",
    USD = "USD",
}


export interface User {
    assets: Assets;
}

export const testRealData : Assets = {
    stocks: [// 현재가 수량 매입가
        new MyStock("BYND","비욘드 미트",10.63,Currency.USD,22,76.59),
        new MyStock("IVV","ISHARES CORE S&P 500 ETF",429.7900,Currency.USD,1,439.1900),
        new MyStock("QQQ","Invesco QQQ Trust Series 1",354.6500,Currency.USD,3,379.7200),
        new MyStock("TQQQ","ProShares UltraPro QQQ",36.8200,Currency.USD,17,64.5158),
        new MyStock("UPRO","ProShares UltraPro S&P500",42.7900,Currency.USD,2,60.2150), // 해외주식
        new MyStock("228670","레이", 36700,Currency.KRW,16,32378.125),
        new MyStock("293490", "카카오게임즈",39300,Currency.KRW,16,52000),
        new MyStock("379800","KODEX 미국S&P500TR",12410,Currency.KRW,138,11080),
        new MyStock("379810","KODEX 미국나스닥100TR",12530,Currency.KRW,252,11501),//국내주식
    ],
    coins : [
        new MyCoin("ETH", "이더리움",2511000,Currency.KRW,1.19411886)
    ],
    cash:[
        new Cash(2000000,Currency.KRW)
    ]
}

//주식,코인 현재가치 구하기
export const calcCurrentValue = (myAsset : MyStock | MyCoin, currentValue= 0,currency= Currency.KRW,) : number => {
    if (!myAsset.quantity || !myAsset.price) {
        throw Error('값이 존재하지 않습니다.')
    }
    const nowValue = (currentValue) ?  myAsset.quantity * currentValue : myAsset.quantity * myAsset.price
    
    if (myAsset.currency === currency) {
        return nowValue
    }
    return exchangeValue(nowValue, 1300)// rate hard coding
    
}
//asset[] 의 현재가치
export const calcAssetArrayCurrentValue = (assets : Array<MyStock | MyCoin>, newPrices ?: Array<Price>) :number => {
    const assetsCurrentValue = assets.reduce((acc, asset) => {
        const newPrice = newPrices?.find(price => price.code === asset.code)
        if (newPrice){
            return acc += calcCurrentValue( asset, newPrice.value )
        }
        return acc += calcCurrentValue(asset)
    },0)

    return assetsCurrentValue
}
//cash[] 의 현재가치
export const calcCashArrayCurrentValue = (cash: Cash[] , currency = Currency.KRW) => {
    const cashValue = cash.reduce((acc, aCash) => {
        if(aCash.currency === currency){
           return acc += aCash.value
        } else {
            return acc += exchangeValue(aCash.value,1300)
        }
    },0);
    return cashValue
} 
// assets 전체 현재가치 구하기
export const calcAllAssetsCurrentValue = (assets: Assets, ArrayPrice ?: Array<Price>) => {
    if(assets?.stocks?.length === 0 && assets?.coins?.length === 0 && assets.cash?.length === 0){
        return 0
    }
    let assetsValue = 0
    if(assets?.stocks && assets?.stocks?.length > 0){
        const stockCurrentValue = calcAssetArrayCurrentValue( assets?.stocks, ArrayPrice)
        assetsValue += stockCurrentValue
    }
    if(assets?.coins && assets?.coins.length > 0){
        const coinsCurrentValue = calcAssetArrayCurrentValue( assets?.coins , ArrayPrice)
        assetsValue += coinsCurrentValue
    }
    if(assets?.cash && assets?.cash.length > 0){
        const cashCurrentValue = calcCashArrayCurrentValue(assets.cash, Currency.KRW)
        assets?.cash.reduce((acc, aCash) => {
            if(aCash.currency === Currency.KRW){
                return acc += aCash.value
            } else {
               const exchangedValue = exchangeValue(aCash.value, 1300)//rate hard coding
               return acc += exchangedValue
            }
            
        },0)
        assetsValue += cashCurrentValue
    }
    return assetsValue
}
//환전
export const exchangeValue = (targetValue : number, exchangeRate: number, digit=0) => {
    // return Math.round((targetValue * exchangeRate) * (10 ** digit)) / (10 ** digit)
    return roundNumber(targetValue * exchangeRate, digit)
}
//소수점 
export const roundNumber = (x: number, digit = 0) => {
    return Math.round(x * (10 ** digit)) / (10 ** digit)
}
//비율
export const calcPercentage = (part :number, total: number , digit = 0) => {
    return roundNumber((part / total) * 100, digit)
}

//자산 현재 가치 비율 계산
export const calcAssetsPercentage = (assets : Assets) : Array<Object>=> {
    const stocks = assets?.stocks?.slice() 
    const coins = assets?.coins?.slice()
    const cash = assets?.cash?.slice()
    const total = calcAllAssetsCurrentValue(assets)

    let resultArray : Array<{[key: string] : number}> = []

    if (total && stocks){
        const stockRatio = calcPercentage(calcAssetArrayCurrentValue(stocks), total)
        resultArray.push({"stocks": stockRatio})
    }
    if (total && coins){
        const coinsRatio = calcPercentage(calcAssetArrayCurrentValue(coins), total)
        resultArray.push({"coins": coinsRatio})
    }
    if (total && cash){
        const cashRatio = calcPercentage(calcCashArrayCurrentValue(cash), total)
        resultArray.push({"cash": cashRatio})
    }

    return resultArray
}

export const CurrencyMark = (currency : Currency) : string => {
    switch(currency){
        case Currency.KRW : {
            return "₩"
        }
        case Currency.USD : {
            return "$"
        }
        default : {
            return "NONE"
        }
    }
}
//
