
import { styled } from 'styled-components'
import PieChart2 from '../PieChart2'
import { MyStock } from '../../domain/stock'
import { Currency, CurrencyMark, calcAllAssetsCurrentValue, calcAssetArrayCurrentValue, calcAssetsPercentage, calcCashArrayCurrentValue, calcPercentage, roundNumber, testRealData } from '../../domain/Domain'
import { ObjectToNivoPieChartData, aInput, changeDataToItem } from '../../utill/NivoPieChart'
import AssetsInput from '../AssetsInput'
import { MyCoin } from '../../domain/coin'
import { Cash } from '../../domain/cash'
import Section from '../Section'
import Card2 from '../Card2'
import Item from '../Item'
import { useRecoilState, useRecoilValue } from 'recoil'
import { assetsState, modalState } from '../../atom/atom'
import Button from '../Button'

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
const H5 = styled.h5`
  padding: 0.5rem;
  padding-left: 1rem;
`
const StyledUl = styled.ul`
  padding :0;
  margin:0;
`

////////////
const DashBoardPage = () => {
  const assets = useRecoilValue(assetsState)
  const [modal,setModal] = useRecoilState(modalState)
  const targetRatio : aInput[]= 
  [
    {"ETF" : 50 },
    {"코인" : 30 },
    {"개별주" :20 },
  ]

  const targetRatioForChart = targetRatio.map(obj => ObjectToNivoPieChartData(obj))
  const assetsRatio = calcAssetsPercentage(assets)
  const assetsRatioForChart = assetsRatio.map(obj => ObjectToNivoPieChartData(obj as aInput))

  return (
    <StyledMain>
      <Section>
        <Card2 title='포트폴리오 구성'>
          {
            targetRatio &&
            <StyledDiv>
              <PieChart2 data={targetRatioForChart} title='목표 비율'></PieChart2>
            </StyledDiv>
          }
          { assetsRatio &&
          <StyledDiv>
            <PieChart2 data={assetsRatioForChart} title='현재 비율'></PieChart2>
          </StyledDiv>}
        </Card2>
      </Section>

      <Section>
        <Card2 title='내 자산'>
          <StyledUl>
            <Item leftupText="내 총 자산" rightmiddleText={ calcAllAssetsCurrentValue(assets).toLocaleString() + CurrencyMark(Currency.KRW)} />
            <Item leftupText="주식 합계" rightmiddleText={ calcAssetArrayCurrentValue(assets.stocks as MyStock[]).toLocaleString() + CurrencyMark(Currency.KRW)} />
            <Item leftupText="코인 합계" rightmiddleText={ calcAssetArrayCurrentValue(assets.coins as MyCoin[]).toLocaleString() + CurrencyMark(Currency.KRW) } />
            <Item leftupText="현금 합계" rightmiddleText={ calcCashArrayCurrentValue(assets.cash as Cash[]).toLocaleString() + CurrencyMark(Currency.KRW)} />
          </StyledUl>
        </Card2>
      </Section>

      <Section>
        <Card2 title='자산 목록'>
            <H5>주식</H5>
            <StyledUl>
              {assets.stocks?.map(changeDataToItem)}
            </StyledUl>
            <H5>코인</H5>
            <StyledUl>
              {assets.coins?.map(changeDataToItem)}
            </StyledUl>
        </Card2>
      </Section>

      <Section >
        <Card2 title='자산 C,U'>
        <AssetsInput />
        </Card2>
      </Section>

      <Section >
        <Button $primary onClick={() => {setModal((prev)=>({
          ...prev,
          isModalOpen: true,
          title: "로그인",
          content: "login",
        }))}}>모달 열기</Button>
      </Section>
      <Section />
    </StyledMain>
  )
}

export default DashBoardPage