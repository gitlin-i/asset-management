import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { coinsCurrentValue } from "../../selector/selector"
import { assetsState } from "../../atom/atom"
import Card from "."
import Item from "../Item"
import {   exchangeValue } from "../../domain/Domain"
import { MyCoin } from "../../domain/coin"
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
const TotalMyCoinsCard = () => {
    const coinsCurVal = useRecoilValue(coinsCurrentValue)
    
    const coins = useRecoilValue(assetsState).coins
    const spreadItem = (coins : MyCoin) => {
        const value = (coins.price * coins.quantity)
        const key = coins.code
        const leftupText = coins.name
        const leftdownText = "보유 수량: " + coins.quantity
        const rightupText = value.toLocaleString() + CurrencyMark[coins.currency]
        const rightDownText = (coins.currency === Currency.KRW) ?
            value.toLocaleString() + CurrencyMark[coins.currency] : exchangeValue(value, 1300).toLocaleString() + CurrencyMark[Currency.KRW]
        const altImageByText = coins.currency === Currency.KRW ? "국내" : "해외"

        return <Item key={key}
        leftupText={leftupText} 
        leftdownText={leftdownText}
        rightUpText={ rightupText }
        rightDownText={rightDownText}  />
    }
  return (
    <Card title='내 코인'>
        <StyledDiv>평가 금액</StyledDiv>
        <StyledUl>
            <Item leftupText="내 총 코인 합계" rightUpText={ coinsCurVal.toLocaleString() + CurrencyMark[Currency.KRW] } />
            {coins && coins.map(spreadItem)}
        </StyledUl>
  </Card>
  )
}
export default TotalMyCoinsCard