import { UseQueryResult, useQuery, useQueryClient } from "@tanstack/react-query"
import { ResponseData } from "../api"
import { CoinPrice, MyCoinAPI, getCoinPrice } from "../api/coin"
import { useMyAssets } from "./assets"
import { useRecoilState } from "recoil"
import { assetsState } from "../atom/atom"
import { KRWCoinInfo, MyCoin } from "../domain/coin"
import { Currency } from "../domain/currency"
import { useEffect } from "react"


export const useCoinPrice = (coinCodes : MyCoinAPI[] | undefined) => {
    return useQuery({
      queryKey: ["coinPrice",coinCodes?.map((coin) => coin.code)],
      queryFn : async () : Promise<CoinPrice[]> => {
        const data = await getCoinPrice(coinCodes?.map((coin: MyCoinAPI) => coin.code) as string[])
        return data
      },enabled: !!coinCodes && coinCodes.length > 0 
    })
  }

  export const useMyCoinHook = () => {
    const {data:myCoins,status: myCoinStatus} = useMyAssets("coin") as UseQueryResult<ResponseData<MyCoinAPI>, unknown>
    const {data:coinPrice, status : coinPriceStatus} = useCoinPrice(myCoins?.output)
    const [assets, setAssets] = useRecoilState(assetsState)
    const factoryMyCoin = (myCoin: MyCoinAPI) => {
      const targetCoinInfo = KRWCoinInfo.find((obj)=> obj.market === myCoin.code)
      const targetCoinPrice = coinPrice?.find((coinprice) => coinprice.market === myCoin.code)
      return new MyCoin(myCoin.code, targetCoinInfo?.korean_name!,
        targetCoinPrice?.trade_price!,Currency.KRW,myCoin.quantity,myCoin.average_purchase_price)
    }
    useEffect(() => {
  
      if(myCoinStatus ==="success" && coinPriceStatus === 'success'){
        setAssets((prev) => ({
          ...prev,
          coins: myCoins?.output.map(factoryMyCoin)
        }))
      }
    },[myCoinStatus, coinPriceStatus])
    return assets.coins
  }


export const useMyCoinsCurrentValue = () =>{

  const {data:myCoins,status: myCoinStatus} = useMyAssets("coin") as UseQueryResult<ResponseData<MyCoinAPI>, unknown>
  const {data: coinPrice , status:coinPriceStatus} = useCoinPrice(myCoins?.output)

  if (myCoinStatus === 'success' && coinPriceStatus === 'success'){
    const coinsCurrentValue = myCoins?.output.reduce((acc ,cur) => {
      const targetPrice = coinPrice?.find((coin) => coin.market === cur.code)
      const coinCurValue = targetPrice ? targetPrice.trade_price * cur.quantity  : 0
      return acc + coinCurValue
    },0)
    return coinsCurrentValue
  }
  return 0
  
}

export const useMyCoin = () : MyCoin[] | undefined => {
  const {data: myCoin, status:myCoinStatus} = useMyAssets("coin") as UseQueryResult<ResponseData<MyCoinAPI>, unknown>
  const {data: coinPrice, status:coinPriceStatus} = useCoinPrice(myCoin?.output)

  const factoryMyCoin = (myCoin: MyCoinAPI) => {
    const targetCoinInfo = KRWCoinInfo.find((obj)=> obj.market === myCoin.code)
    const targetCoinPrice = coinPrice?.find((coinprice) => coinprice.market === myCoin.code)
    return new MyCoin(myCoin.code, targetCoinInfo?.korean_name!,
      targetCoinPrice?.trade_price!,Currency.KRW,myCoin.quantity,myCoin.average_purchase_price)
  }
  if (myCoinStatus === 'success' && coinPriceStatus === 'success'){
    return myCoin?.output.map(factoryMyCoin)
  }
}

