import { Assets, MyStock, calcPercentage, getAssetsCurrentValue, calcCurrentValue, calcAssetsPercentage } from "../domain/Domain"

test('CurrentValue Testing...',() =>{
    const someStock1 : MyStock = {
        code: '0101001',
        price: 12222,
        name: '어떤 주식1',
        market: 'KOSPI',
        country: 'KO',
        quantity: 31
      }
      const someStock2 : MyStock = {
        code: '0101002',
        price: 12232,
        name: '어떤 주식2',
        market: 'KOSPI',
        country: 'KO',
        quantity: 3,
        averagePurchasePrice: 7000,
      }
      const myAssets : Assets= {
        stocks: [
          someStock1,
          someStock2
        ],
      }
    const result = calcCurrentValue(someStock1)
    const result2 = calcCurrentValue(someStock2,12345)
    const result3 = getAssetsCurrentValue(myAssets,)
    const result4 = calcAssetsPercentage(myAssets)
    expect(result).toBe(12222 *31)
    expect(result2).toBe(12345 * 3)
    expect(result3).toBe(31* 12222 + 3* 12232)
    expect(result4).toStrictEqual({"0101001":91.17,"0101002":8.83})

})

test('calc Testing...',()=>{
  const a = 23
  const b = 77
  const c = 100

  expect(calcPercentage(a , c) ).toBe(23)
  expect(calcPercentage(a,b,1) ).toBe(29.9)
  expect(calcPercentage(a,b,3) ).toBe(29.870)

})