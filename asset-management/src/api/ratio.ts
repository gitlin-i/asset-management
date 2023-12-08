import { MY_API, ResponseData } from "."


export interface MyRatioAPI{
    asset_code : string,
    ratio_name: string,
    ratio: number
}

export const getMyRatio = async () : Promise<ResponseData<MyRatioAPI>> => {
    const response = await MY_API.get(`/my-ratio`,{withCredentials: true})
    return response.data
}

export const postMyRatio = async (myRatio : MyRatioAPI) : Promise<ResponseData<MyRatioAPI>> => {
    const response = await MY_API.post(`/my-ratio`,{
        ...myRatio
    }, {withCredentials: true})
    return response.data
}
export const putMyRatio = async (myRatio : MyRatioAPI) : Promise<ResponseData<MyRatioAPI>> => {
    const response = await MY_API.put(`/my-ratio/${myRatio.asset_code}/${myRatio.ratio_name}`,{
        ...myRatio
    },{withCredentials: true})
    return response.data
}

export const deleteMyRatio = async (myRatio : MyRatioAPI) : Promise<ResponseData<MyRatioAPI>> => {
    const response = await MY_API.delete(`/my-ratio/${myRatio.asset_code}/${myRatio.ratio_name}`,{withCredentials: true})
    return response.data
}