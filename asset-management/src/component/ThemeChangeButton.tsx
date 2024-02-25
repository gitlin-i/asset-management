import _ from 'lodash';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { themeState } from '../atom/atom';
import { darkTheme, lightTheme } from '../theme';


interface Animate {
    $ani: boolean;
  }
const moveAnimaition = keyframes`
    0% {
    transform: translateY(0);
    }
    100% {
    transform: translateY(1rem);
    opacity: 0;
    }

`
  const LightAndDarkIconButton =styled.button.attrs({className: "material-symbols-rounded" })<Animate>`
    margin-right:1rem;
    font-size: 2rem;
    background-color: ${props => props.theme.color.background};
    border: none;
    &:hover{
      background-color: ${props =>  props.$ani ? "" : props.theme.color.shadow};
    }
    border-radius: 1rem;
    color: ${props => props.theme.color.font};
    
    animation: ${props => props.$ani ? moveAnimaition : ""} 1s ease ; 
  
  `

const ThemeChangeButton = () => {

  const [theme, setTheme] = useRecoilState(themeState)
  const [isAnimation, setAnimation] = useState(false)
  
  const handleClick = _.throttle(() => {
    console.log("클릭")
    setAnimation(true)
    setTimeout(() => {
      let newTheme = darkTheme
      if (theme.name === "dark") {
        newTheme = lightTheme
      }
      setTheme(newTheme)
      setAnimation(false)
    },800)
  },1500)

  const lightOrDarkIcon = () => {
      if(theme.name === "dark") {
        return "dark_mode"
      }
      return "light_mode"
  }

  return (
    <LightAndDarkIconButton onClick={handleClick} $ani={isAnimation}>
        {lightOrDarkIcon()}
    </LightAndDarkIconButton>
  )
}

export default ThemeChangeButton