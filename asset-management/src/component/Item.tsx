import React from 'react'
import styled from 'styled-components'
import { MyStock } from '../domain/stock';
import { MyCoin } from '../domain/coin';

export interface ItemProps{
    image ?: string;
    leftupText ?:string | number;
    leftdownText?:string | number;
    rightmiddleText?: string | number;
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
const ImageLayout = styled.div`
    display:inline-block;
    width:3rem;
    height: 3rem;
    border-radius : 50%;
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

const UpText = styled.h5`
    display:inline-block;
    position:relative;
    margin: 0;
    max-height:18px;
`
const DownText = styled.p`
    display: inline-block;
    position: relative;
    font-size:12px;
    max-height:16px;
    margin: 0;
    
` 
const MiddleText = styled.p`
    display:inline-block;
    position:relative;
    margin: 0;
    max-height:18px;
    
`
const Left = styled.div`
    height: 3rem;
    margin-left:1rem;
`
const Right = styled(Left)`
    margin:0;
    position:relative;
    right:2rem;

`
const TextBox = styled.div`
    height: 3rem;
    display: inline-flex;
    flex-direction:column;
    justify-content:space-between;
    vertical-align:top;
    margin-left:0.5rem;
`
const Item : React.FC<ItemProps> = (props) => {
    const {image,leftdownText,leftupText,rightmiddleText} = props
  return (
    <StyledItem>
        <Left>
            {image &&
            <ImageLayout>
                <StyledImg src={image} />
            </ImageLayout>}
            <TextBox>
                <UpText>{leftupText}</UpText>
                <DownText>{leftdownText}</DownText>
            </TextBox>
        </Left>
        <Right>
            <MiddleText>{rightmiddleText}</MiddleText>
        </Right>
    </StyledItem>
  )
}

export default Item