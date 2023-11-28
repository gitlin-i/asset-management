import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { ResponseData } from "../api"
import { StockMarket } from "../domain/market"
import { MyStockAPI, StockInfoAPI, StockPriceAPI, getStockInfo, getStockPrice } from "../api/stock"
import { useMyAssets } from "./assets"
import { MyStock } from "../domain/stock"
import { Currency } from "../domain/currency"
import { MarketToCurrency, Ratio, calcPercentage, exchangeValue } from "../domain/domain"

import { useExchangeRate } from "./exchangeRate"


type StockBase = {code: string, market: StockMarket}
const parseMarketAndStockCodes= (cachedData: ResponseData<StockBase>| StockBase[] | undefined) : { [market: string] : string[]} => {
  let data 
  if (typeof cachedData === 'undefined'){
    return {}
  }
  if ('output' in cachedData){
    data = cachedData.output
    if (data.length <= 0) {
      return {}
    }
  } else {
    data = cachedData
  }

  const marketRecord : { [market: string] : string[]} = {}
  data.forEach((data: StockBase) => {
    if (!marketRecord[data.market]) {
      marketRecord[data.market] = []
    }
    marketRecord[data.market].push(data.code)
  })
  
  return marketRecord
}



export const useMyStockInfo = (stocks : MyStockAPI[] | undefined)  => {
  
  return useQuery({
    queryKey: ['myStockInfo',stocks],
    queryFn : async () :Promise<StockInfoAPI[]> => {
      let result : StockInfoAPI[] = []
      const marketAndStockCodes = parseMarketAndStockCodes(stocks)
      
      for (const [market, stockCodes] of Object.entries(marketAndStockCodes)){
        const response = await getStockInfo(stockCodes,market as StockMarket )
        result = result.concat(response.data.output)
      }
      return result
    }, enabled: !!stocks && stocks.length > 0
  })
}


export const useStockPrice = (stock:StockBase[] | undefined) => {
  return useQuery({
    queryKey: ["stockPrice",stock],
    queryFn: async () : Promise<StockPriceAPI[]> => {

      let result : StockPriceAPI[] = []
      const marketAndStockCodes = parseMarketAndStockCodes(stock)
      
      for (const [market, stockCodes] of Object.entries(marketAndStockCodes)){
        const response = await getStockPrice(stockCodes,market)
        result = result.concat(response.data.output)
      }
      return result
    },
    enabled: !!stock && stock.length > 0
  })
}
export const useMyStock = () : MyStock[] | undefined =>{
  const {data: myStock, status:myStockStatus} = useMyAssets("stock") as UseQueryResult<ResponseData<MyStockAPI>, unknown>
  const {data: stockInfo, status:stockInfoStatus} = useMyStockInfo(myStock?.output)
  const {data: stockPrice, status:stockPriceStatus} = useStockPrice(myStock?.output)
  const factory = (myStock :MyStockAPI , stockInfo : StockInfoAPI , stockPrice: StockPriceAPI) => {
    return new MyStock(myStock.code,myStock.market,stockInfo.name,stockPrice.price,
      MarketToCurrency[myStock.market], myStock.quantity,myStock.average_purchase_price)
  }
  if (myStockStatus ==='success' && stockInfoStatus === 'success' && stockPriceStatus === 'success'){
    return myStock?.output.map((stock) => {
      const targetStockInfo = stockInfo.find((info) => info.code === stock.code && info.market === stock.market)
      const targetStockPrice = stockPrice.find((price) => price.code === stock.code && price.market === stock.market)
      if (targetStockInfo && targetStockPrice){
        return factory(stock,targetStockInfo ,targetStockPrice)
      } else {
        
        return factory(stock,{...stock, name: "알 수 없는 이름" } ,{...stock,price : 0} )
      }
      
    })
  }

}


export const useMyStockCurrentValue = () => {
  const {data: myStock ,status:myStockStatus} = useMyAssets("stock") as UseQueryResult<ResponseData<MyStockAPI>, unknown>
  const {data: exchangeRate ,status: exchangeRateStatus} = useExchangeRate(['USD','JPY(100)','EUR','CNH'])
  const {data: stockPrice ,status:stockPriceStatus} = useStockPrice(myStock?.output)

  let stockCurValue = 0

  if (myStockStatus ==="success" && exchangeRateStatus ==="success" && stockPriceStatus ==="success"){
    const stocksValue : number[] | undefined = myStock.output.map((stock) => {

      const stockCurrentPrice = stockPrice?.find((aStockPrice) => aStockPrice.code === stock.code && aStockPrice.market === stock.market)
      if (!!stockCurrentPrice){
        const stockCurrentValue = stock.quantity * stockCurrentPrice.price
        const aExchangeRate = exchangeRate.output.find((ex) => ex.currency === MarketToCurrency[stock.market])
        return (MarketToCurrency[stock.market] === Currency.KRW) ? stockCurrentValue : exchangeValue(stockCurrentValue,aExchangeRate?.base_rate)
      }
      return 0
    })

    stockCurValue = stocksValue?.reduce((acc,cur) => {
      return acc + cur
    },0)
  }
  return stockCurValue
}


export const useMyStocksRatio = () : Ratio[] => {
  const {data: myStock ,status:myStockStatus} = useMyAssets("stock") as UseQueryResult<ResponseData<MyStockAPI>, unknown>
  const {data: exchangeRate ,status: exchangeRateStatus} = useExchangeRate(['USD','JPY(100)','EUR','CNH'])
  const {data: stockPrice ,status:stockPriceStatus} = useStockPrice(myStock?.output)
  const {data: stockInfo, status:stockInfoStatus} = useMyStockInfo(myStock?.output)

  if (myStockStatus ==="success" && exchangeRateStatus ==="success" && stockPriceStatus ==="success" && stockInfoStatus === 'success'){
    const stocksCurVal : { [name: string] : number }[] | undefined = myStock.output.map((stock) => {

      const stockCurrentPrice = stockPrice?.find((aStockPrice) => aStockPrice.code === stock.code && aStockPrice.market === stock.market)
      const stockInfoName = stockInfo.find((info) => info.code === stock.code && info.market === stock.market)

      if (!!stockCurrentPrice && !!stockInfoName){
        const stockCurrentValue = stock.quantity * stockCurrentPrice.price
        const aExchangeRate = exchangeRate.output.find((ex) => ex.currency === MarketToCurrency[stock.market])

        return (MarketToCurrency[stock.market] === Currency.KRW) ? { [stockInfoName.name] : stockCurrentValue} : 
        { [stockInfoName.name] : exchangeValue(stockCurrentValue,aExchangeRate?.base_rate)}
        
      }
      return {}
  })

    const total : number = stocksCurVal.reduce((acc , cur: { [name: string] : number } ) => {
      const key = Object.keys(cur)[0]
      return acc + cur[key]
    },0)
    const stocksRatio : Ratio[] =  stocksCurVal.map((val) => {
      const key = Object.keys(val)[0]
      return { [key] : calcPercentage(val[key] , total, 2)}
    })
    return stocksRatio
  }

  return []
}