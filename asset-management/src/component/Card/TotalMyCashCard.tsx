import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { cashCurrentValue} from "../../selector/selector"
import { assetsState } from "../../atom/atom"
import Card from "."
import Item from "../Item"
import { exchangeValue } from "../../domain/Domain"
import { MyCoin } from "../../domain/coin"
import { Cash } from "../../domain/cash"
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
const TotalMyCashCard = () => {
    const cashCurVal = useRecoilValue(cashCurrentValue)
    
    const cash = useRecoilValue(assetsState).cash
    const spreadItem = (cash : Cash) => {
        const value = cash.value
        const key = cash.currency
        const leftupText = cash.currency

        const rightupText = value.toLocaleString() + CurrencyMark[cash.currency]
        const rightDownText = (cash.currency === Currency.KRW) ?
            "" : exchangeValue(value, 1300).toLocaleString() + CurrencyMark[cash.currency]
        // const altImageByText = cash.currency === Currency.KRW ? "" : "해외"

        return <Item key={key}
        leftupText={leftupText} 
        rightUpText={ rightupText }
        rightDownText={rightDownText}  />
    }
  return (
    <Card title='내 현금'>
        <StyledDiv>평가 금액</StyledDiv>
        <StyledUl>
            <Item leftupText="내 총 현금 합계" rightUpText={ cashCurVal.toLocaleString() + CurrencyMark[Currency.KRW] } />
            {cash && cash.map(spreadItem)}
        </StyledUl>
  </Card>
  )
}
export default TotalMyCashCard