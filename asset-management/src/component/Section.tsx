import React, { Children } from 'react'
import { styled } from 'styled-components'


const SectionLayout1 = styled.section`
    display:block;
    width:100%;
    height:100%;
    max-width :100%;
    max-height: 100%;
  @media screen and (min-width: 768px){
    overflow: hidden;
  }
  @media screen and (min-width: 1024px) {

  }
`
interface SectionLayoutProps {
    title ?: string;
    children?: React.ReactNode;
}
const Section : React.FC<SectionLayoutProps>= (props) => {
    const {title, children} = props;
  return (
    <SectionLayout1 >
      {children}
    </SectionLayout1>
  )
}

export default Section