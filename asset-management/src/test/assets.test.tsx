
import { Assets, Currency, calcAllAssetsCurrentValue, calcAssetsPercentage } from "../domain/Domain"
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

    const stock1 : MyStock = new MyStock('0101001','어떤 주식1', 12222,Currency.KRW,31, )
    const stock2 : MyStock = new MyStock('0101002','어떤 주식2', 12232,Currency.KRW,3 )
    const myAssets : Assets= {
      stocks: [
        stock1,
        stock2,
      ],
      cash:[],
      coins : [],
    }

    const assetsCurVal2 = calcAllAssetsCurrentValue(myAssets)
    expect(assetsCurVal2).toBe(31* 12222 + 3* 12232)

    const assetsCurPer2 = calcAssetsPercentage(myAssets)
    const resultArray = [{"stocks": 100} , {"coins": 0},{"cash":0}]
    expect(assetsCurPer2).toEqual(resultArray)
})

