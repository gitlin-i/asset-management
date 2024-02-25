import { UseQueryResult } from "@tanstack/react-query"
import { useMyAssets } from "./assets"
import { ResponseData } from "../api"
import { MyCashAPI } from "../api/cash"
import { Cash } from "../domain/cash"
import { Currency } from "../domain/currency"
import { DEFAULT_EXCHANGERATE, useExchangeRate } from "./exchangeRate"
import { Ratio, calcPercentage, exchangeValue } from "../domain/domain"



export const useMyCashCurrentValue = (baseCurrency = Currency.KRW)  => {
  const {data:myCash, status: myCashStatus} = useMyAssets("cash") as UseQueryResult<ResponseData<MyCashAPI>, unknown>
  const {data: exchangeRate ,status : exchangeRateStatus} = useExchangeRate(["USD","JPY(100)","EUR","CNH"])
  
  if (myCashStatus ==='success' && exchangeRateStatus === 'success'){
    const cashCurrentValue =myCash.output.reduce((acc, cash) => {
      const targetExchangeRate = exchangeRate.output.find((ex) => ex.currency === cash.currency)
      const cashValue = (cash.currency === baseCurrency) ? cash.balance : exchangeValue(cash.balance,targetExchangeRate?.base_rate)
      return acc + cashValue
    },0)

    return cashCurrentValue
  }
  return 0

}

export const useMyCash = () : Cash[] | undefined=> {
  const {data:myCash, status} = useMyAssets("cash") as UseQueryResult<ResponseData<MyCashAPI>, unknown>

  const factoryCash = (cash: MyCashAPI) => {
    return new Cash(cash.balance,cash.currency as Currency)
  }

  if (status === 'success') {
    return myCash.output.map(factoryCash)
  }
  
}
export const useMyCashRatio = (baseCurrency = Currency.KRW) : Ratio[] => {
  const myCash = useMyCash()
  const {data:exchangeRate, status:exchangeRateStatus}= useExchangeRate(DEFAULT_EXCHANGERATE)



  if (!!myCash && exchangeRateStatus === 'success'){
    const cashCurVal : { [name: string] : number }[] = myCash?.map((cash) => {
      const targetExchangeRate  = exchangeRate.output.find((ex) => ex.currency === cash.currency)
      const cashCurrentValue : number = (cash.currency === baseCurrency) ? cash.value : exchangeValue(cash.value,targetExchangeRate?.base_rate)
      return {
        [cash.name] : cashCurrentValue
      }
    })
    const total  = cashCurVal.reduce((acc, cur) => {
      const key = Object.keys(cur)[0]
      return acc + cur[key]
    },0)

    const cashRatio : Ratio[] =  cashCurVal.map((val) => {
      const key = Object.keys(val)[0]
      return { [key] : calcPercentage(val[key] , total, 2)}
    })
    return cashRatio
  } else {
    return []
  }


}