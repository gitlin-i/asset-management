import { Assets, calcPercentage, calcAssetsCurrentValue, calcCurrentValue, calcAssetsPercentage, convertInstanceToObject, } from "../domain/Domain"
import { Price } from "../domain/price"
import { MyStock } from "../domain/stock"
import { NivoPieChartData, ObjectToNivoPieChartData, aInput } from "../utill/NivoPieChart"



test('Stock Testing...', ()=> { // code, name, price, quantity
  const stock1 : MyStock = new MyStock('0101001','어떤 주식1', 12222,31, )
  const stock2 : MyStock = new MyStock('0101002','어떤 주식2', 12232,3 )
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

  const assetsCurrentPrice = calcAssetsCurrentValue(myAssets,)
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

test('Serialize Testing...', () => {
  const stringObject = {
    _code: "1021231",
    _name: "뭔지 모를 주식1",
    _price : new Price("1021231", 1231),
    _quantity: 1,
  }
  const classObject = new MyStock("1021231","뭔지 모를 주식1", 1231, 1)

  expect(JSON.stringify(classObject)).toBe(JSON.stringify(stringObject))
})


test('convertInstanceToObject Testing...',()=>{
  const someStock1 : MyStock = new MyStock('0101001', '어떤 주식1',12222,31,undefined,'KOSPI','KO')
  const someStock2 :MyStock = new MyStock('0101002','어떤 주식2', 12232,3,7000,'KOSPI','KO',)
  const someStock3 : MyStock = new MyStock('0101003','어떤 주식3', 12232,3,7000,'KOSPI','KO',)
  const newArr = [someStock1,someStock2, someStock3].map((stock) => {
    return convertInstanceToObject(stock)
  })
  const obj = [
    {"_code":"0101001","_name":"어떤 주식1","_price":{"_code":"0101001","_value":12222},"_market":"KOSPI","_country":"KO","_quantity":31,"_averagePurchasePrice":undefined
  },
    {"_code":"0101002","_name":"어떤 주식2","_price":{"_code":"0101002","_value":12232},"_market":"KOSPI","_country":"KO","_quantity":3,"_averagePurchasePrice":7000},
    {"_code":"0101003","_name":"어떤 주식3","_price":{"_code":"0101003","_value":12232},"_market":"KOSPI","_country":"KO","_quantity":3,"_averagePurchasePrice":7000}
  ]
  expect(newArr).toStrictEqual(obj)
})


test('nivo Testing....', () => {


  const nivoData : NivoPieChartData = {
    id: "1234",
    label: "somelabel",
    value: 4321
  }
  const someStock1 : MyStock = new MyStock('0101001', '어떤 주식1',12222,31,undefined,'KOSPI','KO')
  const someStock2 :MyStock = new MyStock('0101002','어떤 주식2', 12232,3,7000,'KOSPI','KO',)
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
  const stock1 : MyStock = new MyStock('0101001','어떤 주식1', 12222,31, )
  const stock2 : MyStock = new MyStock('0101002','어떤 주식2', 12232,3 )
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

  const assetsCurrentPrice = calcAssetsCurrentValue(myAssets,)
  expect(assetsCurrentPrice).toBe(31* 12222 + 3* 12232)

  const AssetsRatios = calcAssetsPercentage(myAssets)
  const resultArray = [{"어떤 주식1": 91.17} , {"어떤 주식2": 8.83}]
  expect(AssetsRatios).toStrictEqual(resultArray)

  

})