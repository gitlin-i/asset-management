import { UseQueryResult, useQuery, useQueryClient } from "@tanstack/react-query"
import { ResponseData } from "../api"
import { StockMarket, StockMarketDetail } from "../domain/market"
import { MyStockAPI, StockInfoAPI, StockPriceAPI, getStockInfo, getStockMarketIndex, getStockPrice } from "../api/stock"
import { useMyAssets } from "./assets"
import { useRecoilState } from "recoil"
import { assetsState } from "../atom/atom"
import { MyStock } from "../domain/stock"
import { Currency, MapperStockMarketToCurrency } from "../domain/currency"
import { useEffect } from "react"
import { MarketToCurrency, Ratio, calcPercentage, exchangeValue } from "../domain/Domain"
import { ExchangeRateAPI } from "../api/exchange"
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

export const useMyStockPrice = () => {
  const queryClient = useQueryClient()
  const cachedMyStock : ResponseData<MyStockAPI> | undefined= queryClient.getQueryData(["myAssets", "stock"])
  return useQuery({
    queryKey: ['stockPrice',cachedMyStock?.output],
    queryFn: async () : Promise<StockPriceAPI[] > => {

      let result : StockPriceAPI[] = []
      const MarketAndStockCodes : {[market : string] : string[]} = parseMarketAndStockCodes(cachedMyStock)

      for (const [market, stockCodes] of Object.entries(MarketAndStockCodes)){
        const response = await getStockPrice(stockCodes,market)
        result = result.concat(response.data.output)
      }
      return result
    },enabled : !!(cachedMyStock && cachedMyStock?.output.length > 0)
  })
}

export const useStockInfo = (stockCode : string[] | string, market: StockMarket, isClicked : boolean = false) => {
  const stockCodeisArray = (Array.isArray(stockCode) && stockCode.length > 0)
  const stockCodeisString = !!stockCode

  return useQuery({
    queryKey: ['stockInfo' , stockCode,market],
    queryFn:async () : Promise<StockInfoAPI[]>=> {
      const response = await getStockInfo(stockCode,market)
      return response.data.output
    }, enabled : !!(stockCodeisArray || stockCodeisString) && !!market && isClicked
  })
}
export const useMyStockInfo = ()  => {
  const queryClient = useQueryClient()
  const cachedData : ResponseData<StockInfoAPI> | undefined= queryClient.getQueryData(['myAssets', 'stock'])
  
  return useQuery({
    queryKey: ['MyStockInfo',cachedData?.output],
    queryFn : async () :Promise<StockInfoAPI[]> => {
      let result : StockInfoAPI[] = []
      const marketAndStockCodes = parseMarketAndStockCodes(cachedData)
      
      for (const [market, stockCodes] of Object.entries(marketAndStockCodes)){
        const response = await getStockInfo(stockCodes,market as StockMarket )
        result = result.concat(response.data.output)
      }
      return result
    }, enabled: !!(cachedData && cachedData?.output.length > 0)
  })
}
export const useMyStockInfo2 = (stocks : MyStockAPI[] | undefined)  => {
  
  return useQuery({
    queryKey: ['MyStockInfo'],
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
export const useMyStockHook= () =>{
  
  const {data:myStock, status:myStockStatus} = useMyAssets("stock") as UseQueryResult<ResponseData<MyStockAPI>, unknown>
  const {data: stockInfo ,status: stockInfoStatus} = useMyStockInfo()
  const {data: stockPrice, status:stockPriceStatus} = useMyStockPrice()
  const [assets,setAssets] = useRecoilState(assetsState)
  const factoryMyStock = (stock: MyStockAPI) => {
    const targetStockInfo = stockInfo?.find((stockinfo) => stockinfo.code === stock.code && stockinfo.market === stock.market )
    const targetStockPrice = stockPrice?.find((stockprice) => stockprice.code === stock.code && stockprice.market === stock.market)

    return new MyStock(stock.code,stock.market,targetStockInfo?.name!,
      targetStockPrice?.price!,MapperStockMarketToCurrency[stock.market],
      stock.quantity,stock.average_purchase_price)
  }
  
  useEffect(() => {
    
    if (myStockStatus === 'success' && stockInfoStatus === 'success'&& stockPriceStatus === 'success'){
      setAssets((prev) => ({
        ...prev,
        stocks:  myStock?.output.map(factoryMyStock)
      }))
    }
    
  },[myStockStatus,stockInfoStatus,stockPriceStatus])
  return assets.stocks
}



export const useStockPrice = (stock:StockBase[] | undefined) => {
  return useQuery({
    queryKey: ["stock","price"],
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

//useQuery
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

export const useMyStock = () : MyStock[] | undefined =>{
  const {data: myStock, status:myStockStatus} = useMyAssets("stock") as UseQueryResult<ResponseData<MyStockAPI>, unknown>
  const {data: stockInfo, status:stockInfoStatus} = useMyStockInfo2(myStock?.output)
  const {data: stockPrice, status:stockPriceStatus} = useStockPrice(myStock?.output)
  const factory = (myStock :MyStockAPI , stockInfo : StockInfoAPI , stockPrice: StockPriceAPI) => {
    return new MyStock(myStock.code,myStock.market,stockInfo.name,stockPrice.price,
      MarketToCurrency[myStock.market], myStock.quantity,myStock.average_purchase_price)
  }
  if (myStockStatus ==='success' && stockInfoStatus === 'success' && stockPriceStatus === 'success'){
    return myStock?.output.map((stock) => {
      const targetStockInfo = stockInfo?.find((info) => info.code === stock.code && info.market === stock.market)
      const targetCoinPrice = stockPrice?.find((price) => price.code === stock.code && price.market === stock.market)
      return factory(stock,targetStockInfo!,targetCoinPrice!)
    })
  }

}
// const calcCurrentValue = (
//   myStock : MyStockAPI[] ,
//   stockPrice : StockPriceAPI[],
//   stockInfo : StockInfoAPI[], 
//   exchangeRate: ExchangeRateAPI[]) : number => {
  
//   const stockCurrentValue = myStock.map((stock) => {
//     const stockCurrentPrice = stockPrice?.find((aStockPrice) => aStockPrice.code === stock.code && aStockPrice.market === stock.market)
//     const stockInfoName = stockInfo.find((info) => info.code === stock.code && info.market === stock.market)

//     if (!!stockCurrentPrice && !!stockInfoName){
//       const stockCurrentValue = stock.quantity * stockCurrentPrice.price
//       const aExchangeRate = exchangeRate.find((ex) => ex.currency === MarketToCurrency[stock.market])

//       return (MarketToCurrency[stock.market] === Currency.KRW) ? stockCurrentValue : exchangeValue(stockCurrentValue,aExchangeRate?.base_rate)
      
//     }
//     return 0
//   })
//   return stockCurrentValue ? stockCurrentValue : 0   

// }
export const useMyStocksRatio = () : Ratio[] => {
  const {data: myStock ,status:myStockStatus} = useMyAssets("stock") as UseQueryResult<ResponseData<MyStockAPI>, unknown>
  const {data: exchangeRate ,status: exchangeRateStatus} = useExchangeRate(['USD','JPY(100)','EUR','CNH'])
  const {data: stockPrice ,status:stockPriceStatus} = useStockPrice(myStock?.output)
  const {data: stockInfo, status:stockInfoStatus} = useMyStockInfo2(myStock?.output)

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