import { Currency } from "./Domain";

export class Price {
    private _code : string;
    private _value : number;
    private _currency : Currency;

    constructor(code: string, value:number, currency : Currency ){
        if (value <0){
            throw new Error('Price_Value가 음수입니다.') 
        }
        this._code = code
        this._value = value
        this._currency = currency
    }
    get value() : number {
        return this._value
    }
    get code() : string {
        return this._code
    }
    get currency() : Currency {
        return this._currency
    }
    set setValue(value : number) {
        if (value < 0){
            throw new Error('Price_Value가 음수입니다.') 
        }
        this._value = value
    }
    
}

export const isPrice = (object: Object) => {
    if(typeof object === 'object' &&
    '_code' in object &&
    '_value' in object&&
    '_currency' in object) return true
    return false
}