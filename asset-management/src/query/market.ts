import { useQuery } from "@tanstack/react-query"
import { StockMarketDetail } from "../domain/market"
import { getStockMarketIndex } from "../api/stock"


export const useMarketIndex = (market:StockMarketDetail) => {
  
    return useQuery({
      queryKey : ["marketIndex", market],
      queryFn: async () => {
        const data = await getStockMarketIndex(market)
        return data
      }
    })
}