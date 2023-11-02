import React, { useEffect, useState } from 'react'
import Card from '.'
import styled from 'styled-components'
import Input from '../Input'
import { MyStock } from '../../domain/stock'
import Button from '../Button'
import { StockInfoAPI, getStockInfo } from '../../api/stock'
import { StockMarket, StockMarketArray } from '../../domain/market'
import {  useQueryClient } from '@tanstack/react-query'

import { useRecoilValue } from 'recoil'
import { assetsState } from '../../atom/atom'
import { useMyAssetsMutation } from '../../mutation/mutation'
interface StockEditableCardProps {
    myStock?: MyStock
}
const StyledLayout = styled.div`
  width:100%;
  padding : 0;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  & > ::after {
  content: "";
  display: block;
  width: 80%;
  border-bottom: 2px solid ${props => props.theme.color.underbar }; 
}
  & > :last-child::after {
    display: none;
  }
  
`
const StyledWrappingDiv = styled.div`
  width: 100%;
  padding:0;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`
const StyledSearchArea = styled.div`
  width:100%;
  padding: 0 1rem;
  margin-bottom: 1rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
`
const StyledSearchButton = styled(Button)`

  width:1rem;
  height:1rem;
  padding:1.5rem;
  border-radius:2rem;

  background-color: gray;
  color: white;
  display:flex;
  justify-content:center;
  align-items:center;
`


const MaterialSpan = styled.span.attrs({className: "material-symbols-outlined" })`
`


const StyledSearchDiv = styled.div`
  display: flex;
  flex-direction:column;

`
const StyledInputDiv = styled(StyledSearchDiv)`
  width: 50%;
  margin: 0.5rem 0 ;
`
const StyledButtonDiv = styled(StyledSearchDiv)`
  width: 100%;
  margin: 0.5rem 0 ;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`
const StyledInputArea = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  display:flex;
  justify-content: start;
  align-items:center;
  padding-left: 1rem;
`

const StyledSelect = styled.select`
  outline: none;
  height: 2rem;
  border-bottom :2px solid ${props => props.theme.color.underbar };
`
const StyledResultArea = styled.div`
  width:100%;
  padding: 0 1rem;
  margin: 0.5rem 0;
  
  
`
const StyledDiv = styled.div`
  width:50%;
  height:2rem;
`
const StyledButton = styled(Button)`
  background-color:red;
  color: white;
`

const StockEditableCard :React.FC<StockEditableCardProps>= (props) => {  
    const assets = useRecoilValue(assetsState)
    const {myStock} = props
    const [params, setParams] = useState({
      code:'',
      market: 'KRX',
      average_purchase_price : 0,
      quantity : 0
    })
    const [searchedData , setSearchedData] = useState<StockInfoAPI | undefined>()
    const stockMutation = useMyAssetsMutation("stock")



    const handleSearchClick = async (e : any) => {
      const response = await getStockInfo(params.code,params.market as StockMarket)
      if (response.statusText === 'OK'){
        setSearchedData(response.data.output[0])
      } 
    }
    const handleSaveClick = async (e : any) => {
      const isExistStock = searchedData?.code && searchedData?.market
      if (isExistStock){
        const stockInRecoil = assets.stocks?.find((stockInAssets) => stockInAssets.code === searchedData.code &&
        stockInAssets.market === searchedData.market)
        const stock = {
          code : searchedData?.code,
          market: searchedData?.market,
          average_purchase_price: params.average_purchase_price,
          quantity: params.quantity,
          user_id: "",
        }
        if (!!stockInRecoil){
          stockMutation.mutate({
            ...stock,
            method:"put"
          })
        }else{
          stockMutation.mutate({
            ...stock,
            method:"post",
          })
        }
      } else {
        alert("존재하지 않는 주식입니다. 다시 검색해주세요.")
      }
      
    }
    const handleDeleteClick =async (e: any) => {
      const isExistStock = searchedData?.code && searchedData?.market
      if (isExistStock){
        const stockInRecoil = assets.stocks?.find((stockInAssets) => stockInAssets.code === searchedData.code &&
        stockInAssets.market === searchedData.market)
        const stock = {
          code : searchedData?.code,
          market: searchedData?.market,
          average_purchase_price: params.average_purchase_price,
          quantity: params.quantity,
          user_id: "",
        }
        if (!!stockInRecoil){
          stockMutation.mutate({
            ...stock,
            method:"delete"
          })
        }else{
          // alert("보유 하고 있지 않습니다.")
        }
      } else {
        alert("먼저 검색해주세요.")
      }
    }
    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const {name, value} = e.target
      setParams({
        ...params,
        [name] : value
      })
    }
    
  return (
    
    <Card title='주식 수정' >
      <StyledLayout>
        <StyledWrappingDiv>
          <StyledSearchArea>
            <StyledSearchDiv>
              <Input id='code' name='code' defaultText='주식 코드' setValue={myStock?.code} onChange={handleChange} />
              <StyledSelect id='market' name='market' onChange={handleChange} defaultValue={"KRX"} >
                {StockMarketArray.map((val: StockMarket) => {
                  return (<option key={val} value={val}>{val.toString()}</option>)
                })}
              </StyledSelect>
            </StyledSearchDiv>
            <StyledSearchButton key={"search_button"} onClick={handleSearchClick}>
              <MaterialSpan>search</MaterialSpan>
            </StyledSearchButton>
          </StyledSearchArea>
        </StyledWrappingDiv>

        <StyledWrappingDiv>
          <StyledResultArea>
              <StyledDiv>결과 : {searchedData?.name}</StyledDiv>
              <StyledDiv>코드 : {searchedData?.code}</StyledDiv>
              <StyledDiv>마켓 : {searchedData?.market}</StyledDiv>
              
          </StyledResultArea>
        </StyledWrappingDiv>

        
        <StyledWrappingDiv>
          <StyledInputArea>
            <StyledInputDiv>
              <Input type='number' id='quantity' name='quantity' defaultText='보유 수량' onChange={handleChange} />
              <Input id='average_purchase_price' name='average_purchase_price' defaultText='평균 매수가' onChange={handleChange} />
            </StyledInputDiv>
          </StyledInputArea>

        </StyledWrappingDiv>

        
        <StyledWrappingDiv>
          <StyledButtonDiv>
            <Button $primary onClick={handleSaveClick}>
              저장
            </Button>
            <StyledButton onClick={handleDeleteClick}>
              삭제
            </StyledButton>
          </StyledButtonDiv>
          
        </StyledWrappingDiv>




        </StyledLayout>
    </Card>
  )
}

export default StockEditableCard