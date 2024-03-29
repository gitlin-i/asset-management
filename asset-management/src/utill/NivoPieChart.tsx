import Item from "../component/Item";
import { MyCoin } from "../domain/coin";
import { MyStock } from "../domain/stock";
import {  Ratio } from "../domain/domain";
import { CurrencyMark } from "../domain/currency";
import { MyRatioAPI } from "../api/ratio";


export interface NivoPieChartData {
    id: string;
    label: string;
    value: number;
}

export const ObjectToNivoPieChartData = (obj : Ratio | MyRatioAPI) : NivoPieChartData => {

    if ("asset_code" in obj) {
    
        const id = String( obj.ratio_name )
        const val = obj.ratio
        const nivoPieChartData : NivoPieChartData =  {
            id: id,
            label: id,
            value: val,
        } 
        return nivoPieChartData
    } else {
        const key = Object.keys(obj)
        const id = key[0]
        const val = obj[id]
        const nivoPieChartData : NivoPieChartData =  {
            id: id,
            label: id,
            value: val,
        }
        return nivoPieChartData
    }


}


export const changeDataToItem = (asset : MyCoin | MyStock) => {
    return <Item key={asset.code} image={process.env.PUBLIC_URL + '/JohnCliftonBogle.webp'}
    leftupText={asset.name}
    
    rightUpText={"평가 금액: " + (asset.price * asset.quantity).toLocaleString() + CurrencyMark[asset.currency]}
    rightDownText={"현재가: " + asset.price.toLocaleString() + CurrencyMark[asset.currency]} />
}
