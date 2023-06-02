import React from 'react'
import Table from './Table'
import { Assets,  calcAssetsPercentage, calcAssetsCurrentValue, convertInstanceToObject } from '../domain/Domain'
import {styled} from 'styled-components'
import PieChart2 from './PieChart2'
import { ObjectToNivoPieChartData, aInput } from '../utill/NivoPieChart'
import { useAppDispatch, useAppSelector } from '../hook/reduxHook'
import { selectAssets, selectStocks, setStocks } from '../slice/assetsSlice'
import Button from './Button'
import { MyStock } from '../domain/stock'
import { useRecoilState } from 'recoil'
import { assetsState } from '../atom/atom'
const StyledDiv = styled.div`
  width:300px;
  height:600px;
`
const StyledDiv2 = styled(StyledDiv)`
  display: flex;
  flex-direction: column-reverse;
`
const Body : React.FC = () => {

  const dispatch = useAppDispatch();
  const myAssets2 = useAppSelector(selectAssets)
  const myStocks = useAppSelector(selectStocks)
  const [myAssets3, setMyAssets3] = useRecoilState(assetsState)

  const handleClick = (e: React.MouseEvent) => {
    const someStock1 : MyStock = new MyStock('0101001', '어떤 주식1',12222,31,undefined,'KOSPI','KO')
    const someStock2 :MyStock = new MyStock('0101002','어떤 주식2', 12232,3,7000,'KOSPI','KO',)
    const someStock3 : MyStock = new MyStock('0101003','어떤 주식3', 12232,3,7000,'KOSPI','KO',)
    setMyAssets3((prevState) => ({
      ...prevState,
      stocks: [someStock1,someStock2,someStock3]
    }))
  }
  const handleClick2 = (e: React.MouseEvent) => {
    const someStock1 : MyStock = new MyStock('0101001', '어떤 주식1',12222,31,undefined,'KOSPI','KO')
    const someStock2 :MyStock = new MyStock('0101002','어떤 주식2', 12232,3,7000,'KOSPI','KO',)
    const someStock3 : MyStock = new MyStock('0101003','어떤 주식3', 12232,3,7000,'KOSPI','KO',)
    
  }
  const someStock1 : MyStock = new MyStock('0101001', '어떤 주식1',12222,31,undefined,'KOSPI','KO')
  const someStock2 :MyStock = new MyStock('0101002','어떤 주식2', 12232,3,7000,'KOSPI','KO',)
  const myAssets : Assets= {
    stocks: [
      someStock1,
      someStock2
    ],
  }
  
  const chartDataArray = calcAssetsPercentage(myAssets).map(obj => ObjectToNivoPieChartData(obj as aInput))
  const chartDataArray2 = calcAssetsPercentage(myAssets).map(obj => ObjectToNivoPieChartData(obj as aInput))
  return (
    <React.Fragment>
    <img src={process.env.PUBLIC_URL + '/JohnCliftonBogle.webp'} alt='saint'></img>
    <p>내 자산: {JSON.stringify(myAssets)} </p>
    <p>내 redux자산: {JSON.stringify(myAssets2)} </p>

    <p>총 자산: {calcAssetsCurrentValue(myAssets)}</p>
    <p>자산비율:{ JSON.stringify(calcAssetsPercentage(myAssets)) }</p>
    <hr />
    <p>종목 보유 현황</p>
    <hr />
    <Table assets={myAssets} />

    <StyledDiv>
      <PieChart2 data={chartDataArray} />
    </StyledDiv>
    <StyledDiv>
      <p>redux:: {JSON.stringify(chartDataArray2)}</p>
      <p>redux:: {JSON.stringify(myAssets2)}</p>
      <p>총 redux 자산: {calcAssetsCurrentValue(myAssets2)}</p>
      
      <p>redux 자산비율:{ JSON.stringify(calcAssetsPercentage(myAssets2)) }</p>
      <br />
      <p>recoil:: {JSON.stringify(myAssets3)}</p>
      <p>총 recoil 자산: {calcAssetsCurrentValue(myAssets3)}</p>
      <PieChart2 data={chartDataArray2} />
    </StyledDiv>
    <StyledDiv2>
      <Button option='primary' onClick={handleClick}>set</Button>
      <Button option='primary' onClick={handleClick2}>set2</Button>
    </StyledDiv2>
    

    
    </React.Fragment>

  )
}

export default Body