import { DevApi, ResponseData } from ".";
import { MyCashAPI } from "./cash";
import { MyCoinAPI } from "./coin";
import { MyStockAPI } from "./stock";

export type Assets = "stock" | "coin" | "cash"
export const getMyAssets = async (asset: Assets) :Promise<ResponseData<MyCashAPI | MyCoinAPI | MyStockAPI>> => {
    const response = await DevApi.get(`/my-asset/${asset}`,{withCredentials:true})
  
    return response.data 
  }
  

// type AssetToReturnType = {
//   cash: MyCash2;
//   coin: MyCoin2;
//   stock: MyStockAPI;
// };
