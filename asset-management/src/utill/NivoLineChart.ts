import { PriceWithDate } from "../api/stock";

export interface NivoPoint {
    x:string;
    y:number;
}
export interface NivoLineChartData {
    id : string;
    color ?: string;
    data: NivoPoint[]
}


export const ConvertToNivoLineChartData = (id : string ,data : PriceWithDate[] , color : string | undefined = undefined) : NivoLineChartData => {

    const newData :Array<{x:string, y:number}> = data.map((priceWithDate) => {
        return {
            x: priceWithDate.date,
            y: priceWithDate.price
        }
    })
    
    const sortedNewData = [...newData].sort((a,b) => {
        if (a.x > b.x) {
          return 1;
        }
        if (a.x < b.x) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

    if (typeof color ==='undefined'){
        return {
            id: id,
            data:sortedNewData
        }
    }
    return {
        id: id,
        color,
        data: sortedNewData
    }
}