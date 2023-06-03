import React from 'react'
import { Assets, calcCurrentValue } from '../domain/Domain'
import { MyStock } from '../domain/stock';

interface TableProps {
  assets: Assets;
}
const getRow = (myStock : MyStock) => {
  
  return (
    <React.Fragment key={myStock.code} >
      <tr>
        <th scope="row">{myStock.code}</th>
        <td>{myStock.quantity}</td>
        <td>{myStock.price * myStock.quantity}</td>
        <td>{myStock.averagePurchasePrice ? myStock.averagePurchasePrice : '-' }</td>
        <td>{myStock.averagePurchasePrice ? calcCurrentValue(myStock,myStock.averagePurchasePrice) : '-'}</td>
      </tr>
    </React.Fragment>
  )
}


const Table : React.FC<TableProps> = ({assets} )  => {
  return (
    <table className="table">
  <thead>
    <tr>
      <th scope="col">보유 종목</th>
      <th scope="col">보유 수량</th>
      <th scope="col">평가 금액</th>
      <th scope="col">매수 평균가</th>
      <th scope="col">매수 금액</th>
    </tr>

  </thead>
  <tbody>
    {assets.stocks && assets.stocks.map(getRow,)}
  </tbody>

</table>
  )
}

export default Table