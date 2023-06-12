import { Currency } from "./Domain";

class ExchangeRate {
    private _From : Currency
    private _To : Currency
    private _Rate : number
    constructor(from : Currency, to: Currency , rate:number){
        this._From = from
        this._To = to
        this._Rate = rate

    }

    get rate() : number{
        return this._Rate
    }
    set setRate(exchangeRate : number) {
        this._Rate = exchangeRate
    }

    exchange(value : number) : string {
        return `${this._From} => ${this._To} : ${this._Rate * value}`
    }
    exchangeValue(value : number) : number {
        return this._Rate * value
    }
}