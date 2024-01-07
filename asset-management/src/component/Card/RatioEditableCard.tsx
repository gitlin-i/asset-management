import React, { useState } from 'react'
import Card from '.'
import styled from 'styled-components'
import Input from '../Input'
import Button from '../Button'
import { useMyRatioMutation } from '../../mutation/mutation'
import { RatioCategory, RatioCategoryArray, RatioCategoryToKorean } from '../../domain/ratio'
import { MyRatioAPI } from '../../api/ratio'
import { useMyRatio } from '../../query/ratio'
import { Ratio } from '../../domain/domain'


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


const StyledDiv = styled.div`
  display: flex;
  flex-direction:column;
`

const StyledInputDiv2 = styled(StyledDiv)`
  width: 50%;
  margin: 0.5rem 0 ;
`
const StyledInputDiv = styled(StyledDiv)`
  width: 40%;
  margin: 0.5rem 0 ;
`
const StyledButtonDiv = styled(StyledDiv)`
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
  display: flex;
  width:100%;
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
const StyledDivText = styled.div`
  width:50%;
  height:2rem;
`
const StyledButton = styled(Button)`
  background-color:red;
  color: white;
`

const RatioEditableCard :React.FC= (props) => {  

    const [params, setParams] = useState<MyRatioAPI>({
      asset_code : 'assets',
      ratio_name: '',
      ratio : 0,
    })
    const myRatio = useMyRatio('all')
    const ratioMutation = useMyRatioMutation()


    const handleSaveClick = async (e : any) => {
      const isExistRatio : MyRatioAPI | undefined = myRatio.find((ratio) => {
        return ratio.ratio_name === params.ratio_name && ratio.asset_code === params.asset_code
      })

      if (isExistRatio){
        ratioMutation.mutate({
            ...params,
            method: "put"
        })
      } else {
          ratioMutation.mutate({
            ...params,
            method:"post",
          })
      }
    }
    const handleDeleteClick = async (e: any) => {
        const isExistRatio : MyRatioAPI | undefined = myRatio.find((ratio) => {
            return ratio.ratio_name === params.ratio_name && ratio.asset_code === params.asset_code
          })
      if (isExistRatio){
        ratioMutation.mutate({
        ...params,
        method:"delete"
        })
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
    
    <Card title='목표 비율 수정' >
      <StyledLayout>
        <StyledWrappingDiv>
          <StyledSearchArea>
            <StyledInputDiv>
              <StyledSelect id='asset_code' name='asset_code' onChange={handleChange} defaultValue={"assets"} >
                {RatioCategoryArray.map((val: RatioCategory) => {
                  return (<option key={val} value={val}>{RatioCategoryToKorean[val]}</option>)
                })}
              </StyledSelect>
              <Input type='text' id='ratio_name' name='ratio_name' defaultText='비율 이름' onChange={handleChange} />
              <Input type='number' id='ratio' name='ratio' defaultText='비율(%)' onChange={handleChange} />
            </StyledInputDiv>
          </StyledSearchArea>
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

export default RatioEditableCard