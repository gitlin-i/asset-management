import { DevApi } from "."


interface UserInfoAPI {
    id: string
    name : string
}



export const getUserInfo = async () : Promise<UserInfoAPI> => {
    const response = await DevApi.get('/user/info',{withCredentials:true})
    return response.data
}