
import { styled } from 'styled-components'
import PieChart2 from '../component/PieChart2'
import { MyStock } from '../domain/stock'
import { calcAllAssetsCurrentValue, calcAssetArrayCurrentValue, calcAssetsPercentage, calcCashArrayCurrentValue, calcPercentage, roundNumber, testRealData } from '../domain/Domain'
import { ObjectToNivoPieChartData, aInput } from '../utill/NivoPieChart'
import AssetsInput from '../component/AssetsInput'
import { MyCoin } from '../domain/coin'
import { Cash } from '../domain/cash'
import Section from './Section'
import Card2 from './Card2'
import Item from './Item'

const StyledMain = styled.main`
  display:flex;
  flex-direction: column;
  align-items:center;
  row-gap: 1rem;
  width: 100%;
  height:100%;
  background-color: #dfdfdf;
  vertical-align:top;
  padding:1rem;

  @media screen and (min-width: 768px){

    display: grid;
    height:100vh;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
  }
  @media screen and (min-width: 1024px) {
    display:inline-grid;
    width:80%;
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
const StyledUl = styled.ul`
  padding :0;
  margin:0;
`

const MainPage = () => {

  const TargetRatio : aInput[]= [
    {"ETF" : 50 },
    {"코인" : 30 },
    {"개별주" :20 },
  ]

    
  const targetRatioForChart = TargetRatio.map(obj => ObjectToNivoPieChartData(obj))
  const assetsRatio = calcAssetsPercentage(testRealData)
  const assetsRatioForChart = assetsRatio.map(obj => ObjectToNivoPieChartData(obj as aInput))
  
  //
  const changeDataToItem = (asset : MyCoin | MyStock) => {
    return <Item image={process.env.PUBLIC_URL + '/JohnCliftonBogle.webp'}
    leftupText={asset.name}
    leftdownText={asset.quantity}
    rightmiddleText={asset.price} />
  }

  return (
    <StyledMain>
      <Section>
        <Card2 title='포트폴리오 구성'>
        <StyledDiv>
              <PieChart2 data={targetRatioForChart} title='목표 비율'></PieChart2>
        </StyledDiv>
          <StyledDiv>
            <PieChart2 data={assetsRatioForChart} title='현재 비율'></PieChart2>
          </StyledDiv>
        </Card2>
      </Section>

      <Section>
        <Card2 title='내 자산'>
          <StyledUl>
            <Item leftupText="내 총 자산" rightmiddleText={ calcAllAssetsCurrentValue(testRealData).toLocaleString()} />
            <Item leftupText="주식 합계" rightmiddleText={calcAssetArrayCurrentValue(testRealData.stocks as MyStock[]).toLocaleString()} />
            <Item leftupText="코인 합계" rightmiddleText={calcAssetArrayCurrentValue(testRealData.coins as MyCoin[]).toLocaleString()} />
            <Item leftupText="현금 합계" rightmiddleText={ calcCashArrayCurrentValue(testRealData.cash as Cash[]).toLocaleString()} />
          </StyledUl>
          {/* <StyledP>
            내 총 자산 : {calcAllAssetsCurrentValue(testRealData).toLocaleString()} <br />
            내 주식 총 계: {calcAssetArrayCurrentValue(testRealData.stocks as MyStock[]).toLocaleString()} <br />
            내 코인 총 계: {calcAssetArrayCurrentValue(testRealData.coins as MyCoin[]).toLocaleString()} <br />
            내 현금 총 계: {calcCashArrayCurrentValue(testRealData.cash as Cash[]).toLocaleString()} <br />
          </StyledP> */}
        </Card2>

      </Section>

      <Section>
        <Card2 title='자산 목록'>
            <h5>주식</h5>
            <ul>
              {testRealData.stocks?.map(changeDataToItem)}
            </ul>
            <h5>코인</h5>
            <ul>
              {testRealData.coins?.map(changeDataToItem)}
            </ul>
        </Card2>

      </Section>

 
      <Section >
        <Card2 title='자산 C,U'>
        <AssetsInput />
        </Card2>
      </Section>


      
      <Section />
      <Section />
    </StyledMain>
  )
}

export default MainPage