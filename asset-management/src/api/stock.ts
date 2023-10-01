import { AxiosResponse } from "axios"
import { DevApi, ResponseData } from "."
import { MapperStockMarketToCurrency } from "../domain/currency"
import { StockMarket } from "../domain/market"
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
user_id: string
code : string
market: StockMarket
quantity : number
average_purchase_price : number | undefined
}
export const isMyStockAPI = (obj : object) : obj is MyStockAPI => {
    if (typeof obj ==='object' &&
    'code' in obj &&
    'market' in obj &&
    'user_id' in obj &&
    'quantity' in obj &&
    'average_purchase_price' in obj 
    ) return true
    return false
}

const MyStockFactory = (myStock: MyStockAPI,myStockInfo:StockInfoAPI,myStockPrice: StockPriceAPI) =>{
    return new MyStock(myStock.code,
        myStock.market,
        myStockInfo.name,
        myStockPrice.price,
        MapperStockMarketToCurrency[myStock.market],
        myStock.quantity,
        myStock.average_purchase_price)
}


export const getStockPrice = async (stockCodes: Array<string> | string,market: string) : Promise<AxiosResponse<ResponseData<StockPriceAPI>>>=> {
    let params
    if (Array.isArray(stockCodes)) {
      params = stockCodes.join(",");
    } else {
      params = stockCodes
    }
    
    const response = await DevApi.get(`/stock/current-price?code=${params}` + `&market=${market}` )
      console.log(response.data)
    return response
  }
  
  export const getStockInfo = async (stockCodes: string[],market :StockMarket) : Promise<AxiosResponse<ResponseData<StockInfoAPI>, any>> => {
    let params
    if (Array.isArray(stockCodes)) {
      params = stockCodes.join(",");
    } else {
      params = stockCodes
    }
    const response : AxiosResponse<ResponseData<StockInfoAPI>> = await DevApi.get(`/stock/info?code=${params}` + `&market=${market}` )
    console.log(response.data)
    return response
  
  } 