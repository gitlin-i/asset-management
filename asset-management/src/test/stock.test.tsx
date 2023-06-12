import { Currency, calcAllAssetsCurrentValue, calcAssetArrayCurrentValue, calcCashArrayCurrentValue, calcCurrentValue, testRealData } from "../domain/Domain"
import { Cash } from "../domain/cash"
import { MyCoin } from "../domain/coin"
import { Price } from "../domain/price"
import { MyStock, isStock } from "../domain/stock"

test('Stock Testing...', ()=> {
    const stock1 : MyStock = new MyStock('012','어떤 주식1', 3 ,Currency.KRW ,31, )
    

    expect(stock1.code).toBe("012")
    expect(stock1.name).toBe("어떤 주식1")
    expect(stock1.price).toBe(3)
    expect(stock1.quantity).toBe(31)
    stock1.setPrice = 4
    expect(stock1.price).toBe(4)

    const stock1Val = calcAssetArrayCurrentValue([stock1])
    const stock1Val2 = calcAssetArrayCurrentValue([stock1],[new Price("012",21,Currency.KRW)])
    expect(stock1Val).toBe(4 * 31)
    expect(stock1Val2).toBe(21 * 31)


    const bool1 = isStock({
        _code: "a",

    })
    const bool2 = isStock({
        _code: "a",
        _name: "a",
    })
    const bool3 = isStock({
        _code: "a",
        _name: "a",
        _price: 123
    })
    const bool4 = isStock({
        _code: "a",
        _name: "a",
        _price: new Price("12",12,Currency.KRW)
    })
    expect(bool1).toBe(false)
    expect(bool2).toBe(false)
    expect(bool3).toBe(true)
    expect(bool4).toBe(true)
    
})

