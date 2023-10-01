
import Card from '.'
import Item from '../Item'
import styled from 'styled-components'
import { useExchangeRate } from '../../query/query'

const StyledUl = styled.ul`
  margin : 0;
  padding :0;
`
const ExchangeRateCard = () => {
    const currency = ['USD','JPY(100)','EUR','CNH']
    const {data}  = useExchangeRate(currency)
    const priority = (cur :any) => {
      switch(cur.currency){
        case "USD":
          return 1
        case "JPY(100)":
          return 2
        case "CNH":
          return 3
        case "EUR" :
          return 4
        default:
          return 100
      }
    }
    function compare(a : any, b: any) {
      if (priority(a) < priority(b)) {
        return -1;
      }
      if (priority(a) >= priority(b) ) {
        return 1;
      }
      return 0;
    }
    const sortedData = data?.output.slice().sort(compare)
    const mapToItem = (exchangeRate :{currency: string , base_rate: number}) => {
      let path, presentName
      switch(exchangeRate.currency){
        case 'USD': 
          path = "united-states"
          presentName = "미국, USD"
          break;
        case 'JPY(100)':
          path = 'japan'
          presentName = "일본, JPY(100)"
          break
        case 'EUR':
          path = 'european-union'
          presentName = "유럽연합, EUR"
          break
        case 'CNH':
          path = 'china'
          presentName = "중국, CNY"
          break
      }
      return (
        <Item key={exchangeRate.currency}
        image={process.env.PUBLIC_URL + path +'.png'}
        $imageRadius="0"
        leftupText={presentName}
        rightUpText={exchangeRate.base_rate} 
        rightDownText={""}
        />
      )
    }

  return (
    <Card title='현재 환율'> 
        <StyledUl>
          {sortedData?.map(mapToItem)}
        </StyledUl>
    </Card>
  )
}

export default ExchangeRateCard

