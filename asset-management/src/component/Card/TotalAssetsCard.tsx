import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { assetsCurrentValue, cashCurrentValue, coinsCurrentValue, stocksCurrentValue} from "../../selector/selector"
import { assetsState } from "../../atom/atom"
import Card from "."
import Item from "../Item"
import { Assets, Currency, CurrencyMark, exchangeValue } from "../../domain/Domain"
import { MyCoin } from "../../domain/coin"
import { Cash } from "../../domain/cash"
import { MyStock } from "../../domain/stock"

interface TotalCardProps {
    category?: "stocks" | "coins" | "cash" 
    data?: MyStock[] | MyCoin[] | Cash[] 
    totalValue : number | Array<{[key:string]:number}>

}
const StyledUl = styled.ul`
  padding :0;
  margin:0;
`
const TotalAssetsCard : React.FC<TotalCardProps> = (props) => {
    const {category, data, totalValue: sumValue} = props
    let title
    switch(category){
        case "stocks":
            title = "주식"
            break;
        case "coins":
            title = "코인"
            break;
        case "cash":
            title = "현금"
            break;
        default:
            title = "자산"
    }

    const spreadItem = (asset : Cash | MyCoin | MyStock) => {
        const value = asset.quantity ? asset.price * asset.quantity : asset.price
        const key = asset.code
        const leftupText = asset.name
        const leftdownText = asset.quantity ? "보유 수량: " + asset.quantity : ""
        const rightupText = value.toLocaleString() + CurrencyMark(asset.currency)
        const rightDownText = (asset.currency === Currency.KRW) ?
            "" : exchangeValue(value, 1300).toLocaleString() + CurrencyMark(Currency.KRW)
        
        return <Item key={key}
        leftupText={leftupText} 
        leftdownText={leftdownText}
        rightUpText={ rightupText }
        rightDownText={rightDownText}  />
    }
  return (
    <Card title={"내 " + title }>
        <StyledUl>
            { typeof sumValue === "number" &&
                <Item leftupText={"내 " + title + " 합계"} rightUpText={ sumValue.toLocaleString() + CurrencyMark(Currency.KRW) } />}
            {Array.isArray(sumValue) &&
                sumValue.map((val) => {
                    const key = Object.keys(val)[0]
                    const value = val[key]
                    return (
                        <Item key={key} leftupText={"내 " + key + " 합계"}  rightUpText={ value.toLocaleString() + CurrencyMark(Currency.KRW) } />
                    )
                })}
            {data && data.map(spreadItem)}
        </StyledUl>

  </Card>
  )
}
export default TotalAssetsCard