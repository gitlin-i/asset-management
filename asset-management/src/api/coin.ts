import { UPBIT_Api } from "./index"

export interface CoinPriceAPI {
    market: string,
    trade_price: number
  }
export interface MyCoinAPI {
  code : string
  quantity : number
  average_purchase_price : number | undefined
}
export interface CoinInfoAPI{
  market: string
  korean_name : string
  english_name : string
}
export interface CoinCandleAPI{
  market: string
  opening_price :number
  high_price :number
  low_price : number
  trade_price	:number
  candle_date_time_utc : string
}
  export const isMyCoinAPI = (obj : object) : obj is MyCoinAPI => {
    if (typeof obj ==='object' &&
    'code' in obj &&
    'quantity' in obj &&
    'user_id' in obj &&
    'average_purchase_price' in obj 
    ) return true
    return false
  }
  
export const getCoinPrice = async (coinCode: string | string[]) :Promise<CoinPriceAPI[]> => {

  let params
  if (Array.isArray(coinCode)) {
    params = coinCode.join(",");
  } else {
    params = coinCode
  }
  
  const response = await UPBIT_Api.get(`/ticker?markets=${params}`)
  return response.data
}

export const getCoinPricebyCandle =async (coinCode:string,candleCount :number = 7) : Promise<CoinCandleAPI[]>=> {
  const response = await UPBIT_Api.get(`/candles/days?market=${coinCode}&count=${candleCount}`)
  return response.data
} 