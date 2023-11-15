import React, { useEffect, useState } from 'react'
import Card from '.'
import styled from 'styled-components'


import Button from '../Button'


import { useMyAssetsMutation } from '../../mutation/mutation'

import { useMyCoin } from '../../query/coin'
import { KRWCoin, KRWCoinTop10 } from '../../domain/coin'
import { CoinInfoAPI } from '../../api/coin'
import Input from '../Input'
import { AxiosError } from 'axios'
import { useMyCash } from '../../query/cash'
import { Cash } from '../../domain/cash'
import { MyCashAPI } from '../../api/cash'
import { DEFAULT_EXCHANGERATE, useExchangeRate } from '../../query/exchangeRate'
import { CurrencyToKoreanName, POPULAR_CURRENCY } from '../../domain/currency'

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
  width:50%;
  height:2rem;
`
const StyledButton = styled(Button)`
  background-color:red;
  color: white;
`

const CoinEditableCard :React.FC= (props) => {  
    const myCash = useMyCash()
    const [params, setParams] = useState({
      currency: 'KRW',
      balance: 0,
    })
    const cashMutation = useMyAssetsMutation("cash")
    const {data:exchangeRate, status} = useExchangeRate(DEFAULT_EXCHANGERATE)
    const handleSaveClick = async (e : any) => {
        const isMyCash = myCash?.find((cashInMyAssets) => cashInMyAssets.currency === params.currency )

        const cash = {
          currency : params.currency,
          balance: params.balance,
        }
        if (!!isMyCash){
          cashMutation.mutate({
            ...cash,
            method:"put"
          })
        } else {
          cashMutation.mutate({
            ...cash,
            method:"post",
          })
        }
    }
    const handleDeleteClick =async (e: any) => {

      const isMyCash = myCash?.find((cashInMyAssets) => cashInMyAssets.currency === params.currency)
      const cash = {
        currency : params.currency,
        balance: params.balance,
      }
      if (!!isMyCash){
        cashMutation.mutate({
          ...cash,
          method:"delete"
        })
      } else{
        alert("보유 하고 있지 않습니다.")
      }
    }
    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const {name, value} = e.target
      setParams({
        ...params,
        [name] : value
      })
    }
    const exchage = exchangeRate?.output.find((ex) => ex.currency === params.currency)?.base_rate
  return (
    
    <Card title='보유 현금 수정' >
      <StyledLayout>
        <StyledWrappingDiv>
          <StyledSearchArea>
            <StyledSearchDiv>
              <StyledSelect id='currency' name='currency' onChange={handleChange} >
                {POPULAR_CURRENCY.map((currency) => {
                  return (<option key={currency} value={currency}>{currency}</option>)
                })}
              </StyledSelect>
            </StyledSearchDiv>

          </StyledSearchArea>
        </StyledWrappingDiv>

        <StyledWrappingDiv>
          <StyledResultArea>
            <StyledDiv>단위 : {CurrencyToKoreanName[params.currency]}</StyledDiv>
            <StyledDiv>코드 : {params.currency}</StyledDiv>
            <StyledDiv>환율 : {exchage}</StyledDiv>
          </StyledResultArea>
        </StyledWrappingDiv>

        
        <StyledWrappingDiv>
          <StyledInputArea>
            <StyledInputDiv>
              <Input type='number' id='quantity' name='balance' defaultText='보유 수량' onChange={handleChange} />
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

export default CoinEditableCard