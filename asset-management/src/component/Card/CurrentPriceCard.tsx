import React from 'react'
import Card from '.';

import styled from 'styled-components';
import { Coin, MyCoin } from '../../domain/coin';
import { Stock } from '../../domain/stock';
import { Cash } from '../../domain/cash';
import Item from '../Item';
import { Price } from '../../domain/price';
import {  exchangeValue, mappingText } from '../../domain/domain';
import { useRecoilState } from 'recoil';
import { assetsState } from '../../atom/atom';

import { Currency, CurrencyMark } from '../../domain/currency';

import { StockPriceAPI } from '../../api/stock';
import { useMyStock, useMyStockPrice } from '../../query/stock';
import { useExchangeRate } from '../../query/exchangeRate';
import { useMyCoin } from '../../query/coin';
import { useMyCash } from '../../query/cash';

interface CurrentPriceCardProps {
  category ?: "stocks" | "coins" | "cash"
}
const H5 = styled.h5`
  padding: 0.5rem;
  padding-left: 1rem;
`
const StyledUl = styled.ul`
  padding :0;
  margin:0;
`

const CurrentPriceCard : React.FC<CurrentPriceCardProps> = (props) => {
  const { category } = props
  const title = mappingText(category)
  // const {status,data} =  useMyStockPrice()
  const stocks = useMyStock()
  const coins = useMyCoin()
  const cash = useMyCash()
  const exchange = useExchangeRate(["USD",
  "JPY(100)",
  "EUR",
  "CNH"])
  
  const mapToItem = (asset : Coin | Stock | Cash ) => {
    const {name} = asset
    const targetExchange = exchange.data?.output.find(ex => ex.currency === asset.currency)
    const rightdownText = asset.currency === Currency.KRW ?  "" : exchangeValue(asset.price,targetExchange?.base_rate!).toLocaleString() + CurrencyMark[Currency.KRW]
    return (
      <Item key={asset.code}
      altImageByText={asset.currency === Currency.KRW ? "국내" : "해외"}
      leftupText={name}
      rightUpText={asset.price.toLocaleString() + CurrencyMark[asset.currency]}
      rightDownText={rightdownText}
      />
    )
  }
  
  return (
    <Card title={ title + ' 현재가'}>
      
      <H5>{title}</H5>
        <StyledUl>
          {category === 'stocks' && stocks?.map((stock) => {  
            return mapToItem(stock)
          })}
          {category === 'coins' && coins?.map((coin) => {  
            return mapToItem(coin)
          })}
          {category === 'cash' && cash?.map((c) => {  
            return mapToItem(c)
          })}
        </StyledUl>

    </Card>

  )
}

export default CurrentPriceCard