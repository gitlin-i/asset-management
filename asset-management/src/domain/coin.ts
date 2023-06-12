import { Currency } from "./Domain";
import { Price } from "./price";

export class Coin {
    private _code : string;
    private _name : string;
    private _price : Price;

    constructor(code : string , name: string, price : number, currency : Currency) {
        this._code = code
        this._name = name
        this._price = new Price(code,price,currency)
    }
    get price() : number {
        return this._price.value
    }
    get currency () : Currency {
        return this._price.currency
    }
    get code() : string {
        return this._code
    }
    get name() : string{
        return this._name
    }
}

export class MyCoin extends Coin {
    private _quantity : number;
    private _averagePurchasePrice ?: number;

    constructor(
        code : string ,
        name: string,
        price : number,
        currency : Currency ,
        quantity: number,
        averagePurchasePrice ?: number){
            super(code, name,price,currency)
            this._quantity = quantity
            this._averagePurchasePrice = averagePurchasePrice
        }
    get quantity() : number {
        return this._quantity
    }
}