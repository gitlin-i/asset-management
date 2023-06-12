import Item from "../component/Item";
import { MyCoin } from "../domain/coin";
import { MyStock } from "../domain/stock";
import { CurrencyMark } from "../domain/Domain";
export interface aInput {
    [key: string] : number;
}

export interface NivoPieChartData {
    id: string;
    label: string;
    value: number;

}

export const ObjectToNivoPieChartData = (obj : aInput) : NivoPieChartData => {

    const key = Object.keys(obj)
    const id = key[0]
    const val = obj[id]
    const nivoPieChartData : NivoPieChartData = {
        id: id,
        label: id,
        value: val,
    }
    return nivoPieChartData
}


export const changeDataToItem = (asset : MyCoin | MyStock) => {
    return <Item key={asset.code} image={process.env.PUBLIC_URL + '/JohnCliftonBogle.webp'}
    leftupText={asset.name}
    leftdownText={"보유수량: " + asset.quantity.toLocaleString()}
    rightmiddleText={asset.price.toLocaleString() + CurrencyMark(asset.currency)} />
}