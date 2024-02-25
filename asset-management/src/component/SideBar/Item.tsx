import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

interface SideBarItem {
  icon: string | Array<string> ;
  presentName: string;
  href : string;
  onClick ?: () => void;
  $selected ?: boolean;
}
const defaultMarginLeft = '2rem'
const moveXoffset = '1rem';

const StyledLink = styled(Link)<{ $selected ?: boolean;}>`
  
  display: flex;
  position: relative;
  color: ${props => props.$selected ? props.theme.color.primary : props.theme.color.unactive };
  text-decoration: none;
  align-items: center;
  margin-left: ${props => props.$selected ? "0" : defaultMarginLeft };
  height:3rem;
  transition : all 0.3s ease;

  & > span:first-child {
    margin-left : ${props => props.$selected ? defaultMarginLeft: "0"};
  }
  &:hover{
    color: ${props => props.theme.color.primary };
  }
  &:hover > span:first-child{
    margin-left : ${props => props.$selected ? defaultMarginLeft : moveXoffset};
  }
  &:active{
    color: ${props => props.theme.color.primary };
    background-color:  ${props => props.theme.color.background };
    margin-left: 0;
    width: 100%;
  }
  &:active > span:first-child {
    margin-left: calc(${defaultMarginLeft} + ${moveXoffset});
  }
  &:active::before{
    background-color: ${props => props.theme.color.primary };
    content: '';
    width:8px;
    height:29px;
    position: absolute;
    left: 0;
  }
  &::before{
    display: ${props => props.$selected ? "" : "none"};
    background-color: ${props => props.theme.color.primary };
    content: '';
    width:8px;
    height:29px;
    position: absolute;
    left: 0;
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

const Item : React.FC<SideBarItem> = (props) => {
  const { href,icon,presentName, $selected} = props
  
  return (
    <StyledLink to={href} $selected={$selected} >
      { Array.isArray(icon) ? 
        icon.map((icon : string) => {
            return (
            <Icon key={icon}>
              {icon}
            </Icon>)
          }
        ) : (
        <Icon>
          {icon}
        </Icon>
        ) 
      }
      <span>{presentName}</span>
    </StyledLink>
  )
}

export default Item