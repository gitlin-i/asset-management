import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Item from './Item'
import { useLocation, useParams } from 'react-router-dom'

const StyledSide = styled.aside`
    display:none;
    @media screen and (min-width: 1024px){
        display:inline-block;        
    }
    width:20%;
    position:relative;
    height:calc(100vh - 56px);
    background-color: ${props => props.theme.color.background};
    padding: 2rem 0;
`
const MenuLayout = styled.ul`
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
  padding-left : 0%;
  & > a:last-child {
    margin-top: auto;
    bottom: 2rem;
  }
`

interface SideBarItem {
  icon: string | Array<string> ;
  presentName: string;
  href : string;
}
const dashboard : SideBarItem = {
  icon: "dashboard",
  presentName: "대시보드",
  href: "/"
}
const stock = {
  icon: "universal_currency_alt",
  presentName: "주식",
  href: "/stock"
}
const coin = {
  icon: "toll",
  presentName: "코인",
  href: "/coin"
}
const cash = {
  icon: "money",
  presentName: "현금",
  href: "/cash"
}
const deposit = {
  icon: ["arrow_Forward","account_balance_wallet"],
  presentName: "입금",
  href: "/deposit"
}
const withdraw = {
  icon: ["arrow_back","account_balance_wallet"],
  presentName: "출금",
  href: "/withdraw"
}
const myInfo = {
  icon: "person",
  presentName: "내 정보",
  href: "/myinfo"
}
const menu = [dashboard, stock, coin, cash,deposit,withdraw,myInfo]


const SideBar : React.FC = () => {
  // const [selectedMenu, setSelectedMenu] = useState("/")
  const location  = useLocation()
  // useEffect(()=> {
  //   setSelectedMenu(location.pathname)
  // },[location])
  const mapToItem = ( menu : SideBarItem) => {
    
    const handleClick = () => {
      // setSelectedMenu(menu.href)
    }

    if (location.pathname === menu.href){
      return <Item key={menu.presentName} {...menu} $selected onClick={handleClick} />
    }

    return ( 
      <Item key={menu.presentName} {...menu} onClick={handleClick} />
    )
  }

  return (
    <StyledSide>
      <MenuLayout >
        {menu.map(mapToItem)}
      </MenuLayout>
    </StyledSide>
  )
}

export default SideBar