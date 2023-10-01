import React from 'react'
import Card from '.';

import styled from 'styled-components';
import { Coin, MyCoin } from '../../domain/coin';
import { Stock } from '../../domain/stock';
import { Cash } from '../../domain/cash';
import Item from '../Item';
import { Price } from '../../domain/price';
import {  exchangeValue, mappingText } from '../../domain/Domain';
import { useRecoilState } from 'recoil';
import { assetsState } from '../../atom/atom';

import { Currency, CurrencyMark } from '../../domain/currency';
import { useStockPrice } from '../../query/query';
import { StockPriceAPI } from '../../api/stock';

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
  const {status,data} =  useStockPrice()
  const [assets,setAssets] = useRecoilState(assetsState)
  
  
  const mapToItem = (asset : Coin | Stock | Cash , currentPrice : StockPriceAPI[]) => {
    const {name} = asset
    const nowPrice = currentPrice.find(curPrice => curPrice.code === asset.code)
    const rightdownText = asset.currency === Currency.KRW ?  "" : exchangeValue(asset.price, 1300)
    return (
      <Item key={asset.code}
      altImageByText={asset.currency === Currency.KRW ? "국내" : "해외"}
      leftupText={name}
      rightUpText={nowPrice?.price + CurrencyMark[asset.currency]}
      rightDownText={rightdownText}
      />
    )
  }
  
  return (
    <Card title={ title + ' 현재가2'}>
      
      <H5>{title}</H5>
        <StyledUl>
          {status==='success' && assets.stocks?.map((stock) => {  
            return mapToItem(stock,data)
          })}
        </StyledUl>

    </Card>

  )
}

export default CurrentPriceCard