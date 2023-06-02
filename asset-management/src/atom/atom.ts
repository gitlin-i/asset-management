import {atom} from "recoil"
import { Assets } from "../domain/Domain"
export const assetsState = atom<Assets>({
    key: "assetsState",
    default: {
        stocks: [],
        cash: [],
        coins: [],
    }
})