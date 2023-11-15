import React from 'react'
import Card from '.'
import { ObjectToNivoPieChartData } from '../../utill/NivoPieChart'

import styled from 'styled-components'
import PieChart from '../PieChart'
import { Ratio } from '../../domain/domain'

interface RatioChart {
    ratios ?: Ratio[];
    title?: string;
    theme ?: {};
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
  height : 180px;
  
  &:hover {
    background-color:${props => props.theme.color.hover };
  }
  border-radius:1rem;
  
`

const RatioChartCard : React.FC<RatioChart> = (props) => {
    const {ratios,title} = props
    
    const targetRatioForChart = ratios?.map(ratio => ObjectToNivoPieChartData(ratio))
    
  return (
    <Card title={title}>
      <WrappingDiv>
        <StyledDiv>
          {ratios && <PieChart data={targetRatioForChart!} /> }

        </StyledDiv>
      </WrappingDiv>

  </Card>
  )
}

export default RatioChartCard