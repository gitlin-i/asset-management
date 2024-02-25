import { AxiosResponse } from "axios"
import { MY_API, ResponseData } from "."

export interface ExchangeRateAPI{
    currency: string
    base_rate: number
}


export const getExchangeRate = async (currency: string | string[] | undefined) : Promise<AxiosResponse<ResponseData<ExchangeRateAPI>, any>> => {
    let url = `/exchange/current-rate`
    if (currency){
      url = url + '?currency='
      if (Array.isArray(currency)){
        url += currency.join(',')
      } else {
        url += currency
      }
    }
    const response : AxiosResponse<ResponseData<ExchangeRateAPI>, any>  = await MY_API.get(url)

    return response
  }