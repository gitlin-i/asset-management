import { AxiosResponse } from "axios"
import { DevApi, ResponseData } from "."

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
    const response : AxiosResponse<ResponseData<ExchangeRateAPI>, any>  = await DevApi.get(url)

    return response
  }