import { useQuery } from "@tanstack/react-query"
import { CoinIndex, StockMarketIndex } from "../domain/market"
import { getStockMarketIndex } from "../api/stock"
import { getCoinPricebyCandle } from "../api/coin"

export const DEFAULT_COIN_INDEX = "KRW-BTC"
export const useMarketIndex = (market:StockMarketIndex) => {
  
    return useQuery({
      queryKey : ["marketIndex", market],
      queryFn: async () => {
        const data = await getStockMarketIndex(market)
        return data
      }
    })
}
export const useCoinIndex = (coinCode : CoinIndex) => {
  return useQuery({
    queryKey: ["coinIndex", coinCode],
    queryFn:async () => {
      const data = await getCoinPricebyCandle(coinCode)
      return data
    }
  })
}