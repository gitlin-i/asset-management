import React from 'react'
import { styled } from 'styled-components'

const StyledSide = styled.aside`
    display:none;
    @media screen and (min-width: 1024px){
        display:inline-block;        
    }
    width:20%;
    height:calc(100vh - 56px);
    background-color: ${props => props.theme.color.background};
    padding: 1rem 0;

    
`
const MenuLayout = styled.div`
  margin: 0 0 0 2rem;
  width :80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap : 1rem;
  background-color: white;
  border-radius:1rem;
  box-shadow : ${props => props.theme["box-shadow"]};
  transition : all 0.3s ease;
  &:hover{
    box-shadow: none;
  }
  padding-top:2rem;
  
`

const StyledA = styled.a`
  display: flex;
  position: relative;
  color: ${props => props.theme.color.unactive};
  text-decoration: none;
  align-items: center;
  /* justify-content: center; */
  margin-left: 2rem;
  height:3rem;
  gap: 1rem;
  transition : all 0.3s ease;
  &:hover{
    color: ${props => props.theme.color.secondary };
  }

  &:active{
    color: ${props => props.theme.color.secondary };
    background-color:  ${props => props.theme.color.background };
    margin-left: 0;
    width: 100%;
  }
  
  &:active::before{
    background-color: ${props => props.theme.color.secondary };
    content: '';
    width:8px;
    height:29px;
    position: absolute;
    left: 0;
  }
  &:hover > span:first-child{
    transition : all 0.3s ease;
    margin-left : 0.6rem;
  }
  &:active > span:first-child{
    margin-left : 2rem;
  }
  & > span:first-child {
    font-size:1.8rem;
  }
  & > span {
    font-size:1rem;
  }

  &:last-child{

  }
`
const Icon = styled.span.attrs({className: "material-symbols-rounded" })`
  
`
const SideBar = () => {
  return (
    <StyledSide>
      <MenuLayout >
        <StyledA href='#'>
          <Icon>
            dashboard
          </Icon>
          <span>
            대시보드
          </span>
        </StyledA>
        <StyledA href='#'>
          <Icon>
            universal_currency_alt
          </Icon>
          <span>
            주식
          </span>
        </StyledA>
        <StyledA href='#'>
          <Icon>
            toll
          </Icon>
          <span>
            코인
          </span>
        </StyledA>
        <StyledA href='#'>
          <Icon>
            money
          </Icon>
          <span>
            현금
          </span>
        </StyledA>

        <StyledA href='#'>
          <Icon>
            person
          </Icon>
          <span>
            내 정보
          </span>
        </StyledA>

      </MenuLayout>
    </StyledSide>
  )
}

export default SideBar