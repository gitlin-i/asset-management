import React, { useState } from 'react'
import { keyframes, styled } from 'styled-components'
import ThemeChangeButton from './ThemeChangeButton'
const StyledNav = styled.nav`
  width:100%;
  height: 56px;
  background-color: ${props => props.theme.color.background};
  display: flex;
  padding:0.5rem 1rem 0 2rem;
  color: ${props => props.theme.color.font};
`
const Area = styled.div`
  width:100%;
  height:100%;
`

const LeftArea = styled(Area)`
  flex-grow:1;
  flex-shrink:1;
  display: flex;
  align-items: center;
`

const StyledA = styled.a`
  display: inline-flex;
  align-items: center;
  /* background-color:red; */
  gap:1rem;
  font-size: 1.5rem;
  text-decoration: none;
  color: ${props => props.theme.color.font};
  &:hover {
    background-color: ${props => props.theme.color.background};
  }

  & > span:first-child {
    margin-left: 1rem;
    font-size: 2rem;
  }

`
const MiddleArea = styled(Area)`
  flex-grow:1;
  flex-shrink:1.25;
  background-color:orange;
  @media screen and (max-width: 768px){
    display: none;
  }
`
const RightArea = styled(Area)`
  flex-grow:1;
  flex-shrink:1;
  display:flex;
  flex-direction: row-reverse;
  align-items: center;

`
const Icon = styled.span.attrs({className: "material-symbols-rounded" })`

`
const AccountIcon = styled.button.attrs({className: "material-symbols-rounded"})`
  display: inline-flex;
  padding: 0;
  margin: 0;
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.font};
  font-size: 40px;
  justify-content:center;
  align-items: center;
  border: none;
  width: 40px;
  height: 40px;
  border-radius:1rem;

  &:hover{
    background-color: ${props => props.theme.color.shadow};
  }
`
const AccountInfo = styled.span`
  margin-right:1rem;
  @media screen and (max-width: 550px){
    display:none;
  }
`
const moveAnimaition = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(16px);
    opacity: 0;
  }

`
interface animate {
  $ani: boolean;
}
const LightAndDarkIcon =styled.button.attrs({className: "material-symbols-rounded" })<animate>`
  margin-right:1rem;
  font-size: 2rem;
  background-color: ${props => props.theme.color.background};
  border: none;
  &:hover{
    background-color: ${props => props.theme.color.shadow};
  }
  border-radius: 1rem;

  animation: ${props => props.$ani ? moveAnimaition : ""} 1s ease ; 

`


const Header : React.FC = () => {

  const [isDark, setDark] = useState(false)
  const [isAnimation, setAnimation] = useState(false)
  const handleClick = () => {
    console.log("애니메이션 재생")
    setAnimation(true)
    setTimeout(() => {
      setDark(!isDark)
      setAnimation(false)
      console.log("애니메이션 끝")

    },800)
    
  }
  const lightOrDark = () => {
      if(isDark) {
        return "dark_mode"
      }
      return "light_mode"
    }

  return (
    <StyledNav>
      <LeftArea>
        <StyledA href='#'>
          <Icon>
            account_balance
          </Icon>
          <span>자산 관리</span>
        </StyledA>
      </LeftArea>

      <MiddleArea>
        페이지 제목
      </MiddleArea>


      <RightArea>


        <AccountIcon>
          account_circle
        </AccountIcon>

        <AccountInfo>
          hello! Kim.
        </AccountInfo>
        
        <ThemeChangeButton />
      </RightArea>
    </StyledNav>
  )
}

export default Header