import React from 'react'
import { styled } from 'styled-components'

const StyledSide = styled.aside`
    display:none;
    @media screen and (min-width: 1024px){
        display:inline-block;        
    }
    width:20%;
    position:relative;
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
  background-color: ${props => props.theme.color.card};
  border-radius:1rem;
  box-shadow : ${props => props.theme["box-shadow"]};
  transition : all 0.3s ease;
  &:hover{
    box-shadow: none;
  }
  padding-top:2rem;
  
  & > a:last-child {
    margin-top: auto;
    bottom: 2rem;
  }
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
  /* gap: 1rem; */
  transition : all 0.3s ease;
  &:hover{
    color: ${props => props.theme.color.primary };
  }

  &:active{
    color: ${props => props.theme.color.primary };
    background-color:  ${props => props.theme.color.background };
    margin-left: 0;
    width: 100%;
  }
  
  &:active::before{
    background-color: ${props => props.theme.color.primary };
    content: '';
    width:8px;
    height:29px;
    position: absolute;
    left: 0;
  }
  &:hover > span:first-child{
    margin-left : 0.6rem;

  }
  &:active > span:first-child{
    margin-left : 2rem;
  }
  & > span:last-child{
    margin-left: 1rem;
    font-size: 1.2rem;
  }
`
const Icon = styled.span.attrs({className: "material-symbols-rounded" })`
  font-size:2rem;
  transition : all 0.3s ease;
`
const SideBar = () => {
  const menuItemData = {
    icon: "dashboard",
    presentName: "대시보드",
    href: "#"
  }
  const menuItemData2 = {
    icon: "universal_currency_alt",
    presentName: "주식",
    href: "#"
  }
  const menuItemData3 = {
    icon: "toll",
    presentName: "코인",
    href: "#"
  }
  const menuItemData4 = {
    icon: "money",
    presentName: "현금",
    href: "#"
  }
  const menuItemData5 = {
    icon: ["arrow_Forward","account_balance_wallet"],
    presentName: "입금",
    href: "#"
  }
  const menuItemData6 = {
    icon: ["arrow_back","account_balance_wallet"],
    presentName: "출금",
    href: "#"
  }
  const menuItemData7 = {
    icon: "person",
    presentName: "내 정보",
    href: "#"
  }
  const mapToItem = (menuItem: {icon: string | Array<string> ,presentName: string , href:string}) => {
    return (
      <StyledA href={menuItem.href} key={menuItem.presentName}>
        {typeof menuItem.icon === 'string' &&
          <Icon>
            {menuItem.icon}
          </Icon>}
        { Array.isArray(menuItem.icon) && 
          menuItem.icon.map((icon) => {
            return (
            <Icon key={icon}>
              {icon}
            </Icon>)
          })
        }
        <span>{menuItem.presentName}</span>
      </StyledA>
    )
  }

  return (
    <StyledSide>
      <MenuLayout >
      {[menuItemData, menuItemData2, menuItemData3, menuItemData4,menuItemData5,menuItemData6,menuItemData7].map(mapToItem)}

      </MenuLayout>
    </StyledSide>
  )
}

export default SideBar