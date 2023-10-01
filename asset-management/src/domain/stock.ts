
import { Currency } from "./currency";
import { StockMarket } from "./market";
import { Price } from "./price";

export class Stock{
    private _code: string;
    private _market: StockMarket
    private _name: string;
    private _price : Price;
    
    constructor(code: string, market : StockMarket ,name: string, price: number , currency: Currency ){
        this._code = code
        this._name = name
        this._market = market
        this._price = new Price(code, price, currency)
    }

    get code() : string {
        return this._code
    }
    get name() : string {
        return this._name
    }
    get price() : number {
        return this._price.value
    }
    get market() : StockMarket {
        return this._market
    }
    get currency() : Currency  {
        return this._price.currency
    }
    set setPrice(val : number) {
        this._price.setValue = val
    }

}
export class MyStock extends Stock {

    private _quantity: number;
    private _averagePurchasePrice ?: number;

    constructor(
        code: string,
        market :StockMarket,
        name: string = "알 수 없는 이름",
        price: number = 0,
        currency: Currency,
        quantity : number,
        averagePurchasePrice ?: number,){
            super(code,market,name,price,currency)
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

export const isStock = (obj : object) => {
    if (typeof obj ==='object' &&
    '_code' in obj &&
    '_name' in obj &&
    '_price' in obj 
    ) return true
    return false
}
export const isMyStock = (obj : object) => {
    if (typeof obj ==='object' &&
    '_code' in obj &&
    '_name' in obj &&
    '_price' in obj &&
    '_quantity' in obj
    ) return true
    return false
}