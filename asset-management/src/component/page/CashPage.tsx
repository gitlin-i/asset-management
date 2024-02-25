
import { styled } from 'styled-components'
import Section from '../Section'
import RatioChartCard from '../Card/RatioChartCard'
import CurrentPriceCard from '../Card/CurrentPriceCard'
import { StyledMain } from './MainPage'
import TotalMyCashCard from '../Card/TotalMyCashCard'
import { useMyCashRatio } from '../../query/cash'
import CashEditableCard from '../Card/CashEditableCard'
import ExchangeRateCard from '../Card/ExchangeRateCard'
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

const CashPage : React.FC = (props) => {
  const page = "CashPage"
  
  const cashRatio = useMyRatio("cash")
  const cashCurRatio = useMyCashRatio()
  
  const wrapping =(content: React.ReactNode,index :number | string) => {
    return (
      <Section key={page + 'section' + index} >
        {content}
      </Section>
    )
  }
  const content = [
    <RatioChartCard title={"목표 비율"} ratios={cashRatio} />,
    <RatioChartCard title={"현재 비율"} ratios={cashCurRatio} />,
    <TotalMyCashCard /> ,
    <CurrentPriceCard category='cash' />,
    <CashEditableCard />,
    <ExchangeRateCard />,
  ]

  return (
    <ReStyledMain>
      {content.map(wrapping)}
    </ReStyledMain>
  )
}

export default CashPage