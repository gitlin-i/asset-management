import {atom} from "recoil"
import { Assets, Ratio } from "../domain/Domain"
import { lightTheme } from "../theme"
export const assetsState = atom<Assets>({
    key: "assetsState",
    default: {
        stocks: [],
        cash: [],
        coins: [],
    }
})

export const modalState = atom({
    key: "modalState",
    default: {
        isModalOpen: false,
        content : "",
        title : "",
    }
})

export const themeState = atom({
    key: "themeState",
    default: lightTheme
})

export type TargetRatios = {
    assets?: Ratio[],
    stocks?: Ratio[],
    coins?: Ratio[],
    cash?: Ratio[]
}
export const targetRatioState = atom<TargetRatios>({
    key: "targetRatioState",
    default : {
        assets: [],
        stocks: [],
        coins: [],
        cash: [],
    }
})