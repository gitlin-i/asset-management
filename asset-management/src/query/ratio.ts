import { useQuery } from "@tanstack/react-query"
import { MyRatioAPI, getMyRatio } from "../api/ratio"
import { Ratio } from "../domain/domain"
import { ResponseData } from "../api"


type Category = "assets" | "stock"| "coin" | "cash"

export const useAllMyRatio = () => {
    const loginCookie = document.cookie.split(';').find((cookie) => {
        return cookie.includes("session_id")
    })
    
    return useQuery({
        queryKey: ['myRatio'],
        queryFn : async () : Promise<ResponseData<MyRatioAPI>>=> {
            const data = await getMyRatio()
            return data
        }, enabled: !!loginCookie
    })
}

export const useMyRatio = (asset: Category | 'all') : Ratio[] => {
    const {data, status} = useAllMyRatio()
    const factory = (data : MyRatioAPI) : Ratio => {
        return {
            [data.ratio_name] : data.ratio
        }
    }
    if (status === 'success') {
        const filtering = (asset === 'all') ? data.output : data.output.filter((ratio) => ratio.asset_code === asset)
        const result = filtering.map(factory)
        return result
    } else {
        return []
    }
}