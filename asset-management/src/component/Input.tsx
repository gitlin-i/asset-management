import React, { useRef, useState } from 'react'
import styled from 'styled-components';

interface InputProps {
  isEditing ?: boolean;
  defaultText ?: string;
  type?: string
  $responsive ?: boolean;
  readOnly ?: boolean;
  setValue ?: string | number;
  id ?: any;
  name ?: any;
  onChange ?: React.ChangeEventHandler
}
const StyledInput = styled.input<InputProps>`
  outline: none;
  width: ${props => props.$responsive ? "" : "unset"};
  height:2rem;
  border-top:none;
  border-left: none;
  border-right:none;
  border-bottom : 2px solid ${props => props.theme.color.underbar };
  background-color: ${props => props.theme.color.card };
  color : ${props => props.theme.color.font };
`
const Input :React.FC<InputProps> = (props) => {
  const {isEditing, defaultText, type, $responsive,readOnly,setValue,id,name, onChange ,...args} = props
  
  return (
    
      <StyledInput type={type}
      isEditing= {isEditing}
      placeholder={defaultText ? defaultText :'내용을 입력해주세요.'}
      $responsive={$responsive}
      readOnly={readOnly}
      value={setValue}
      id={id}
      name={name}
      onChange={onChange}
      {...args}
      />

    

  )
}

export default Input