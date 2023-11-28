import {atom} from "recoil"
import { Ratio } from "../domain/domain"
import { lightTheme } from "../theme"
import { ExchangeRate } from "../domain/exchangeRate"

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
