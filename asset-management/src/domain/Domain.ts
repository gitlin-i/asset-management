//매수평균가 (Average Purchase Price) 수동입력
//평가 금액 (Current Value) 
//보유 수량 (Quantity Held)
//매수 금액 (Purchase Amount)
export interface Stock{
    code: string;
    price: number; // 자주 바뀜
    name: string;
    market: string;
    country: string;

}
export interface Cash {
    country: string;
    value: number;
}
export interface MyStock extends Stock{
    quantity: number;
    averagePurchasePrice ?: number;

}
export interface Assets {
    stocks ?: Array<MyStock>;
    cash?: Array<Cash>;
    [index : string] : Array<any> | undefined;
}

export interface Price {
    code: string;
    price: number;
    [index : string] : number | string
    ;
}
export interface User {
    assets: Assets;
}





//주식 현재가치 구하기
export const calcCurrentValue = (myStock : MyStock, currentValue= 0) => {
    if (currentValue){
        return myStock.quantity * currentValue
    }
    return myStock.quantity * myStock.price
}
//자산 현재가치 구하기 (일단 주식만)
export const getAssetsCurrentValue = (assets: Assets, ArrayPrice ?: Array<Price>) => {
    const stockCurrentValue = assets?.stocks?.reduce((acc,cur) => {
        const aPrice = ArrayPrice?.find(price => price.code === cur.code)
        if (aPrice){
            return acc += calcCurrentValue(cur, aPrice.price )
        }
        return acc += calcCurrentValue(cur)
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
export const calcAssetsPercentage = (assets : Assets) => {
    const arrayStock = assets?.stocks?.slice() 
    let result : {[key: string] : number} = {}
    const total = getAssetsCurrentValue(assets)
    if(total){
        const arrayRatio = arrayStock?.map((stock) => {
            const nowVal = calcCurrentValue(stock)
            const ratio = calcPercentage(nowVal, total,2)
            return ratio
        })
        if (arrayRatio){
            arrayStock?.forEach((stock,index) => {
                result[stock.name] = arrayRatio[index]
            })
        }

    }
    return result
    
}


