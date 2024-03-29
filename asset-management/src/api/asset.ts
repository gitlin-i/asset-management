import { AxiosResponse } from "axios";
import { MY_API, ResponseData } from ".";
import { MyCashAPI } from "./cash";
import { MyCoinAPI } from "./coin";
import { MyStockAPI } from "./stock";

type Asset = "stock" | "coin" | "cash"
const matchUrlForPutAndDelete = (myAsset: MyStockAPI | MyCoinAPI | MyCashAPI ) => {
  let url 
  if ("market" in myAsset){
    url = `/my-asset/stock/${myAsset.code}/${myAsset.market}`
  } else if ("currency" in myAsset) {
    url = `/my-asset/cash/${myAsset.currency}`
  } else {
    url = `/my-asset/coin/${myAsset.code}`
  }
  return url
}
const matchUrlForPost = (myAsset: MyStockAPI | MyCoinAPI | MyCashAPI) => {
  let url 
  if ("market" in myAsset){
    url = `/my-asset/stock`
  } else if ("currency" in myAsset) {
    url = `/my-asset/cash`
  } else {
    url = `/my-asset/coin`
  }
  return url
}

export const getMyAssets = async (asset: Asset) :Promise<ResponseData<MyCashAPI | MyCoinAPI | MyStockAPI>> => {
  const response = await MY_API.get(`/my-asset/${asset}`,{withCredentials:true})
  return response.data 
}
  
export const postMyAssets = async (myAsset: MyStockAPI | MyCoinAPI | MyCashAPI)  => {
  const url = matchUrlForPost(myAsset)
  const response = await MY_API.post(url,{
    ...myAsset
  },{withCredentials:true})
  return response.data
}
export const deleteMyAssets =async (myAsset: MyStockAPI | MyCoinAPI | MyCashAPI)  => {
  const url = matchUrlForPutAndDelete(myAsset)
  const response = await MY_API.delete(url,{withCredentials:true})
  return response.data
}

export const putMyAssets = async ( myAsset: MyStockAPI | MyCoinAPI | MyCashAPI) => {
  const url = matchUrlForPutAndDelete(myAsset)
  const response = await MY_API.put(url,{
    ...myAsset
  }, {withCredentials:true})

  return response.data
}