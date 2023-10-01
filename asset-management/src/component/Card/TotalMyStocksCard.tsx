import styled from "styled-components"
import Card from "."
import Item from "../Item"
import { exchangeValue } from "../../domain/Domain"
import { useRecoilState, useRecoilValue } from "recoil"
import { stocksCurrentValue, stocksRatio } from "../../selector/selector"
import { MyStock } from "../../domain/stock"
import { assetsState } from "../../atom/atom"
import { Currency, CurrencyMark } from "../../domain/currency"

const StyledUl = styled.ul`
  padding :0;
  margin:0;
`
const StyledDiv = styled.div`

  /* font-size: 12px; */
  font-weight:600;
  text-align:right;
  position:relative;
  right:2.5rem;
  
`
const TotalMyStocksCard = () => {
    const stocksCurVal = useRecoilValue(stocksCurrentValue)
    // const stocksCurRatio = useRecoilValue(stocksRatio)
    const stocks = useRecoilValue(assetsState).stocks
    const spreadItem = (stock : MyStock) => {
        const value = (stock.price * stock.quantity)
        const key = stock.code
        const leftupText = stock.name
        const leftdownText = "보유 수량: "+stock.quantity
        const rightupText = value.toLocaleString() + CurrencyMark[stock.currency]
        const rightDownText = (stock.currency === Currency.KRW) ?
            "" : exchangeValue(value, 1300).toLocaleString() + CurrencyMark[Currency.KRW]
        const altImageByText = stock.currency === Currency.KRW ? "국내" : "해외"

        return <Item key={key} altImageByText={altImageByText}
        leftupText={leftupText} 
        leftdownText={leftdownText}
        rightUpText={ rightupText }
        rightDownText={rightDownText}  />
    }
  return (
    <Card title='내 주식 합계'>
        <StyledDiv>평가 금액</StyledDiv>
        <StyledUl>
            <Item
            leftupText="내 총 주식" 
            rightUpText={ stocksCurVal.toLocaleString() + CurrencyMark[Currency.KRW] }
            
            />

            {stocks && stocks.map(spreadItem)}
        </StyledUl>
  </Card>
  )
}

export default TotalMyStocksCard