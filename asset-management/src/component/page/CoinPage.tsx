
import { styled } from 'styled-components'
import Section from '../Section'
import RatioChartCard from '../Card/RatioChartCard'
import CurrentPriceCard from '../Card/CurrentPriceCard'
import TotalMyCoinsCard from '../Card/TotalMyCoinsCard'
import { StyledMain } from './MainPage'
import { useMyCoinsRatio } from '../../query/coin'
import CoinEditableCard from '../Card/CoinEditableCard'
import LineChartCard from '../Card/LineChartCard'
import { useCoinIndex } from '../../query/market'
import { ConvertToNivoLineChartData } from '../../utill/NivoLineChart'
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
const CoinPage : React.FC = (props) => {
  const page = "CoinPage"
  const coinRatio = useMyRatio("coin")
  const coinsCurRatio = useMyCoinsRatio()
  const {data:coinCandle , status} = useCoinIndex("KRW-ETH")

  const wrapping =(content: React.ReactNode,index :number | string) => {
    return (
      <Section key={page + 'section' + index} >
        {content}
      </Section>
    )
  }
  const content = [
    <RatioChartCard title={"목표 비율"} ratios={coinRatio} />,
    <RatioChartCard title={"현재 비율"} ratios={coinsCurRatio} />,
    <TotalMyCoinsCard /> ,
    <CurrentPriceCard category='coins' />,
    <CoinEditableCard />,
    (status === 'success') ? <LineChartCard title='이더리움' data={[ConvertToNivoLineChartData("이더리움",coinCandle)]}/> : "",
  ]

  return (
    <ReStyledMain>
      {content.map(wrapping )}
    </ReStyledMain>
  )
}

export default CoinPage