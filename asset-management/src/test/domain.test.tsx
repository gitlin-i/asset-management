import { Assets, calcPercentage, calcAllAssetsCurrentValue, calcCurrentValue, calcAssetsPercentage,  Currency, testRealData, calcAssetArrayCurrentValue, calcCashArrayCurrentValue, } from "../domain/Domain"
import { Cash } from "../domain/cash"
import { MyCoin } from "../domain/coin"
import { MyStock } from "../domain/stock"
import { NivoPieChartData, ObjectToNivoPieChartData, aInput } from "../utill/NivoPieChart"



test('Stock Testing...', ()=> { // code, name, price, quantity
  const stock1 : MyStock = new MyStock('0101001','어떤 주식1', 12222,Currency.KRW,31, )
  const stock2 : MyStock = new MyStock('0101002','어떤 주식2', 12232,Currency.KRW,3 )
  const myAssets : Assets= {
    stocks: [
      stock1,
      stock2,
    ],
  }
  /////
  const stockCurrentValue = calcCurrentValue(stock1)
  expect(stockCurrentValue).toBe(12222 *31)

  const stockCurrentValueWithNowPrice = calcCurrentValue(stock2,12345)
  expect(stockCurrentValueWithNowPrice).toBe(12345 * 3)

  const assetsCurrentPrice = calcAllAssetsCurrentValue(myAssets,)
  expect(assetsCurrentPrice).toBe(31* 12222 + 3* 12232)

  const AssetsRatios = calcAssetsPercentage(myAssets)
  const resultArray = [{"어떤 주식1": 91.17} , {"어떤 주식2": 8.83}]
  expect(AssetsRatios).toStrictEqual(resultArray)

  expect(stock1.price).toBe(12222)
})

test('Percentage Testing...',()=>{
  const a = 23
  const b = 77
  const c = 100

  expect(calcPercentage(a , c) ).toBe(23)
  expect(calcPercentage(a,b,1) ).toBe(29.9)
  expect(calcPercentage(a,b,3) ).toBe(29.870)

})


test('nivo Testing....', () => {


  const nivoData : NivoPieChartData = {
    id: "1234",
    label: "somelabel",
    value: 4321
  }
  const someStock1 : MyStock = new MyStock('0101001', '어떤 주식1',12222,Currency.KRW,31)
  const someStock2 :MyStock = new MyStock('0101002','어떤 주식2', 12232,Currency.KRW,3,7000)
  const myAssets : Assets= {
    stocks: [
      someStock1,
      someStock2
    ],
  }

  const chartDataArray = calcAssetsPercentage(myAssets).map(obj => ObjectToNivoPieChartData(obj as aInput))
  const literalObject = [
    {
      id: "어떤 주식1",
      label: "어떤 주식1",
      value: 91.17
    },
    {
      id: "어떤 주식2",
      label: "어떤 주식2",
      value: 8.83
    }
  ]
  expect(calcAssetsPercentage(myAssets).map(obj => ObjectToNivoPieChartData(obj as aInput))).toStrictEqual(literalObject)
})


test("assets Testing...", ()=> {
  const stock1 : MyStock = new MyStock('0101001', '어떤 주식1',12222,Currency.KRW,31)
  const stock2 :MyStock = new MyStock('0101002','어떤 주식2', 12232,Currency.KRW,3,7000)
  const myAssets : Assets= {
    stocks: [
      stock1,
      stock2,
    ],
    cash: [],
    coins:[]
  }
  const stockCurrentValue = calcCurrentValue(stock1)
  expect(stockCurrentValue).toBe(12222 *31)

  const stockCurrentValueWithNowPrice = calcCurrentValue(stock2,12345)
  expect(stockCurrentValueWithNowPrice).toBe(12345 * 3)

  const assetsCurrentPrice = calcAllAssetsCurrentValue(myAssets,)
  expect(assetsCurrentPrice).toBe(31* 12222 + 3* 12232)

  const AssetsRatios = calcAssetsPercentage(myAssets)
  const resultArray = [{"어떤 주식1": 91.17} , {"어떤 주식2": 8.83}]
  expect(AssetsRatios).toStrictEqual(resultArray)

  
})


test('testRealData Testing...' ,() => {
  const testData = testRealData
  const target : MyStock | undefined = testData.stocks?.find((stock)=> {
    return stock.code === "BYND"
  } )
  const targetCurrentValue = calcCurrentValue(target as MyStock)
  const stocksValue = calcAssetArrayCurrentValue(testData.stocks as MyStock[])
  const coinsValue = calcAssetArrayCurrentValue(testData.coins as MyCoin[],undefined,)
  const cashValue = calcCashArrayCurrentValue(testData.cash as Cash[])
  expect(targetCurrentValue).toBe(10.63 * 22 * 1300)
  expect(stocksValue).toBe(10.63 * 22 * 1300
      + 429.7900 * 1 * 1300
      + 354.65 * 3 * 1300
      + 36.8200 * 17 * 1300
      + 42.790 * 2 * 1300
      + 36700 * 16
      + 39300 * 16
      + 12410 * 138
      + 12530 * 252
      )
  expect(coinsValue.toFixed(5)).toBe("2998432.45746")
  expect(cashValue).toBe(2000000)

  const allValue = calcAllAssetsCurrentValue(testData)
  expect(allValue).toBe(stocksValue + coinsValue+ cashValue)

})
