import { CoinCandleAPI } from "../api/coin";
import { IndexWithDateAPI } from "../api/stock";

export interface NivoPoint {
    x:string;
    y:number;
}
export interface NivoLineChartData {
    id : string;
    color ?: string;
    data: NivoPoint[]
}


export const ConvertToNivoLineChartData = (id : string ,data : IndexWithDateAPI[] | CoinCandleAPI[] , color : string | undefined = undefined) : NivoLineChartData => {
    
    const newData :Array<{x:string, y:number}> = data.map((priceWithDate) => {
        if ("date" in priceWithDate){
            const date = priceWithDate.date
            const year = date.slice(2,4)
            const month = date.slice(4,6)
            const day= date.slice(6,8)
            return {
                x: `${year}/${month}/${day}`,
                y: priceWithDate.price
            }
        } else {
            const date = new Date(priceWithDate.candle_date_time_utc)
            const year = date.getFullYear().toString().slice(-2)
            const month = (date.getMonth() + 1 ).toString()
            const day = date.getDate().toString()

            return {
                x: `${year}/${month}/${day}`,
                y: priceWithDate.trade_price
            }
        }
        
    })
    const sortedTimeData = [...newData].reverse()
    return {
        id: id,
        data: sortedTimeData,
        color: color
    }

}