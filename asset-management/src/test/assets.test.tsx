
import { Assets, calcAssetsCurrentValue, calcAssetsPercentage } from "../domain/Domain"
import { MyStock } from "../domain/stock"



test('assets Testing...' , () => {
const assets :Assets = {
    stocks:[],
    cash:[],
    coins : [],
}
    const assetsCurVal = calcAssetsCurrentValue(assets)
    expect(assetsCurVal).toBe(0)

    const assetsCurPer = calcAssetsPercentage(assets)
    expect(assetsCurPer).toEqual([])

    const stock1 : MyStock = new MyStock('0101001','어떤 주식1', 12222,31, )
    const stock2 : MyStock = new MyStock('0101002','어떤 주식2', 12232,3 )
    const myAssets : Assets= {
      stocks: [
        stock1,
        stock2,
      ],
      cash:[],
      coins : [],
    }

    const assetsCurVal2 = calcAssetsCurrentValue(myAssets)
    expect(assetsCurVal2).toBe(31* 12222 + 3* 12232)

    const assetsCurPer2 = calcAssetsPercentage(myAssets)
    const resultArray = [{"어떤 주식1": 91.17} , {"어떤 주식2": 8.83}]
    expect(assetsCurPer2).toEqual(resultArray)
})

