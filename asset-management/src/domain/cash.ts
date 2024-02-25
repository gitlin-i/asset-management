import { Currency } from "./currency";
import { Price } from "./price";

export class Cash {

    private _price : Price;

    constructor(value: number , currency : Currency){
        this._price = new Price(currency,value,currency)

    }
    get value() : number {
        return this._price.value
    }
    get currency() : Currency {
        return this._price.currency
    }
    get price(): number {
        return this._price.value
    }
    get code(): string {
        return this._price.code
    }
    get name(): string {
        return this._price.currency
    }
    get quantity() : null{
        return null
    }
}