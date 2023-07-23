import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const StyledNav = styled.nav`
    background-color: ${props => props.theme.color.card };
    color: ${props => props.theme.color.font };
    width:100%;
    height:3rem;

    position:fixed;
    bottom: 0;
    @media screen and (min-width: ${props => props.theme.breakPoint.t}){
        display:none;
    }
`
const StyledUl = styled.ul`
    width:100%;
    height:100%;
    padding: 0.5rem;
    background-color:${props => props.theme.color.backgorund };
    display:flex;
    justify-content:center;
    align-items:center;

`
const StyledLi = styled(Link)`
    flex-grow: 1;
    display:flex;
    justify-content:center;
    text-decoration : none;
    list-style-type: none;
`
const Icon = styled.span.attrs({className: "material-symbols-rounded" })`
  font-size:2rem;
  transition : all 0.3s ease;
  color : ${props => props.theme.color.font };
`
const BottomNav = () => {
  return (
    <StyledNav>
        <StyledUl>
            <StyledLi to={"/"}>
                <Icon>dashboard</Icon>
            </StyledLi>
            <StyledLi to={"/stock"}>
                <Icon>universal_currency_alt</Icon>
            </StyledLi>
            <StyledLi to={"/person"}>
                <Icon>person</Icon>
            </StyledLi>
            <StyledLi to={"/coin"}>
                <Icon>toll</Icon>
            </StyledLi>
            <StyledLi to={"/cash"}>
                <Icon>money</Icon>
            </StyledLi>
        </StyledUl>
    </StyledNav>
  )
}

export default BottomNav