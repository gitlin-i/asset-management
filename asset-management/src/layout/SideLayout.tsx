import React from 'react'
import { styled } from 'styled-components'

const SideLayout1 = styled.aside`
    display:none;
    @media screen and (min-width: 1024px){
        display:inline-block;
        width:20%;
        height:100vh;
        background-color:black;    
    }
    

`
const SideLayout = () => {
  return (
    <SideLayout1 />
  )
}

export default SideLayout