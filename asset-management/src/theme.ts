export const lightTheme = {
    name: "light",
    margin: 0,
    padding: 0,
    outline: 0,
    appearance: 0,
    border : 0,
    "text-decoration": "none",
    "box-sizing": "border-box",

    color: {
        background : "#dfdfdf",
        font: "#000000",
        card: "#ffffff",
        unactive: "#a3a3a3",
        primary: "#038cfc",
        secondary: "#18a8b8",
        shadow: "#cccccc"
    },
    "box-shadow" : "0px 0px 20px 0px #cccccc",
    breakPoint: {
        ms: "320px",  // mobile - small 
        mm: "375px",
        ml: "425px",
        t: "768px", // tablet
        l: "1024px", // labtop
        ll: "1440px",// labtop large

    }
}

const dark= {
    name: "dark",
    color: {
        background : "#2e2e2e",
        font: "#d1d1d1",
        card: "#616161",
        unactive: "#a3a3a3",
        primary: "#038cfc",
        secondary: "#18a8b8",
        shadow: "#1a1a1a"
    },
    "box-shadow" : "0px 0px 20px 0px #1a1a1a",

}
export const darkTheme = { ...lightTheme , ...dark } 


// export const darkTheme = {

//     margin: 0,
//     padding: 0,
//     outline: 0,
//     appearance: 0,
//     border : 0,
//     "text-decoration": "none",
//     "box-sizing": "border-box",
//     "font-size": "14px",
//     color: {
//         background : "#2e2e2e",
//         font: "#d1d1d1",
//         card: "#616161",
//         unactive: "#a3a3a3",
//         primary: "#038cfc",
//         secondary: "#18a8b8",
//         shadow: "#1a1a1a"
//     },
//     "box-shadow" : "0px 0px 20px 0px #1a1a1a",

// }

