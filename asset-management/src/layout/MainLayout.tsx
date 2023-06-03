import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import SectionLayout from './SectionLayout'
import SideLayout from './SideLayout'
import PieChart2 from '../component/PieChart2'
import { useRecoilState } from 'recoil'
import { assetsState } from '../atom/atom'
import { MyStock } from '../domain/stock'
import { calcAssetsPercentage } from '../domain/Domain'
import { ObjectToNivoPieChartData, aInput } from '../utill/NivoPieChart'

const StyledDiv = styled.div`
  width: 400px;
  height:200px;

`
const StyledP = styled.p`
  width: 100%;
  overflow: hidden; 
  text-overflow: ellipsis;
`
const MainLayout1 = styled.main`
  display:inline-flex;
  flex-direction: column;
  align-items:center;
  row-gap: 1rem;
  width: 100%;
  height:100vh;
  background-color: #ffcfcf;
  vertical-align:top;
  padding:1rem;
  @media screen and (min-width: 768px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(6,1fr);
    grid-gap:1rem;
    padding: 1rem;
  }
  @media screen and (min-width: 1024px) {
    display:inline-grid;
    width:80%;
  }
`

const MainLayout = () => {
  const [myAssets, setMyAssets] = useRecoilState(assetsState)
  const someStock1 : MyStock = new MyStock('0101001', '어떤 주식1',12222,31,undefined,'KOSPI','KO')
  const someStock2 :MyStock = new MyStock('0101002','어떤 주식2', 12232,3,7000,'KOSPI','KO',)
  const someStock3 : MyStock = new MyStock('0101003','어떤 주식3', 12232,3,7000,'KOSPI','KO',)
  if (myAssets.stocks?.length === 0
    ){
    setMyAssets((prevState) => ({
      ...prevState,
      stocks: [someStock1,someStock2,someStock3]
    }))
  }


  const chartDataArray = calcAssetsPercentage(myAssets).map(obj => ObjectToNivoPieChartData(obj as aInput))

  return (
    <MainLayout1>
      <SectionLayout title="자산 현황">
        <StyledDiv>
        <StyledP>{JSON.stringify(myAssets)}</StyledP>
        </StyledDiv>

      </SectionLayout>
      <SectionLayout title='자산 시각화'>
        <StyledDiv>
          <PieChart2 data={chartDataArray}></PieChart2>
        </StyledDiv>
      </SectionLayout>
      <SectionLayout/>
      <SectionLayout/>
      <SectionLayout/>
      <SectionLayout/>

    </MainLayout1>
  )
}

export default MainLayout