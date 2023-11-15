import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "../api/user"



export const useUserInfo = () => {
    const loginCookie = document.cookie.split(';').find((cookie) => {
        return cookie.includes("session_id")
      })
    return useQuery({
        queryKey : ['user'],
        queryFn: getUserInfo,
        enabled : !!loginCookie
    })

}