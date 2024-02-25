import { MY_API } from "."


interface UserInfoAPI {
    id: string
    name : string
}



export const getUserInfo = async () : Promise<UserInfoAPI> => {
    const response = await MY_API.get('/user/info',{withCredentials:true})
    return response.data
}