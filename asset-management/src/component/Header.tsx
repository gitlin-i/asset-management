import React from 'react'
import { styled } from 'styled-components'
const StyledNav = styled.nav`
  width:100%;
  height: 3rem;
  background-color: ${props => props.theme.color.background};
  display: flex;
  padding:0.5rem 1rem 0 2rem;
`
const Area = styled.div`
  width:100%;
  height:100%;
`

const LeftArea = styled(Area)`
  flex-grow:1;
  flex-shrink:1;

`
const StyledA = styled.a`
  display: inline-flex;
  align-items: center;
  /* background-color:red; */
  gap:1rem;
  font-size: 1.5rem;
  color: black;
  &:hover {
    color: black;
  }
  text-decoration: none;
  & > span:first-child {
    margin-left: 1rem;
    font-size: 2rem;
  }

`
const MiddleArea = styled(Area)`
  flex-grow:1;
  flex-shrink:1.25;
  background-color:orange;
`
const RightArea = styled(Area)`
  flex-grow:1;
  flex-shrink:1;
  background-color:blue;
`
const Icon = styled.span.attrs({className: "material-symbols-rounded" })`
  
`
const Header : React.FC = () => {

  return (
    <StyledNav>
      <LeftArea>
        <StyledA href='#'>
          <Icon>
            account_balance
          </Icon>
          <span>자산 관리</span>
        </StyledA>

      </LeftArea>
      <MiddleArea>
        페이지 제목
      </MiddleArea>
      <RightArea>
        <Icon>
          settings
        </Icon>
        <Icon>
          light_mode
        </Icon>
        <Icon>
          account_circle
        </Icon>

      </RightArea>
    </StyledNav>
  )
}

export default Header