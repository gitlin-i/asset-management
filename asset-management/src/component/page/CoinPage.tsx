
import { styled } from 'styled-components'
import { testTargetRatios } from '../../domain/Domain'
import Section from '../Section'
import { useRecoilState, useRecoilValue } from 'recoil'
import { assetsState,  targetRatioState } from '../../atom/atom'
import {  assetsRatio, coinsRatio, stocksRatio } from '../../selector/selector'
import RatioChartCard from '../Card/RatioChartCard'
import { useEffect } from 'react'

import CurrentPriceCard from '../Card/CurrentPriceCard'
import TotalMyCoinsCard from '../Card/TotalMyCoinsCard'
import { StyledMain } from './MainPage'

import StockEditableCard from '../Card/StockEditableCard'
import LineChartCard from '../Card/LineChartCard'
import { ConvertToNivoLineChartData } from '../../utill/NivoLineChart'
import { useMarketIndex } from '../../query/market'
import Card from '../Card'
import TestingCard from '../Card/TestingCard'




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
const StyledDiv = styled.div`
  display: inline-block;
  width: 240px;
  height:200px;
  &:hover {
    background-color:#efefef;
  }
  border-radius:1rem;
`
const StyledP = styled.p`
  width: 100%;
  overflow: hidden; 
  text-overflow: ellipsis;
`
const H5 = styled.h5`
  padding: 0.5rem;
  padding-left: 1rem;
`
const StyledUl = styled.ul`
  padding :0;
  margin:0;
`



////////////
const CoinPage : React.FC = (props) => {
  
  const [targetRatios, setTargetRatios] = useRecoilState(targetRatioState)
  const coinsCurRatio = useRecoilValue(coinsRatio)
  const {data,status} = useMarketIndex("KOSPI")

  useEffect(()=>{
    setTargetRatios((prev)=> ({
      ...testTargetRatios
    }))
  },[])
  
  return (
    <ReStyledMain>

      <Section>
        <RatioChartCard title={"목표 비율"} ratios={targetRatios.coins} />
      </Section>

      <Section>
        <RatioChartCard title={"현재 비율"} ratios={coinsCurRatio} />
      </Section>

      <Section>
        <TestingCard />
      </Section>

      <Section>
        <TotalMyCoinsCard /> 
      </Section>

      <Section>
        <CurrentPriceCard category='coins' />
      </Section>


      <Section >
        <StockEditableCard />
      </Section>
    </ReStyledMain>
  )
}

export default CoinPage