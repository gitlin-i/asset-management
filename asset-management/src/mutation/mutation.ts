import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { MyStockAPI } from "../api/stock"
import { Assets, deleteMyAssets, getMyAssets, postMyAssets, putMyAssets } from "../api/asset"
import { MyCashAPI } from "../api/cash"
import { MyCoinAPI } from "../api/coin"


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
    } 
  })
}
  
