import { title } from 'process';
import React, { Children } from 'react'
import { styled } from 'styled-components'
interface CardProps {
    title ?: string;
    body ?: any;
    children ?: React.ReactNode;
    color ?: string;
    titleButton ?: { 
      [content:string] : React.ReactElement
    }[];
    titleRightText ?: string;
}
const StyledDiv = styled.div<CardProps>`
    width: 100%;
    height: 100%;
    max-height:100%;
    background-color:${(props) => props.color || "white" };
    border-radius:1rem;
    display:flex;
    flex-direction:column;
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); */
    /* &:hover{
    background-color: #e6e6e6;
  } */

`
const StyledHeader = styled.header<{$titleButton: boolean; $titleRightText : boolean;}>`
  border-radius : 0.5rem 0.5rem 0 0 ;
  /* border-bottom: solid 2px gray; */
  width:100%;
  height:3rem;

  padding: 0.5rem;
  padding-left: 1.5rem;
  margin: 0;
  font-weight: bold;
  font-size:20px;
  display: flex;
  align-items: center;
  margin-bottom:1rem;
  justify-content: ${props => props.$titleButton || props.$titleRightText ? "space-between" : ""};

  
`
const StyledSpan = styled.span`
  display:inline-flex;
  align-items:center;
  justify-content:end;
  height:100%;
  font-size:14px;
`
const StyledBody = styled.div<CardProps>`
  
  overflow: auto;
  
  &::-webkit-scrollbar-track {
    border-radius: 0.125rem;
    background-color: white;
    
  }
  &::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 0.125rem;

  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.125rem;
    background-color: gray;
  }

`


const Card : React.FC<CardProps> = (props) => {
    const { title,  titleButton ,titleRightText ,children ,...rest} = props
    const includeTitleButton : boolean =  (typeof titleButton !== 'undefined' && titleButton.length > 0)
    const includeTitleRightText : boolean = !!titleRightText
  return (
    <StyledDiv {...rest}  >
     {title &&
      <StyledHeader $titleRightText={includeTitleRightText} $titleButton={includeTitleButton} >
        {title}
        {titleButton && 
        <StyledSpan>
        {titleButton.map((button) =>{
          return (button.content)
        })}
        </StyledSpan>
        }
        {titleRightText && 
        <StyledSpan>
        {titleRightText}
        </StyledSpan>}
      </StyledHeader> }

      <StyledBody>
        {children}  
      </StyledBody>
        
    </StyledDiv>
  )
}

export default Card

