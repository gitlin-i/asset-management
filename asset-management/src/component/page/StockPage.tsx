
import { styled } from 'styled-components'

import {  testTargetRatios } from '../../domain/Domain'
import {  changeDataToItem } from '../../utill/NivoPieChart'
import AssetsInput from '../AssetsInput'
import Section from '../Section'
import Card from '../Card'
import { useRecoilState, useRecoilValue } from 'recoil'
import { assetsState,  targetRatioState } from '../../atom/atom'
import {  assetsRatio, stocksRatio } from '../../selector/selector'

import RatioChartCard from '../Card/RatioChartCard'
import { useEffect } from 'react'

import {  useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom';

import TotalMyStocksCard from '../Card/TotalMyStocksCard'
import CurrentPriceCard from '../Card/CurrentPriceCard'

import { MyStock } from '../../domain/stock'
import { StockMarket } from '../../domain/market'
import { Cash } from '../../domain/cash'
import { MyCoin } from '../../domain/coin'
import { Currency } from '../../domain/currency'
import { MyStockAPI, StockInfoAPI, StockPriceAPI } from '../../api/stock'
import { useMyAssets, useStockInfo, useStockPrice } from '../../query/query'


const StyledMain = styled.main`
  display:flex;
  flex-direction: column;
  align-items:center;
  row-gap: 1rem;
  width: 100%;
  height:100%;
  background-color: ${props => props.theme.color.background};
  vertical-align:top;
  padding:1rem;
//768px
  @media screen and (min-width: ${props => props.theme.breakPoint.t}){

    display: grid;
    height:calc(100vh - 56px);
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
  }
  @media screen and (min-width: ${props => props.theme.breakPoint.l }) {
    display:inline-grid;
    width:80%;
  }
  @media screen and ( min-width: ${props => props.theme.breakPoint.ll }){
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3,1fr);

  }
`
const StyledDiv = styled.div`
  display: inline-block;
  width: 240px;
  height:200px;
  &:hover {
    background-color:#efefef;
  }
  border-radius:1rem;
`
const StyledP = styled.p`
  width: 100%;
  overflow: hidden; 
  text-overflow: ellipsis;
`
const H5 = styled.h5`
  padding: 0.5rem;
  padding-left: 1rem;
`
const StyledUl = styled.ul`
  padding :0;
  margin:0;
`

const marketToCurrnecy: {[key: string] : Currency} = {
  KRX: Currency.KRW,
  NAS: Currency.USD,
  AMS: Currency.USD,
  TSE: Currency.JPY
}
const factory = (myStock : MyStockAPI, stockPrice: StockPriceAPI, stockInfo : StockInfoAPI) => {
  if (!(myStock.code === stockPrice.code && stockPrice.code === stockInfo.code)) {
    throw new Error("assets code error")
  }
  return new MyStock(myStock.code,myStock.market as StockMarket,stockInfo.name,stockPrice.price,marketToCurrnecy[myStock.market],myStock.quantity,myStock.average_purchase_price)
}
////////////
const StockPage : React.FC = (props) => {
  
  
  const [assets,setAssets] = useRecoilState(assetsState)
  const [targetRatios, setTargetRatios] = useRecoilState(targetRatioState)
  const stocksCurRatio = useRecoilValue(stocksRatio)
  const {data:myStocks} = useMyAssets("stock")
  const {data:myCoin} = useMyAssets("coin")
  const {data:myCash} = useMyAssets("cash")

  const {data:stockInfo}  = useStockInfo()
  const {data:stockPrice} = useStockPrice()
  // const {data: stockPrice} = useStockPrice()
  // const {data: coinPrice} = useCoinPrice()
  // const { data: user } = useQuery({
  //   queryKey: ['user', email],
  //   queryFn: getUserByEmail,
  // })
  const {status,data:stockPriceData} =  useStockPrice()
  
  ///

  /// 
  // useEffect(()=> {
  //   if (myCoinData?.output && isArrayOfType(myCoinData.output,isMyCoin2)){
  //     setAssets((prev) => {
  //       const mappedCoins = myCoinData.output.map((coin) => {
  //         return new MyCoin(coin.code,"코인",price, Currency.KRW,coin.quantity,coin.averagePurchasePrice )
  //       })
  //       return {
  //         ...prev,
  //         coins: []
  //       }
  //     })
  //   }
  // },[myCoinData])
  // useEffect(()=> {
  //   if(myCashData?.output && isArrayOfType(myCashData?.output,isMyCash2) ){
  //     const mappedCash = myCashData.output.map((cash : MyCash2) => {
  //       return new Cash(cash.balance, cash.currency as Currency)
  //     })
  //     setAssets((prev) => {
  //       return {
  //         ...prev,
  //         cash: [...mappedCash]
  //       }
  //     })
  //   }
  // },[myCashData])

  // useEffect(()=> {
  //   if(myStocksData?.output && isArrayOfType(myStocksData?.output,isMyStock2) ){
      
  //     const mappedStock = myStocksData.output.map((stock : MyStock2) => {
  //       const foundStock = stockInfo?.find((stockinfo) => stockinfo.code === stock.code)
  //       const foundStock2 = stockPrice?.find((stockprice) => stockprice.code === stock.code)
  //       return factory(stock,foundStock2!,foundStock!)
  //     })
  //     setAssets((prev) => {
  //       return {
  //         ...prev,
  //         stocks: [...mappedStock]
  //       }
  //     })
  //   }
  // },[myStocksData])

  useEffect(()=>{
    setTargetRatios((prev)=> ({
      ...testTargetRatios
    }))
  },[])
  
  return (
    <StyledMain>

      <Section>
        <TotalMyStocksCard /> 
      </Section>

      <Section>
        <RatioChartCard title={"목표 비율"} ratios={targetRatios.stocks} />
      </Section>

      <Section>
        <RatioChartCard title={"현재 비율"} ratios={stocksCurRatio} />
      </Section>
      <Section>
        <CurrentPriceCard category='stocks' />
      </Section>

      <Section>
        <Card title='자산 현재가'>
            <H5>주식</H5>
            <StyledUl>
              {assets.stocks?.map(changeDataToItem)}
            </StyledUl>
            <H5>코인</H5>
            <StyledUl>
              {assets.coins?.map(changeDataToItem)}
            </StyledUl>
        </Card>
      </Section>

      <Section >
        <Card title='자산 C,U'>
        <AssetsInput />
        </Card>
      </Section>

      <Section>
        <Card title='테스트용'>
          {JSON.stringify(myStocks?.output)}
          {JSON.stringify(myCash?.output)}
          {JSON.stringify(myCoin?.output)}
          {JSON.stringify(stockInfo)}
          {JSON.stringify(stockPrice)}
        </Card>
      </Section>
    </StyledMain>
  )
}

export default StockPage