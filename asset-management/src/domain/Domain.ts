//매수평균가 (Average Purchase Price) 수동입력
//평가 금액 (Current Value) 
//보유 수량 (Quantity Held)
//매수 금액 (Purchase Amount)

import { TargetRatios, exchangeRateState } from "../atom/atom";
import { Cash } from "./cash";
import { MyCoin } from "./coin";
import { Currency } from "./currency";
import { ExchangeRate } from "./exchangeRate";
import { Price } from "./price";
import { MyStock, Stock, isStock } from "./stock";


export interface  Assets {
    stocks ?: Array<MyStock>;
    cash?: Array<Cash>;
    coins?: Array<MyCoin>;
    [index : string] : Array<Cash | MyCoin | MyStock> | undefined;
}
export interface Ratio {
    [key: string] : number;
}

export interface Ratios {
    ratios : Ratio[];
    calcPercentage : ()=> number;
}


export const  MarketToCurrency : {[key: string] : Currency} = {
    KOSDAQ : Currency.KRW,
    KOSPI : Currency.KRW,
    NASDAQ : Currency.USD,
    NAS : Currency.USD,
    KRX : Currency.KRW,
    TSE : Currency.JPY,
    AMS : Currency.USD,

}

export const testTargetRatios : TargetRatios = {
    assets: [
        {"주식" : 70},
        {"코인" : 30},
    ],
    stocks:[
        {"미국 지수 추종 ETF": 72},
        {"국내+해외 개별주":  28 },
    ],
    coins:[
        {"이더리움" : 100}
    ],
    cash:[{"KRW":0}]
}
export const testTargetRatio :Ratio[] = [
      {"ETF" : 50 },
      {"코인" : 30 },
      {"개별주" :20 },
    ]

export const stockTargetRatio : Ratio[] = [
    {"stock":100}
]
export const testapiStock = {
    "output": {
        "iscd_stat_cls_code": "55",
        "marg_rate": "50.00",
        "rprs_mrkt_kor_name": "KOSDAQ",
        "bstp_kor_isnm": "의료정밀기기",
        "temp_stop_yn": "N",
        "oprc_rang_cont_yn": "N",
        "clpr_rang_cont_yn": "N",
        "crdt_able_yn": "Y",
        "grmn_rate_cls_code": "50",
        "elw_pblc_yn": "N",
        "stck_prpr": "38200",
        "prdy_vrss": "350",
        "prdy_vrss_sign": "2",
        "prdy_ctrt": "0.92",
        "acml_tr_pbmn": "7785334050",
        "acml_vol": "204448",
        "prdy_vrss_vol_rate": "65.60",
        "stck_oprc": "37900",
        "stck_hgpr": "38700",
        "stck_lwpr": "37300",
        "stck_mxpr": "49200",
        "stck_llam": "26500",
        "stck_sdpr": "37850",
        "wghn_avrg_stck_prc": "38079.18",
        "hts_frgn_ehrt": "17.31",
        "frgn_ntby_qty": "27679",
        "pgtr_ntby_qty": "-5499",
        "pvt_scnd_dmrs_prc": "40550",
        "pvt_frst_dmrs_prc": "39200",
        "pvt_pont_val": "37450",
        "pvt_frst_dmsp_prc": "36100",
        "pvt_scnd_dmsp_prc": "34350",
        "dmrs_val": "39875",
        "dmsp_val": "36775",
        "cpfn": "76",
        "rstc_wdth_prc": "11350",
        "stck_fcam": "500",
        "stck_sspr": "27250",
        "aspr_unit": "50",
        "hts_deal_qty_unit_val": "1",
        "lstn_stcn": "15221524",
        "hts_avls": "5815",
        "per": "69.45",
        "pbr": "4.79",
        "stac_month": "12",
        "vol_tnrt": "1.34",
        "eps": "550.00",
        "bps": "7972.00",
        "d250_hgpr": "42150",
        "d250_hgpr_date": "20230615",
        "d250_hgpr_vrss_prpr_rate": "-9.37",
        "d250_lwpr": "16200",
        "d250_lwpr_date": "20221011",
        "d250_lwpr_vrss_prpr_rate": "135.80",
        "stck_dryy_hgpr": "42150",
        "dryy_hgpr_vrss_prpr_rate": "-9.37",
        "dryy_hgpr_date": "20230615",
        "stck_dryy_lwpr": "22150",
        "dryy_lwpr_vrss_prpr_rate": "72.46",
        "dryy_lwpr_date": "20230110",
        "w52_hgpr": "42150",
        "w52_hgpr_vrss_prpr_ctrt": "-9.37",
        "w52_hgpr_date": "20230615",
        "w52_lwpr": "16200",
        "w52_lwpr_vrss_prpr_ctrt": "135.80",
        "w52_lwpr_date": "20221011",
        "whol_loan_rmnd_rate": "4.30",
        "ssts_yn": "N",
        "stck_shrn_iscd": "228670",
        "fcam_cnnm": "500",
        "cpfn_cnnm": "76 억",
        "frgn_hldn_qty": "2634366",
        "vi_cls_code": "N",
        "ovtm_vi_cls_code": "N",
        "last_ssts_cntg_qty": "3146",
        "invt_caful_yn": "N",
        "mrkt_warn_cls_code": "00",
        "short_over_yn": "N",
        "sltr_yn": "N"
    },
    "rt_cd": "0",
    "msg_cd": "MCA00000",
    "msg1": "정상처리 되었습니다."
}
// const rayValue = Price(testapiStock.output.)
export interface User {
    assets: Assets;
}

export const testRealData : Assets = {
    stocks: [// 현재가 수량 매입가
        new MyStock("BYND","NAS","비욘드 미트",10.63,Currency.USD,22,76.59),
        new MyStock("IVV","AMS","ISHARES CORE S&P 500 ETF",429.7900,Currency.USD,1,439.1900),
        new MyStock("QQQ","NAS","Invesco QQQ Trust Series 1",354.6500,Currency.USD,3,379.7200),
        new MyStock("TQQQ","NAS","ProShares UltraPro QQQ",36.8200,Currency.USD,17,64.5158),
        new MyStock("UPRO","AMS","ProShares UltraPro S&P500",42.7900,Currency.USD,2,60.2150), // 해외주식
        new MyStock("228670","KRX","레이", 36700,Currency.KRW,16,32378.125),
        new MyStock("293490","KRX", "카카오게임즈",39300,Currency.KRW,16,52000),
        new MyStock("379800","KRX","KODEX 미국S&P500TR",12410,Currency.KRW,138,11080),
        new MyStock("379810","KRX","KODEX 미국나스닥100TR",12530,Currency.KRW,252,11501),//국내주식
    ],
    coins : [
        new MyCoin("ETH", "이더리움",2511000,Currency.KRW,1.19411886)
    ],
    cash:[
        new Cash(2000000,Currency.KRW)
    ]
}

export const mappingText = (category : string | undefined) => {
    let text
    switch(category){
        case "stocks":
            text = "주식"
            break
        case "coins":
            text = "코인"
            break
        case "cash":
            text = "현금"
            break
        default:
            text = "자산"
    }
    return text
}
interface CalcOption {
    currentValue ?: number

    exchangeRate?: ExchangeRate
    baseCurrency ?: Currency 
}
const BASE_CURRENCY = Currency.KRW
//주식,코인 현재가치 구하기
export const calcCurrentValue = (myAsset : MyStock | MyCoin ,exchangeRate ?: ExchangeRate,currentValue = 0, baseCurrency = Currency.KRW) : number => {
    if (!myAsset.quantity || !myAsset.price) {
        console.log("수량 혹은 가격이 0이거나 존재하지 않습니다.")
    }
    //이것의 현재가를 구해줘. 통화가 같지 않으면 환전, 같다면 수량* 가격, 새로운 가격정보
    const assetValue = (currentValue) ?  myAsset.quantity * currentValue : myAsset.quantity * myAsset.price
    
    return (myAsset.currency === baseCurrency) ? assetValue : exchangeValue(assetValue,exchangeRate)

}
//asset[] 의 현재가치
export const calcAssetArrayCurrentValue = (assets : Array<MyStock | MyCoin> , newPrices ?: Array<Price>, exchangeRates?: ExchangeRate[]) :number => {
    
    const assetsCurrentValue = assets.reduce((acc, asset) => {
        const newPrice = newPrices?.find(price => price.code === asset.code)
        const targetExchangeRate = exchangeRates?.find(ex => ex.from === asset.currency && ex.to === Currency.KRW)
        if (newPrice){
            return acc += calcCurrentValue( asset, targetExchangeRate,newPrice.value)
        }
        return acc += calcCurrentValue(asset, targetExchangeRate)
    },0)

    return assetsCurrentValue
}
//cash[] 의 현재가치
export const calcCashArrayCurrentValue = (cash: Cash[] ,exchangeRate : ExchangeRate[] = [] ,baseCurrency = Currency.KRW) => {
    
    const cashValue = cash.reduce((acc, aCash) => {
        if(aCash.currency === baseCurrency){
           return acc += aCash.value
        } else {
            const targetExchangeRate = exchangeRate.find((ex) => ex.from === aCash.currency && ex.to === baseCurrency)
            return acc += exchangeValue(aCash.value,targetExchangeRate)
        }
    },0);
    return cashValue
} 
// assets 전체 현재가치 구하기
export const calcAllAssetsCurrentValue = (assets: Assets, ArrayPrice ?: Array<Price>, exchangeRate: ExchangeRate[] = [],baseCurrency = Currency.KRW) => {

    const {stocks, coins, cash } = assets
    
    if (!stocks?.length && !coins?.length && !cash?.length ) {
        return 0
    }

    let assetsValue = 0
    if(assets?.stocks && assets?.stocks?.length > 0){
        const stockCurrentValue = calcAssetArrayCurrentValue( assets?.stocks,ArrayPrice ,exchangeRate)
        assetsValue += stockCurrentValue
    }
    if(assets?.coins && assets?.coins.length > 0){
        const coinsCurrentValue = calcAssetArrayCurrentValue( assets?.coins , ArrayPrice)
        assetsValue += coinsCurrentValue
    }
    if(assets?.cash && assets?.cash.length > 0){
        const cashCurrentValue = calcCashArrayCurrentValue(assets.cash,exchangeRate)
        assets?.cash.reduce((acc, aCash) => {
            if(aCash.currency === baseCurrency){
                return acc += aCash.value
            } else {
                const targetExchangeRate = exchangeRate.find((ex) => ex.from === aCash.currency && ex.to === baseCurrency)
                const exchangedValue = exchangeValue(aCash.value, targetExchangeRate)
               return acc += exchangedValue
            }
            
        },0)
        assetsValue += cashCurrentValue
    }
    return assetsValue
}
//환전
export const exchangeValue = (targetValue : number, exchangeRate?: number | ExchangeRate , digit=0) => {
    // return Math.round((targetValue * exchangeRate) * (10 ** digit)) / (10 ** digit)
    if (exchangeRate === 0 || typeof exchangeRate === 'undefined'){
        console.log("환율이 0 또는 존재하지 않습니다. 입력 값을 반환합니다.")
        return roundNumber(targetValue,digit)
    }
    if ( typeof exchangeRate === 'number') {
        return roundNumber(targetValue * exchangeRate, digit)
    }
    return roundNumber(targetValue * exchangeRate.rate, digit)
    
}
//소수점 
export const roundNumber = (x: number, digit = 0) => {
    return Math.round(x * (10 ** digit)) / (10 ** digit)
}
//비율
export const calcPercentage = (part :number, total: number , digit = 0) => {
    return roundNumber((part / total) * 100, digit)
}

//자산 현재 가치 비율 계산
export const calcAssetsPercentage = (assets : Assets) : Array<Ratio> => {
    const {stocks ,coins, cash} = assets
    const total = calcAllAssetsCurrentValue(assets)

    let resultArray : Array< Ratio > = []

    if (total && stocks){
        const stockRatio = calcPercentage(calcAssetArrayCurrentValue(stocks), total)
        resultArray = [
            ...resultArray,
            { "stocks" : stockRatio }
        ]
    }
    if (total && coins){
        const coinsRatio = calcPercentage(calcAssetArrayCurrentValue(coins), total)
        resultArray = [
            ...resultArray,
            {"coins": coinsRatio}
        ]
    }
    if (total && cash){
        const cashRatio = calcPercentage(calcCashArrayCurrentValue(cash), total)
        resultArray = [
            ...resultArray,
            {"cash": cashRatio}
        ]
    }

    return resultArray
}

export const calcAssetArrayPercentage = (asset : MyCoin[] | MyStock[] ) : Array<Ratio> => {
    // let resultArray : Array< {[key: string] : number} > = []

    const total = calcAssetArrayCurrentValue(asset)
    const resultArray : Array<Ratio> = asset.map((aAsset) => {
        const assetName = aAsset.name
        const ratio = calcPercentage( calcCurrentValue(aAsset) ,total)
        
        return {
            [assetName] : ratio
        }
    })

    return resultArray

}

//
