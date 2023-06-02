export class Price {
    private _code : string;
    private _value : number;
    constructor(code: string, value:number){
        if (value <0){
            throw new Error('Price_Value가 음수입니다.') 
        }
        this._code = code
        this._value = value
    }
    get value() : number {
        return this._value
    }
    get code() : string {
        return this._code
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
    '_value' in object) return true
    return false
}