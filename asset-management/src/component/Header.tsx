import React from 'react'
import { styled } from 'styled-components'
import ThemeChangeButton from './ThemeChangeButton'
import { useRecoilState, useRecoilValue } from 'recoil'
import { loginState, modalState } from '../atom/atom'
import { useUserInfo } from '../query/user'
import Button from './Button'
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
const IconButton = styled.button.attrs({className: "material-symbols-rounded"})`
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


const Header : React.FC = () => {

  const [modal, setModal] = useRecoilState(modalState)
  const {data, status} = useUserInfo()
  const [islogined,setLogin] = useRecoilState(loginState)
  const handleClick = () => {
    setModal((prev)=>({
    ...prev,
    isModalOpen: true,
    title: "로그인",
    content: "login",
  }))}
  const handleLogoutClick = () => {
    const name = "session_id"
    document.cookie = name +  '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setLogin(false)
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


      <RightArea>

        {islogined ? 
        <IconButton onClick={handleLogoutClick}>
          logout
        </IconButton> : 
        <IconButton onClick={handleClick}>
          account_circle
        </IconButton> }

        
          {status === 'success' ? 
          <AccountInfo>
          {`hello! ${data.name}`}
          </AccountInfo> :``}
        
        
        <ThemeChangeButton />
      </RightArea>
    </StyledNav>
  )
}

export default Header