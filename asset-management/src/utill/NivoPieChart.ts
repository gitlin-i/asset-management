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