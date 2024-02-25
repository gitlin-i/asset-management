import { AxiosResponse } from "axios"
import { MY_API, ResponseData } from "."
import { MapperStockMarketToCurrency } from "../domain/currency"
import { StockMarket, StockMarketIndex } from "../domain/market"
import { MyStock } from "../domain/stock"

export interface StockPriceAPI {
    code:string
    market : string
    price: number
  }
export interface StockInfoAPI {
  code: string
  market : StockMarket
  name : string
}
export interface MyStockAPI {
  code : string
  market: StockMarket
  quantity : number
  average_purchase_price : number | undefined
}
export const isMyStockAPI = (obj : object) : obj is MyStockAPI => {
    if (typeof obj ==='object' &&
    'code' in obj &&
    'market' in obj &&
    
    'quantity' in obj &&
    'average_purchase_price' in obj 
    ) return true
    return false
}
export type IndexWithDateAPI = {
  date: string,
  price : number
}


export const getStockPrice = async (stockCodes: Array<string> | string,market: string) : Promise<AxiosResponse<ResponseData<StockPriceAPI>>>=> {
    let params
    if (Array.isArray(stockCodes)) {
      params = stockCodes.join(",");
    } else {
      params = stockCodes
    }
    
    const response = await MY_API.get(`/stock/current-price?code=${params}` + `&market=${market}` )

    return response
  }
  
  export const getStockInfo = async (stockCodes: string[] | string,market :StockMarket) : Promise<AxiosResponse<ResponseData<StockInfoAPI>, any>> => {
    let params
    if (Array.isArray(stockCodes)) {
      params = stockCodes.join(",");
    } else {
      params = stockCodes
    }
    const response : AxiosResponse<ResponseData<StockInfoAPI>> = await MY_API.get(`/stock/info?code=${params}` + `&market=${market}` )

    return response
  
  }


export const getStockMarketIndex = async (market: StockMarketIndex)  =>{
  const response : AxiosResponse<IndexWithDateAPI[]> = await MY_API.get(`/stock/index?market=${market}`)
  return response.data
}