import { useQuery } from "@tanstack/react-query"
import { ResponseData } from "../api"
import { ExchangeRateAPI, getExchangeRate } from "../api/exchange"


export const DEFAULT_EXCHANGERATE = ['USD','JPY(100)','EUR','CNH']
export const useExchangeRate = (currency : string[] ) =>{
    return useQuery({
        queryKey:['exchange',currency],
        queryFn: async () : Promise<ResponseData<ExchangeRateAPI>>  => {
            const {data}  = await getExchangeRate(currency)
            return data
        }
    })
  }

