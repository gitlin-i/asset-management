import React from 'react'
import { styled } from 'styled-components'
interface CardProps {
    title ?: string;
    body ?: any;
    children ?: React.ReactNode;
}
const StyledDiv = styled.div`
    display: inline-block;
    width:100%;
    height:100%;
    background-color:white;
    border-color: gray;
    border: solid 2px;
    border-radius:0.5rem;
`

const Card2 : React.FC<CardProps> = (props) => {
    const { title, children} = props
  return (
    <StyledDiv>
        {children}
    </StyledDiv>
  )
}

export default Card2