import React, { useState } from 'react'
import Card from '.'
import styled from 'styled-components'
import Button from '../Button'
import { useMyAssetsMutation } from '../../mutation/mutation'
import { useMyCoin } from '../../query/coin'
import { KRWCoinTop10 } from '../../domain/coin'
import { CoinInfoAPI } from '../../api/coin'
import Input from '../Input'

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
    const myCoins = useMyCoin()
    const KRW_BTC = KRWCoinTop10[0]
    const [params, setParams] = useState({
      code: KRW_BTC.market,
      average_purchase_price : 0,
      quantity : 0,
    })
    const [coinName, setCoinName] = useState(KRW_BTC.korean_name)
    const coinMutation = useMyAssetsMutation("coin")
    const handleSaveClick = async (e : any) => {
        const isMyCoin = myCoins?.find((coinInMyAssets) => coinInMyAssets.code === params.code )

        const coin = {
          code : params.code,
          average_purchase_price: params.average_purchase_price,
          quantity: params.quantity,
        }

        if (!!isMyCoin){
          coinMutation.mutate({
            ...coin,
            method:"put"
          })
        } else {
          coinMutation.mutate({
            ...coin,
            method:"post",
          })
        }

      
    }
    const handleDeleteClick =async (e: any) => {

      const isMyCoin = myCoins?.find((coinInMyAssets) => coinInMyAssets.code === params.code)
      const coin = {
        code : params.code,
        average_purchase_price: params.average_purchase_price,
        quantity: params.quantity,
      }
      if (!!isMyCoin){
        coinMutation.mutate({
          ...coin,
          method:"delete"
        })
      } else{
        alert("보유 하고 있지 않습니다.")
      }
      
    }
    const handleSelectChange =  (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const {name, value} = e.target
      const selectedCoinName = KRWCoinTop10.find((info) => info.market === value)?.korean_name
      if (selectedCoinName) {
        setCoinName(selectedCoinName)
      }
      setParams({
        ...params,
        [name] : value
      })
    }
    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const {name, value} = e.target
      setParams({
        ...params,
        [name] : value
      })
    }

  return (
    
    <Card title='보유 코인 수정' >
      <StyledLayout>
        <StyledWrappingDiv>
          <StyledSearchArea>
            <StyledSearchDiv>
              <StyledSelect id='code' name='code' onChange={handleSelectChange} defaultValue={KRW_BTC?.market} >
                {KRWCoinTop10.map((info:CoinInfoAPI ) => {
                  return (<option key={info.market} value={info.market}>{info.korean_name.toString()}</option>)
                })}
              </StyledSelect>
            </StyledSearchDiv>

          </StyledSearchArea>
        </StyledWrappingDiv>

        <StyledWrappingDiv>
          <StyledResultArea>
            <StyledDiv>이름 : {coinName}</StyledDiv>
            <StyledDiv>코드 : {params.code}</StyledDiv>

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

export default CoinEditableCard