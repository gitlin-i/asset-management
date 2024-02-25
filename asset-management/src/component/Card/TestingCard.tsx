import { useEffect, useState } from 'react'
import Card from '.'

const TestingCard = () => {
  const [count, setCount] = useState(0)
  console.log("TestingCard렌더!", count)
  useEffect(()=>{
   setCount(1) 
  })
  return (
    <Card title='테스트'>
        테스트

    </Card>
  )
}

export default TestingCard