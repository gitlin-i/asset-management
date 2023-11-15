
import { Assets,  calcAllAssetsCurrentValue, calcAssetsPercentage } from "../domain/domain"
import { MyCoin } from "../domain/coin"
import { Currency } from "../domain/currency"
import { MyStock } from "../domain/stock"



test('assets Testing...' , () => {
const assets :Assets = {
    stocks:[],
    cash:[],
    coins : [],
}
    const assetsCurVal = calcAllAssetsCurrentValue(assets)
    expect(assetsCurVal).toBe(0)

    const assetsCurPer = calcAssetsPercentage(assets)
    expect(assetsCurPer).toEqual([])

    const stock1 : MyStock = new MyStock('0101001',"KRX",'어떤 주식1', 12222,Currency.KRW,31, )
    const stock2 : MyStock = new MyStock('0101002',"KRX",'어떤 주식2', 12232,Currency.KRW,3 )
    const coin1 : MyCoin = new MyCoin('led', "Elnora", 33,Currency.KRW,56)
    const myAssets : Assets= {
      stocks: [
        stock1,
        stock2,
      ],
      cash:[],
      coins : [],
    }
    const emptyAssets :Assets = {
      stocks: [],
      cash: []
    }
    const stockAndCoinAssets: Assets = {
      stocks: [stock1,stock2],
      coins: [coin1]

    }
    const SACValue = calcAllAssetsCurrentValue(stockAndCoinAssets)
    expect(SACValue).toBe(31*12222+ 3*12232 + 33*56 )
    
    const emptyVal = calcAllAssetsCurrentValue(emptyAssets)
    expect(emptyVal).toBe(0)
    
    const assetsCurVal2 = calcAllAssetsCurrentValue(myAssets)
    expect(assetsCurVal2).toBe(31* 12222 + 3* 12232)

    const assetsCurPer2 = calcAssetsPercentage(myAssets)
    const resultArray = [{"stocks": 100} , {"coins": 0},{"cash":0}]
    expect(assetsCurPer2).toEqual(resultArray)
})

