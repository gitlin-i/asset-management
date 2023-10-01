
import { styled } from 'styled-components'

import { testTargetRatios } from '../../domain/Domain'
import {  changeDataToItem } from '../../utill/NivoPieChart'
import AssetsInput from '../AssetsInput'
import Section from '../Section'
import Card from '../Card'
import { useRecoilState, useRecoilValue } from 'recoil'
import { assetsState,  targetRatioState } from '../../atom/atom'
import {  assetsRatio, coinsRatio, stocksRatio } from '../../selector/selector'

import RatioChartCard from '../Card/RatioChartCard'
import { useEffect } from 'react'

import {  useQueryClient } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom';

import TotalMyStocksCard from '../Card/TotalMyStocksCard'
import CurrentPriceCard from '../Card/CurrentPriceCard'
import TotalMyCoinsCard from '../Card/TotalMyCoinsCard'


const StyledMain = styled.main`
  display:flex;
  flex-direction: column;
  align-items:center;
  row-gap: 1rem;
  width: 100%;
  height:100%;
  background-color: ${props => props.theme.color.background};
  vertical-align:top;
  padding:1rem;
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
  
  const assets = useRecoilValue(assetsState)
  const [targetRatios, setTargetRatios] = useRecoilState(targetRatioState)
  const coinsCurRatio = useRecoilValue(coinsRatio)
  ///
  const queryClient = useQueryClient()
  /// 
  
  useEffect(()=>{
    setTargetRatios((prev)=> ({
      ...testTargetRatios
    }))


  },[])
  
  return (
    <StyledMain>

      <Section>
        <TotalMyCoinsCard /> 
      </Section>

      <Section>
        <RatioChartCard title={"목표 비율"} ratios={targetRatios.coins} />
      </Section>

      <Section>
        <RatioChartCard title={"현재 비율"} ratios={coinsCurRatio} />
      </Section>
      <Section>
        <CurrentPriceCard category='stocks' />
      </Section>

      <Section>
        <Card title='자산 현재가'>
            <H5>주식</H5>
            <StyledUl>
              {assets.stocks?.map(changeDataToItem)}
            </StyledUl>
            <H5>코인</H5>
            <StyledUl>
              {assets.coins?.map(changeDataToItem)}
            </StyledUl>
        </Card>
      </Section>

      <Section >
        <Card title='자산 C,U'>
        <AssetsInput />
        </Card>
      </Section>

    </StyledMain>
  )
}

export default CoinPage