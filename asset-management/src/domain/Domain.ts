//매수평균가 (Average Purchase Price) 수동입력
//평가 금액 (Current Value) 
//보유 수량 (Quantity Held)
//매수 금액 (Purchase Amount)

import { Price } from "./price";
import { MyStock, Stock, isStock } from "./stock";

export interface Cash {
    country: string;
    value: number;
}
export interface Coin{
    code: string;
    name: string;
}


export interface MyCoin extends Coin {
    quantity: number;
    averagePurchasePrice ?: number;
}
export interface Assets {
    stocks ?: Array<MyStock>;
    cash?: Array<Cash>;
    coins?: Array<Coin>;
    [index : string] : Array<any> | undefined;
}

// export interface Price {
//     code: string;
//     value: number;
//     [index : string] : number | string
//     ;
// }


export interface User {
    assets: Assets;
}





//주식 현재가치 구하기
export const calcCurrentValue = (myStock : MyStock, currentValue= 0) : number => {
    if (!myStock.quantity || !myStock.price) {
        throw Error('값이 존재하지 않습니다.')
    }
    if (currentValue){
        return myStock.quantity * currentValue
    }
    return myStock.quantity * myStock.price
}
//자산 현재가치 구하기 (일단 주식만 구현)
export const calcAssetsCurrentValue = (assets: Assets, ArrayPrice ?: Array<Price>) => {
    if(assets?.stocks?.length === 0 && assets?.coins?.length === 0 && assets.cash?.length === 0){
        return 0
    }
    let assetsValue = 0
    if(assets?.stocks && assets?.stocks?.length > 0){
        console.log(assets.stocks)
        const stockCurrentValue = calcStocksCurrnetValue( assets?.stocks, ArrayPrice)
        assetsValue += stockCurrentValue
    }
    return assetsValue
}

export const calcStocksCurrnetValue = (stocks : Array<MyStock>, prices ?: Array<Price>) :number => {
    const stockCurrentValue = stocks.reduce((acc, aStock) => {
        const aPrice = prices?.find(price => price.code === aStock.code)
        if (aPrice){
            return acc += calcCurrentValue( aStock, aPrice.value )
        }
        return acc += calcCurrentValue(aStock)
    },0)

    return stockCurrentValue
}

export const calcPercentage = (part :number, total: number , digit = 0) => {
    if (digit === 0 ){
        return  (part / total) * 100
    } else {
        return Math.round(((part / total ) * 100) * (10 ** digit) )  / (10 ** digit) 
    }
    
}

//자산 현재 가치 비율 계산
export const calcAssetsPercentage = (assets : Assets) :Array<Object>=> {
    const stocks = assets?.stocks?.slice() 
    const total = calcAssetsCurrentValue(assets)

    let resultArray : Array<{[key: string] : number}> = []
    if(total){
        const ratios = stocks?.map((stock) => {
            const nowVal = calcCurrentValue(stock)
            const ratio = calcPercentage(nowVal, total,2)
            return ratio
        })
        if (ratios && stocks){
            resultArray = stocks?.map((stock,index) => {
                const nameWithRatio : {[key: string] : number} = {}
                nameWithRatio[stock.name] = ratios[index]
                return nameWithRatio
            })
        }
        
    }

    return resultArray
}
export const convertInstanceToObject = (instance: any) :any => {
    // const newObjcet = Object.assign({}, instance)
    if(instance === null || typeof instance !== 'object'){
        return instance
    }
    const newObjcet :any = {}
    for(const property in instance) {
        if(Object.prototype.hasOwnProperty.call(instance, property)){
            const val = instance[property]
            newObjcet[property] = convertInstanceToObject(val)
        }
    }
    return newObjcet
}
export const convertObjectToStock = (obj: Object) : Stock | undefined => {
    if (isStock(obj)) {
        // const {code, name, price} = obj as {code : string, name: string,price: number | Price, market ?: string}
    }
    return undefined
}