import axios from "axios";

const protocol = "http" + "://"
const domain = "localhost" 
const port = ":"+ "8000"

export const DEV_URL = protocol + domain + port
export const KOREA_INVESTMENT_URL = "https://openapivts.koreainvestment.com:29443"
export const UPBIT_URL = "https://api.upbit.com/v1"

export const UPBIT_Api = axios.create({
  baseURL: UPBIT_URL,
})
export const DevApi = axios.create({
    baseURL: DEV_URL,
})

export const Api = axios.create({
    baseURL: KOREA_INVESTMENT_URL,
})

export interface ResponseData<T> {
  output : T[] ;
  fail_input:[] | string[] ;
}

export function isArrayOfType<T>(arr: any[], checkFn: (item: any) => item is T): arr is T[] {
  return arr.every(checkFn);
}
