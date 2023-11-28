import React from 'react'
import { styled } from 'styled-components'


const SectionLayout = styled.section`
    display:block;
    width:100%;
    height:100%;
    max-width :100%;
    max-height: 100%;
  @media screen and (min-width: 768px){
    overflow: hidden;
  }

`
interface SectionLayoutProps {
    title ?: string;
    children?: React.ReactNode;
}
const Section : React.FC<SectionLayoutProps>= (props) => {
    const { children} = props;
  return (
    <SectionLayout >
      {children}
    </SectionLayout>
  )
}

export default Section