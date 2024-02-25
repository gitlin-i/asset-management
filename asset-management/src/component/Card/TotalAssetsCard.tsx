
import styled from "styled-components"
import Card from "."
import Item from "../Item"
import { Currency, CurrencyMark } from "../../domain/currency"
import { useMyStockCurrentValue} from "../../query/stock"
import { useMyCoinsCurrentValue } from "../../query/coin"
import { useMyCashCurrentValue } from "../../query/cash"


const StyledUl = styled.ul`
  padding :0;
  margin:0;
`

//자산, 주식, 코인 ,현금
const TotalAssetsCard : React.FC = (props) => {

  
  const stockCurVal = useMyStockCurrentValue()
  const coinsCurVal = useMyCoinsCurrentValue()
  const cashCurVal = useMyCashCurrentValue()
  const assetsCurVal = stockCurVal + coinsCurVal + cashCurVal
  const title = "자산"

  const currentValue : {[key: string] : number}[] = [
    {"자산" : assetsCurVal},
    {"주식": stockCurVal},
    {"코인": coinsCurVal},
    {"현금": cashCurVal}
  ]

  const totalToItem = (total: {[key: string] : number}) => {
    const key = Object.keys(total)[0]
    const value = total[key]
    return (
        <Item key={key} leftupText={"내 " + key + " 합계"}  rightUpText={ value.toLocaleString() + CurrencyMark[Currency.KRW] } />
    )
  }

  return (
    <Card title={"내 " + title }>
      <StyledUl>
        {currentValue.map(totalToItem)}
      </StyledUl>

    </Card>
  )
}
export default TotalAssetsCard