import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledMain } from './MainPage'
import StockEditableCard from '../Card/StockEditableCard'
import { useMyRatio } from '../../query/ratio'
import RatioChartCard from '../Card/RatioChartCard'
import RatioEditableCard from '../Card/RatioEditableCard'
import Section from '../Section'

const ReStyledMain = styled(StyledMain)`

  @media screen and (min-width: ${props => props.theme.breakPoint.ll }){
    /* height:calc(100vh - 56px);

    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3,1fr); */
    && :nth-child(1){
      grid-row-start:1;
      grid-row-end:3;
      grid-column-start:1;
      grid-column-end:2;
    }
  }
`
const EditPage : React.FC = () => {
  const page = "editPage"
  const assetsRatio = useMyRatio("assets")
  const stockRatio = useMyRatio("stock")
  const coinRatio = useMyRatio("coin")
  const cashRatio = useMyRatio("cash")

  const wrapping =(content: React.ReactNode,index :number | string) => {
    return (
      <Section key={page + 'section' + index} >
        {content}
      </Section>
    )
  }
  const content = [
    <RatioEditableCard />,
    <RatioChartCard title={"자산 비율"} ratios={assetsRatio} />,
    <RatioChartCard title={"주식 비율"} ratios={stockRatio} />,
    <RatioChartCard title={"코인 비율"} ratios={coinRatio} />,
    <RatioChartCard title={"현금 비율"} ratios={cashRatio} />,
  ]
  return (
    <ReStyledMain>
      {content.map(wrapping)}
    </ReStyledMain>
  )
}

export default EditPage