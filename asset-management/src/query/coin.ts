import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { ResponseData } from "../api"
import { CoinPriceAPI, MyCoinAPI, getCoinPrice } from "../api/coin"
import { useMyAssets } from "./assets"
import { KRWCoinInfo, MyCoin } from "../domain/coin"
import { Currency } from "../domain/currency"
import { Ratio, calcPercentage } from "../domain/domain"



export const useCoinPrice = (coinCodes : MyCoinAPI[] | undefined) => {
    return useQuery({
      queryKey: ["coinPrice",coinCodes?.map((coin) => coin.code)],
      queryFn : async () : Promise<CoinPriceAPI[]> => {
        const data = await getCoinPrice(coinCodes?.map((coin: MyCoinAPI) => coin.code) as string[])
        return data
      },enabled: !!coinCodes && coinCodes.length > 0 
    })
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

export const useMyCoinsRatio = () : Ratio[] => {
  const coins = useMyCoin()
  //KRW-COINCODE 전제
  if (!!coins && coins.length > 0 ){
    const coinsCurVal : { [name: string] : number }[] | undefined = coins.map((coin) => {
    
      const coinsCurrentValue = coin.quantity * coin.price
      return {
        [coin.name] : coinsCurrentValue
      }
    })


    const total : number = coinsCurVal.reduce((acc , cur: { [name: string] : number } ) => {
      const key = Object.keys(cur)[0]
      return acc + cur[key]
    },0)
    const coinsRatio : Ratio[] =  coinsCurVal.map((val) => {
      const key = Object.keys(val)[0]
      return { [key] : calcPercentage(val[key] , total, 2)}
    })
    return coinsRatio
  }

  return []
}