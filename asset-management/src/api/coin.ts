import { config } from "process"
import { UPBIT_Api } from "./index"

export interface CoinPrice {
    market: string,
    trade_price: number
  }
export interface MyCoinAPI {
  code : string
  quantity : number
  average_purchase_price : number | undefined
}
export interface CoinInfo{
  market: string
  korean_name : string
  english_name : string
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
  
export const getCoinPrice = async (coinCode: string | string[]) :Promise<CoinPrice[]> => {

  let params
  if (Array.isArray(coinCode)) {
    params = coinCode.join(",");
  } else {
    params = coinCode
  }
  const axiosConfig = {
    headers:{
        "Content-Type": "application-json"
    }
  }
  const response = await UPBIT_Api.get(`/ticker?markets=${params}`)
  
  return response.data
}
// export const getCoinPriceby