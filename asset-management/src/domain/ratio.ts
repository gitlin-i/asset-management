export type RatioCategory = "assets" | "stock" | "coin" | "cash"
export const RatioCategoryArray : RatioCategory[] = ["assets" , "stock" , "coin" , "cash"]

export const RatioCategoryToKorean : Record<RatioCategory, string> = {
    "assets" : "자산",
    "stock" : "주식" ,
    "coin" : "코인",
    "cash" : "현금",
}