import { Currency } from "./Domain";

export class Cash {
    private _value : number;
    private _currency : Currency;
    constructor(value: number , currency : Currency){
        if (value <0) {
            throw Error ("value가 음수가 될 수 없습니다.")
        }
        this._value = value
        this._currency = currency
    }
    get value() : number {
        return this._value
    }
    get currency() : Currency {
        return this._currency
    }
}