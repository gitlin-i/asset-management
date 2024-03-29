import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled, { ThemeProvider } from 'styled-components'
import { themeState } from '../../atom/atom'
import Card from '../Card'
import Input from '../Input'
import Button from '../Button'
import { MY_API } from '../../api'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'


const StyledDiv = styled.div`
  background-color: ${props => props.theme.color.background };
  width:100vw;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  
`
const StyledSection = styled.section`
  background-color: ${props => props.theme.color.background };

  @media screen and (min-width: ${props => props.theme.breakPoint.ms}){
    width:80vw;
    height:80vh;
  }
  @media screen and (min-width: ${props => props.theme.breakPoint.t}){
    width:50vw;

  }
  @media screen and (min-width: ${props => props.theme.breakPoint.ll}){
    width:25vw;
  }
`
const ReStyledInput = styled(Input)`
  width: 60%;
  border: none;
`
const InputArea = styled.div<{$selected ?: number}>`
  width:100%;
  padding: 0.5rem 1rem 0 1rem;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & :first-child{
    border-radius: 0.5rem 0.5rem 0 0;
  }

  & :last-child{
    border-radius: 0 0 0.5rem 0.5rem ;
  }
`

const IconArea = styled.span`
  width: 36px;
  height: 36px;
  display:flex;
  justify-content:center;
  align-items: center;
`
const MaterialSpan = styled.span.attrs({className: "material-symbols-rounded" })`
  color: gray;
  font-size: 30px;

`
const Styledblock = styled.div<{$selected ?: number , idx?: number}>`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content:start;
  align-items: center;
  
  
  border-right:${props => props.$selected === props.idx ? "2px solid " + props.theme.color.primary : "1px solid gray"} ;
  border-left: ${props => props.$selected === props.idx ? "2px solid " + props.theme.color.primary : "1px solid gray"} ;
  border-bottom: ${props => props.$selected === props.idx ? "2px solid " + props.theme.color.primary : "1px solid gray"} ;
  
  border-top: ${props => props.idx === 1 ? "1px solid gray" : ""};
  border-top: ${props => props.$selected === props.idx ? "2px solid " + props.theme.color.primary : ""} ;
`
const StyledLayout = styled.div`
  width:100%;
  height: 100%;
  display: flex;
  justify-content:space-between;
  flex-direction:column;
  align-items: stretch;
  
  & > :last-child{
    margin: 1rem;
  }
`
const JoinPage = () => {
  const theme = useRecoilValue(themeState)
  const [selectedInput, setSelect] = useState(0)
  const navigator = useNavigate();
  const [formData,setFormData] = useState({
    id:'',
    password: '',
    name: '',
  })
  const handleClick = async () => {
    try{
      const response = await MY_API.post(`/user/register`,formData)
      navigator(-1);
    } catch (error) {
      if (error instanceof AxiosError){
        alert("회원가입 실패: " + error.response?.data.detail)
      }

    }
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
  };
  return (
    <ThemeProvider theme={theme}>
      <StyledDiv>
        <StyledSection>
          <Card title='회원 가입'>
            <StyledLayout>

            
              <InputArea  $selected={selectedInput}>
                <Styledblock idx={1} $selected={selectedInput} onClick={()=> setSelect(1)} >
                  <IconArea><MaterialSpan>person</MaterialSpan></IconArea>
                  <ReStyledInput type='text'  id='userId' name='id'  defaultText='ID' onChange={handleInputChange}/>
                </Styledblock>


                <Styledblock idx={2} $selected={selectedInput} onClick={()=> setSelect(2)}>
                  <IconArea><MaterialSpan>lock</MaterialSpan></IconArea>
                  <ReStyledInput type='password' id='userPassword' name='password'  defaultText='PASSWORD' onChange={handleInputChange}/>
                </Styledblock>

                <Styledblock idx={3} $selected={selectedInput} onClick={()=> setSelect(3)} >
                  <IconArea><MaterialSpan>badge</MaterialSpan></IconArea>
                  <ReStyledInput type='text'  id='userName' name='name'  defaultText='NAME' onChange={handleInputChange}/>
                </Styledblock>
              </InputArea>
                <Button $primary onClick={handleClick}>제출</Button>
            </StyledLayout>
          </Card>
        </StyledSection>

      </StyledDiv>
    </ThemeProvider>
  )
}

export default JoinPage