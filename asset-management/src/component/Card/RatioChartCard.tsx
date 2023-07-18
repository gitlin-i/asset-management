import React from 'react'
import Card from '.'
import { ObjectToNivoPieChartData } from '../../utill/NivoPieChart'
import { useRecoilValue } from 'recoil'
import { assetsRatio } from '../../selector/selector'
import styled from 'styled-components'
import PieChart2 from '../PieChart2'
import { Ratio } from '../../domain/Domain'
interface RatioChart {
    ratios : Ratio[];
    title?: string;
}

const WrappingDiv = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    justify-content:center;
    align-items: center;
    position:relative;
`
const StyledDiv = styled.div`
  display: inline-block;
  
  width: 100%;
  height:200px;
  &:hover {
    background-color:#efefef;
  }
  border-radius:1rem;
  
`

const RatioChartCard : React.FC<RatioChart> = (props) => {
    const {ratios,title} = props
    const targetRatioForChart = ratios.map(ratio => ObjectToNivoPieChartData(ratio))

  return (
    <Card title={title}>
    {
      ratios &&
      <WrappingDiv>
        <StyledDiv>
          <PieChart2 data={targetRatioForChart} ></PieChart2>
       </StyledDiv>
      </WrappingDiv>

    }
  </Card>
  )
}

export default RatioChartCard