import React, { useEffect, useState } from 'react'

const TestingPage = () => {

    const [state,setState] = useState(0)
    console.log("state",state)
    useEffect(() => {
        
        setState(1)
        return () => {
            console.log(state)
        }
    },[state])
  return (
    <div>TestingPage</div>
  )
}

export default TestingPage