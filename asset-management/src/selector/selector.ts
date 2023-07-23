import { selector } from "recoil";
import { assetsState } from "../atom/atom";
import { Currency, Ratio, calcAllAssetsCurrentValue, calcAssetArrayCurrentValue, calcAssetArrayPercentage, calcAssetsPercentage, calcCashArrayCurrentValue, calcCurrentValue, calcPercentage, exchangeValue } from "../domain/Domain";

export const assetsCurrentValue = selector({
    key: "assetsCurrentValue",
    get: ({get}) => {
        const assets = get(assetsState);
        return calcAllAssetsCurrentValue(assets)
    }
})

export const stocksCurrentValue = selector({
    key: "stocksCurrentValue",
    get: ({get}) => {
        const {stocks} = get(assetsState)
        if(stocks){
            return calcAssetArrayCurrentValue(stocks)
        }
        return 0;
    }
 
})

export const coinsCurrentValue = selector({
    key: "coinsCurrentValue",
    get: ({get}) => {
        const {coins} = get(assetsState)
        if(coins){
            return calcAssetArrayCurrentValue(coins)
        }
        return 0;
    }
 
})

export const cashCurrentValue = selector({
    key: "cashCurrentValue",
    get: ({get}) => {
        const {cash} = get(assetsState)
        if(cash){
            return calcCashArrayCurrentValue(cash)
        }
        return 0;
    }
 
})

export const assetsRatio = selector({
    key: "assetsRatio",
    get : ({get}) => {
        const assets = get(assetsState)
        if (assets) {
            return calcAssetsPercentage(assets)
        }
    }
})

export const stocksRatio = selector({
    key: "stocksRatio",
    get : ({get}) => {
        const {stocks} = get(assetsState)
        if (stocks) {
            const stocksRatio = calcAssetArrayPercentage(stocks)
            
            return stocksRatio
        }
        
    }
})
export const coinsRatio = selector({
    key: "coinsRatio",
    get : ({get}) : Ratio[] | undefined => {
        const {coins} = get(assetsState)
        if (coins) {
            return calcAssetArrayPercentage(coins)
        }
    }
})

export const cashRatio = selector({
    key: "cashRatio",
    get : ({get}) : Ratio[] | undefined=> {
        const {cash} = get(assetsState)
        
        if (cash) {
            
            const total = calcCashArrayCurrentValue(cash)
            const ratios =cash.map((aCash) => {
                let ratio
                if (aCash.currency === Currency.KRW){
                    ratio = calcPercentage(aCash.value,total)
                } else {
                    ratio = calcPercentage(exchangeValue(aCash.value,1300), total)
                }
                
                return {
                    [aCash.code] : ratio
                }
            })
            return ratios
        }
    }
})