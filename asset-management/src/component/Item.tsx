import React from 'react'
import styled from 'styled-components'
import { MyStock } from '../domain/stock';
import { MyCoin } from '../domain/coin';

export interface ItemProps{
    image ?: string;
    leftupText ?:string | number;
    leftdownText?:string | number;
    rightUpText ?: string | number;
    rightDownText ?: string | number;
    altImageByText ?: string;
    $imageRadius ?: string | number;
}
const StyledItem = styled.li`
    list-style : none;
    height:100%;
    min-height:2rem;
    border-radius: 1rem;
    &:hover{
        background-color: #e6e6e6;
    }
    padding: 0.5rem;
    overflow:hidden;
    position:relative;
    display:flex;
    justify-content: space-between;

`
const ImageLayout = styled.div<ItemProps>`
    display:inline-block;
    width:3rem;
    height: 3rem;
    border-radius : ${props => props.$imageRadius ? props.$imageRadius : "50%"};
    overflow:hidden;
    position:relative;
    padding: 0;

`
const StyledImg = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const StyledText = styled.div`
    background-color: green;
    color: white;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:center;
    align-items:center;
    
`
const TextBox = styled.div`
    height: 3rem;
    display: inline-flex;
    flex-direction:column;
    justify-content:space-between;
    vertical-align:top;
    margin-left:0.5rem;
`
const UpText = styled.span`
    display:inline-block;
    position:relative;
    margin: 0;
    max-width: 5rem;
    max-height:24px;
    
    white-space: nowrap; 
    overflow-x:hidden;
    text-overflow: ellipsis; 

    @media screen and (min-width: ${props => props.theme.breakPoint.mm }) {
        max-width: 7rem;
    }
    @media screen and (min-width: ${props => props.theme.breakPoint.ml }) {
        max-width: 12rem;
    }
    @media screen and (min-width: calc(${props => props.theme.breakPoint.ml } + 100px) ) {
        max-width: 18rem;
    }
    @media screen and (min-width: 625px ) {
        max-width: 25rem;
    }
    @media screen and (min-width: ${props => props.theme.breakPoint.t } ) {
        max-width: 12rem;
    }
    @media screen and (min-width: calc( ${props => props.theme.breakPoint.t } + 150px) ) {
        max-width: 15rem;
    }
    @media screen and (min-width: ${props => props.theme.breakPoint.l } ) {
        max-width: 12rem;
    }
    @media screen and (min-width: calc( ${props => props.theme.breakPoint.l } + 150px) ) {
        max-width: 15rem;
    }
    @media screen and (min-width: calc( ${props => props.theme.breakPoint.l } + 300px) ) {
        max-width: 22rem;
    }
    @media screen and (min-width:  calc(${props => props.theme.breakPoint.ll}) ) {
        max-width: 12rem;
    }
    @media screen and (min-width: calc( ${props => props.theme.breakPoint.ll } + 150px) ) {
        max-width: 15rem;
    }
    @media screen and (min-width: calc( ${props => props.theme.breakPoint.ll } + 350px) ) {
        max-width: 18rem;
    }
    @media screen and (min-width: calc( ${props => props.theme.breakPoint.ll } + 500px) ) {
        max-width: 20rem;
    }
    @media screen and (min-width: calc( ${props => props.theme.breakPoint.ll } + 800px) ) {
        max-width: 25rem;
    }

`
const DownText = styled.span`
    display: inline-block;
    position: relative;
    font-size:12px;
    max-height:16px;
    margin: 0;
    
` 

const Left = styled.div`
    height: 3rem;
    margin-left:1rem;
`
const Right = styled(Left)`
    margin:0;
    position:relative;
    right:2rem;
    text-align:right;

`

const Item : React.FC<ItemProps> = (props) => {
    const {image,leftdownText,leftupText,
      rightUpText, rightDownText, altImageByText,$imageRadius: imageRadius,
    } = props
  return (
    <StyledItem>
        <Left>
            {image &&
            <ImageLayout $imageRadius={imageRadius}>
                <StyledImg src={image} />
            </ImageLayout>}
            {!image && altImageByText &&
                <ImageLayout>
                    <StyledText>{altImageByText}</StyledText>
                </ImageLayout>}
                
            <TextBox>
                <UpText>{leftupText}</UpText>
                <DownText>{leftdownText}</DownText>
            </TextBox>
        </Left>
        <Right>
            <TextBox>
                <UpText>{rightUpText}</UpText>
                <DownText>{rightDownText}</DownText>
            </TextBox>
        </Right>
    </StyledItem>
  )
}

export default Item