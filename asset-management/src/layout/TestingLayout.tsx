import React from 'react'
import MainLayout from './MainLayout'
import SideLayout from './SideLayout'
import styled from 'styled-components'
const TestLayout = styled.div`
    vertical-align:top;
`

const TestingLayout = () => {
  return (
    <TestLayout>
        <SideLayout />
        <MainLayout />
    </TestLayout>
    
  )
}

export default TestingLayout