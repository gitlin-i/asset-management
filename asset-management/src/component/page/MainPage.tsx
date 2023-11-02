
import { styled } from 'styled-components'
import { testTargetRatios } from '../../domain/Domain'
import Section from '../Section'
import { useRecoilState, useRecoilValue } from 'recoil'
import { assetsState,  targetRatioState } from '../../atom/atom'

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
//768px
  @media screen and (min-width: ${props => props.theme.breakPoint.t}){

    display: grid;
    height:calc(100vh - 56px);
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
  }
  @media screen and (min-width: ${props => props.theme.breakPoint.l }) {
    display:inline-grid;
    width:80%;
  }
  @media screen and ( min-width: ${props => props.theme.breakPoint.ll }){
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3,1fr);

  }
`

////////////
const MainPage : React.FC = () => {

  const [targetRatios, setTargetRatios] = useRecoilState(targetRatioState)
  const assetsCurRatio = useMyAssetsRatio()
  const {data: kospiData,status: kospiStatus} = useMarketIndex("KOSPI")
  const {data: kosdaqData,status: kosdaqStatus} = useMarketIndex("KOSDAQ")
  
  useEffect(()=>{
    setTargetRatios((prev)=> ({
      ...testTargetRatios
    }))
  },[])



  return (
    <StyledMain>


      <Section>
        <RatioChartCard title={"목표 비율"} ratios={targetRatios.assets} />
      </Section>

      <Section>
        <RatioChartCard title={"현재 비율"} ratios={assetsCurRatio} />
      </Section>
      <Section>
        {kospiStatus === 'success' && 
        <LineChartCard title='코스피 지수' data={[ConvertToNivoLineChartData("KOSPI",kospiData)]}/>}
      </Section>
      

      <Section>
        <TotalAssetsCard />
      </Section>


      <Section>
        <TotalMyStocksCard />
      </Section>
      <Section>

      <Section>
        {kosdaqStatus === 'success' && 
        <LineChartCard title='코스닥 지수' data={[ConvertToNivoLineChartData("KOSDAQ",kosdaqData)]}/>}
      </Section>

      </Section>
      <Section>
        <TotalMyCoinsCard />
      </Section>
      <Section>
        <TotalMyCashCard />
      </Section>
      <Section>
        <ExchangeRateCard />
      </Section>


    </StyledMain>
  )
}

export default MainPage