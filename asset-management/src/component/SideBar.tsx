import React from 'react'
import { styled } from 'styled-components'

const StyledSide = styled.aside`
    display:none;
    @media screen and (min-width: 1024px){
        display:inline-block;
        width:20%;
        height:100vh;
        background-color:black;    
    }
    
`
const MenuLayout = styled.div`
  background-color :white;
  width :80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: top;
`
const P = styled.p`
    position: relative;
    display: inline-block;
    &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: black;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`
const SideBar = () => {
  return (
    <StyledSide>
      <MenuLayout >
        <P>hi</P>
        <P>ppap</P>
      </MenuLayout>
    </StyledSide>
  )
}

export default SideBar