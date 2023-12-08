import React, { useState } from 'react'
import Card from '.'
import styled from 'styled-components'
import Input from '../Input'
import { MyStock } from '../../domain/stock'
import Button from '../Button'
import { StockInfoAPI, getStockInfo } from '../../api/stock'
import { StockMarket, StockMarketArray } from '../../domain/market'
import { useMyAssetsMutation } from '../../mutation/mutation'
import { useMyStock } from '../../query/stock'
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
  border: none;
  border-bottom :2px solid ${props => props.theme.color.underbar };
  background-color: ${props => props.theme.color.card };
  color: ${props => props.theme.color.font };
`
const StyledResultArea = styled.div`
  width:100%;
  padding: 0 1rem;
  margin: 0.5rem 0;
  
  
`
const StyledDiv = styled.div`
  width:100%;
  height:2rem;
`
const StyledButton = styled(Button)`
  background-color:red;
  color: white;
`

const StockEditableCard :React.FC<StockEditableCardProps>= (props) => {  

    const myStock = useMyStock()
    const stockMutation = useMyAssetsMutation("stock")
    const [params, setParams] = useState({
      code:'',
      market: 'KRX',
      average_purchase_price : 0,
      quantity : 0
    })
    const [searchedData , setSearchedData] = useState<{code: string, name:string,market:string}>({
      code: "",
      name: "코드와 마켓을 입력하고 검색해주세요.",
      market: "",
    })


    const handleSearchClick = async (e : any) => {
      try {
        const response = await getStockInfo(params.code,params.market as StockMarket)
        if (response.statusText === 'OK'){
          setSearchedData({...response.data.output[0]})
        }
      } catch (error) {
        alert("존재하지 않는 주식입니다. 다시 검색해 주세요.")
      }
       
    }

    const handleSaveClick = async (e : any) => {
      const isExistStock = searchedData?.code && searchedData?.market
      if (isExistStock){
        const isMyStock = myStock?.find((stockInMyAssets) => stockInMyAssets.code === searchedData.code &&
        stockInMyAssets.market === searchedData.market)

        const stock = {
          ...searchedData,
          quantity : !!params.quantity ? params.quantity : 0,
          average_purchase_price: !!params.average_purchase_price ? params.average_purchase_price : 0,

        }
        if (!!isMyStock){
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
        const isMyStock = myStock?.find((stockInMyAssets) => stockInMyAssets.code === searchedData.code &&
        stockInMyAssets.market === searchedData.market)
        const stock = {
          code : searchedData?.code,
          market: searchedData?.market,
          average_purchase_price: params.average_purchase_price,
          quantity: params.quantity,
          
        }
        if (!!isMyStock){
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
    
    <Card title='보유 주식 수정' >
      <StyledLayout>
        <StyledWrappingDiv>
          <StyledSearchArea>
            <StyledSearchDiv>
              <Input id='code' name='code' defaultText='주식 코드' onChange={handleChange} />
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
              <StyledDiv>이름 : {searchedData?.name}</StyledDiv>
              <StyledDiv>코드 : {searchedData?.code}</StyledDiv>
              <StyledDiv>마켓 : {}</StyledDiv>
              
          </StyledResultArea>
        </StyledWrappingDiv>

        
        <StyledWrappingDiv>
          <StyledInputArea>
            <StyledInputDiv>
              <Input type='number' id='quantity' name='quantity' defaultText='보유 수량' onChange={handleChange} />
              <Input type='number' id='average_purchase_price' name='average_purchase_price' defaultText='평균 매수가' onChange={handleChange} />
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