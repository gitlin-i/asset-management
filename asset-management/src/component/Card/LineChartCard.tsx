import { ResponsiveLine } from '@nivo/line'
import React from 'react'
import Card from '.'
import LineChart from '../LineChart';
import styled from 'styled-components';
type NivoData = {id:string,data: {x:string, y:number}[]}
interface LineChartProps {
    title ?: string;
    data : any
    titleRightText ?: string;
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
  height:180px;
  &:hover {
    background-color:#efefef;
  }
  border-radius:1rem;
  
`
const LineChartCard : React.FC<LineChartProps>= (props) => {
    const {title ,titleRightText, data} = props
    const last = data[0].data.length - 1
    const lastIndexValue = data[0].data[last].y

  
  return (
    <Card title={title +" "+ lastIndexValue} titleRightText={titleRightText}>
      <StyledDiv>
        <LineChart data={data}/>
      </StyledDiv>

    </Card>
    
  )
}

export default LineChartCard