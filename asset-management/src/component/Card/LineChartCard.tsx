import React from 'react'
import Card from '.'
import LineChart from '../LineChart';
import styled from 'styled-components';
interface LineChartProps {
    title ?: string;
    data : any
    titleRightText ?: string;
}

const StyledDiv = styled.div`
  display: inline-block;
  
  width: 100%;
  height:180px;

  &:hover {
    background-color:${props => props.theme.color.hover };
  }
  border-radius:1rem;
  
`
const LineChartCard : React.FC<LineChartProps>= (props) => {
    const {title ,titleRightText, data} = props
    const last = data[0].data.length - 1
    const lastIndexValue: number = data[0].data[last].y

  
  return (
    <Card title={title +" "+ lastIndexValue.toLocaleString()} titleRightText={titleRightText}>
      <StyledDiv>
        <LineChart data={data}/>
      </StyledDiv>

    </Card>
    
  )
}

export default LineChartCard