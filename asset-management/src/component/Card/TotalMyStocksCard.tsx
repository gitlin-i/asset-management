import styled from "styled-components"
import Card from "."
import Item from "../Item"
import { Currency, CurrencyMark, exchangeValue } from "../../domain/Domain"
import { useRecoilState, useRecoilValue } from "recoil"
import { stocksCurrentValue, stocksRatio } from "../../selector/selector"
import { MyStock } from "../../domain/stock"
import { assetsState } from "../../atom/atom"

const StyledUl = styled.ul`
  padding :0;
  margin:0;
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
        const rightupText = value.toLocaleString() + CurrencyMark(stock.currency)
        const rightDownText = (stock.currency === Currency.KRW) ?
            "" : exchangeValue(value, 1300).toLocaleString() + CurrencyMark(Currency.KRW)
        const altImageByText = stock.currency === Currency.KRW ? "국내" : "해외"

        return <Item key={key} altImageByText={altImageByText}
        leftupText={leftupText} 
        leftdownText={leftdownText}
        rightUpText={ rightupText }
        rightDownText={rightDownText}  />
    }
  return (
    <Card title='내 주식 합계'>
        <StyledUl>
            <Item leftupText="내 총 주식 합계" rightUpText={ stocksCurVal.toLocaleString() + CurrencyMark(Currency.KRW) } />
            {stocks && stocks.map(spreadItem)}
        </StyledUl>
  </Card>
  )
}

export default TotalMyStocksCard