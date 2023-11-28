
import { styled } from 'styled-components'
import Section from '../Section'

import RatioChartCard from '../Card/RatioChartCard'
import TotalMyStocksCard from '../Card/TotalMyStocksCard'
import CurrentPriceCard from '../Card/CurrentPriceCard'

import StockEditableCard from '../Card/StockEditableCard'
import { StyledMain } from './MainPage'
import LineChartCard from '../Card/LineChartCard'
import { ConvertToNivoLineChartData } from '../../utill/NivoLineChart'
import { useMarketIndex } from '../../query/market'
import { useMyStocksRatio } from '../../query/stock'
import { useMyRatio } from '../../query/ratio'



const ReStyledMain = styled(StyledMain)`

//768px

  @media screen and ( min-width: ${props => props.theme.breakPoint.ll }){
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3,1fr);
    && :nth-child(3) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start:1;
      grid-column-end:2;
    }
    && :nth-child(4) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start:2;
      grid-column-end:3;
    }
    && :nth-child(5) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start:3;
      grid-column-end:4;
    }
  }
`

////////////
const StockPage : React.FC = (props) => {
  const page ="StockPage"

  const stockRatio = useMyRatio("stock")
  const stocksCurRatio = useMyStocksRatio()
  const {data,status} = useMarketIndex("KOSPI")
  const wrapping =(content: React.ReactNode,index :number | string) => {
    return (
      <Section key={page + 'section' + index} >
        {content}
      </Section>
    )
  }

  const content = [
    <RatioChartCard title={"목표 비율"} ratios={stockRatio} />,
    <RatioChartCard title={"현재 비율"} ratios={stocksCurRatio} />,
    <TotalMyStocksCard /> ,
    <CurrentPriceCard category='stocks' />,
    <StockEditableCard />,
    (status === 'success') ? <LineChartCard title='코스피 지수' data={[ConvertToNivoLineChartData("KOSPI",data)]} /> : "",
  ]
  return (
    <ReStyledMain>
      {content.map(wrapping)}
    </ReStyledMain>
  )
}

export default StockPage