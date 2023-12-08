import axios from "axios";

let mode : "dev" | "oper" | string = "dev"


const domain = "localhost" 
const port = "8000"

const DEV_URL = "http" + "://"+ domain + ":" + port + "/api"
const OPER_URL = "https" + "://"+ "my-asset.info" + "/api"

export const KOREA_INVESTMENT_URL = "https://openapivts.koreainvestment.com:29443"
export const UPBIT_URL = "https://api.upbit.com/v1"

export const UPBIT_Api = axios.create({
  baseURL: UPBIT_URL,
})

export const MY_API = axios.create({
    baseURL: (mode === 'oper') ? OPER_URL : DEV_URL,
})


export interface ResponseData<T> {
  output : T[] ;
  fail_input:[] | string[] ;
}

export function isArrayOfType<T>(arr: any[], checkFn: (item: any) => item is T): arr is T[] {
  return arr.every(checkFn);
}
