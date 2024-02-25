import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "../api/user"
import { useRecoilValue } from "recoil"
import { loginState } from "../atom/atom"



export const useUserInfo = () => {
    const islogined = useRecoilValue(loginState)
    return useQuery({
        queryKey : ['user'],
        queryFn: getUserInfo, 
        enabled : islogined,
    })

}