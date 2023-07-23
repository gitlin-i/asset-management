import React from 'react'
import Card from '.';
import { changeDataToItem } from '../../utill/NivoPieChart';
import styled from 'styled-components';
import { Coin, MyCoin } from '../../domain/coin';
import { Stock } from '../../domain/stock';
import { Cash } from '../../domain/cash';
import Item from '../Item';
import { Price } from '../../domain/price';
import { Currency, exchangeValue, mappingText } from '../../domain/Domain';
import { useRecoilState } from 'recoil';
import { assetsState } from '../../atom/atom';

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
  const newPriceArray = [{code:"qwer", price: 1234}]
  const [assets,setAssets] = useRecoilState(assetsState)
  
  const mapToItem = (asset : Coin | Stock | Cash , currentPrice : Price) => {
    const {name} = asset
    const rightdownText = asset.currency === Currency.KRW ?  "" : exchangeValue(asset.price, 1300)
    return (
      <Item
      leftupText={name}
      rightUpText={currentPrice.value}
      rightDownText={rightdownText}
      />
    )
  }
  
  return (
    <Card title={ title + '현재가'}>
      
      <H5>{title}</H5>
        <StyledUl>
          {assets.stocks?.map(changeDataToItem)}
        </StyledUl>

        <H5>{title}</H5>
        <StyledUl>
          {assets.coins?.map(changeDataToItem)}
        </StyledUl>

        <H5>{title}</H5>
        <StyledUl>
          {assets.cash?.map(changeDataToItem)}
        </StyledUl>
      
    </Card>

  )
}

export default CurrentPriceCard