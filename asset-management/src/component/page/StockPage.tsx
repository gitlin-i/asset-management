
import { styled } from 'styled-components'

import {  testTargetRatios } from '../../domain/Domain'
import Section from '../Section'

import { useRecoilState, useRecoilValue } from 'recoil'
import { targetRatioState } from '../../atom/atom'
import {  stocksRatio } from '../../selector/selector'
import RatioChartCard from '../Card/RatioChartCard'
import { useEffect } from 'react'
import TotalMyStocksCard from '../Card/TotalMyStocksCard'
import CurrentPriceCard from '../Card/CurrentPriceCard'

import StockEditableCard from '../Card/StockEditableCard'
import { StyledMain } from './MainPage'
import LineChartCard from '../Card/LineChartCard'
import { ConvertToNivoLineChartData } from '../../utill/NivoLineChart'
import { useMarketIndex } from '../../query/market'
import { useMyStocksRatio } from '../../query/stock'



const ReStyledMain = styled(StyledMain)`
  display:flex;
  flex-direction: column;
  align-items:center;
  row-gap: 1rem;
  width: 100%;
  height:100%;
  background-color: ${props => props.theme.color.background};
  vertical-align:top;
  
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

    && :nth-child(4) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start:1;
      grid-column-end:2;
    }
    && :nth-child(5) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start:2;
      grid-column-end:3;
    }
    && :nth-child(6) {
      grid-row-start: 2;
      grid-row-end: 4;
      grid-column-start:3;
      grid-column-end:4;
    }
  }
`

////////////
const StockPage : React.FC = (props) => {
  
  const [targetRatios, setTargetRatios] = useRecoilState(targetRatioState)
  const stocksCurRatio = useMyStocksRatio()
  const {data,status} = useMarketIndex("KOSPI")

  useEffect(()=>{
    setTargetRatios((prev)=> ({
      ...testTargetRatios
    }))
  },[])
  
  return (
    <ReStyledMain>

      <Section>
        <RatioChartCard title={"목표 비율"} ratios={targetRatios.stocks} />
      </Section>

      <Section>
        <RatioChartCard title={"현재 비율"} ratios={stocksCurRatio} />
      </Section>

      <Section>
        { status ==='success' &&
        <LineChartCard title='코스피 지수' data={[ConvertToNivoLineChartData("KOSPI",data)]}/>}
      </Section>

      <Section>
        <TotalMyStocksCard /> 
      </Section>

      <Section>
        <CurrentPriceCard category='stocks' />
      </Section>


      <Section >
        <StockEditableCard />
      </Section>
    </ReStyledMain>
  )
}

export default StockPage