import { DevApi, ResponseData } from "."


export interface MyRatioAPI{
    asset_code : string,
    ratio_name: string,
    ratio: number
}

export const getMyRatio = async () : Promise<ResponseData<MyRatioAPI>> => {
    const response = await DevApi.get(`/my-ratio`,{withCredentials: true})
    return response.data
}

export const postMyRatio = async (myRatio : MyRatioAPI) : Promise<ResponseData<MyRatioAPI>> => {
    const response = await DevApi.post(`/my-ratio`,{
        ...myRatio
    }, {withCredentials: true})
    return response.data
}
export const putMyRatio = async (myRatio : MyRatioAPI) : Promise<ResponseData<MyRatioAPI>> => {
    const response = await DevApi.put(`/my-ratio/${myRatio.asset_code}/${myRatio.ratio_name}`,{
        ...myRatio
    },{withCredentials: true})
    return response.data
}

export const deleteMyRatio = async (myRatio : MyRatioAPI) : Promise<ResponseData<MyRatioAPI>> => {
    const response = await DevApi.delete(`/my-ratio/${myRatio.asset_code}/${myRatio.ratio_name}`,{withCredentials: true})
    return response.data
}