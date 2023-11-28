import React from 'react'
import { styled } from 'styled-components'
import Item from './Item'
import { useLocation } from 'react-router-dom'

const StyledSide = styled.aside`
    display:none;
    @media screen and (min-width: ${props => props.theme.breakPoint.t }){
        display:inline-block;        
        width:30%;

    }
    @media screen and (min-width: ${props => props.theme.breakPoint.l }){
        display:inline-block;   
        width:20%;
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

const setting = {
  icon: "donut_large",
  presentName: "설정",
  href: "/setting"
}
const menu = [dashboard, stock, coin, cash,setting]


const SideBar : React.FC = () => {
  
  const location  = useLocation()
  const mapToItem = ( menu : SideBarItem) => {
    if (location.pathname === menu.href){
      return <Item key={menu.presentName} {...menu} $selected  />
    }
    return ( 
      <Item key={menu.presentName} {...menu} />
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