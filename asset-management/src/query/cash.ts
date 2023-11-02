import { UseQueryResult } from "@tanstack/react-query"
import { useMyAssets } from "./assets"
import { ResponseData } from "../api"
import { MyCashAPI } from "../api/cash"
import { useRecoilState } from "recoil"
import { assetsState } from "../atom/atom"
import { Cash } from "../domain/cash"
import { Currency } from "../domain/currency"
import { useEffect } from "react"
import { useExchangeRate } from "./exchangeRate"
import { exchangeValue } from "../domain/Domain"

export const useMyCashHook = ( )  => {
    const {data:myCash, status} = useMyAssets("cash") as UseQueryResult<ResponseData<MyCashAPI>, unknown>
    const [assets, setAssets] = useRecoilState(assetsState)
    const factoryCash = (cash: MyCashAPI) => {
      return new Cash(cash.balance,cash.currency as Currency)
    }
    useEffect(() => {
      if (status === 'success') {
        setAssets((prev) => ({
          ...prev,
          cash: myCash?.output.map(factoryCash)
        }))
      }
    },[status])
    return assets.cash
  }
  

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