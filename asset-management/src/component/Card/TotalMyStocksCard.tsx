import styled from "styled-components"
import Card from "."
import Item from "../Item"
import { exchangeValue } from "../../domain/domain"
import { MyStock } from "../../domain/stock"
import { Currency, CurrencyMark } from "../../domain/currency"
import { DEFAULT_EXCHANGERATE, useExchangeRate } from "../../query/exchangeRate"
import { useMyStock, useMyStockCurrentValue, useMyStockInfo } from "../../query/stock"


const StyledUl = styled.ul`
  padding :0;
  margin:0;
`
const StyledDiv = styled.div`

  font-weight:600;
  text-align:right;
  position:relative;
  right:2.5rem;
  
`
const TotalMyStocksCard = () => {
  //내 주식 평가금액, 외화인경우 환산가치, 보유 수량

    const {data: exchangeRate} = useExchangeRate(DEFAULT_EXCHANGERATE)
    const stocks = useMyStock()
    const stocksCurVal = useMyStockCurrentValue()
    
    const spreadItem = (stock : MyStock) => {
        const value = (stock.price * stock.quantity)
        const targetExchange = exchangeRate?.output.find(exchange => exchange.currency === stock.currency)
        const key = stock.code
        const leftupText = stock.name
        const leftdownText = "보유 수량: "+stock.quantity
        const rightupText = value.toLocaleString() + CurrencyMark[stock.currency]
        const rightDownText = (stock.currency === Currency.KRW  ) ?
          "" : exchangeValue(value,targetExchange?.base_rate).toLocaleString() + CurrencyMark[Currency.KRW]
        const altImageByText = stock.currency === Currency.KRW ? "국내" : "해외"
        
        return <Item key={key} altImageByText={altImageByText}
        leftupText={leftupText} 
        leftdownText={leftdownText}
        rightUpText={ rightupText }
        rightDownText={rightDownText}
        />
    }
    
  return (
    <Card title='내 주식'>
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