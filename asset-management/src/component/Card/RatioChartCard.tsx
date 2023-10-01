import React from 'react'
import Card from '.'
import { ObjectToNivoPieChartData } from '../../utill/NivoPieChart'

import styled from 'styled-components'
import PieChart2 from '../PieChart2'
import { Ratio } from '../../domain/Domain'
import { Skeleton } from '@chakra-ui/react'
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
  height:200px;
  &:hover {
    background-color:#efefef;
  }
  border-radius:1rem;
  
`

const RatioChartCard : React.FC<RatioChart> = (props) => {
    const {ratios,title} = props
    const aaa = props.theme
    const targetRatioForChart = ratios?.map(ratio => ObjectToNivoPieChartData(ratio))
    
  return (
    <Card title={title}>
      <WrappingDiv>
        <StyledDiv>
          {ratios && ratios?.length >= 1 ? <PieChart2 data={targetRatioForChart!} /> :
          <Skeleton height="100%" fadeDuration={0.1} endColor="#cccccc"/>}

        </StyledDiv>
      </WrappingDiv>

  </Card>
  )
}

export default RatioChartCard