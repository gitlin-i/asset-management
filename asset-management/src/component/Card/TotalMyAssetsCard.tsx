

import React from 'react'
import Card from '.'
import Item from '../Item'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { assetsCurrentValue, cashCurrentValue, coinsCurrentValue, stocksCurrentValue } from '../../selector/selector'

import { Currency, CurrencyMark } from '../../domain/currency'

const StyledUl = styled.ul`
  padding :0;
  margin:0;
`
const TotalMyAssetsCard = () => {
    const assetsCurVal = useRecoilValue(assetsCurrentValue)
    const stocksCurVal = useRecoilValue(stocksCurrentValue)
    const coinsCurVal = useRecoilValue(coinsCurrentValue)
    const cashCurVal = useRecoilValue(cashCurrentValue)

  return (
    <Card title='내 자산 합계'>
        <StyledUl>
            <Item leftupText="내 총 자산" rightUpText={ assetsCurVal.toLocaleString() + CurrencyMark[Currency.KRW] } />
            <Item leftupText="주식 합계" rightUpText={ stocksCurVal.toLocaleString() + CurrencyMark[Currency.KRW]} />
            <Item leftupText="코인 합계" rightUpText={ coinsCurVal.toLocaleString() + CurrencyMark[Currency.KRW] } />
            <Item leftupText="현금 합계" rightUpText={ cashCurVal.toLocaleString() + CurrencyMark[Currency.KRW]} />
        </StyledUl>
  </Card>
  )
}

export default TotalMyAssetsCard