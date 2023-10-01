
import { styled } from 'styled-components'

import { testTargetRatios } from '../../domain/Domain'
import {  changeDataToItem } from '../../utill/NivoPieChart'
import AssetsInput from '../AssetsInput'
import Section from '../Section'
import Card from '../Card'
import { useRecoilState, useRecoilValue } from 'recoil'
import { assetsState,  targetRatioState } from '../../atom/atom'
import {  assetsRatio } from '../../selector/selector'
import RatioChartCard from '../Card/RatioChartCard'
import { useEffect } from 'react'
import TotalAssetsCard from '../Card/TotalAssetsCard'
import TotalMyStocksCard from '../Card/TotalMyStocksCard'
import TotalMyCoinsCard from '../Card/TotalMyCoinsCard'
import TotalMyCashCard from '../Card/TotalMyCashCard'
import ExchangeRateCard from '../Card/ExchangeRateCard'
import { useMyAssets, useMyAssets2, useMyCash, useMyCoinInfoPrice, useMyStockHook, useMyStockInfoPrice, useStockInfo, useStockPrice, } from '../../query/query'
import { UseQueryResult } from '@tanstack/react-query'
import { ResponseData } from '../../api'
import { MyStockAPI } from '../../api/stock'
import { MapperStockMarketToCurrency } from '../../domain/currency'
import { MyStock } from '../../domain/stock'



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
const H5 = styled.h5`
  padding: 0.5rem;
  padding-left: 1rem;
`
const StyledUl = styled.ul`
  padding :0;
  margin:0;
`

////////////
const MainPage : React.FC = () => {

  const [assets,setAssets] = useRecoilState(assetsState)
  const [targetRatios, setTargetRatios] = useRecoilState(targetRatioState)
  const assetsCurRatio = useRecoilValue(assetsRatio)
  const stocks = useMyStockHook()
  useEffect(()=>{
    setTargetRatios((prev)=> ({
      ...testTargetRatios
    }))
  },[])



  return (
    <StyledMain>

      <Section>
        <TotalAssetsCard />
        
      </Section>

      <Section>
        <RatioChartCard title={"목표 비율"} ratios={targetRatios.assets} />
      </Section>

      <Section>
        <RatioChartCard title={"현재 비율"} ratios={assetsCurRatio} />
      </Section>

      <Section>
        <TotalMyStocksCard />
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
        {JSON.stringify(assets.stocks)}
        </Card>
      </Section>

    </StyledMain>
  )
}

export default MainPage