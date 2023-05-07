import React from 'react'
import Table from './Table'
import { Assets, MyStock, Stock, calcAssetsPercentage, getAssetsCurrentValue } from '../domain/Domain'
import PieChart2 from './PieChart2'


const Body : React.FC = () => {
  const someStock1 : MyStock = {
    code: '0101001',
    price: 12222,
    name: '어떤 주식1',
    market: 'KOSPI',
    country: 'KO',
    quantity: 31
  }
  const someStock2 : MyStock = {
    code: '0101002',
    price: 12232,
    name: '어떤 주식2',
    market: 'KOSPI',
    country: 'KO',
    quantity: 3,
    averagePurchasePrice: 7000,
  }
  const myAssets : Assets= {
    stocks: [
      someStock1,
      someStock2
    ],
  }

  return (
    <React.Fragment>
    <img src={process.env.PUBLIC_URL + '/JohnCliftonBogle.webp'} alt='saint'></img>
    <p>내 자산: {JSON.stringify(myAssets)} </p>
    <p>총 자산: {getAssetsCurrentValue(myAssets)}</p>
    <p>자산비율:{ JSON.stringify(calcAssetsPercentage(myAssets)) }</p>
    <hr />
    <p>종목 보유 현황</p>
    <hr />
    <Table assets={myAssets} />
    <PieChart2 />
    </React.Fragment>

  )
}

export default Body