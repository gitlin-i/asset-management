import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: (e:React.MouseEvent) => void;
  children?:React.ReactNode;
  disabled?: boolean;
  $primary?: boolean;
  $secondary? : boolean;
  type ?: "submit"|undefined;
  form ?: string;
}

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  background-color: ${props => props.$primary ? "#038cfc" : "white" };
  font-size: 1rem;
  color: ${props => props.$primary ? "white" : "#18a8b8"};
  border: ${props => props.$secondary? "solid":"none"};
  border-color: ${props => props.$secondary? "#18a8b8": "white" };
  border-radius: 1rem;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0px 6px 10px #e3e1e1;
  }

  /* &:active {
    transform: translateY(0.5rem);
  } */

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

`;


const Button :React.FC<ButtonProps> = (props) => {
  const {children,...args} = props;
    return (
      <StyledButton {...args}>
       {children}
      </StyledButton>
    )
}

export default Button