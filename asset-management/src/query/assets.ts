import { useQuery } from "@tanstack/react-query"
import { ResponseData } from "../api"
import { MyCashAPI } from "../api/cash"
import { MyCoinAPI } from "../api/coin"
import { MyStockAPI } from "../api/stock"
import { getMyAssets } from "../api/asset"
import { useMyStockCurrentValue } from "./stock"
import {  useMyCoinsCurrentValue } from "./coin"
import { useMyCashCurrentValue } from "./cash"
import { Ratio,calcPercentage } from "../domain/Domain"


type AssetsString = "stock" | "coin" | "cash"
export const useMyAssets = ( asset:AssetsString) => {
    const loginCookie = document.cookie.split(';').find((cookie) => {
      return cookie.includes("session_id")
    })
    return useQuery({
      queryKey: ['myAssets',asset],
      queryFn: async () : Promise<ResponseData<MyCashAPI | MyCoinAPI | MyStockAPI>> => {
        const data = await getMyAssets(asset) 
        return data
      }, enabled : !!loginCookie
    })
}

export const useMyAssetsRatio = () : Ratio[] => {

  const stocksCurVal = useMyStockCurrentValue()
  const coinsCurVal = useMyCoinsCurrentValue()
  const cashCurVal = useMyCashCurrentValue()

  const total = stocksCurVal + coinsCurVal + cashCurVal
  const stockRatio = calcPercentage(stocksCurVal, total)
  const coinsRatio = calcPercentage(coinsCurVal,total)
  const cashRatio = calcPercentage(cashCurVal, total)

  return [
    {"주식" : stockRatio},
    {"코인" : coinsRatio},
    {"현금" : cashRatio},
  ]
}