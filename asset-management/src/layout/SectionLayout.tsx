import React, { Children } from 'react'
import { styled } from 'styled-components'
import CardLayout from './CardLayout'
import Card from '../component/Card'
import Card2 from '../component/Card2'

const SectionLayout1 = styled.section`
    background-color: #fcf5aa;
    width:100%;
    height:100%;
`
interface SectionLayoutProps {
    title ?: string;
    children?: React.ReactNode;
}
const SectionLayout : React.FC<SectionLayoutProps>= (props) => {
    const {title, children} = props;
  return (
    <SectionLayout1 >
        {children}
    </SectionLayout1>
  )
}

export default SectionLayout