
import { styled } from 'styled-components'
import PieChart2 from '../PieChart2'
import { Currency, CurrencyMark, Ratio, stockTargetRatio, testTargetRatio, testTargetRatios } from '../../domain/Domain'
import { ObjectToNivoPieChartData, changeDataToItem } from '../../utill/NivoPieChart'
import AssetsInput from '../AssetsInput'
import Section from '../Section'
import Card from '../Card'
import { useRecoilState, useRecoilValue } from 'recoil'
import { assetsState, modalState, targetRatioState } from '../../atom/atom'
import { assetsCurrentValue, assetsRatio, cashCurrentValue, cashRatio, coinsCurrentValue, coinsRatio, stocksCurrentValue, stocksRatio } from '../../selector/selector'

import RatioChartCard from '../Card/RatioChartCard'
import { Fragment, useEffect } from 'react'
import TotalAssetsCard from '../Card/TotalAssetsCard'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom';

interface MainPageProps {
  category ?: "stocks" | "coins" | "cash" 
}

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



function MyComponent() {
  const  location  = useLocation();

  // URL에서 전달된 param 값을 사용
  return (
    <div>
      <p>Param from URL: {location.pathname}</p>
      <p>Param from URL: {location.key}</p>
      <p>Param from URL: {location.state}</p>
      <p>Param from URL: {location.hash}</p>
    </div>
  );
}

////////////
const MainPage : React.FC<MainPageProps> = (props) => {
  const {category} = props
  
  const [assets,setAssets] = useRecoilState(assetsState)
   
  const assetsCurRatio = useRecoilValue(assetsRatio)
  const stocksCurRatio = useRecoilValue(stocksRatio)
  const coinsCurRatio = useRecoilValue(coinsRatio)
  const cashCurRatio = useRecoilValue(cashRatio)
  const assetsCurVal = useRecoilValue(assetsCurrentValue)
  const stocksCurVal = useRecoilValue(stocksCurrentValue)
  const coinsCurVal = useRecoilValue(coinsCurrentValue)
  const cashCurVal = useRecoilValue(cashCurrentValue)
  const [targetRatios, setTargetRatios] = useRecoilState(targetRatioState)
  
  ///
  const queryClient = useQueryClient()
  
  /// 
  let currentVal,currentRatio
  switch(category) {
    case 'stocks' :
      currentVal = stocksCurVal
      currentRatio = stocksCurRatio
      break;
    case 'coins' :
      currentVal = coinsCurVal
      currentRatio = coinsCurRatio
      break;
    case 'cash' : 
      currentVal = cashCurVal
      currentRatio = cashCurRatio
      break;
    default :
    currentVal = [
      {"자산" : assetsCurVal},
      {"주식": stocksCurVal},
      {"코인": coinsCurVal},
      {"현금": cashCurVal}
    ]
    currentRatio = assetsCurRatio
  }
  useEffect(()=>{
    setTargetRatios((prev)=> ({
      ...testTargetRatios
    }))


  },[])
  
  
  return (
    <StyledMain>
      <Section>
        <MyComponent></MyComponent>
      </Section>
      <Section>
        <TotalAssetsCard category={category} data={category ? assets[category] : undefined} totalValue={currentVal}/>
      </Section>

      <Section>
        <RatioChartCard title={"목표 비율"} ratios={category ? targetRatios[category] : targetRatios.assets} />
      </Section>

      <Section>
        <RatioChartCard title={"현재 비율"} ratios={currentRatio} />
      </Section>

      <Section>
        <Card title='현재가'>
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

export default MainPage