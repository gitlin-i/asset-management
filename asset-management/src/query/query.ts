import { UseQueryResult, useQuery, useQueryClient } from "@tanstack/react-query"
import { MyStockAPI, StockInfoAPI, StockPriceAPI, getStockInfo, getStockPrice } from "../api/stock"
import { ResponseData } from "../api"
import { MyStock, Stock } from "../domain/stock"
import { MyCashAPI } from "../api/cash"
import { CoinPrice, MyCoinAPI, getCoinPrice } from "../api/coin"
import { Assets, getMyAssets } from "../api/asset"
import { StockMarket } from "../domain/market"
import { KRWCoinInfo, MyCoin } from "../domain/coin"
import { Cash } from "../domain/cash"
import { ExchangeRate, getExchangeRate } from "../api/exchange"
import { Currency, MapperStockMarketToCurrency } from "../domain/currency"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { assetsState } from "../atom/atom"


type StockBase = {code: string, market: StockMarket}
export const useMyAssets = ( asset:Assets) => {
  return useQuery({
    queryKey: ['myAssets',asset],
    queryFn: async () : Promise<ResponseData<MyCashAPI | MyCoinAPI | MyStockAPI>> => {
      const data = await getMyAssets(asset) 
      return data
    }
  })
}
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
export const useStockPrice = () => {
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
    },enabled : (cachedMyStock && cachedMyStock?.output.length > 0)
  })
}


export const useStockInfo = ( )  => {
  const queryClient = useQueryClient()
  const cachedData : ResponseData<StockInfoAPI> | undefined= queryClient.getQueryData(['myAssets', 'stock'])
  return useQuery({
    queryKey: ['stockInfo',cachedData?.output],
    queryFn : async () :Promise<StockInfoAPI[]> => {
      let result : StockInfoAPI[] = []
      const marketAndStockCodes = parseMarketAndStockCodes(cachedData)
      
      for (const [market, stockCodes] of Object.entries(marketAndStockCodes)){
        const response = await getStockInfo(stockCodes,market as StockMarket )
        result = result.concat(response.data.output)
      }
      return result
    }, enabled: (cachedData && cachedData?.output.length > 0)
  })
}

export const useMyStockInfoPrice= () : MyStock[] => {
  const {data:myStock, status:myStockStatus} = useMyAssets("stock") as UseQueryResult<ResponseData<MyStockAPI>, unknown>
  const {data: stockInfo ,status: stockInfoStatus} = useStockInfo()
  const {data: stockPrice, status:stockPriceStatus} = useStockPrice()
  


  if (myStockStatus === 'success' && stockInfoStatus === 'success'&& stockPriceStatus === 'success'){
    const factory = (stock: MyStockAPI) => {
      const targetStockInfo = stockInfo?.find((stockinfo) => stockinfo.code === stock.code && stockinfo.market === stock.market )
      const targetStockPrice = stockPrice?.find((stockprice) => stockprice.code === stock.code && stockprice.market === stock.market)
  
      return new MyStock(stock.code,stock.market,targetStockInfo?.name!,
        targetStockPrice?.price!,MapperStockMarketToCurrency[stock.market],
        stock.quantity,stock.average_purchase_price)
    }
    return myStock?.output.map(factory)
  } else {
    return []
  }
}

export const useMyStockHook= () =>{
  const {data:myStock, status:myStockStatus} = useMyAssets("stock") as UseQueryResult<ResponseData<MyStockAPI>, unknown>
  const {data: stockInfo ,status: stockInfoStatus} = useStockInfo()
  const {data: stockPrice, status:stockPriceStatus} = useStockPrice()
  const [assets,setAssets] = useRecoilState(assetsState)
  useEffect(() => {
    
    const factory = (stock: MyStockAPI) => {
      const targetStockInfo = stockInfo?.find((stockinfo) => stockinfo.code === stock.code && stockinfo.market === stock.market )
      const targetStockPrice = stockPrice?.find((stockprice) => stockprice.code === stock.code && stockprice.market === stock.market)
  
      return new MyStock(stock.code,stock.market,targetStockInfo?.name!,
        targetStockPrice?.price!,MapperStockMarketToCurrency[stock.market],
        stock.quantity,stock.average_purchase_price)
    }
    if (myStockStatus === 'success' && stockInfoStatus === 'success'&& stockPriceStatus === 'success'){
      setAssets((prev) => ({
        ...prev,
        stocks:  myStock?.output.map(factory)
      }))
    }
    
  },[myStockStatus,stockInfoStatus,stockPriceStatus])
  return assets.stocks
}

////stock

export const useCoinPrice = () => {
  const queryClient = useQueryClient()
  const cachedData : ResponseData<MyCoinAPI> | undefined = queryClient.getQueryData(['myAssets', 'coin'])
  return useQuery({
    queryKey: ["coinPrice",cachedData?.output],
    queryFn : async () : Promise<CoinPrice[]> => {
      const data = await getCoinPrice(cachedData?.output.map((coin: MyCoinAPI) => coin.code) as string[])
      return data
    },enabled: (cachedData && cachedData?.output.length > 0)
  })
}
export const useMyCoinInfoPrice = () => {
  const {data:myCoins,status: myCoinStatus} = useMyAssets("coin") as UseQueryResult<ResponseData<MyCoinAPI>, unknown>
  const {data:coinPrice, status : coinPriceStatus} = useCoinPrice()
  const factory = (myCoin: MyCoinAPI) => {
    const targetCoinInfo = KRWCoinInfo.find((obj)=> obj.market === myCoin.code)
    const targetCoinPrice = coinPrice?.find((coinprice) => coinprice.market === myCoin.code)
    return new MyCoin(myCoin.code, targetCoinInfo?.korean_name!,
      targetCoinPrice?.trade_price!,Currency.KRW,myCoin.quantity,myCoin.average_purchase_price)
  }
  if (myCoinStatus === 'success' && coinPriceStatus ==='success'){
    return myCoins?.output.map(factory)
  } else {
    return []
  }

}
//coin
export const useMyCash = ( )  => {
  const {data:myCash, status} = useMyAssets("cash") as UseQueryResult<ResponseData<MyCashAPI>, unknown>
  const factory = (cash: MyCashAPI) => {
    return new Cash(cash.balance,cash.currency as Currency)
  }
  if (status ==='success'){
    return myCash?.output.map(factory)
  } else {
    return []
  }
}

export const useMyAssets2 = () => {
//   const stocks = useMyStockInfoPrice()
//   const coins = useMyCoinInfoPrice()
//   const cash = useMyCash()
//   const [assets,setAssets] = useRecoilState(assetsState)
//   useEffect(() => {
//     setAssets((prev) => ({
//       ...prev,
//       stocks: stocks
//     }))
//   },[stocks])
//   useEffect(() => {
//     setAssets((prev) => ({
//       ...prev,
//       coins: coins
//     }))
//   },[coins])
//   useEffect(() => {
//     setAssets((prev) => ({
//       ...prev,
//       cash: cash
//     }))
//   },[cash])
//   console.log(stocks, coins,cash)
//   return assets
}

export const useExchangeRate = (currency : string[] ) =>{
  return useQuery({
      queryKey:['exchange',currency],
      queryFn: async () : Promise<ResponseData<ExchangeRate>>  => {
          const {data}  = await getExchangeRate(currency)
          return data
      }
  })
}

// const useMyStock = () => {
//   const myStock = useMyAssets("stock")
//   const StockPrice = useStockPrice(myStock)
// }