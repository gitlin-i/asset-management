
import axios, { AxiosResponse } from "axios";


// test('api Test', async () => {
//     const data = await getCoinPrice("KRW-ETH")
//     console.log(data)
//     expect("").toBe(data)
// })

test('api2 test',async ()=>{

    const response :AxiosResponse<any,any> = await axios.get("https://api.upbit.com/v1/ticker?markets=KRW-ETH")
    const response2 :AxiosResponse<any,any> = await axios.get("https://api.upbit.com/v1/market/all")
    const {data} = response
    const {data:data2} = response2
    console.log(data2)
    console.log(data)
})