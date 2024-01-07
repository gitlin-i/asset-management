import React, { useEffect, useState } from 'react'
import { useMyAssets } from '../../query/assets'
import { useUserInfo } from '../../query/user'


const TestingPage = () => {
  const {data} = useUserInfo()
  return (
    <div>TestingPage
      <div>hi</div>
      {/* <div>{myStock && myStock?.output.toString()}</div> */}
      {data?.id}
      
    </div>

  )
}

export default TestingPage