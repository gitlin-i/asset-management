import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledMain } from './MainPage'
import Card from '../Card'
import Input from '../Input'
import EditableInput from '../EditableInput'
import { useRecoilState } from 'recoil'
import { assetsState } from '../../atom/atom'
import TotalMyStocksCard from '../Card/TotalMyStocksCard'
import StockEditableCard from '../Card/StockEditableCard'

const ReStyledMain = styled(StyledMain)`
  @media screen and ( min-width: ${props => props.theme.breakPoint.ll }){
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3,1fr);
  && :nth-child(1){
    grid-column-start:1;
    grid-column-end:4;
  }
  && :nth-child(2) {
    grid-row-start:2;
    grid-row-end:4;
    
  }
  && :nth-child(3) {
    grid-row-start:2;
    grid-row-end:4;
    grid-column-start:2;
    grid-column-end:4;
  }

}


`
const EditPage : React.FC = () => {
  const [assets, setAssets] = useRecoilState(assetsState)
  const [myStock, setMyStock] = useState()
  // const itemClick =(mystock) =>{
  //   setMyStock(mystock)
  // }
  return (
    <ReStyledMain>
      <StockEditableCard myStock={myStock} />
      <TotalMyStocksCard/>
      <TotalMyStocksCard />
    </ReStyledMain>
  )
}

export default EditPage