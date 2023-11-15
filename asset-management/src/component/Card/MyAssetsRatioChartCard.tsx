import React from 'react'
import Card from '.'
import { ObjectToNivoPieChartData } from '../../utill/NivoPieChart'
import { useRecoilValue } from 'recoil'
import { assetsRatio } from '../../selector/selector'
import styled from 'styled-components'
import PieChart from '../PieChart'
import { Ratio } from '../../domain/domain'

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
        <PieChart data={targetRatioForChart} title='목표 비율'></PieChart>
      </StyledDiv>
    }
    { assetsRatioForChart &&
      <StyledDiv>
        <PieChart data={assetsRatioForChart} title='현재 비율'></PieChart>
      </StyledDiv>
    }
  </Card>
  )
}

export default MyAssetsRatioChartCard