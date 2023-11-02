import React from 'react'
import Card from '.'
import { useMyStock, useMyStockCurrentValue } from '../../query/stock'

const TestingCard = () => {
  const stockCurValue = useMyStockCurrentValue()
  const stocks= useMyStock()
  console.log("TestingCard렌더")
  return (
    <Card title='테스트'>
        테스트
        {stockCurValue}
        {stocks && stocks.map(stocks => stocks.code)}
    </Card>
  )
}

export default TestingCard