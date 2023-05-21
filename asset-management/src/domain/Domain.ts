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

export class Stock1{
    private _code: string;
    private _name: string;
    private _price : number;
    private _market?: string;
    private _country?: string;

    constructor(code: string, name: string, price: number, market?: string, country?: string  ){
        this._code = code
        this._name = name
        this._price = price
        this._market = market
        this._country = country
    }

    get code() : string {
        return this._code
    }
    get name() : string {
        return this._name
    }
    get price() : number {
        return this._price
    }
    set setPrice(val : number) {
        if(val < 0) {
            throw new Error("price가 음수입니다.")
        }
        this._price = val
    }

}
export class MyStock1 extends Stock1 {

    private _quantity: number;
    private _averagePurchasePrice ?: number;

    constructor(code: string,
        name: string,
        price: number,
        quantity : number,
        averagePurchasePrice ?: number,
        market?: string, country?: string,   ){

        super(code,name,price,market,country)
        this._quantity = quantity
        this._averagePurchasePrice = averagePurchasePrice
    }
    get quantity() :number {
        return this._quantity
    }
    get averagePurchasePrice() : number {
        if(this._averagePurchasePrice){
            return this._averagePurchasePrice
        }else{
            return 0
        }
    }
}
export interface Cash {
    country: string;
    value: number;
}
export interface Coin{
    code: string;
    name: string;
}

export interface MyStock extends Stock{
    quantity: number;
    averagePurchasePrice ?: number;
}
export interface MyCoin extends Coin {
    quantity: number;
    averagePurchasePrice ?: number;
}
export interface Assets {
    stocks ?: Array<MyStock | MyStock1>;
    cash?: Array<Cash>;
    coins?: Array<Coin>;
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
export const calcCurrentValue = (myStock : MyStock | MyStock1, currentValue= 0) : number => {
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
export const calcAssetsPercentage = (assets : Assets) :Array<Object>=> {
    const stocks = assets?.stocks?.slice() 
    const total = getAssetsCurrentValue(assets)

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


