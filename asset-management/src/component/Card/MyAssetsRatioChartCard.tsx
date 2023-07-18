import React from 'react'
import Card from '.'
import { ObjectToNivoPieChartData } from '../../utill/NivoPieChart'
import { useRecoilValue } from 'recoil'
import { assetsRatio } from '../../selector/selector'
import styled from 'styled-components'
import PieChart2 from '../PieChart2'
import { Ratio } from '../../domain/Domain'

const StyledDiv = styled.div`
  display: inline-block;
  width: 240px;
  height:200px;
  &:hover {
    background-color:#efefef;
  }
  border-radius:1rem;
`

const MyAssetsRatioChartCard = () => {
    const targetRatio : Ratio[]= 
    [
      {"ETF" : 50 },
      {"코인" : 30 },
      {"개별주" :20 },
    ]
    const assetsCurRatio = useRecoilValue(assetsRatio)
    
  const targetRatioForChart = targetRatio.map(ratio => ObjectToNivoPieChartData(ratio))
  const assetsRatioForChart = assetsCurRatio?.map(ratio => ObjectToNivoPieChartData(ratio as Ratio))
  return (
    <Card title='자산 비율'>
    {
      targetRatio &&
      <StyledDiv>
        <PieChart2 data={targetRatioForChart} title='목표 비율'></PieChart2>
      </StyledDiv>
    }
    { assetsRatioForChart &&
      <StyledDiv>
        <PieChart2 data={assetsRatioForChart} title='현재 비율'></PieChart2>
      </StyledDiv>
    }
  </Card>
  )
}

export default MyAssetsRatioChartCard