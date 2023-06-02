import { Price } from "./price";

export class Stock{
    private _code: string;
    private _name: string;
    private _price : Price;
    private _market?: string;
    private _country?: string;

    constructor(code: string, name: string, price: number | Price, market?: string, country?: string  ){
        this._code = code
        this._name = name
        
        this._market = market
        this._country = country
        if(typeof price === 'number') {
            this._price= new Price(code, price)
        } else {
            this._price = price
        }
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
    set setPrice(val : number) {
        this._price.setValue = val
    }

}
export class MyStock extends Stock {

    private _quantity: number;
    private _averagePurchasePrice ?: number;

    constructor(
        code: string,
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