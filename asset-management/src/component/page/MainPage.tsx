
import { styled } from 'styled-components'
import { testTargetRatios } from '../../domain/domain'
import Section from '../Section'
import { useRecoilState} from 'recoil'
import { targetRatioState } from '../../atom/atom'
import RatioChartCard from '../Card/RatioChartCard'
import { useEffect } from 'react'
import TotalAssetsCard from '../Card/TotalAssetsCard'
import TotalMyStocksCard from '../Card/TotalMyStocksCard'
import TotalMyCoinsCard from '../Card/TotalMyCoinsCard'
import TotalMyCashCard from '../Card/TotalMyCashCard'
import ExchangeRateCard from '../Card/ExchangeRateCard'
import LineChartCard from '../Card/LineChartCard'
import { ConvertToNivoLineChartData } from '../../utill/NivoLineChart'
import { useMarketIndex } from '../../query/market'
import { useMyAssetsRatio } from '../../query/assets'
import { useMyRatio } from '../../query/ratio'

export const StyledMain = styled.main`
  display:flex;
  flex-direction: column;
  align-items:center;
  row-gap: 1rem;
  width: 100%;
  height:100%;
  background-color: ${props => props.theme.color.background};
  vertical-align:top;
  padding:1rem 1rem 4rem 1rem;

  @media screen and (min-width: ${props => props.theme.breakPoint.t}){

    display: inline-grid;
    
    width:70%;
    max-height: calc(100vh - 56px);
    overflow-y: auto;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(auto-fill);
    gap: 1rem;
  }
  @media screen and (min-width: ${props => props.theme.breakPoint.l }) {
    width:80%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto-fill);
  }
  @media screen and ( min-width: ${props => props.theme.breakPoint.ll }){

    height:calc(100vh - 56px);

    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3,1fr);

  }
`

////////////
const MainPage : React.FC = () => {

  const page = "MainPage"
  
  const assetsRatio = useMyRatio("assets")
  const assetsCurRatio = useMyAssetsRatio()
  const {data: kospiData,status: kospiStatus} = useMarketIndex("KOSPI")
  const {data: kosdaqData,status: kosdaqStatus} = useMarketIndex("KOSDAQ")

  const content = [
    <RatioChartCard title={"목표 비율"} ratios={assetsRatio} />,
    <RatioChartCard title={"현재 비율"} ratios={assetsCurRatio} />,
    <TotalAssetsCard />,
    <TotalMyStocksCard />,
    <TotalMyCoinsCard />,
    <TotalMyCashCard />,
    (kospiStatus === 'success') ? <LineChartCard title='코스피 지수' data={[ConvertToNivoLineChartData("KOSPI",kospiData)]}/> : "",
    (kosdaqStatus === 'success') ?<LineChartCard title='코스닥 지수' data={[ConvertToNivoLineChartData("KOSDAQ",kosdaqData)]}/> : "",
    <ExchangeRateCard />
  ]
  const wrapping =(content: React.ReactNode,index :number | string) => {
    return (
      <Section key={page + 'section' + index} >
        {content}
      </Section>
    )
  }
  return (
    <StyledMain>
      {content.map(wrapping)}
    </StyledMain>
  )
}

export default MainPage