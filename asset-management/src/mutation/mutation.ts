import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { MyStockAPI } from "../api/stock"
import { deleteMyAssets, getMyAssets, postMyAssets, putMyAssets } from "../api/asset"
import { MyCashAPI } from "../api/cash"
import { MyCoinAPI } from "../api/coin"
import { AxiosError } from "axios"
import { MyRatioAPI, deleteMyRatio, postMyRatio, putMyRatio } from "../api/ratio"

type Assets = "stock" | "coin" | "cash"
type HTTPMethod = "get" |"post"| "put" | "delete"
type MutationMethod = "post"| "put" | "delete"
interface MyStockAPIwithMethod extends MyStockAPI {
  method : MutationMethod
}
interface MyCoinAPIAPIwithMethod extends MyCoinAPI {
  method : MutationMethod
}
interface MyCashAPIwithMethod extends MyCashAPI {
  method : MutationMethod
}
interface MyRatioAPIwithMethod extends MyRatioAPI {
  method : MutationMethod
}

export const useMyAssetsMutation = (asset : Assets) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (myAsset: MyStockAPIwithMethod | MyCashAPIwithMethod | MyCoinAPIAPIwithMethod) => {
      
      if (myAsset.method === "post"){
        return postMyAssets(myAsset)
      } else if (myAsset.method === "put"){
        return putMyAssets(myAsset)
      } else {
        return deleteMyAssets(myAsset)
      } 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["myAssets",asset]})
    },
    onError: (error) => {
      const {response}  = error as AxiosError<{ detail : string}>
      const message = response?.data.detail 
      alert(message)
    }
  })
}
  
export const useMyRatioMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (myRatio: MyRatioAPIwithMethod) => {
      
      if (myRatio.method === "post"){
        return postMyRatio(myRatio)
      } else if (myRatio.method === "put"){
        return putMyRatio(myRatio)
      } else {
        return deleteMyRatio(myRatio)
      } 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["myRatio"]})
    },
    onError: (error) => {
      const {response}  = error as AxiosError<{ detail : string}>
      const message = response?.data.detail 
      alert(message)
    }
  })
}