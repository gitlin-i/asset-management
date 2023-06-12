import React from 'react'
import Table from './Table'
import { Assets,  calcAllAssetsCurrentValue,  calcAssetsPercentage, Currency } from '../domain/Domain'
import {styled} from 'styled-components'
import PieChart2 from './PieChart2'
import { ObjectToNivoPieChartData, aInput } from '../utill/NivoPieChart'
import Button from './Button'
import { MyStock } from '../domain/stock'
import { useRecoilState } from 'recoil'
import { assetsState } from '../atom/atom'
import LineChart from './LineChart'
import LineChart2 from './LineChart2'
const StyledDiv = styled.div`
  width:300px;
  height:600px;
`
const StyledDiv3 = styled.div`
  width:600px;
  height:600px;
`
const StyledDiv2 = styled(StyledDiv)`
  display: flex;
  flex-direction: column-reverse;
`

const example = [
  {
    "id": "japan",
    "color": "hsl(317, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 149
      },
      {
        "x": "helicopter",
        "y": 273
      },
      {
        "x": "boat",
        "y": 269
      },
      {
        "x": "train",
        "y": 172
      },
      {
        "x": "subway",
        "y": 180
      },
      {
        "x": "bus",
        "y": 27
      },
      {
        "x": "car",
        "y": 262
      },
      {
        "x": "moto",
        "y": 51
      },
      {
        "x": "bicycle",
        "y": 54
      },
      {
        "x": "horse",
        "y": 18
      },
      {
        "x": "skateboard",
        "y": 266
      },
      {
        "x": "others",
        "y": 170
      }
    ]
  },]

const Body : React.FC = () => {

  const [myAssets3, setMyAssets3] = useRecoilState(assetsState)

  const handleClick = (e: React.MouseEvent) => {
    const someStock1 : MyStock = new MyStock('0101001', '어떤 주식1',12222,Currency.KRW,31)
    const someStock2 :MyStock = new MyStock('0101002','어떤 주식2', 12232,Currency.KRW,3,7000,)
    const someStock3 : MyStock = new MyStock('0101003','어떤 주식3', 12232,Currency.KRW,3,7000)
    setMyAssets3((prevState) => ({
      ...prevState,
      stocks: [someStock1,someStock2,someStock3]
    }))
  }
  const someStock1 : MyStock = new MyStock('0101001', '어떤 주식1',12222,Currency.KRW,31)
  const someStock2 :MyStock = new MyStock('0101002','어떤 주식2', 12232,Currency.KRW,3,7000)
  const myAssets : Assets= {
    stocks: [
      someStock1,
      someStock2
    ],
  }
  
  const chartDataArray = calcAssetsPercentage(myAssets).map(obj => ObjectToNivoPieChartData(obj as aInput))
  const chartDataArray2 = calcAssetsPercentage(myAssets3).map(obj => ObjectToNivoPieChartData(obj as aInput))
  return (
    <React.Fragment>
    {/* <img src={process.env.PUBLIC_URL + '/JohnCliftonBogle.webp'} alt='saint'></img> */}
    <p>내 자산: {JSON.stringify(myAssets)} </p>
    <p>총 자산: {calcAllAssetsCurrentValue(myAssets)}</p>
    <p>자산비율:{ JSON.stringify(calcAssetsPercentage(myAssets)) }</p>
    <hr />
    <p>종목 보유 현황</p>
    <hr />
    <Table assets={myAssets} />

    <StyledDiv>
      <PieChart2 data={chartDataArray} />
    </StyledDiv>

    <StyledDiv>

      <br />
      <p>recoil:: {JSON.stringify(myAssets3)}</p>
      <p>recoil chart:: {JSON.stringify(chartDataArray2)}</p>
      <p>총 recoil 자산: {calcAllAssetsCurrentValue(myAssets3)}</p>
      <p>자산비율:{ JSON.stringify(calcAssetsPercentage(myAssets3)) }</p>
      <PieChart2 data={chartDataArray2} />
    </StyledDiv>

    <StyledDiv3>
      <LineChart2 data={example} />
    </StyledDiv3>

    <StyledDiv2>
      <Button option='primary' onClick={handleClick}>set</Button>
    </StyledDiv2>
    

    
    </React.Fragment>

  )
}

export default Body