import { useQuery } from "@tanstack/react-query"
import { MyRatioAPI, getMyRatio } from "../api/ratio"
import { ResponseData } from "../api"
import { useUserInfo } from "./user"


type Category = "assets" | "stock"| "coin" | "cash"

export const useAllMyRatio = () => {
    const {data: userInfo, status: userState}= useUserInfo()
    return useQuery({
        queryKey: ['myRatio',userInfo?.id],
        queryFn : async () : Promise<ResponseData<MyRatioAPI>>=> {
            const data = await getMyRatio()
            return data
        }, enabled: userState === 'success' && !!userInfo.id
    })
}

export const useMyRatio = (asset: Category | 'all') : MyRatioAPI[] => {
    const {data, status} = useAllMyRatio()
    if (status === 'success') {
        const filtering = (asset === 'all') ? data.output : data.output.filter((ratio) => ratio.asset_code === asset)
        
        return filtering
    } else {
        return []
    }
}