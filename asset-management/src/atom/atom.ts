import {atom} from "recoil"
import { lightTheme } from "../theme"


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

export const loginState = atom({
    key: "loginState",
    default: false
})