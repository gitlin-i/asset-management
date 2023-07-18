
import { styled } from 'styled-components'
import PieChart2 from '../PieChart2'
import { Currency, CurrencyMark, Ratio, stockTargetRatio, testTargetRatio, testTargetRatios } from '../../domain/Domain'
import { ObjectToNivoPieChartData, changeDataToItem } from '../../utill/NivoPieChart'
import AssetsInput from '../AssetsInput'

import Section from '../Section'
import Card from '../Card'
import Item from '../Item'
import { useRecoilState, useRecoilValue } from 'recoil'
import { assetsState, modalState, targetRatioState } from '../../atom/atom'
import Button from '../Button'
import { assetsCurrentValue, assetsRatio, cashCurrentValue, coinsCurrentValue, stocksCurrentValue, stocksRatio } from '../../selector/selector'
import TotalMyAssetsCard from '../Card/TotalMyAssetsCard'

import TotalMyStocksCard from '../Card/TotalMyStocksCard'
import TotalMyCoinsCard from '../Card/TotalMyCoinsCard'
import TotalMyCashCard from '../Card/TotalMyCashCard'
import RatioChartCard from '../Card/RatioChartCard'
import { useEffect } from 'react'

interface MainPageProps {
  category ?: "stock" | "coin" | "cash"

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

////////////
const MainPage : React.FC<MainPageProps> = (props) => {
  const {category} = props
  const assets = useRecoilValue(assetsState)
  const assetsCurRatio = useRecoilValue(assetsRatio)
  const stocksCurRatio = useRecoilValue(stocksRatio)
  const [targetRatios, setTargetRatios] = useRecoilState(targetRatioState)
  useEffect(()=>{

  setTargetRatios((prev)=> ({
    
    ...testTargetRatios
  }))
  console.log(targetRatios)
  },[])
  

  let contents : [] | Array<{key: string , content : JSX.Element}> = []
  switch(category) {
    case 'stock' :
      contents = [
        {key: "TotalStocksCard" , content: <TotalMyStocksCard />},
        {key: "StocksTargetRatioCard" ,content : <RatioChartCard ratios={targetRatios.stocks as Ratio[]} title='목표 비율' /> },
        {key: "MyAssetsRatioCard" ,content : <RatioChartCard ratios={stocksCurRatio as Ratio[]} title='내 주식 비율' /> },
      ]
      break;

    case 'coin' :
      contents = [
        {key: "TotalCoinsCard", content: <TotalMyCoinsCard />},
        {key: "CoinTargetRatioCard" ,content : <RatioChartCard ratios={targetRatios.coins as Ratio[]} title='목표 비율' /> },
        {key: "MyAssetsRatioCard" ,content : <RatioChartCard ratios={assetsCurRatio as Ratio[]} title='내 자산 비율' /> },
      ]
      break;
    case 'cash' : 
      contents = [
        {key: "TotalCashCard", content: <TotalMyCashCard />},
        {key: "CashTargetRatioCard" ,content : <RatioChartCard ratios={targetRatios.cash as Ratio[]} title='목표 비율' /> },
        {key: "MyAssetsRatioCard" ,content : <RatioChartCard ratios={assetsCurRatio as Ratio[]} title='내 자산 비율' /> },
      ]
      break;
    default :
      contents = [
        {key: "TotalMyAssetsCard", content: <TotalMyAssetsCard/>},
        {key: "AssetsTargetRatioCard" ,content : <RatioChartCard ratios={targetRatios.assets as Ratio[]} title='목표 비율' /> },
        {key: "MyAssetsRatioCard" ,content : <RatioChartCard ratios={assetsCurRatio as Ratio[]} title='내 자산 비율' /> },
      ]
  }


  return (
    <StyledMain>
      {contents.map((content) => {
        return (
          <Section key={content.key}>
            {content.content}
          </Section>
        )
      })}



      <Section>
        <Card title='자산 목록'>
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